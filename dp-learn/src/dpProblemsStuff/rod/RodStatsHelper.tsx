import { ISimpleObjectParameter } from 'src/types';

export type ISolutionRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => number;

export const recursiveRod : ISolutionRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (arrSize <= 0) {
        return 0; 
    }

    let maxVal = Number.MIN_VALUE;
  
    // Recursively cut the rod in different pieces and compare different
    // configurations
    for (let i = 0; i < arrSize; i++) {
        maxVal = Math.max(maxVal, prices[i] + recursiveRod(prices, arrSize - i - 1, calls)); 
    }
  
    return maxVal;
}

export const dpRod : ISolutionRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => {
    const array: number[] = [];
    array[0] = 0;
    calls.value = 0;

    // Build the table val[] in bottom up manner and return the last entry 
    // from the table 
    for (let i = 1; i <= arrSize; i++) {
        let maxVal = Number.MIN_VALUE;
        
        for (let j = 0; j < i; j++) {
            calls.value++;
            maxVal = Math.max(maxVal, prices[j] + array[i - j - 1]);
        }
        array[i] = maxVal; 
    }

    return array[arrSize];
}

export type IRodSpace = (arrSize: number) => number;

export const recRodTime = (arrSize: number) => {
    // TODO right algorithm
    return arrSize * arrSize;
}

export const recRodSpace : IRodSpace = (arrSize: number) => {
    return arrSize;     // Store only prices
}

export const dpRodSpace : IRodSpace = (arrSize: number) => {
    return arrSize + (arrSize + 1);     // Store prices and array for DP solution
}

export const rodExamples = [
    {
        prices: [1, 2, 3, 4],
    },
    {
        prices: [2, 3, 4, 4, 6],
    },
    {
        prices: [3, 5, 6, 7, 9 , 11, 12],
    },
];
