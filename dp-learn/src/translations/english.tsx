export const english = {
    global: {
        letsStart: "Let's start",
        dynProg: 'Dynamic programming',
        recursiveSolution: 'Solution using recursion',
        recusionTree: 'Recursion tree',
        dynProgSolution: 'Dynamic programming solution',
        start: 'Start',
        finish: 'Finish',
        step: 'Next step',
        table: 'Table',
        result: 'Result',
        drawCharts: 'Draw charts'
    },
    components: {
        srcCode: 'Source code',
        timeComplex:  'Time complexity:  ',
        spaceComplex: 'Space complexity: ',
        tryDemo: 'Try out demo!',
        speed: 'Speed',
        step: 'Step by step',
        theory: 'Theory',
        demo: 'Demo',
        charts: 'Charts'
    },
    menu: {
        coins: 'Minimum coins',
        substring: 'Longest substring'
    },
    coins: {
        title: 'Minimum number of coins that make a given value',
        coin: 'Coin',
        brief: {
            b1: 'There are coins **C = { C1, C2, ..., Cn }**. We want to find minimum number of coins that make a given value **V**, e.g.:',
            b2: 'Which coins we need to get given value?',
            b3: 'Both options are valid. 2. option needs only 2 coins, so this is our result. Minimum number of coins is **2**.',
        },
        theory: {
            recursion1: 'Program will loop through **N** coin values. For each coin which value is less or equal given value **V**, we will call the same method recursively with value **V** substracted by current coin\'s value. So, time complexity of this solution is exponential. Space complexity is pretty obvious - **N + 1**, where **N** is the number of coin types and **1** to store given value **V**.',
            dynProg1: 'As can you see in recursion tree, some subproblems are recomputed again and again. Time complexity can be significantly minimize by storing partial results. So, let\'s try solve this problem by dynamic programming! In this example, we will need simple one-dimensional array.'
        },
        demo: {
            title: 'Minimum number of coins that make a given value - demo',
            brief: 'Dynamic programming solution. Please provide value to make and coins separated by \',\' (comma)',
            value: 'Value',
            coins: 'Coins'
        }
    },
    substring: {
        theory: {

        },
        demo: {
            title: 'Longest common substring - demo',
            brief: 'Dynamic programming solution - simple version with **M x N** table.',
        },
    }
};
