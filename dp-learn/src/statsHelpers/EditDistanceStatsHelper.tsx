import { ISimpleObjectParameter } from 'src/statsHelpers/CoinsStatsHelper';
import { Min } from 'src/helpers';

export const recursiveEditDistance = (stringX: string, stringY: string, length1: number, length2: number, calls: ISimpleObjectParameter): number => {
    ++calls.value;

    if (length1 === 0) {
        return length2;
    }

    if (length2 === 0) {
        return length1;
    }

    if (stringX[length1 - 1] === stringY[length2 - 1]) {
        return recursiveEditDistance(stringX, stringY, length1 - 1, length2 - 1, calls);
    }

    return 1 + Min(recursiveEditDistance(stringX, stringY, length1, length2 - 1, calls),
        recursiveEditDistance(stringX, stringY, length1 - 1, length2, calls),
        recursiveEditDistance(stringX, stringY, length1 - 1, length2 - 1, calls)
    );
}

export const dpEditDistance = (stringX: string, stringY: string, length1: number, length2: number, calls: ISimpleObjectParameter) => {
    const table: number[][] = [];

    for (let i = 0; i <= length1; i++) {
        table[i] = [];
        for (let j = 0; j <= length2; j++) {
            ++calls.value;
            if (i === 0) {
                table[i][j] = j;
            }

            else if (j === 0) {
                table[i][j] = i;
            }

            else if (stringX[i - 1] === stringY[j - 1]) {
                table[i][j] = table[i - 1][j - 1];
            }

            else {
                table[i][j] = 1 + Min(table[i][j - 1],
                    table[i - 1][j],
                    table[i - 1][j - 1]);
            }
        }
    }

    return table[length1][length2];
}

export const dpEditDistanceTime = (length1: number, length2: number) => {
    return ((length1 + 1) * (length2 + 1));
}

export const recEditDistanceTime = (length1: number, length2: number) => {
    return Math.pow(3, length1 + length2 - 1);
}

export const recEditDistanceSpace = (length1: number, length2: number) => {
    return length1 + length2;     // Store only strings
}

export const dpEditDistanceSpace = (length1: number, length2: number) => {
    return length1 + length2 + ((length1 + 1) * (length2 + 1)); // strings and table
}

export const editDistanceExamples = [
    {
        strX: '',
        strY: 'SomeEmptyString'
    },
    {
        strX: 'A',
        strY: 'Ad'
    },
    {
        strX: 'aaaaa',
        strY: 'bbbbb'
    },
    {
        strX: 'AMatchHere',
        strY: 'tenisMatch'
    },
];
