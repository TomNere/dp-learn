// Strings for english localization

export const english = {
    global: {
        intro: 'Introduction',
        dpLearn: 'DP learn',
        dynProg: 'Dynamic programming',
        recursiveSolution: 'Recursive algorithm',
        recusionTree: 'Recursive calls tree',
        dynProgSolution: 'DP algorithm',
        start: 'Start',
        finish: 'Finish',
        step: 'Next step',
        table: 'Table',
        tables: 'Tables',
        evaluateStats: 'Evaluate statistics',
        numberOfCalls: 'calls/iterations',
        skipping: 'Skipping...',
        recursion: 'Recursion',
        dp: 'DP',
        invalidArg: 'Invalid input values!',
        srcCode: 'Source code',
        timeComplex: 'Time complexity',
        spaceComplex: 'Space complexity',
        speed: 'Speed',
        stepping: 'Step by step',
        theory: 'Theory',
        demo: 'Demo',
        stats: 'Statistics',
        theoreticValue: 'theoretical value',
        tableComparison: 'Table comparison',
        string: 'String',
        conclusion: 'Conclusion',
        done: 'Done.',
        similarProblems: 'Similar optimalization problems',
        partOfApp: 'is a part of the app'
    },
    menu: {
        coins: 'Minimum number of coins that make a given value',
        substring: 'Longest common substring',
        rod: 'Rod cutting',
        editDistance: 'Edit Distance',
        tree: 'Optimal binary search tree'
    },
    theoryGlobal: {
        eg: 'For example:',
    },
    demoGlobal: {
        assigning: 'Assigning',
        cycle: 'Loop',
        start: 'Start',
        array: 'Array',
        nextCycle: 'Next loop',
        solution: 'Solution',
        start0: 'Assigning value 0 to position 0',
        candidates: 'Selection of candidates',
        best: 'Selection of the best',
    },
    intro: {
        dpLearn: "Web application **DP learn** demonstrates principles and advantages of **Dynamic programming** **\"bottom-up\"(tabulation)** method on several optimalization problems. Each problem has its own *theory*, *demo* and *statistics* page.",
        fitVutbr: 'FIT BUT',
        fitVutbrHref: 'https://www.fit.vutbr.cz/',
        whatIsDpTitle: 'What is dynamic programming?',
        whatIsDpText1: 'Dynamic programming (**DP**) is a mathematical optimization method, which can be used to optimize inefficient recursive solution of a certain type of optimalization problems. Dynamic programming is also a computer programming method. Following are the two main properties of a problem that suggest that the given problem can be solved:',
        optSubstruct: '**optimal substructure** - results of subproblems can be used to obtain optimal solution of the given problem',
        repeating: '**overlapping subproblems** - function is recursively called again and again with the same parameters',
        whatIsDpText2: "In DP algorithm, results of subproblems are stored and that's why DP algorithm is much more efficient and faster than a naive recursive algorithm.",
        partsTitle: 'Demonstration of principles and advantages on optimization problems',
        partsText: 'Application contains 5 optimization problems, which can be solved by dynamic programming. Each problem has these 3 tabs',
        theoryTitle: 'Theory',
        theoryText: "This tab provides problem definition with concrete example followed by recursive and DP algorithms. After algorithm explanation is given its time and space complexity. Space complexity of DP algorithm doesn't contain helping structures for full solution building. Under recursive algorithm is listed the recursive calls tree and under DP algorithm the tables with values selection. Source codes in C language contains one function solving the problem. Main function and helpers are easy to add. At the end, examples of similar optimization problems (table building is similar) are stated.",
        demoTitle: 'Demo',
        demoText: 'After the button is clicked, DP algorithm starts. You can choose speed or select "step by step". After the table is filled, value of optimal solution and also full solution shows up (in *Optimal binary search tree* only solution value is given). Also the formula describing values evaluation is given.',
        statsTitle: 'Statistics',
        statsText: 'After the button is clicked, charts and table comparing complexity of recursive and DP algorithm shows up. U časovej zložitosti je uvedená maximálna teoretická hodnota podľa funkcie zložitosti a skutočný počet rekurzívnych volaní alebo behov cykla pri DP algoritme. Priestorová zložitosť je vypočítaná z funkcie zložitosti. Okrem štatistík pre zadaný vstup aplikácia obsahuje niekoľko "vzorových" vstupov. Pod štatistikami sa nachádza ich slovné zhodnotenie.',
        references: 'References',
        geeksTitle: 'GeeksforGeeks',
        geeksHref: 'https://www.geeksforgeeks.org/',
        geeksText: 'theory and source codes for optimization problem are inspired by articles on this portal',
        algorithmsTitle: 'Introduction to Algorithms',
        algorithmsHref: 'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844',
        algorithmsText: 'dynamic programming and some optimization problems theory',
        writeUs: 'Write Us',
        mail: 'dplearnwebapp@gmail.com'
    },
    coins: {
        coin: 'Coin',
        coins: 'Coins',
        value: 'Value',
        valueLower: 'value',
        theory: {
            title: 'Minimum number of coins that make a given value - theory',
            brief: {
                b1: 'We have infinite supply of coin with certain values **C = { c1, c2, ..., cN }**. **N** is number of coin values. We want to find minimum number of coins that make a given value **V**. Which coins we will use?',
                input1: 'C = { 2, 3, 5 }',
                input2: 'V = 7',
                b2: 'Which coins we need to get given value?',
                output1: '7 = 2 + 2 + 3',
                output2: '7 = 2 + 5',
                b3: 'Both options are valid. 2. option needs only 2 coins, so this is the optimal result. Minimum number of coins is **2**.',
            },
            recursion:{
                brief: "If given value is **0**, the result is also **0**. Otherwise, the program will loop through **N** coin values. For each coin which value is less or equal given value **V**, will be called the same function recursively with value **V** substracted by current coin's value. Number of used coins is incremented.",
                recTime: '**Time complexity** is growing exponentially with given value **V**.',
                recSpace: '**Space complexity** is pretty obvious - **N + 1**, where **N** is the number of coins and **1** is needed to store given value **V**.',
            },
            dp:{
                brief: 'Table is 1-dimensional array in this case. All values in array of size **V + 1** are set to **INT_MAX** at start excepting **0** at **0.** index. New value of the table cell is incremented value of some of the previous cells. Distance between cell which value is computed and cell which value is used depends on coins. If value is **4** for and there is coin **4**, max distance is **4**. Value of the last cell is the optimal solution at the end. For full solution building we need additional array.',
                dpTime: 'Due to nested loop in algorithm, **time complexity** is polynomic.',
                dpSpace: 'Additional space compared to recursive algorithm is needed to storing values in table.',
                input11: 'C = { 1, 2, 5 }',
                input12: 'V = 4',
                input21: 'C = { 1, 2, 4 }',
                input22: 'V = 4',
            },
            rod: 'Rod cutting',
            knapsackTitle: 'Knapsack problem',
            knapsackHref: 'https://www.gatevidyalay.com/0-1-knapsack-problem-using-dynamic-programming-approach/',
        },
        demo: {
            title: 'Minimum number of coins that make a given value - demo',
            brief: 'Enter value to make (from 0 to 20) and comma separated coins (max. 15). Table columns symbolize coin values. First row will contain solutions for all values at the end. Second row is full solution building helper. Value of a cell in second row is value of highest used coin.',
            isNeeded: 'Number of coins',
            evalCoinsFor: 'Evaluating coins needed for value ',
            usedCoin: 'used coin',
            usedCoins: 'used coins',
            coinsNumber: 'Number of coins',
            usedCoinBig: 'Used coin',
        },
        stats: {
            title: 'Minimum number of coins that make a given value - statistics',
            brief: 'Enter value to make (from 0 to 20) and comma separated coins (max. 15).',
            conclusion: "There could be noticeable difference between theoretical and real number of recursive calls. It's because real number depends on concrete coin values. Teoretical equals real value when **C: { 1,2 }** and **V = 2**. Number of calls or iterations in DP algorithm is growing when useless coins are given.",
        }
    },
    rod: {
        prices: 'Prices',
        theory: {
            title: 'Rod cutting - theory',
            brief: {
                b1: 'We have rod of length **L**. Determine the maximum value obtainable by cutting up the rod and selling the pieces. Prices of pieces of lengths 1, 2 etc. are **P = { p1, p2, p3, ..., pL}**.',
                input: 'P = { 1, 3, 5 }',
                b2: 'How can we cut up the rod?',
                output1: '3 = 1 + 1 + 1 => prices: 1 + 1 + 1 = 3',
                output2: '3 = 1 + 2 => prices: 1 + 3 = 4',
                output3: '3 = 3 => prices 5 = 5',
                b3: 'The best solution in this case is no cutting at all! Rod of length 3 has maximum obtainable price.',
            },
            recursion: {
                brief: 'For length **0** the price is **0**. Otherwise, we must evaluate best prices for all lengths. In recursive algorithm the prices for all lengths will be evaluated repeatedly.',
                recTime: '**Time complexity** is growing exponentially with rod length (number of given prices).',
                recSpace: '**Space complexity** is equal to number of given prices.',
                input: 'P = { 1, 3, 5 }'
            },
            dp: {
                brief: 'Best obtainable prices for all lengths will be stored in one-dimensional array (so the table is array). New value of the table cell can be evaluated from all of the previous cells. We need to get sum of the maximum prices of lengths to get maximum price for next length. For full solution building we need additional array.',
                dpTime: 'Due to nested loop in algorithm, **time complexity** is polynomic.',
                dpSpace: 'Additional space compared to recursive algorithm is needed to storing values in table.',
                outerCycle: 'Outer loop',
                input: 'P = { 1, 5, 6, 6, 9 }',
                i3: 'i = 3',
                i4: 'i = 4'
            },
            coins: 'Minimum number of coins that make a given value'
        },
        demo: {
            title: 'Rod cutting - demo',
            brief: 'Enter max. 15 comma separated prices of lengths (lengths are 1, 2, 3, ...). Table columns symbolize rod lengths. First row will contain maximum obtainable prices for all lengths at the end. Second row is full solution building helper. Value of a cell in second row is maximum used length.',
            evalPriceFor: 'Evaluating maximum obtainable price for length ',
            result: 'Maximum obtainable value: ',
            usedLength: 'used length ',
            usedLengths: 'used lengths: ',
            length: 'Length',
            highestPrice: 'Highest price',
            usedLengthBig: 'Used length',
        },
        stats: {
            title: 'Rod cutting - statistics',
            brief: 'Enter max. 20 comma separated prices of lengths (lengths are 1, 2, 3, ...).',
            conclusion: "There is no condition for recursive call, so theoretical and real number of recursive calls will be always the same. The actual prices doesn't matter. Number of calls depends only on number of given prices. DP algorithm is always faster than recursive algorithm. There is a condition in inner loop, so the real and theoretical number of iterations is different.",
        }
    },
    substring: {
        theory: {
            title: 'Longest common substring - theory',
            brief: {
                b1: 'We have two strings, **X** with length **L1** and **Y** with length **L2**. What is the longest common substring of this strings?',
                input1: "X = 'Unicasting'",
                input2: "Y = 'unitTesting'",
                b2: 'What is the longest common substring?',
                strX: "X = 'U|ni|ca|s||**ting**|'",
                strY: "Y = 'u|ni|tTe|s||**ting**|'",
                b3: 'As you can see, the strings have several common substrings. The longest is **ting** with length **4**.',
                b4:'A simple solution is to take all substrings from **X** and for every substring check if it is a substring in **Y**. There will be **O(L1 ^ 2)** substrings in **X**. Using the **Knuth-Morris-Pratt** algorithm, time complexity of this solution would be **O((L1 ^ 2) * L2)**.',
            },
            recursion:{
                brief: 'If **L1** or **L2** is **0**, result is also **0** (no substring). If algorithm find equal characters, result is incremented and algorithm continues with next characters. If characters are different, function is called recursively for next character in **X** and next character in **Y** and maximum result is taken. This algorithm is simple but very inefficient.',
                recTime: '**Time complexity** is growing exponentially with lengths of strings.',
                recSpace: '**Space complexity** is sum of lengths.',
                input1: "X = 'hw'",
                input2: "Y = 'sw'",
            },
            dp: {
                brief: "Algorithm is searching for longest common suffix for all substrings of both strings and stores these lengths in a table. If characters in col and row are different, **0** is stored to the cell. If characters are equal, suffix is incremented (previous value on diagonal) or **1** is assigned if it's a first character in string. We need variables to store position of longest suffix to build full solution.",
                dpTime: '**Time complexity** is polynomic - filling the table **L1 * L2**.',
                dpSpace: '**Space complexity** is sum of lengths + table size.',
                input1: "X = 'dog'",
                input2: "Y = 'frog'",
                zero: 'Different characters - assigning value 0',
                increment: 'Equal characters - suffix is incremented',
                one: 'Equal characters, assigning value 1',
                input3: "Y = 'dig'",
            },
            longestPalindromTitle: 'Longest palindromic substring',
            longestPalindromHref: 'https://www.geeksforgeeks.org/longest-palindrome-substring-set-1/',
            longestIncSubseqTitle: 'Longest increasing subsequence',
            longestIncSubseqHref: 'https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/',

        },
        demo: {
            title: 'Longest common substring - demo',
            brief: 'Enter 2 strings - **X** a **Y** with max. length 20 characters. Table columns symbolize characters of string **X**. Table rows symbolize characters of string **Y**. Value in cell is length of suffix.',
            assignZero: 'assigning value 0',
            noMatch: 'no match. ',
            incrementPrevious: 'incrementing previous value',
            longestSubr: 'Longest common substring',
            length: 'length'
        },
        stats: {
            title: 'Longest common substring - statistics',
            brief: 'Enter 2 strings - **X** a **Y** with max. length 15 characters.',
            conclusion: 'Theoretical and real number of recursive calls is quite different. Number of recursive calls is pretty big even if strings are the same. Recursive algorithm is very inefficient. Theoretical and real number of iteration is the same because all characters in strings are compared.',
        }
    },
    editDistance: {
        theory: {
            title: 'Edit distance - theory',
            brief: {
                b1: 'We have two strings, **X** with length **L1** and **Y** with length **L2**. There are 3 operations: **insert**, **remove** and **replace**. We must convert **X** to **Y** using the minimum number of operations.',
                input1: "X = 'AdRemovee'",
                input2: "Y = 'AddRemove'",
                b2: 'Which operations we need to perform on string **X**?',
                strX: "X = 'Ad|**+**|Remove|**-**|e'",
                strY: "Y = 'AddRemove'",
                b3: 'We need to **insert** character d and **remove** character e',
            },
            recursion: {
                brief1: "Recursive algorithm compares string's characters from right to left. If last character in **X** is equal to last character in **Y**, characters are ignored and algorithm continues with lengths **L1 - 1** and **L2 - 2**. If characters are different (or string is empty), there are 3 recursive calls that symbolize 3 operations:",
                op1: '**Insert** - continue recursively for lengths **L1 a L2 - 1**.',
                op2: '**Remove** - continue recursively for lengths **L1 - 1 a L2**.',
                op3: '**Replace** - continue recursively for lengths **L1 - 1 a L2 - 1**.',
                brief2: 'Operation which lead to optimal solution is selected.',
                recTime: '**Time complexity** is growing exponentially with lengths of strings. 3 operations - base is **3**.',
                recSpace: '**Space complexity** is sum of lengths.',
                input1: "X = 'a'",
                input2: "Y = 'bbcd'",
            },
            dp: {
                brief1: "Recursive algorithm compares string's from left to right. It starts with strings of length 0 and continues with all combinations of string's lengths. If string **X** is empty, we need to insert all characters from string **Y** - value in cell is column number. If string **Y** is empty, we need to remove all characters from string **X** - value in cell is row number. If characters are equal, previous value from diagonal is taken - no operation needed. If characters are different, minimum value from following cells is incremented:",
                dpOp1: 'previous column - **insert**',
                dpOp2: 'previous row - **remove**',
                dpOp3: 'previous value from diagonal - **replace**',
                brief2: 'To build full solution we need perform special backtrace.',
                dpTime: '**Time complexity** is polynomic - filling the table **L1 + 1** * **L2 + 2**.',
                dpSpace: '**Space complexity** is sum of lengths + table size.',
                input1: "X = 'AdRemovee'",
                input2: "Y = 'AddRemove'",
                match: 'Characters are equal - previous value from diagonal is taken',
                noMatch: 'Characters are different - selecting minimum value',
            },
            longestPalindromTitle: 'Longest palindromic subsequence',
            longestPalindromHref: 'https://www.geeksforgeeks.org/longest-palindromic-subsequence-dp-12/',
            longestCommonSubseqTitle: 'Longest common subsequence',
            longestCommonSubseqHref: 'https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/',
        },
        demo: {
            title: 'Edit distance - demo',
            brief: 'Enter 2 strings - **X** a **Y** with max. length 20 characters. Table columns symbolize characters of string **X**. Table rows symbolize characters of string **Y**. First column and row symbolize empty strings. Value in cell is number of operations.',
            empty: 'Empty',
            stringXEmpty: 'String X is empty, insert all characters of string Y',
            stringYEmpty: 'String Y is empty, remove all characters of string X',
            charactersSame: 'Last characters are equal, no operation needed',
            charactersDiff: 'Last characters are different, selection of candidates',
            opNumber: 'Number of operations',
            usedOps: 'used operations',
            insert: 'insert',
            remove: 'remove',
            replace: 'replace',
        },
        stats: {
            title: 'Edit distance - statistics',
            brief: 'Enter 2 strings - **X** a **Y** with max. length 15 characters.',
            conclusion: 'If very short or empty strings are given, recursive algorithm is faster than DP algorithm, but his time complexity dramatically grows with lengths of strings. Sum of lengths in last example is 20 and real number of recursive calls has **8 digits**. This number is huge in comparison to number of iteration (**121**) in DP algorithm. Real number of iterations equals to theoretical value because all table cells are filled in.',
        }
    },
    tree: {
        arrayOfK: 'Array of search keys',
        arrayOfF: 'Array of frequency counts',
        tree: 'Tree',
        theory: {
            title: 'Optimal binary search tree - theory',
            brief: {
                b1: 'We have a **sorted** array of search keys **K = { k1, k2, k3, ..., kN }** (**N** is number of keys) and an array of frequency counts **F = { f1, f2, f3, ..., fN }**. We must build the optimal binary search tree which contains all keys.',
                b2: 'What is cost of the tree a what is the actual tree?',
                b3: 'Total cost of the first tree is **44**. Total cost of the second tree is **36**. So, second tree is optimal.',
            },
            recursion: {
                brief: 'Recursive algorithm will try all keys as root of tree, root of subtree etc. Total cost will be evaluated. If every subtree is optimal, the tree is optimal too.',
                recTime: '**Time complexity** is growing exponentially with number of search keys.',
                recSpace: "**Space complexity** is number of keys. Keys doesn't matter when array is sorted.",
                input: 'F = { 1, 2, 3 }',
            },
            dp: {
                brief1: 'Cells on main diagonal contains values from **F** array. Value in cell above main diagonal is optimal cost of tree from key in row to key in column. Cells bellow diagonal are empty. Value of the cells is evaluated from cells creating the tree. If new value is lower, cell is updated. Cost of created optimal tree is in the last cell of first row. Following formula explains cell value evaluation:',
                brief2: "Only costs are stored in table. If we want to build the tree, we need to store also used keys. Key is the root of subtree. Root of the whole tree is stored in the same cell as total cost of the tree. Then, we take next key with lower value from array. If the array contains only one key with lower value, we can use this key as root of left subtree and continue with right subtree. Otherwise, we check, which from two keys was used as a root of left subtree (used key is stored in the table). After whole left subtree is built, we must build right subtree the same way.",
                dpTime: 'In **time complexity**, we must consider 2 nested loops.',
                dpSpace: "**Time complexity** is number of keys + table size. Values of keys doesn't matter when building the actual tree isn't needed."
            },
            keysExample: 'K = { 1, 2, 3, 4 }',
            freqsExample: 'F = { 2, 4, 6, 8 }',
            keysExample2: 'K = { 1, 2, 3, 4, 8, 9 }',
            freqsExample2: 'F = { 2, 4, 6, 8, 9, 10 }',
            matrixMultTitle: 'Matrix chain multiplication',
            matrixMultHref: 'http://www.personal.kent.edu/~rmuhamma/Algorithms/MyAlgorithms/Dynamic/chainMatrixMult.htm',
        },
        demo: {
            title: 'Optimal binary search tree - demo',
            brief: "Enter a **sorted** array of search keys (max 15.) and an array of frequency counts. Value in cell is optimal cost of tree from key in row to key in column. Value in parenthesis is index in array of key - value symbolize which key was used as root of subtree. It's possible to build whole tree by using this values.",
            initialState: 'Initial state',
            evalChainLength: 'Evaluating values for chain length ',
            assignedIntMax: 'Assigned INT_MAX',
            selectedToSum: 'Selected cells to sum',
            nothingToDo: 'nothing to do.',
            nextCell: 'Selection of the next value',
            tree: 'Search tree',
            key: 'Key',
            cost: 'Total cost of the optimal tree',
            keysExample: '1,2,3,4',
            freqsExample: '2,4,6,8',
        },
        stats: {
            title: 'Optimal binary search tree - statistics',
            brief: "Enter an array of frequency counts. An array of keys isn't needed.",
            conclusion: "Even for little array of keys, DP algorithm is faster than recursive algorithm. Number of calls and also number of iteration depend only on keys count, not the actual keys. It's because there's no key containing condition in algorithms."
        }
    }
};
