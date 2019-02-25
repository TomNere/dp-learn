import { ITimeConverter } from 'src/types';

export const MilliToMicro : ITimeConverter = (n: number) => {
    return n * 1000;
}

export const MilliToMilli : ITimeConverter = (n: number) => {
    return n;
}

// Convert numbers in string to number array
export const GetNumbers = (str: string) => {
    const numbers: number[] = [];
    for (const num of str.split(",")) {
        if (!Number.isNaN(+num)) {
            numbers.push(+num);
        }
        else {
            return [];
        }
    }
    return numbers;
}
