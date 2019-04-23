export const editDistRecCode = `// Global variables
char* X;
char* Y;

// Returns edit distance
// L1, L2 - lengths of strings
int editDistance(int L1 ,int L2) {

    // First string is empty, insert all characters of second string
    if (L1 == 0) {
        return n;
    }
  
    // Second string is empty, remove all characters of first string
    if (L2 == 0) {
        return m;
    }
  
    // Last characters same, continue to next characters
    if (X[L1 - 1] == Y[L2 - 1]) {
        return editDistance(L1 - 1, L2 - 1);
    }
  
    // Last character is different, try all
    // possibilities and find the minimum
    // min returns minimum of three values
    return 1 + min(editDistance(L1, L2 - 1),    // Insert
                   editDistance(L1 - 1, L2),    // Remove
                   editDistance(L1 - 1, L2-1)   // Replace
                );
}`;

export const editDistDynCode = `// Global variables
char* X;
char* Y;

// Returns edit distance
// L1, L2 - lengths of strings
int editDistDP(int L1, int L2) {
    // Table (two-dimensional array) for storing values
    int table[L1 + 1][L2 + 1];

    // Algorithm
    for (int i = 0; i <= L1; i++) {
        for (int j = 0; j <= L2; j++) {

            // First string is empty, insert all characters of second string 
            if (i == 0) {
                table[i][j] = j;  // Min. operations = j
            }
  
            // Second string is empty, remove all characters of first string
            else if (j == 0) {
                table[i][j] = i; // Min. operations = i
            }
  
            // Last characters same, continue to next characters
            else if (str1[i - 1] == str2[j - 1]) {
                table[i][j] = table[i - 1][j - 1];
            }
  
            // Last character is different, try all
            // possibilities and find the minimum
            // min returns minimum of three values
            else {
                table[i][j] = 1 + min(table[i][j - 1],      // Insert
                                      table[i - 1][j],      // Remove
                                      table[i - 1][j - 1]); // Replace
            }
        }
    }

    return table[L1][L2];
}`

export const editDistFormula = `T[i][j] = {(j,; i=0 ),
    (i,; j=0),
    (T[i-1][j-1],; X[i-1] = Y[j-1]),
    (1 + min{T[i][j-1],\ T[i-1][j],\ T[i-1][j-1]},;
    X[i-1] != Y[j-1]):}`;

export const editDistRecTimeComplex = `3 ^ (m + n - 1)`;
export const editDistDpTimeComplex = `(L1 + 1) * (L2 + 1)`;
export const editDistRecSpaceComplex = `L1 + L2`;
export const editDistDpSpaceComplex = `L1 + L2 + ((L1 + 1) * (L2 + 1))`;
