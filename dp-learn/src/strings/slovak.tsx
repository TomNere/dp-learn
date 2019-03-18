export const slovak = {
    global: {
        letsStart: 'Začnime',
        dynProg: 'Dynamické programovanie',
        recursiveSolution: 'Rekurzívne riešenie',
        recusionTree: 'Strom rekurzie',
        dynProgSolution: 'Dynamické programovanie',
        start: 'Štart',
        finish: 'Koniec',
        step: 'Ďalší krok',
        table: 'Tabuľka',
        result: 'Výsledok',
        drawCharts: 'Vykresliť grafy',
        numberOfCalls: 'Počet rekurzívnych volaní / cyklov',
        microSeconds: 'Microseconds',
        nanoSeconds: 'Nanoseconds',
        skipping: 'Preskakujem...',
        recursion: 'Rekurzia',
        dp: 'DP'
    },
    components: {
        srcCode: 'Zdrojový kód',
        timeComplex:  'Časová zložitosť     ',
        spaceComplex: 'Priestorová zložitosť',
        tryDemo: 'Vyskúšaj demo!',
        speed: 'Rýchlosť',
        step: 'Krokovanie',
        theory: 'Teória',
        demo: 'Demo',
        charts: 'Grafy',
        calls: 'volaní',
        theoreticValue: 'teoretická hodnota',
        tableComparison: 'Porovnanie v tabuľke',
        string: 'Reťazec'
    },
    menu: {
        coins: 'Minimálny počet mincí',
        substring: 'Najdlhší spoločný podreťazec',
        rod: 'Rezanie tyče',
        editDistance: 'Editačná vzdialenosť',
        tree: 'Optimalizovaný binárny vyhľadávací strom'
    },
    coins: {
        title: 'Minimálny počet mincí na vytvorenie danej hodnoty',
        coin: 'Minca',
        coins: 'Mince',
        value: 'Hodnota',
        brief: {
            b1: 'Máme k dispozícii mince **C = { C1, C2, ..., Cn }**. Každá minca ma inú hodnotu a môžeme použiť ľubovolný počet mincí každej hodnoty. Chceme nájsť minimálny počet mincí, ktorých súčet hodnôt je **V**, napr.:',
            b2: 'Ktore mince budeme potrebovať?',
            b3: 'Obe možnosti dávajú správnu hodnotu, ale správny výsledok je 2. riešienie. Udáva minimálny počet mincí a to **2**.'
        },
        theory: {
            recursion1: 'Pre každú hodnotu mince, menšiu alebo rovnú **V**, sa bude rekurzívne volať rovnaká funkcia, pričom parameter **V** bude zmenšený o hodnotu mince. Časová zložitosť je preto exponenciálna. Priestorová zložitosť je zrejmá - **N + 1**, kde **N** je počet typov mincí a **1** potrebujeme na uloženie hodnoty **V**.',
            dynProg1: 'V strome rekurzie je vidieť, že niektoré podproblémy sú počítané znovu a znovu. Časovú zložitosť môžeme výrazne znížiť ukladaním výsledkov podvýsledkov a teda využijeme dynamické programovanie! V tomto príklade nám na ukladanie hodnôt postačí jedno-dimenzionálne pole. Nová hodnota bunky je vždy inkrementovaná hodnota niektorej z predchádzajúcich buniek. Vzialenosť medzi počítanou bunkou, a bunkou z ktorej berie hodnotu závisí od toho, aké máme mince. Ak máme dostať hodnotu 4 a máme aj mincu s hodnotou 4, maximálna vzdialenosť, na ktorú sa vypočítava nová hodnota je 4.'
        },
        demo: {
            title: 'Minimálny počet mincí na vytvorenie danej hodnoty - demo',
            brief: 'Riešenie problému pomocou dynamického programovania. Zadajte hodnotu, ktorú treba vytvoriť a mince oddelené znakom \',\' (čiarka).',
        }
    },
    substring: {
        theory: {

        },
        demo: {
            title: 'Najdlhší spoločný podreťazec - demo',
            brief: 'Riešenie problému pomocou dynamického programovania - jednoduchá verzia s tabuľkou **M x N**.'
        },
    },
    rod: {
        prices: 'Ceny',
        theory: {

        },
        demo: {
            title: 'Rezanie tyče - demo',
            brief: 'Zadajte ceny jednotlivých dĺžok tyče oddelené čiarkami (dĺžky sú 1, 2, 3, ...).',
        },
    },
    editDistance: {
        theory: {

        },
        demo: {
            title: 'Editačná vzdialenosť - demo',
            brief: 'Zadajte 2 reťazce, pre ktoré bude následne vypočítaná editačná vzdialenosť.',
        },
    },
    tree: {
        arrayOfK: 'Pole vyhľadávacích kľúčov',
        arrayOfF: 'Pole počtu vyhľadaní kľučov',
        theory: {

        },
        demo: {
            title: 'Optimalizovaný binárny vyhľadávací strom - demo',
            brief: 'Zadajte pole vyhľadávacích kľúčov a pole počtu vyhľadávaní jednotlivých kľúčov (v oboch prípadoch ide o čísla oddelené čiarkami).',
            initialState: 'Počiatočný stav',
            evalChainLength: 'Výpočet hodnôt pre reťaz dlžky ',
            assignedIntMax: 'Priradené INT_MAX',
            selectedToSum: 'Vybrané bunky pre sčítanie',
            assigning: 'priradzujem!',
            nothingToDo: 'žiadna akcia.',
            nextCell: 'Výber ďalšej bunky',
            done: 'Hotovo.'
        }
    }
};
