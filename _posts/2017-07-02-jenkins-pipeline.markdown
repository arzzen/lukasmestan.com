---
title: "Jenkins Pipeline"
layout: post
date: 2017-07-02 17:00
image: /assets/images/Jenkins-pipeline.png
headerImage: false
tag: [jenkins, pipeline, CI]
star: false
category: blog
author: arzzen
commentIssueId: 2
description: Jenkins pipeline
---

<center>
    <img alt="jenkins-pipeline" src="/assets/images/jenkinspipeline.png" />
</center>

Jenkins je open-source automatizovaný nástroj s výkonnou architektúrou pluginov, 
ktorá pomáha vývojovým tímom automatizovať ich životný cyklus softvéru. 

# Úvod do Pipeline

V porovnaní s tradičnými (freestylovými) jobmy poskytuje pipeline lepšiu 
vizualizáciu stavu niekoľkých častí, ktoré tvoria job-y. [Pipeline](https://jenkins.io/doc/book/pipeline/) su všestrannejšie 
vzhľadom na ich schopnosť daľšej úpravy, spájania, opätovného prepoužívania a vzájomného paralelného volania.

Pipeline v jednoduchosti možno pochopiť aj ako **job** ktorý definuje proces. Jeho výstupom sa stáva **build**.
Pipeline definuje sériu **job**ov. Najdôležitejšou časťou **pipline** je krok **steps**, 
ktorý definuje blok kódu skriptu. 

Pipeline označovaný aj ako workflow <abbr title="Continuous Delivery">CD</abbr> bol pomocou komunity 
vytvorený z dôvodu flexibility, rozšíriteľnosti a možnosti skriptovania.

### Základná charakteristika:

1. fungujú bez ohľadu na reštart alebo pád CD servera,
2. môže byť v priebehu pozastavený a môže čakať na vstup užívateľa,
3. môže byť znovu spustený z ktorého koľvek bodu,
4. "stage-view" prináša pohodlný prehľad (dashboard) spolu s trendom.

Skripty obsiahnute v _Pipeline_ je možné písať s použitím deklaratívnej ([Declarativ Pipeline](https://jenkins.io/doc/book/pipeline/syntax/#declarative-pipeline)) 
alebo skriptovacej ([Scripted Pipeline](https://jenkins.io/doc/book/pipeline/syntax/#scripted-pipeline)) syntaxe.


### **Deklaratívny pipeline**

Pomerne nové rozšírenie, ktoré predstavuje jednoduchšiu definíciu. 
Deklaratívny Pipeline bol vytvorený s cieľom ponúknuť jednoduchšiu a umienenú syntax, 
podporuje deklaratívny programovací model.

Hlavnou podmienkou je, aby bol celý blok uzatvorený v rámci `pipeline { }`

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
### **Skriptovacia pipeline**

Je efektivnejšia ako "Deklaratívny pipeline". Vzužíva **Groovy** jazyk (pomocou **DSL**). 
Vďaka čomu môže byť veľmi expresívny a flexibilný nástroj pri vytváraní pipeline skriptu.

Obmedzenia skriptovacej pipeline spočívajú v samotnom jayzku Groovy.

Tento typ pipeline je ideálnu voľbu pre užívateľov, ktorý majú zložitejšie požiadavky.

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

Pipeline poskytujú novú silu a flexibilitu pre konfiguráciu Jenkinsu, vďaka čomu je 
skutočne ľahké zmigrovať existujúce "freestyle" job-y do pipeline.

Tzv. "multi-branch" úlohy poskytujú vynikajúci nadhľad nad stavom neustále sa rozvíjajúcej "branch-e" a 
pipeline definovaný vo verziovacom súbore "Jenkinsfile" nám umožňujú jednoducho zistiť, 
kto vykonal aké zmeny, na základe akých dôvodov a zároven poskytuje históriu zmien kódu.

## Pozitíva:

- konfigurácia udržiavateľná v rámci **verziovacieho systému**,
- **vizualizácia** jednotlivých štádií a krokov,
- **automatické vytváranie** jobu v prípade "multi-branch" projektu,
- **integrovaný editor** a "snippet" generátor pipeline krokov,
- **rozšíriteľnosť** DSL.

## Negatíva:

- **nie všetky existujúce jenkins pluginy sú kompatibilné** s pipeline (napríklad vizualizácia statickej analýze kódu),
- **menej prehľadná vizualizácia** spustania pipeline krokov,
- dve možnosti skriptovania.
- obmedzenia Groovy jazyka


