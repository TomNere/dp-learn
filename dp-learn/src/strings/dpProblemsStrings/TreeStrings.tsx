export const treeRecCode = `// Return table of optimal binary search tree
// freqs[] - array of key searching frequences
// i, j - indexes of subarray
// first call i = 0, j = freqs.length - 1
int optimalSearchTree(int freqs[], int i, int j) {
    // Base cases
    if (j < i) {     // No elements in this subarray
        return 0;
    }
    if (j == i) {    // One element in this subarray
        return freqs[i];
    }
  
    // sum returns sum of freqs[i], freqs[i+1], ... freqs[j]
    int freqsSum = sum(freqs, i, j); 
  
    // Initialize minimum value 
    int min = INT_MAX; 
  
    // Try all keys as root and find the minimum table
    for (int r = i; r <= j; ++r) {
        int table = optimalSearchTree(freqs, i, r - 1) +
                   optimalSearchTree(freqs, r + 1, j);
        if (table < min) {
           min = table;
        }
    }
  
    return min + freqsSum;
}`;

export const treeDynCode = `// Return table of optimal binary search tree
// keys[] - array of keys
// freqs[] - array of key searching frequences
// N - number of keys
int optimalSearchTree(int keys[], int freqs[], int N) 
{ 
    // Table (two-dimensional array) for storing values
    int table[N][N];
  
    // Helper which can be user for building a tree
    int usedKeys[N][N];
  
    // Cost of single key == frequency of the key
    for (int i = 0; i < N; i++) {
        table[i][i] = freqs[i];
        usedKeys[i][i] = i;
    }
  
    // Algorithm
    for (int i = 2; i <= N; i++) {

        // j is row number in table[][]
        for (int j = 0; j <= N - i + 1; j++) {

            // Get column number from row number j and chain length i
            int column = j + i - 1;
            table[j][column] = INT_MAX;
  
            // Try making all keys in interval keys[i..j] as root
            // r is position in keys[]
            for (int r = j; r <= column; r++) {

               // c = cost when keys[r] becomes root of this subtree
               // sum returns sum of freqs[i], freqs[i+1], ... freqs[j] 
               int c = ((r > j) ? table[j][r - 1] : 0) +
                       ((r < column) ? table[r + 1][column] : 0) +
                       sum(freqs, j, column);
               if (c < table[j][column]) {
                  table[j][column] = c;
                  usedKeys[j][column] = r;
               }
            }
        }
    }
    
    // Print used keys (indices in keys[])
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (j < i) {
                printf("-,");
            }
            else {
                printf("%d,", usedKeys[i][j]);
            }
        }
        printf("\\n");
    }

    return table[0][N - 1];
}`;


export const treeFormula = `T[j][col] = {
    (F[j],; j=col ),
    (min{T[j][r-1] + T[r+1][col] + sum_(k=j)^(col) F[k]},;
        X[i-1] != Y[j-1]),
    (,;i: i >= 2 ^^ i <= N),
    (,;j: j <=N -i +1),
    (,;col: j + i - 1),
    (,;r: r >= j ^^ r <=col):}`;

export const treeRecTimeComplex = `(4 ^ N) * (N ^ (-3 / 2))`;
export const treeDpTimeComplex = `N ^ 3`;
export const treeRecSpaceComplex = `N`;
export const treeDpSpaceComplex = `N + (N * N)`;
