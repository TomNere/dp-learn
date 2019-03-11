import { ISimpleObjectParameter } from 'src/types';
import { Min } from 'src/helpers/Helpers';

export type ISolutionEditDistance = (stringX: string, stringY: string, LENGTH1: number, LENGTH2: number, calls: ISimpleObjectParameter) => number;

export const recursiveEditDistance: ISolutionEditDistance = (stringX: string, stringY: string, LENGTH1: number, LENGTH2: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (calls.value >= 100000) {
        return -1;
    }

    // If first string is empty, the only option is to 
    // insert all characters of second string into first 
    if (LENGTH1 === 0) {
        return LENGTH2;
    }

    // If second string is empty, the only option is to 
    // remove all characters of first string 
    if (LENGTH2 === 0) {
        return LENGTH1;
    }

    // If last characters of two strings are same, nothing 
    // much to do. Ignore last characters and get count for 
    // remaining strings. 
    if (stringX[LENGTH1 - 1] === stringY[LENGTH2 - 1]) {
        return recursiveEditDistance(stringX, stringY, LENGTH1 - 1, LENGTH2 - 1, calls);
    }

    // If last characters are not same, consider all three 
    // operations on last character of first string, recursively 
    // compute minimum cost for all three operations and take 
    // minimum of three values. 
    return 1 + Min(recursiveEditDistance(stringX, stringY, LENGTH1, LENGTH2 - 1, calls),     // Insert 
        recursiveEditDistance(stringX, stringY, LENGTH1 - 1, LENGTH2, calls),     // Remove 
        recursiveEditDistance(stringX, stringY, LENGTH1 - 1, LENGTH2 - 1, calls)  // Replace 
    );
}

export const dpEditDistance: ISolutionEditDistance = (stringX: string, stringY: string, LENGTH1: number, LENGTH2: number, calls: ISimpleObjectParameter) => {
    const table: number[][] = [];

    for (let i = 0; i <= LENGTH1; i++) {
        table[i] = [];
        for (let j = 0; j <= LENGTH2; j++) {
            ++calls.value;
            // If first string is empty, only option is to 
            // insert all characters of second string 
            if (i === 0) {
                table[i][j] = j;  // Min. operations = j 
            }

            // If second string is empty, only option is to 
            // remove all characters of second string 
            else if (j === 0) {
                table[i][j] = i; // Min. operations = i 
            }

            // If last characters are same, ignore last char 
            // and recur for remaining string 
            else if (stringX[i - 1] === stringY[j - 1]) {
                table[i][j] = table[i - 1][j - 1];
            }

            // If the last character is different, consider all 
            // possibilities and find the minimum 
            else {
                table[i][j] = 1 + Min(table[i][j - 1],  // Insert 
                    table[i - 1][j],  // Remove 
                    table[i - 1][j - 1]); // Replace
            }
        }
    }

    return table[LENGTH1][LENGTH2];
}

export type IEditDistanceSpace = (stringX: string, stringY: string) => number;

export const recEditDistanceSpace: IEditDistanceSpace = (stringX: string, stringY: string) => {
    return stringX.length + stringY.length;     // Store only prices
}

export const dpEditDistanceSpace: IEditDistanceSpace = (stringX: string, stringY: string) => {
    return stringX.length + stringY.length + ((stringX.length + 1) * (stringY.length + 1));
}

export const editDistanceExamples = [
    {
        stringX: 'someString',
        stringY: 'SomeOString'
    },
    {
        stringX: 'test',
        stringY: 'quest'
    },
    {
        stringX: 'dpIsBest',
        stringY: 'INeedRest'
    },
];
