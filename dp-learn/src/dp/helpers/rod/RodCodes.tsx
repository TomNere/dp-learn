export const rodDynCode = `// DP method to get the best obtainable price
prices[] - array of prices of rod length 1,2,3, ...
n - number of prices
int cutRod(int prices[], int n) {
    int value[n + 1];
    value[0] = 0;
  
    // Fill the table with max values for each length
    // Last item is the best obtainable price
    for (int i = 1; i<=n; i++) {
        int maxVal = INT_MIN;
        for (int j = 0; j < i; j++)
            max_val = max(max_val, price[j] + val[i-j-1]); 

        value[i] = maxVal;
    }

   return value[n];
}`;

export const rodSmallDynCode = `// Inner cycle part of rod DP solution
for (int i = 1; i<=n; i++) {
    int maxVal = INT_MIN;
    for (int j = 0; j < i; j++)
        max_val = max(max_val, price[j] + val[i-j-1]); 

    value[i] = maxVal;
}`;

export const rodRecCode = `// Recursive method to get the best obtainable price
prices[] - array of prices of rod length 1,2,3, ...
n - number of prices
int cutRod(int prices[], int n) {

    if (n <= 0)
        return 0;

    int maxVal = INT_MIN;

    // Recursively try to cut a rod into different pieces and store the best value
    for (int i = 0; i<n; i++)
        maxVal = max(maxVal, prices[i] + cutRod(prices, n - i - 1));

    return maxVal;
}`;
