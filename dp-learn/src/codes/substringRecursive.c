// Returns length of longest common substring
// x, y - strings
// i - length of y
// j - length of x
// count must be 0
int CommonSubstrLength(char* x, char* y, int i, int j, int count)  
{
    if (i == 0 || j == 0)
    {
        return count;
    }
  
    if (x[i - 1] == y[j - 1])
    {
        count = CommonSubstrLength(i - 1, j - 1, count + 1);
    }

    int tmp1 = CommonSubstrLength(i, j - 1, 0);
    int tmp2 = CommonSubstrLength(i - 1, j, 0);

    if (tmp1 < 2)
    {
        tmp1 = tmp2;
    }

    if (count < tmp1)
    {
        count = tmp1;
    }

    return count;
}