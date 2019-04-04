// Converter between time units
type ITimeConverter = (n: number) => number;

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


// A utility function to get sum of array elements from i to j
// helper for tree demo
export const FreqArraySum = (freqs: number[], i: number, j: number) => {
    let sum = 0;
    for (let k = i; k <= j; k++) {
        sum += freqs[k];
    }

    return sum;
}

export const ValueOrIntMax = (val: number) => {
    return val === Number.MAX_VALUE ? 'INT_MAX' : val.toString();
}

export const ValueOrUndefined = (val: number) => {
    return val === undefined ? '-' : val.toString();
}

export const StrToNumArray = (str: string) => {
    const numbers: number[] = [];

    for (const num of str.split(",")) {
        if (Number.isNaN(+num)) {
            return [];
        }
        else {
            numbers.push(+num);
        }
    }
    
    return numbers;
}