export const substrDynCode = `// Returns length of longest common substring
int CommonSubstrLength(char* x, char* y) 
{
    // Store strings length
    int len1 = strlen(x);
    int len2 = strlen(y);

    // Table (two-dimensional array) for storing values
    // Table size is length +1 because of simplicity
    int[len1 + 1][len2 + 1] table;
          
    // Variable keeping length of the longest common substring
    int result = 0;
  
    // Algorithm
    for (int i = 0; i <= len1; i++)
    {
        for (int j = 0; j <= len2; j++)
        {
            // Fill first row and column of table with zero values
            if (i == 0 || j == 0)
            {
                table[i, j] = 0;
            }
            // Check for matching characters
            // (i-1 and j-1 because we have bigger table than strings)
            else if (x[i - 1] == x[j - 1])
            {
                // Match!
                // Suffix is incremented
                // We have zero value in first column/row, 
                // so we can just increment
                table[i][j] = ++table[i - 1][j - 1];

                // Set new result
                result = max(resultm, table[i][j]);
            }
            // Different characters
            else
            {
                table[i, j] = 0; 
            }
        }
    }

    return result; 
}`;

export const substrRecCode = `// Returns length of longest common substring
int CommonSubstrLength(char* x, char* y)
{
    if (*x == '\0' || *y == '\0')
    {
        return 0;
    }
    else if (*x == *y)
    {
        return (1 + CommonSubstrLength(x + 1, y + 1);
    }
    else
    {
        return max(CommonSubstrLength(x + 1, y), CommonSubstrLength(x, y + 1));
    }
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