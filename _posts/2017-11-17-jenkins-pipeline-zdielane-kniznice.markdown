---
title: "Zdieľané knižnice v Jenkins pipeline"
layout: post
date: 2017-11-30 10:00
image: /assets/images/jenkins-zdielane-kniznice.png
headerImage: false
tag: [jenkins, pipeline, kniznice]
star: false
category: blog
author: arzzen
commentIssueId: 8
description: Jenkins pipeline - zdieľané knižnice
---

## Zdieľané knižnice v Jenkins pipeline


Často je užitočné zdieľať časti pipeline skriptov medzi rôznymi 
projektmi, aby sa znížil počet duplikácií skriptov a zostal kód [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
Zdieľané knižnice poskytujú riešenia pre množstvo situácií, ktoré môžu byť náročné.

Jenkins pipeline má podporu pre vytváranie zdieľaných knižníc, ktoré môžu byť definované 
vo verziovacích systémoch (najčastejšie git). Tieto knižnice môžu byť znova načítané do existujúcich pipeline.

Zdieľaná knižnica je definovaná názvom, spôsobom načítania zdrojového kódu z [SCM](https://en.wikipedia.org/wiki/Service_Control_Manager), 
a prípadne môže mať aj definovanú verziu. Názov by mal byť krátky identifikátor, ten sa bude používať v skriptoch.

#### Výhody používania zdieľaných knižníc:

- odstraňovanie komplexného alebo obmedzeného kódu,
- poskytnutie prostriedkov na vykonanie skriptovaného kódu z volaní v deklaratívnych pipeline (kde normálne nie je povolený skriptovaný kód),
- jednodušenie používanie skriptu, ktorý sa líši iba parametrami volania.

#### Úložisko zdieľaných knižníc:

Zdieľaná knižnica pre Jenkins sa skladá z úložiska zdrojového kódu so štruktúrou, ako je táto:

```
(root)
+- src                     # adresár, ktorý obsahuje zdrojové súbory
|   +- org                 # podadresáre sú voliteľné 
|       +- foo
|           +- Bar.groovy  # zdrojový súbor/y (Groovy trieda org.foo.Bar)
+- vars
|   +- foo.groovy          # pre globálu premennú s názvom 'foo' 
|   +- foo.txt             # súbor nápovedy/dokumentácie k premennej 'foo'
+- resources               # pomocné súbory (iba pre externé knižnice)
|   +- org
|       +- foo
|           +- bar.json    # pomocný súbor dát pre triedu 'org.foo.Bar'
```

Každý z adresárov najvyššej úrovne má svoj vlastný účel.

`src` adresár používa štruktúru podobnú štandardnému rozloženiu Java src. 
Táto oblasť sa pridáva do trasy cesty, keď sa vykoná pipeline, ktorá zahŕňa túto zdieľanú knižnicu.

`vars` adresár obsahuje globálne premenné, ktoré by mali byť prístupné z pipeline skriptov. 
Súbor/y premennej by mali mať koncovku .groovy a jej názov by mal zodpovedať "camelCase" konvencii. 
Môže byť zahrnutý zodpovedajúci súbor .txt, ktorý tu definuje dokumentáciu pre každú premennú. 
Ak sa zistí, bude to v rámci dokumentácie v aplikácii Jenkins vytiahnuté. Pojem globálnej premennej nemusí veľmi 
dobre korešpondovať s globálnou funkciou, ale môžete ju zamýšľat ako funkciu, ktorá je globálnou hodnotou, 
ktorá môže byť zavedená a použitá v pipeline.

`resources` adresár môže obsahovať rôzne súbory, ktoré sa načítajú pomocou kroku libraryResource. 
Premýšľajte o tom ako o mieste na ukladanie podporných dátových súborov, ako sú napríklad súbory json.

## Používanie knižnice

Zdieľané knižnice umožňujú, aby ostatné pipeline-y mohly používať triedy alebo globálne premenné. 
Ak chcete využívať prístup k zdieľaným knižniciam, musíte použiť kľúčové slovo `@Library` a špecifikovať názov knižnice, 
ktorý použijete v Jenkinsfile alebo v inline pipeline skripte.
Názov knižnice sa zadáva v nastavení jenkins-u v sekcii "Global Pipeline Libraries", názov sa v pipeline skriptoch používa ako argument anotácie `@Library`.

**Pridanie zdieľanej knižnice v konfigurácii Jenkins-u:**

<img src="/assets/images/jenkins_shared_configuration.png" alt="shared libraries" />

**Použitie anotácie `@Library` v pipeline:**

```groovy
// jednoduche inicializovanie kniznice
@Library('nazov-zdielanej-kniznice')

// inicializacia kniznice so specifickou verziou (moze to byt branch alebo tag)
@Library('nazov-zdielanej-kniznice@master')_

// tiez je mozne naraz inicializovat viacero kniznic
@Library(['nazov-zdielanej-kniznice', 'dalsia-kniznica@1.0'])
```

Použitie volania `@Library` môžete kdekoľvek v rámci pipeline skriptu. 
V prípade, ak za `@Library` je použitý podtržník `_`, nemusí sa použíť volanie `import`.


**Ako vytvoriť svoju prvú zdieľanú knižnicu?**

**Zdieľaná premenná:**

Pri globálnej premennej postačí, ak vytvoríte súbor `sayHello.groovy`, ktorý uložíte v adresári `vars/`.

```groovy
#!/usr/bin/env groovy

def call(String name = 'Majkl') {
  echo "Hello, ${name}."
}
```

Následne použitie v pipeline postačí inicializovať knižnicu pomocou anotácie `@Library` s podtržníkom na konci.
Vyvolanie globálnej premennej je za pomoci názvu groovy súboru, čiže `sayHello`.

```groovy
@Library('nazov-kniznice')_

stage('Demo') {
    sayHello 'Najt'
}
```

**Zdieľaná funkcia:**


Pri vytváraní zdieľanej funkcie, posťačí ak vytvoríťe v adresári `src/foo/bar/` súbor s názvom napríklad `Baz.groovy`.

```groovy
package foo.bar;

def myVar = 1
def sayHello(String name = 'Majkl') {
    echo "Hello, ${name}."
}
```

Použitie a volanie funkcie je za pomoci inicializácie objectu `Baz` (názov súboru groovy v src adresári), za pomoci, ktorého voláme metody.

```groovy
@Library('nazov-kniznice') import foo.Bar.Baz

def fnc = new foo.bar.Baz()
fnc.sayHello('Najt')
```

Ak knižnica potrebuje prístup k globálnym premenným, ako napríklad env, ktoré sú explicitne prenesené do tried alebo metód knižnice.


**`Resources` pre knižnice:**

Externé knižnice môžu načítať doplnkové súbory zo zdroja alebo adresára pomocou kroku `libraryResource`. 
Argument je relatívny názov cesty, podobne ako pri načítaní resources v jazyku Java.

```groovy
def request = libraryResource 'foo/bar/request.json'
```

