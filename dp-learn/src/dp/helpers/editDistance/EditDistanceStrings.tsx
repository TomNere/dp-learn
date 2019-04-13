export const editDistFormula = `T[i][j] = {(j,; i=0 ),
    (i,; j=0),
    (T[i-1][j-1],; X[i-1] = Y[j-1]),
    (1 + min{T[i][j-1],\ T[i-1][j],\ T[i-1][j-1]},;
    X[i-1] != Y[j-1]):}`;
