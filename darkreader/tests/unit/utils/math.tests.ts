import {scale, clamp, multiplyMatrices} from '../../../src/utils/math';

test('Scale', () => {
    expect(scale(5, 0, 10, 0, 100)).toEqual(50);
});

test('Clamp', () => {
    expect(clamp(1, 2, 3)).toEqual(2);
    expect(clamp(2, 1, 3)).toEqual(2);
    expect(clamp(3, 1, 2)).toEqual(2);
});

test('Matrix multiplication', () => {
    expect(multiplyMatrices([
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
    ],
    [
        [1], [2], [3], [4], [5],
    ])).toEqual([
        [55], [130], [205], [280], [355],
    ]);

    expect(multiplyMatrices([
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
    ],
    [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
    ])).toEqual([
        [215, 230, 245, 260, 275],
        [490, 530, 570, 610, 650],
        [765, 830, 895, 960, 1025],
        [1040, 1130, 1220, 1310, 1400],
        [1315, 1430, 1545, 1660, 1775],
    ]);
//    expect(multiplyMatrices([[1, 2, 3], [6, 5, 3]], [[1, 2], [7, 4], [6, 2]])).toEqual([[33, 16], [59, 38]]);
});