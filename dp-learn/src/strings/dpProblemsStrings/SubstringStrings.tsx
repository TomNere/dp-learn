export const substrRecCode = `// Global variables
char* X;
char* Y;

// Returns length longest common substring of X and Y
// L1 - length of X
// L2 - length of Y
// count 0 at start
int commonSubstr(int L1, int L2, int count) {
    // String is empty
    if (L1 == 0 || L2 == 0) {
        return count;
    }

    // Match
    if (X[L1 - 1] == Y[L2 - 1]) {
        count = commonSubstr(L1 - 1, L2 - 1, count + 1);
    }

    // Try another substrings
    // max returns the higher of two values
    count = max(count, max(commonSubstr(L1, L2 - 1, 0), commonSubstr(L1 - 1, L2, 0)));

    return count;
}`;

export const substrDynCode = `// Global variables
char* X;
char* Y;

// Returns length of longest common substring
// L1, L2 - lengths of strings
int commonSubstr(int L1, int L2) {
    // Table (two-dimensional array) for storing values
    int table[L1][L2];

    // Variables keeping position in table of longest subtring
    int row = 0;
    int col = 0;
  
    // Algorithm
    for (int i = 0; i < L1; i++) {
        for (int j = 0; j < L2; j++) {

            // Match!
            if (X[i] == Y[j]) {
                // Assign 1
                if (i == 0 || j == 0) {
                    table[i][j] = 1;
                }
                // Suffix is incremented
                else {
                    table[i][j] = table[i - 1][j - 1] + 1;
                }
                
                // Set new result
                if (table[row][col] < table[i][j]) {
                    row = i;
                    col = j;
                }
            }
            // No match
            else {
                table[i][j] = 0;
            }
        }
    }

    // Full solution
    for (int i = table[row][col] - 1; i >= 0; i--) {
        printf("%c", X[row - i]);
    }
    printf("\\n");

    return table[row][col];
}`;

export const substringFormula = `T[i][j] = {(0,; X[i] != Y[j]),
    (1,; X[i] = Y[j] ^^ (i=0 vv j=0) ),
    (T[i-1][j-1] + 1,;
    X[i] = Y[j] ^^ i>0 ^^ j>0
 ):}`;

export const substringRecTimeComplex = `3 ^ (L1 + L2 - 1)`;
export const substringDpTimeComplex = `L1 * L2`;
export const substringRecSpaceComplex = `L1 + L2`;
export const substringDpSpaceComplex = `L1 + L2 + (L1 * L2)`;
