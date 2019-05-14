// Convert numbers in string to number array
export const getNumbers = (str: string, sorted: boolean) => {
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
export const checkForZero = (arr: number[]) => {
    for (const num of arr) {
        if (num === 0) {
            return true;
        }
    }
    return false;
}


// Check for duplicate in array
export const checkForDuplicate = (arr: number[]) => {
    const sortedArr = arr.slice().sort();

    for (let i = 0; i < sortedArr.length - 1; i++) {
        if (sortedArr[i + 1] === sortedArr[i]) {
            return true;
        }
    }

    return false;
}

// Return minimum of three values
export const min = (n1: number, n2: number, n3: number) => {
    n1 = Math.min(n1, n2);
    return Math.min(n1, n3);
}

// Return position in tuple - minimum of three values
export const minPosition = (n1: [number, [number, number]], n2: [number, [number, number]], n3: [number, [number, number]]) => {
    let mini: [number, [number, number]];
    if (n1[0] < n2[0]) {
        mini = n1;
    }
    else {
        mini = n2;
    }

    if (mini[0] > n3[0]) {
        mini = n3;
    }

    return mini[1];
}

// A utility function to get sum of array elements from i to j
// helper for tree demo
export const freqArraySum = (freqs: number[], i: number, j: number) => {
    let sum = 0;
    for (let k = i; k <= j; k++) {
        sum += freqs[k];
    }

    return sum;
}

export const valueOrIntMax = (val: number) => {
    return val === Number.MAX_VALUE ? 'INT_MAX' : val.toString();
}

export const valueOrUndefined = (val: number) => {
    return val === undefined ? '-' : val.toString();
}
