export const rodRecCode = `// Return best obtainable price
// prices[] - array of prices of rod length 1,2,3, ...
// arrSize - number of prices
int cuttingRod(int prices[], int arrSize) {
    // Base case (no prices given)
    if (arrSize == 0) {
        return 0;
    }

    int result = INT_MIN;

    // Loop trough all cutted pieces and store the best price
    for (int i = 0; i < arrSize; i++) {
        // max is helper method - return max of two values
        result = max(result, prices[i] + cuttingRod(prices, arrSize - i - 1));
    }

    return result;
}`;

export const rodDynCode = `// Return best obtainable price
// prices[] - array of prices of rod length 1,2,3, ...
// n - number of prices
int cuttingRod(int prices[], int arrSize) {
    // Best price for length i will be in table[i]
    int table[arrSize + 1];

    // Helper for printing full solution
    int solutionHelper[arrSize + 1];

    // Base case (no prices given)
    table[0] = 0;
  
    // Compute best obtainable price for all lengths
    // from 1 to arrSize
    for (int i = 1; i <= arrSize; i++) {
        int maxValue = INT_MIN;
        for (int j = 0; j < i; j++) {
            if (prices[j] + table[i - j - 1] > maxValue) {
                maxValue = prices[j] + table[i - j - 1];
                solutionHelper[i] = j + 1;  // Which length was used
            } 
            
        }

        table[i] = maxValue;
    }

    // Print full solution only if full solution exist
    // (if arrSize != 0)
    if (solutionHelper[arrSize] != 0) {
	    int start = arrSize;
	    printf("Used lengths: \\n");
	    while(start != 0) {
	        printf("%d, ", solutionHelper[start]);
	        start = start - solutionHelper[start];
	    }
	    printf("\\n");
    }

   return table[arrSize];
}`;

export const rodSmallDynCode = `// Inner loop part of rod DP solution
for (int i = 1; i<=n; i++) {
    int result = INT_MIN;
    for (int j = 0; j < i; j++)
        max_val = max(max_val, price[j] + val[i-j-1]); 

    table[i] = result;
}`;

export const rodFormula = `T[l] = {(0,; l = 0),
    (max{P[i] + T[l - i - 1]};
    \ i:\ i < l,; l > 0):}`;

export const rodRecTimeComplex = `2 ^ L`;
export const rodDpTimeComplex = `L * L`;
export const rodRecSpaceComplex = `L`;
export const rodDpSpaceComplex = `L + (L + 1)`;
