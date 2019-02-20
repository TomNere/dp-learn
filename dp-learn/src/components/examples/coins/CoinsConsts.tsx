export const coinsRecCode = `// Returns number of coins to make given value
// coins[] - array of different coin types
// arrSize - size of array coins[]
// value - value we need to make
int minCoins(int coins[], int arrSize, int value) 
{
    // Base case
    if (value == 0)
    {
        return 0;
    }

    // Initialize result
    int res = INT_MAX; // From limits.h

    // Loop trough all coins smaller or equal to given value
    for (int i = 0; i < arrSize; i++)
    {
        if (coins[i] <= value) 
        { 
            int subRes = minCoins(coins, arrSize, value - coins[i]);

            // Check for INT_MAX to avoid overflow and see 
            // if result can be minimized
            if (subRes != INT_MAX && subRes + 1 < res)
            {
                res = subRes + 1;
            }
        }
    }
    return res;
}
`;

export const coinsDynCode = `// Returns number of coins to make given value
// coins[] - array of different coin types
// arrSize - size of array coins[]
// value - value we need to make
int minCoins(int coins[], int arrSize, int value)
{
    // Array[i] will be storing the minimum number of coins
    // required for i value. So array[value] will have result
    int array[value + 1];

    // To get exact result
    int backtrackHelp[value + 1];
  
    // Base case (If given value value is 0)
    array[0] = 0;
  
    // Initialize all array values as INT_MAX
    for (int i = 1; i <= value; i++)
    {
        array[i] = INT_MAX; // INT_MAX is from limits.h
        backtrackHelp[i] = -1;
    }
  
    // Compute minimum coins required for all
    // values from 1 to value
    for (int i = 1; i <= value; i++)
    {
        // Go through all coins smaller than i
        for (int j=0; j < arrSize; j++)
        {
            if (coins[j] <= i) 
            {
                int subRes = array[i - coins[j]];
                if (subRes != INT_MAX && subRes + 1 < array[i])
                {
                    array[i] = subRes + 1;
                    backtrackHelp[i] = j;   
                }
            }
        }
    }
    if (backtrackHelp[V] == -1) {
	    printf("No output\\n");
    }
    else {
	    int start = V;
	    printf("The coins are: \\n");
	    while(start != 0) {
	        int j = backtrackHelp[start];
	        printf("%d ", coins[j]);
	        start = start - coins[j];
	    }
	    printf("\\n");
	}
    return array[value];
}`;

export const coinsSmallDynCode = `// Inner cycle part of coins DP solution
for (int j = 0; j < arrSize; j++)
    if (coins[j] <= i) {
        int subRes = array[i - coins[j]];
        if (subRes != INT_MAX && subRes + 1 < array[i]) {
            array[i] = subRes + 1;
            result[i] = j;
        }
    }`;

export const coinsBacktrack = `// Print exact solution
int start = V;
printf("The coins are: \\n");
while(start != 0) {
    int j = backtrackHelp[start];
    printf("%d ", coins[j]);
    start = start - coins[j];
}
printf("\\n");`;

// Convert coins in string to number array
export const getCoins = (coinsStr: string) => {
    const coins: number[] = [];
    for (const coin of coinsStr.split(",")) {
        if (!Number.isNaN(+coin)) {
            coins.push(+coin);
        }
        else {
            return [];
        }
    }
    return coins;
}

export interface ICoinsExample {
    coins: number[],
    value: number
}

export const coinsExamples: ICoinsExample[] = [
    {
        coins: [1, 2],
        value: 15
    },
    {
        coins: [2, 3, 4],
        value: 20
    },
    {
        coins: [3, 5, 7],
        value: 40
    },
];
