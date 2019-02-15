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
        result: 'Výsledok'
    },
    components: {
        srcCode: 'Zdrojový kód',
        timeComplex:  'Časová zložitosť:      ',
        spaceComplex: 'Priestorová zložitosť: ',
        tryDemo: 'Vyskušaj demo!',
        speed: 'Rýchlosť',
        step: 'Krokovanie'
    },
    menu: {
        coins: 'Minimálny počet mincí',
        substring: 'Najdlhší spoločný podreťazec'
    },
    coins: {
        title: 'Minimálny počet mincí na vytvorenie danej hodnoty',
        coin: 'Minca',
        brief: {
            b1: 'Máme k dispozícii mince **C = { C1, C2, ..., Cn }**. Každá minca ma inú hodnotu a môžeme použiť ľubovolný počet mincí každej hodnoty. Chceme nájsť minimálny počet mincí, ktorých súčet hodnôt je **V**, napr.:',
            b2: 'Ktore mince budeme potrebovať?',
            b3: 'Obe možnosti dávajú správnu hodnotu, ale správny výsledok je 2. riešienie. Udáva minimálny počet mincí a to **2**.'
        },
        theory: {
            recursion1: 'Pre každú hodnotu mince, menšiu alebo rovnú **V**, sa bude rekurzívne volať rovnaká funkcia, pričom parameter **V** bude zmenšený o hodnotu mince. Časová zložitosť je preto exponenciálna. Priestorová zložitosť je zrejmá - **N + 1**, kde **N** je počet typov mincí a **1** potrebujeme na uloženie hodnoty **V**.',
            dynProg1: 'V strome rekurzie je vidieť, že niektoré podproblémy sú počítané znovu a znovu. Časovú zložitosť môžeme výrazne znížiť ukladaním výsledkov podvýsledkov a teda využijeme dynamické programovanie! V tomto príklade nám na ukladanie hodnôt postačí jedno-dimenzionálne pole.'
        },
        demo: {
            title: 'Minimálny počet mincí na vytvorenie danej hodnoty - demo',
            brief: 'Riešenie problému pomocou dynamického programovania. Zadajte hodnotu, ktorú treba vytvoriť a mince oddelené znakom \',\' (čiarka).',
            value: 'Hodnota',
            coins: 'Mince'
        }
    },
    substring: {
        theory: {

        },
        demo: {
            title: 'Najdlhší spoločný podreťazec - demo',
            brief: 'Riešenie problému pomocou dynamického programovania - jednoduchá verzia s tabuľkou **M x N**.'
        },
    }
};
