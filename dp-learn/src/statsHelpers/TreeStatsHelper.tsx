// author: Tomáš Nereča, 2019

// Codes are inspirated by https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/

import { ISimpleObjectParameter } from 'src/statsHelpers/CoinsStatsHelper';
import { freqArraySum } from 'src/helpers';

export const recursiveTree = (freqs: number[], i: number, j: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (j < i) {
        return 0;
    }

    if (j === i) {
        return freqs[i];
    }

    const fsum = freqArraySum(freqs, i, j);

    let min = Number.MAX_VALUE;

    for (let r = i; r <= j; ++r) {
        const cost = recursiveTree(freqs, i, r - 1, calls) + recursiveTree(freqs, r + 1, j, calls);
        if (cost < min) {
            min = cost;
        }
    }

    return min + fsum;
}

export const dpTree = (freqs: number[], calls: ISimpleObjectParameter) => {
    const table: number[][] = [];
    const LENGTH = freqs.length;

    for (let i = 0; i < LENGTH; i++) {
        table[i] = []
        table[i][i] = freqs[i];
    }

    for (let outerCounter = 2; outerCounter <= LENGTH; outerCounter++) {
        for (let innerCounter = 0; innerCounter <= LENGTH - outerCounter; innerCounter++) {
            const columnNumber = innerCounter + outerCounter - 1;
            table[innerCounter][columnNumber] = Number.MAX_VALUE;

            for (let rootCounter = innerCounter; rootCounter <= columnNumber; rootCounter++) {
                ++calls.value;

                const val = ((rootCounter > innerCounter) ? table[innerCounter][rootCounter - 1] : 0) +
                    ((rootCounter < columnNumber) ? table[rootCounter + 1][columnNumber] : 0) +
                    freqArraySum(freqs, innerCounter, columnNumber);

                if (val < table[innerCounter][columnNumber]) {
                    table[innerCounter][columnNumber] = val;
                }
            }
        }
    }

    return table[0][LENGTH - 1];
}

export const recTreeTime = (arrSize: number) => {
    return Math.round(Math.pow(4, arrSize) * Math.pow(arrSize, -3/2));
}

export const dpTreeTime = (arrSize: number) => {
    return Math.pow(arrSize, 3);
}

export const recTreeSpace = (arrSize: number) => {
    return arrSize;
}

export const dpTreeSpace = (arrSize: number) => {
    return arrSize + (arrSize * arrSize);     // keys, freqs and table
}

export const treeExamples = [
    {
        freqs: [1],
        recTime: 1,
        dpTime: 0,
    },
    {
        freqs: [1,4],
        recTime: 5,
        dpTime: 2,
    },
    {
        freqs: [1,4,7],
        recTime: 15,
        dpTime: 7,
    },
    {
        freqs: [1,2,3,4,5,6,7,8,9,10],
        recTime: 32805,
        dpTime: 210,
    },
    {
        freqs: [1,2,3,4,55,66,77,88,99,100],
        recTime: 32805,
        dpTime: 210,
    },
    {
        freqs: [1,2,3,4,5,6,7,8,9,10,11],
        recTime: 98415,
        dpTime: 275,
    },
];


