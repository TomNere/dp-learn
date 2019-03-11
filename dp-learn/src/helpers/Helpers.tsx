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

export const CheckNumbers = (str: string) => {
    for (const coin of str.split(",")) {
        if (Number.isNaN(+coin)) {
            return false;
        }
    }
    return true;
}

export const Min = (n1: number, n2: number, n3: number) => {
    n1 = Math.min(n1, n2);
    return Math.min(n1, n3);
}

// Return position in tuple
export const MinPosition = (n1: [number, [number, number]], n2: [number, [number, number]], n3: [number, [number, number]]) => {
    let min: [number, [number, number]];
    if (n1[0] < n2[0]) {
        min = n1;
    }
    else {
        min = n2;
    }

    if (min[0] > n3[0]) {
        min = n3;
    }

    return min[1];
}