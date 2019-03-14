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
        drawCharts: 'Draw charts',
        recCalls: 'recursive calls',
        numberOfCalls: 'Number of recursive calls / iterations',
        microSeconds: 'Microseconds',
        nanoSeconds: 'Nanoseconds',
        skipping: 'Skipping...',
        recursion: 'Rekursion',
        dp: 'DP'
    },
    components: {
        srcCode: 'Source code',
        timeComplex: 'Time complexity ',
        spaceComplex: 'Space complexity',
        tryDemo: 'Try out demo!',
        speed: 'Speed',
        step: 'Step by step',
        theory: 'Theory',
        demo: 'Demo',
        charts: 'Charts',
        calls: 'calls',
    },
    menu: {
        coins: 'Minimum coins',
        substring: 'Longest substring',
        rod: 'Cutting a rod',
        editDistance: 'Edit Distance',
        tree: 'Optimal binary search tree'
    },
    coins: {
        title: 'Minimum number of coins that make a given value',
        coin: 'Coin',
        coins: 'Coins',
        value: 'Value',
        brief: {
            b1: 'There are coins **C = { C1, C2, ..., Cn }**. We want to find minimum number of coins that make a given value **V**, e.g.:',
            b2: 'Which coins we need to get given value?',
            b3: 'Both options are valid. 2. option needs only 2 coins, so this is our result. Minimum number of coins is **2**.',
        },
        theory: {
            recursion1: 'Program will loop through **N** coin values. For each coin which value is less or equal given value **V**, we will call the same method recursively with value **V** substracted by current coin\'s value. So, time complexity of this solution is exponential. Space complexity is pretty obvious - **N + 1**, where **N** is the number of coin types and **1** to store given value **V**.',
            dynProg1: 'As can you see in recursion tree, some subproblems are recomputed again and again. Time complexity can be significantly minimize by storing partial results. So, let\'s try solve this problem by dynamic programming! In this example, we will need simple one-dimensional array.\n New value of the cell is incremented value of some previous cell. Distance between cell which is computed and cell which value is incremented depends on coins. If value is 4 for and there is coins 4, max distance is 4.'
        },
        demo: {
            title: 'Minimum number of coins that make a given value - demo',
            brief: 'Dynamic programming solution. Please provide value to make and coins separated by \',\' (comma)',
        }
    },
    substring: {
        theory: {

        },
        demo: {
            title: 'Longest common substring - demo',
            brief: 'Dynamic programming solution - simple version with **M x N** table.',
        },
    },
    rod: {
        prices: 'Prices',
        theory: {

        },
        demo: {
            title: 'Cutting a rod - demo',
            brief: 'Provide comma separated prices of lengths (lengths are 1, 2, 3, ...).',
        },
    },
    editDistance: {
        theory: {

        },
        demo: {
            title: 'Edit distance - demo',
            brief: 'Provide 2 strings, which will be edit distance calculated for.',
        },
    },
    tree: {
        arrayOfK: 'Array of search keys',
        arrayOfF: 'Array of frequency counts',
        theory: {

        },
        demo: {
            title: 'Optimal binary search tree - demo',
            brief: 'Provide array of search keys and array of frequency counts (comma separated numbers in both cases).',
            initialState: 'Initial state',
            evalChainLength: 'Evaluating values for chain of length ',
            assignedIntMax: 'Assigned INT_MAX',
            selectedToSum: 'Selected cells to sum',
            assigning: 'assigning!',
            nothingToDo: 'nothing to do.',
            nextCell: 'Moving to next cell',
            done: 'Hotovo.'
        }
    }
};
