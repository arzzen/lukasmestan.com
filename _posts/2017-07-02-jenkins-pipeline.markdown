---
title: "Jenkins Pipeline :electric_plug:"
layout: post
date: 2016-07-02 17:00
image: /assets/images/jenkinspipeline.png
headerImage: false
tag: [jenkins, pipeline, CI]
star: true
category: blog
author: arzzen
description: Jenkins pipeline
---

<center>
    <img alt="jenkins-pipeline" src="/assets/images/jenkinspipeline.png" />
</center>

Jenkins je open-source automatizovaný nástroj s výkonnou architektúrou pluginov, 
ktorá pomáha vývojovým tímom automatizovať ich životný cyklus softvéru. 

# Úvod do Pipeline

V porovnaní s tradičnými (freestylovými) jobmy poskytuje pipeline lepšiu 
vizualizáciu stavu niekoľkých častí, ktoré tvoria joby. [Pipeline](https://jenkins.io/doc/book/pipeline/) su všestrannejšie 
vzhľadom na ich schopnosť daľšej úpravy, spájania, opätovného prepoužívania a vzájomného paralelného volania.

V jednoduchosti sa dá pochopiť aj ako **job** ktorý definuje proces a **build** ktorý
je výstupom **job**u. Pipeline definuje sériu **job**ov. Najdôležitejšia časť **pipline**u je **steps**, 
ktorý definuje blok kódu skriptu. 

Pipeline označovaný aj ako workflow <abbr title="Continuous Delivery">CD</abbr> bol pomocou komunity 
vytvorený z dôvodu flexibility, rozšíriteľnosti a možnosti skriptovania.

1. fungujú bez ohľadu na reštart alebo pád CD servera
2. môže byť v priebehu pozastavený a môže čakať na vstup užívateľa
3. môže byť znovu spustený z ktorého koľvek bodu
4. "stage-view" prináša pohodlný prehľad (dashboard) spolu s trendom

Pipeline skripty je možné písať s použitím deklaratívnej ([Declarativ Pipeline](https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline)) 
alebo skriptovacej ([Scripted Pipeline](https://jenkins.io/doc/book/pipeline/syntax/#scripted-pipeline)) syntaxe.


### **Declarativ Pipeline**

Pomerne nové rozšírenie, ktoré predstavuje jednoduchšiu definíciu. 
Deklaratívny Pipeline bol vytvorený s cieľom ponúknuť jednoduchšiu a umienenú syntax, 
podporuje deklaratívny programovací model.

Hlavnou podmienkou je aby bol cely blok uzatvoreny v ramci `pipeline { }`

príklad:
```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            } 
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            } 
        }
    } 
}
``` 
### **Scripted Pipeline**

Je efektivnejši ako "Deklaratívny Pipeline" a umožńuje všeobecný účel pomocou **DSL** (Domain-specific Language) 
využúvajúci **Groovy** jazyk, čo znamená, že môže byť veľmi expresívny a flexibilný nástroj pri vytvarani pipeline skriptu.
Má velmi malo obmedzeni, definovanymi samotným Groovy jazykom, čo z neho robí ideálnu voľbu pre užívateľov, ktorý majú zložitejšie požiadavky.

príklad:
```groovy
node {
    stage('Build') {
        echo 'Building....'
    }
    stage('Test') {
        echo 'Testing....'
    }
    stage('Deploy') {
        echo 'Deploying....'
    }
}
```

# Zhodnotenie

Pipeline poskytujú novú silu a flexibilitu pre konfiguráciu Jenkinsu. 
Je skutočne ľahké zmigrovať existujúce "freestyle" joby do pipeline.

Tzv. "multi-branch" úlohy poskytujú vynikajúci nadhlad nad stavom neustále sa rozvíjajúcej "branche" a 
pipeline definovaný vo verziovacom súbore "Jenkinsfile" nám umožňujú jednoducho zistiť, 
kto zmenil to, čo a prečo, čím je zrejmá aj história zmien kódu.

Napokon, DSL používaný ako definovaný pipline je rozšíriteľný, čo nám umožňuje 
definovať nové vlastné kroky, aby sme mohli lepšie špecifikovať všetky kroky, 
ktoré by naše CI mohlo potrebovať na vykonanie.

## Pozitíva

- konfigurácia udržiavateľná v rámci verziovacieho systému
- vizualizácia jednotlivých štádií a krokov 
- automatické vytváranie jobu v prípade "multi-branch" projektu
- integrovaný editor a "snippet" generátor pipeline krokov
- rozšíriteľnosť DSL

## Negatíva

- nie všetky existujúce jenkins pluginy sú kompatibilné z pipeline (napríklad vizualizácia statickej analýze kódu)
- nie moc jasná/prehľadná vizualizácia spustania pipeline krokov
- dve možnosti skriptovania  


