// Strings for english localization

export const english = {
    global: {
        dpLearn: 'DP learn',
        dynamic: 'Dynamic',
        programming: 'programming',
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
        recursion: 'Recursion',
        dp: 'DP',
        invalidArg: 'Input values validation error'
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
        stats: 'Statistics',
        calls: 'calls',
        theoreticValue: 'theoretical value',
        tableComparison: 'Table comparison',
        string: 'String'
    },
    demoGlobal:{
        assigning: 'Assigning ',
        cycle: 'Cycle',
        start: 'Start',
        array: 'Array',
        nextCycle: 'Next cycle',
        solution: 'Solution',
        start0: 'Assigning value 0 at position 0',
        candidates: 'Selection of candidates',
        best: 'Selection of the best',
    },
    menu: {
        coins: 'Minimum coins',
        substring: 'Longest substring',
        rod: 'Cutting a rod',
        editDistance: 'Edit Distance',
        tree: 'Optimal binary search tree'
    },
    dp: {
        whatIsDpTitle: 'Čo je to Dynamické programovanie',
        whatIsDpText: 'Dynamické programovanie (skrátene **DP**) je optimalizačná metóda, ktorá sa dá využiť pri riešení určitého typu optimalizačných úloh. Okrem toho, že je to optimalizačná metóda je DP aj programovacia technika - jeden z prístupov návrhu algoritmov. Táto webová aplikácia sa zaoberá návrhom DP algoritmov, ich grafickému znázorneniu a efektivite.',
        mainPrinciplesTitle: 'Hlavné princípy',
        mainPrinciplesText: 'Pri tvorbe DP algoritmu vychádzame väčšinou z jednoduchého rekurzívneho algoritmu. Aby malo zmysel vytvárať DP algoritmus, musí mať rekurzívne riešenie 2 vlastnosti: **optimálnu subštruktúru** a **opakovanie podproblémov**.',
        optSubstructTitle: 'Optimálna subštruktúra',
        optSubstructText: 'Pôvodný problém rozdelíme na podproblémy. Ak sa "skladaním" výsledkov jednotlivých podproblémov dá získať riešenie pôvodného problému, hovoríme, že riešenie má **optimálnu subštruktúru**.',
        repeatingTitle: 'Opakovanie podproblémov', 
        repeatingText: 'Druhou vlastnosťou, ktorú musí rekurzívne riešenie spĺňať je **opakovanie podproblémov**. Zistiť, či sa pri rekurzívnom riešení opakujú podproblémy sa dá napríklad nakreslením **stromu rekurzívnych volaní**:',
        prosAndConsTitle: 'Výhody a nevýhody',
        prosAndConsText: 'Hlavná výhoda DP spočíva v tom, že využíva opakovanie sa podproblémov a preto vedie často k oveľa efektívnejšiemu a rýchlejšiemu riešeniu. Výsledky menších podproblémov sú ukladané do dátovej štruktúry (poľa alebo tabuľky). Ak algoritmus narazí znovu na podproblém, ktorý už bol predtým vyriešený, použije sa uložený výsledok. Rekurzívny algoritmus pri jednoduchom vstupe výsledok skôr ako DP algoritmus. Pri zložitom vstupe je ale DP algoritmus výrazne efektívnejší. **Exponenciálna** časová zložitosť rekurzívneho algoritmu môže byť znížená na **polynomickú**. Nevýhodou je vyššia pamäťová náročnosť z dôvodu vytvárania dátovej štruktúry na ukladanie výsledkov podproblémov.'
    },
    rod: {
        prices: 'Prices',
        theory: {
            title: 'Cutting a rod - theory',
        },
        demo: {
            title: 'Cutting a rod - demo',
            brief: 'Provide comma separated prices of lengths (lengths are 1, 2, 3, ...).',
            evalPriceFor: 'Evaluating biggest price for length ',
            result: 'Highest obtainable value: ',
            usedLength: 'used length ',
            usedLengths: 'used lengths: ',
            length: 'Length',
            highestPrice: 'Highest price',
            usedLengthBig: 'Used length',
        },
        stats: {
            title: 'Cutting a rod - statistics',
            brief: 'Zadajte ceny jednotlivých dĺžok tyče (maximálne 30) oddelené čiarkami (dĺžky sú 1, 2, 3, ...).',
        }
    },
    coins: {
        coin: 'Coin',
        coins: 'Coins',
        value: 'Value',
        brief: {
            b1: 'There are coins **C = { C1, C2, ..., Cn }**. We want to find minimum number of coins that make a given value **V**, e.g.:',
            b2: 'Which coins we need to get given value?',
            b3: 'Both options are valid. 2. option needs only 2 coins, so this is our result. Minimum number of coins is **2**.',
        },
        theory: {
            title: 'Minimum number of coins that make a given value - theory',
            recursion1: 'Program will loop through **N** coin values. For each coin which value is less or equal given value **V**, we will call the same method recursively with value **V** substracted by current coin\'s value. So, time complexity of this solution is exponential. Space complexity is pretty obvious - **N + 1**, where **N** is the number of coin types and **1** to store given value **V**.',
            dynProg1: 'As can you see in recursion tree, some subproblems are recomputed again and again. Time complexity can be significantly minimize by storing partial results. So, let\'s try solve this problem by dynamic programming! In this example, we will need simple one-dimensional array.\n New value of the cell is incremented value of some previous cell. Distance between cell which is computed and cell which value is incremented depends on coins. If value is 4 for and there is coins 4, max distance is 4.'
        },
        demo: {
            title: 'Minimum number of coins that make a given value - demo',
            brief: 'Dynamic programming solution. Please provide value to make and coins separated by \',\' (comma)',
            isNeeded: 'Number of coins: ',
            evalCoinsFor: 'Evaluating coins needed for value ',
            usedCoin: 'used coin',
            usedCoins: 'used coins',
            value: 'Value',
            coinsNumber: 'Number of coins',
            usedCoinBig: 'Used coin',
        }
    },
    substring: {
        theory: {

        },
        demo: {
            title: 'Longest common substring - demo',
            brief: 'Dynamic programming solution - simple version with **M x N** table.',
            assignZero: 'assigning value 0',
            noMatch: 'no match. ',
            incrementPrevious: 'incrementing previous value',
            longestSubr: 'Longest common substring',
            length: 'length'
        },
    },
    editDistance: {
        theory: {

        },
        demo: {
            title: 'Edit distance - demo',
            brief: 'Provide 2 strings, which will be edit distance calculated for.',
            empty: 'Empty',
            stringXEmpty: 'String X is empty, insert all characters of stringY',
            stringYEmpty: 'String Y is empty, remove all characters of string X',
            charactersSame: 'Last characters are same, no operation needed',
            charactersDiff: 'Last characters are different, selection of candidates',
            opNumber: 'Number of operations',
            usedOps: 'used operations',
            insert: 'insert',
            remove: 'remove',
            replace: 'replace',
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
            nothingToDo: 'nothing to do.',
            nextCell: 'Moving to next cell',
            done: 'Hotovo.'
        }
    }
};
