export const treeFormula = `T[i][j] = {(F[i],; i=j ),
    (underset(i <= r <= j)(min){T[i][r-1] + T[r+1][j] + sum_(k=i)^j F[k]},;
    X[i-1] != Y[j-1]):}`;

    export const treeRecTimeComplex = `???`;
    export const treeDpTimeComplex = `N ^ 3`;
    export const treeRecSpaceComplex = `N + N`;
    export const treeDpSpaceComplex = `N + N + (N ^ 2)`;
