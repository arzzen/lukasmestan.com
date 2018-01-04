---
title: "Štatistika 1 400 553 869 prihlasovacích mien a hesiel inak"
layout: post
date: 2018-01-02 10:00
image: /assets/images/uzitocne-funkcnosti.png
headerImage: false
tag: [statistika, darkweb, data breach]
star: true
category: blog
author: arzzen
commentIssueId: 8
description: Štatistika 1,4 miliardy prihlasovacích mien a hesiel inak.
---


Firma [4iQ](https://news.4iq.com/post/102emud/youporn-hacked-data-among-dark-web-database-sparking-cyber-crime-epidemic) 
počas skenovania darkweb-u za účelom hľadania ukradnutých alebo stratených údajov, 
objavila jediný súbor s databázou 1,4 miliárd prihlasovacích údajov v čitateľnej podobe.
Je to doposiaľ najväčšia agregovaná databáza, ktorá sa doteraz našla v darkweb-e.


Unikátne záznamy podľa:   | Počet:                           |
------- | ------------------------------------- | 
Prihlasovacie mená a heslá | 1 400 553 869   |
Prihlasovacie mená   | 1 163 976 485      |
Heslá | 463 619 984 |


Rozhodol som sa preto spraviť pomerne jednoduchú analýzu, ktorá by sa zameriavala na zistenie početnosti 
výskytov všeobecne známych slov so zoznamu mien, vulgarizmov, najčastejšie používaných slov a pod.

Získať zdroj databázy nebolo až tak jednoduché ako sa na prvý pohľad zdalo, ale za pomoci 
tor-u a p2p sa to nakoniec z verejne dostupného zdroja podarilo.
Získaná databáza o veľkosti 41giga obsahovala zoznam súborov aktualizovaných naposledy v novembri 2017.
Databáza bola rozdelená do podadresárov podla začiatočných písmen prihlasovacieho mena, takéto 
rozdelenie umožnilo pomerne rýchle vyhľadávanie.

<img src="/assets/images/data_breach_fragmented_sorted_directories.png" alt="directories" />

# Slovenské mená

Ako prvý zoznam som si zvolil slovenské kalendárne mená, ktoré sa nachádzajú v prihlasovacích menách alebo heslách. 

## Top 100 slovenských mien

<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=1747334418&single=true&amp;widget=true&amp;headers=false"></iframe>

## Slovenské mená (čiastočná zhoda)

<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=94221881&single=true&amp;widget=true&amp;headers=false"></iframe>

## Slovenské mená (presná zhoda)

<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=2008939288&single=true&amp;widget=true&amp;headers=false"></iframe>

# Slovenské vulgarizmy

Pri druhom zozname ma zaujímal počet vulgárnych slov, ktoré sa nachádzajú v prihlasovacích menách alebo heslách. 
Ako vstupný zoznam vulgárnych slov som pouzil existujúci repozitár [rostacik/slovenske-nadavky](https://github.com/rostacik/slovenske-nadavky) na githube. 

## Top 100 slov
 
<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=572229463&single=true&amp;widget=true&amp;headers=false"></iframe>

## Slovenské vulgarizmy (čiastočná zhoda)

<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=15136171&single=true&amp;widget=true&amp;headers=false"></iframe>

## Slovenské vulgarizmy (presná zhoda)

<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=1058246037&single=true&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

<small>ps.: v zozname slov sú zahrnuté aj slová ktoré sú zhodné s inými slovnými zásobami iných krajín.</small>

# Email domény

Zoznam najčastejších emailových domén a ich použitie v prihlasovacích menách (vo forme emailu) a heslách.

<iframe width="810" height="650" frameBorder="0" border="0" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSfB09JrL8-RHZvFzFMQDF3Zvhj8hMz7cKxIT4yA8DoKPg--stndIYRsE-h22damewTO4P-6ZyquQYs/pubhtml?gid=6933647&single=true&amp;widget=true&amp;headers=false"></iframe>

# Spôsob vyhľadávania

Pre vyhľadávanie som zvolil cestu prehľadávania zdrojových súborov čo bolo omnoho rýchlejšie ako použitie externej 
sql alebo no-sql databázy. Pre tento účel som pripravil bash skript, ktorý má možnosť navoliť si pomocou 
prvého parametra hľadaný text, druhého parametra začiatočný regex a tretieho parametra koncový regex. S týchto troch 
parametrov sa vyskladá regulárny výraz pre grep príkaz. 

#### Skript na prehľadávanie podľa zvoleného textu a regex-ov

<script src="https://gist.github.com/arzzen/6673ee81c72ed87de4e6f7cd8a414074.js"></script>

#### Príklad použitia vyhľadávania presnej zhody:

- podľa názvu užívateľského mena: `./search.sh "lukas" "^" "@.*||"`
- podľa email-u: `./search.sh "lukas@gmail.com" "^" "||"`
- podľa hesla: `./search.sh "123456" "||" "$"`
- podľa domýny emailu: `./search.sh $word ".*@" "||"`