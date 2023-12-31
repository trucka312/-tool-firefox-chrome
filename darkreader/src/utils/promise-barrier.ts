export class PromiseBarrier<RESOLVUTION, REJECTION> {
    private resolves: Array<(value: RESOLVUTION) => void> = [];
    private rejects: Array<(reason: REJECTION) => void> = [];
    private wasResolved = false;
    private wasRejected = false;
    private resolution: RESOLVUTION;
    private reason: REJECTION;

    public async entry(): Promise<RESOLVUTION>{
        if (this.wasResolved) {
            return Promise.resolve(this.resolution);
        }
        if (this.wasRejected) {
            return Promise.reject(this.reason);
        }
        return new Promise((resolve, reject) => {
            this.resolves.push(resolve);
            this.rejects.push(reject);
        });
    }

    public async resolve(value: RESOLVUTION): Promise<void> {
        if (this.wasRejected || this.wasResolved) {
            return;
        }
        this.wasResolved = true;
        this.resolution = value;
        this.resolves.forEach((resolve) => resolve(value));
        this.resolves = [];
        this.rejects = [];
        return new Promise<void>((resolve) => setTimeout(() => resolve()));
    }

    public async reject(reason: REJECTION): Promise<void> {
        if (this.wasRejected || this.wasResolved) {
            return;
        }
        this.wasRejected = true;
        this.reason = reason;
        this.rejects.forEach((reject) => reject(reason));
        this.resolves = [];
        this.rejects = [];
        return new Promise<void>((resolve) => setTimeout(() => resolve()));
    }

    public isPending(): boolean {
        return !this.wasResolved && !this.wasRejected;
    }

    public isFulfilled(): boolean {
        return this.wasResolved;
    }

    public isRejected(): boolean {
        return this.wasRejected;
    }
}
