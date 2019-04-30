// Convert numbers in string to number array
export const GetNumbers = (str: string, sorted: boolean) => {
    const numbers: number[] = [];
    for (const num of str.split(",")) {
        if (!Number.isNaN(+num) && +num >= 0 && Number.isInteger(+num)) {
            if (sorted && +num < numbers[numbers.length - 1]) {
                return [];
            }
            numbers.push(+num);
        }
        else {
            return [];
        }
    }
    return numbers;
}

// Check for zero value in array
export const CheckForZero = (arr: number[]) => {
    for (const num of arr) {
        if (num === 0) {
            return true;
        }
    }
    return false;
}

// Return minimum of three values
export const Min = (n1: number, n2: number, n3: number) => {
    n1 = Math.min(n1, n2);
    return Math.min(n1, n3);
}

// Return position in tuple - minimum of three values
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
