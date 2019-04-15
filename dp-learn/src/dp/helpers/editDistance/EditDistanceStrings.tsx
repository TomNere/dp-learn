export const editDistFormula = `T[i][j] = {(j,; i=0 ),
    (i,; j=0),
    (T[i-1][j-1],; X[i-1] = Y[j-1]),
    (1 + min{T[i][j-1],\ T[i-1][j],\ T[i-1][j-1]},;
    X[i-1] != Y[j-1]):}`;

export const editDistRecTimeComplex = `3 ^ (m + n - 1)`;
export const editDistDpTimeComplex = `(L1 + 1) * (L2 + 1)`;
export const editDistRecSpaceComplex = `L1 + L2`;
export const editDistDpSpaceComplex = `L1 + L2 + ((L1 + 1) * (L2 + 1))`;
