// Strings for slovak localization

export const slovak = {
    global: {
        dpLearn: 'DP learn',
        dynamic: 'Dynamické',
        programming: 'programovanie',
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
        dp: 'DP',
        invalidArg: 'Chyba pri validácii vstupných hodnôt'
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
    demoGlobal:{
        assigning: 'Priradzujem',
        cycle: 'Cyklus',
        start: 'Štart',
        array: 'Pole',
        nextCycle: 'Ďalší cyklus',
        solution: 'Riešenie',
        start0: 'Priradzujem hodnotu 0 na pozíciu 0',
    },
    dp: {
        whatIsDpTitle: 'Čo je to dynamické programovanie',
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
    substring: {
        theory: {

        },
        demo: {
            title: 'Najdlhší spoločný podreťazec - demo',
            brief: 'Riešenie problému pomocou dynamického programovania - jednoduchá verzia s tabuľkou **M x N**.',
            assignZero: 'priradzujem hodnotu 0',
            noMatch: 'žiadna zhoda. ',
            incrementPrevious: 'inkrementujem predchádzajúcu hodnotu',
            longestSubr: 'Najdlhší spoločný podreťazec',
            length: 'dĺžka'
        },
    },
    rod: {
        prices: 'Ceny',
        theory: {
            title: 'Rezanie tyče - teória',
        },
        demo: {
            title: 'Rezanie tyče - demo',
            brief: 'Zadajte ceny jednotlivých dĺžok tyče (maximálne 15) oddelené čiarkami (dĺžky sú 1, 2, 3, ...). Stĺpce tabuľky symbolizujú dĺžky tyče. V prvom riadku budú na konci najvyššie dosiahnuteľné ceny pre jednotlivé dĺžky. V druhom riadku budú pomocné hodnoty pre vytvorenie kompletného riešenia. Hodnota bunky je v tomto prípade dĺžka najdlhšej použitej tyče pre danú dĺžku.',
            evalPriceFor: 'Výpočet najvyššej ceny pre dĺžku ',
            candidates: 'Výber kandidátov',
            best: 'Výber najlepšieho',
            result: 'Najvyššia dosiahnuteľná cena: ',
            usedLength: 'použitá dĺžka ',
            usedLengths: 'použité dĺžky: ',
            length: 'Dĺžka',
            highestPrice: 'Najvyššia cena',
            usedLengthBig: 'Použitá dĺžka',
        },
    },
    coins: {
        coin: 'Minca',
        coins: 'Mince',
        value: 'Hodnota',
        brief: {
            b1: 'Máme k dispozícii mince **C = { C1, C2, ..., Cn }**. Každá minca ma inú hodnotu a môžeme použiť ľubovolný počet mincí každej hodnoty. Chceme nájsť minimálny počet mincí, ktorých súčet hodnôt je **V**, napr.:',
            b2: 'Ktore mince budeme potrebovať?',
            b3: 'Obe možnosti dávajú správnu hodnotu, ale správny výsledok je 2. riešienie. Udáva minimálny počet mincí a to **2**.'
        },
        theory: {
            title: 'Minimálny počet mincí na vytvorenie danej hodnoty - teória',
            recursion1: 'Pre každú hodnotu mince, menšiu alebo rovnú **V**, sa bude rekurzívne volať rovnaká funkcia, pričom parameter **V** bude zmenšený o hodnotu mince. Časová zložitosť je preto exponenciálna. Priestorová zložitosť je zrejmá - **N + 1**, kde **N** je počet typov mincí a **1** potrebujeme na uloženie hodnoty **V**.',
            dynProg1: 'V strome rekurzie je vidieť, že niektoré podproblémy sú počítané znovu a znovu. Časovú zložitosť môžeme výrazne znížiť ukladaním výsledkov podvýsledkov a teda využijeme dynamické programovanie! V tomto príklade nám na ukladanie hodnôt postačí jedno-dimenzionálne pole. Nová hodnota bunky je vždy inkrementovaná hodnota niektorej z predchádzajúcich buniek. Vzialenosť medzi počítanou bunkou, a bunkou z ktorej berie hodnotu závisí od toho, aké máme mince. Ak máme dostať hodnotu 4 a máme aj mincu s hodnotou 4, maximálna vzdialenosť, na ktorú sa vypočítava nová hodnota je 4.'
        },
        demo: {
            title: 'Minimálny počet mincí na vytvorenie danej hodnoty - demo',
            brief: 'Zadajte hodnotu (od 1 po 20), ktorú treba vytvoriť súčtom hodnôt mincí a hodnoty mincí oddelené čiarkami (maximálny počet je 5). Stĺpce tabuľky symbolizujú jednotlivé hodnoty, pre ktoré treba vypočítať minimálny počet mincí. V prvom riadku budú na konci minimálne počty mincí pre jednotlivé hodnoty. V druhom riadku budú pomocné hodnoty pre vytvorenie kompletného riešenia. Hodnota bunky je v tomto prípade hodnota najväčšej použitej mince.',
            isNeeded: 'Potrebný počet mincí',
            evalCoinsFor: 'Výpočet mincí pre vytvorenie hodnoty ',
            usedCoin: 'použitá minca ',
            usedCoins: 'použité mince',
            value: 'Hodnota',
            coinsNumber: 'Počet mincí',
            usedCoinBig: 'Použitá minca',
        }
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
            nothingToDo: 'žiadna akcia.',
            nextCell: 'Výber ďalšej bunky',
            done: 'Hotovo.'
        }
    }
};
