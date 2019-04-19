import { ISimpleObjectParameter } from 'src/Helpers';

export const recursiveRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (arrSize === 0) {
        return 0; 
    }

    let result = Number.MIN_VALUE;
  
    for (let i = 0; i < arrSize; i++) {
        result = Math.max(result, prices[i] + recursiveRod(prices, arrSize - i - 1, calls)); 
    }
  
    return result;
}

export const dpRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => {
    const table: number[] = [];
    table[0] = 0;
    calls.value = 0;

    for (let i = 1; i <= arrSize; i++) {
        let maxVal = Number.MIN_VALUE;
        
        for (let j = 0; j < i; j++) {
            calls.value++;
            maxVal = Math.max(maxVal, prices[j] + table[i - j - 1]);
        }
        table[i] = maxVal; 
    }

    return table[arrSize];
}

export const dpRodTime = (arrSize: number) => {
    return arrSize * arrSize;
}

export const recRodTime = (arrSize: number) => {
    return Math.pow(2, arrSize);
}

export const recRodSpace = (arrSize: number) => {
    return arrSize;     // Store only prices
}

export const dpRodSpace = (arrSize: number) => {
    return arrSize + (arrSize + 1);     // Store prices and array for DP solution
}

export const rodExamples = [
    {
        prices: [1,2],
    },
    {
        prices: [2, 3, 4, 4, 6, 6, 11, 13, 15],
    },
    {
        prices: [3, 5, 6, 7, 9 , 11, 12, 20, 30],
    },
    {
        prices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    },
];
