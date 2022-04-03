import { getTime } from './date';

describe('date.ts', () => {
    describe('getTime', () => {
        it('should return correct time', () => {
            const date = new Date(2022, 0, 1, 10, 30, 20);
            const actual = getTime(date.toJSON());
            const expected = "10:30";
            expect(actual).toBe(expected);
        })
    })
})