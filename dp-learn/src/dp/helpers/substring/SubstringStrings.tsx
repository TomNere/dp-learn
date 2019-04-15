export const substrDynCode = `// Returns length of longest common substring
// x - string X
// y - string Y
// L1, L2 - lengths of strings
int commonSubstr(char* x, char* y, int L1, int L2) {
    // Table (two-dimensional array) for storing values
    int table[L1][L2];

    // Variables keeping position in table of longest subtring
    int row = 0;
    int col = 0;
  
    // Algorithm
    for (int i = 0; i <= len1; i++) {
        for (int j = 0; j <= len2; j++) {

            // Match!
            if (x[i] == x[j])
            {
                // Assign 1
                if (i == 0 || j == 0) {
                    table[i][j]
                }
                // Suffix is incremented
                else {
                    table[i][j] = ++table[i - 1][j - 1];
                }
                
                // Set new result
                if (table[row][col] < table[i][j]) {
                    row = i;
                    col = j;
                }
            }
            // No match
            else
            {
                table[i, j] = 0;
            }
        }
    }

    // Full solution
    for (int i = table[row][col] - 1; i >= 0; i--) {
        printf("%c", x[row - i]);
    }
    printf("\\n");

    return result;
}`;

export const substrRecCode = `
// Global variables
char* X;
char* Y;

// Returns length longest common substring of X and Y
// L1 - length of X
// L2 - length of Y
// count 0 at start
int commonSubstr(int L1, int L2, int count) {
    // String is empty
    if (i == 0 || j == 0) {
        return count;
    }

    // Match
    if (X[i - 1] == Y[j - 1]) {
        count = commonSubstr(i - 1, j - 1, count + 1);
    }

    // No match, try another substrings
    // max returns the higher of two values
    count = max(count, max(commonsSubstr(i, j - 1, 0), commonSubstr(i - 1, j, 0)));

    return count;
}`;

export const substrEnhCode = `// Returns length of longest common substring
int CommonSubstrLength(char* x, char* y) 
{
    // Find length of both the strings
    int m = strlen(x);
    int n = strlen(y);
  
    // Variable keeping length of the longest common substring
    int result = 0; 
  
    // Two dimensional array to store result of two consecutive rows at a time.
    int len[2][n];
  
    // Variable to represent which row of matrix is current row
    int currRow = 0; 
  
    // For a particular value of i and j, 
    // len[currRow][j] stores length of longest 
    // common substring in string X[0..i] and Y[0..j]
    for (int i = 0; i <= m; i++)
    {
        for (int j = 0; j <= n; j++)
        {
            if (i == 0 || j == 0) {
                len[currRow][j] = 0; 
            }
            else if (X[i - 1] == Y[j - 1]) {
                len[currRow][j] = len[1 - currRow][j - 1] + 1;
                result = max(result, len[currRow][j]); 
            } 
            else { 
                len[currRow][j] = 0; 
            } 
        } 
  
        // Make current row as previous row and previous 
        // row as new current row
        currRow = 1 - currRow;
    }
  
    return result; 
}`;

export const substringFormula = `T[i][j] = {(0,; i=0 ),
    (0,; j=0),
    (0,; X[i-1] != Y[j-1]),
    (T[i-1][j-1] + 1,;
    X[i-1] = Y[j-1]):}`;

export const substringRecTimeComplex = `2 ^ (L1 + L2)???`;
export const substringDpTimeComplex = `L1 * L2`;
export const substringRecSpaceComplex = `L1 + L2`;
export const substringDpSpaceComplex = `L1 + L2 + (L1 * L2) + 1`;
