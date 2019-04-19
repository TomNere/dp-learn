export const coinsRecCode = `// Returns number of coins to make given value
// coins[] - table of different coins
// arrSize - size of coins[]
// value - value to make
int minCoins(int coins[], int arrSize, int value) {
    // Base case (if given value value is 0)
    if (value == 0) {
        return 0;
    }

    // Initialize result
    int result = INT_MAX;

    // Loop trough all coins smaller or equal to given value
    for (int i = 0; i < arrSize; i++) {
        if (coins[i] <= value) {
            int subResult = minCoins(coins, arrSize, value - coins[i]);

            // If subResult == INT_MAX - no result
            // If subResult + 1 < result - we've got new result
            if (subResult != INT_MAX && subResult + 1 < result) {
                result = subResult + 1;
            }
        }
    }
    return result;
}
`;

export const coinsDynCode = `// Returns number of coins to make given value
// coins[] - table of different coins
// arrSize - size of coins[]
// value - value to make
int minCoins(int coins[], int arrSize, int value) {
    // Minimum number of coins to make value i will be in table[i]
    int table[value + 1];

    // Helper for printing full solution
    int solutionHelper[value + 1];
  
    // Base case (if given value value is 0)
    table[0] = 0;
  
    // Initialize all table values as INT_MAX
    for (int i = 1; i <= value; i++) {
        table[i] = INT_MAX;
    }
  
    // Compute minimum coins required for all values
    // from 1 to given value
    for (int i = 1; i <= value; i++) {
        for (int j=0; j < arrSize; j++) {

            // Check if value of coins[i] is <= value i
            if (coins[j] <= i) {
                int subResult = table[i - coins[j]];

                // If subResult == INT_MAX - no result
                // If subResult + 1 < result - we've got new result
                if (subResult != INT_MAX && subResult + 1 < table[i]) {
                    table[i] = subRes + 1;
                    solutionHelper[i] = j;  // Coin at which index was used
                }
            }
        }
    }

    // Print full solution only if full solution exist
    // (if given value != 0)
    if (solutionHelper[value] != 0) {
	    int start = value;
	    printf("Used coins: \\n");
	    while(start != 0) {
	        int j = solutionHelper[start];
	        printf("%d, ", coins[j]);
	        start = start - coins[j];
	    }
	    printf("\\n");
    }
    
    return table[value];
}`;

export const coinsSmallDynCode = `// Inner cycle part of coins DP solution
for (int j = 0; j < arrSize; j++) {
    if (coins[j] <= i) {
        int subRes = table[i - coins[j]];
        if (subRes != INT_MAX && subRes + 1 < table[i]) {
            table[i] = subRes + 1;
            result[i] = j;
        }
    }
}`;

export const coinsBacktrack = `// Print exact solution
int start = V;
printf("The coins are: \\n");
while(start != 0) {
    int j = solutionHelper[start];
    printf("%d ", coins[j]);
    start = start - coins[j];
}
printf("\\n");`;

export const coinsFormula = `T[v] = {(0,; v = 0),
    (min{1 + T[i - C[i]]}\ \ ;
    \ \ \ i:\ \ C[i] < v,; v > 0):}`;

export const coinsRecTimeComplex = `N ^ V`;
export const coinsDpTimeComplex = `N * V`;
export const coinsRecSpaceComplex = `N + 1`;
export const coinsDpSpaceComplex = `N + 1 + (N + 1)`;
