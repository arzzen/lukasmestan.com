---
title: "Jenkins tipy a triky"
layout: post
date: 2017-07-18 10:00
image: /assets/images/jenkins-tipy-triky.png
headerImage: false
tag: [jenkins, best practices]
star: false
category: blog
author: arzzen
commentIssueId: 5
description: Jenkins odporúčania - tipy a triky (best practices)
---

<center>
    <img src="/assets/images/cool-jenkins2x3.png" alt="cool-jenkins" /> 
</center>

Používanie _Jenkins_-u je veľmi intuitívne a jednoduché. Navyše, pri dodržiavaní základných pravidiel, dosiahnete vyššiu efektivitu práce.

## Jenkins

- Udržiavajte Jenkins vždy aktuálny - aktualizujte pravidelne `sudo apt update jenkins` alebo `sudo yum update jenkins`.
- Názvy _job_-ov by nemali obsahovať medzeru - každý job si vytvára svoj adresár a niektoré nástroje nepodporujú medzeru v názve adresára.
- Nepoužívajte anonymný prístup užívateľov k job-om, nastaveniam a pod., ak je to možné použite LDAP alebo inú authentifikáciu.
- Ak je to možné, nastavte potrebné úrovne užívateľských rolí a skupín len tým užívateľom ktorý ich potrebujú.
- Nastavte všetkým užívateľom zobrazovanie stavu neúspešných/chybových job-ov (tak aby ich mali vždy na očiach).
- V prípade zablokovania prístupu všetkým užívateľom k Jenkins-u, môžte ho manuálne upravit v globálnej konfigurácii `/var/lib/jenkins/config.xml`.
- Pre reštartovanie Jenkins-u použite `/safeRestart` alebo `/restart` ak to nefunguje, použite ssh príkaz `sudo service jenkins restart`.
- Backup-ujte Jenkins home adresár `/var/lib/jenkins`.
- Nevypínajte Maven plugin. Jenkins bez neho nevie znova naštartovať. Ak ho nechtiac deaktivujete, môžete ho znova povoliť pomocou príkazu.
`sudo rm /var/lib/jenkins/plugins/maven-plugin.jpi.disabled`.
- Neinštalujte zbytočné pluginy, pokiaľ to nie je nevyhnutné, pluginy tretích strán môžu vzájomne spôsobovať problémy.


## Pipeline

- Extrahujte pipeline funkčnosti skriptu do samostatných funkcií.
- Neduplikujte skripty ani kód, využívajte [zdieľané knižnice](https://github.com/jenkinsci/workflow-cps-global-lib-plugin/blob/master/README.md).
- Pri "deklaratívnom" pipeline skripte využívajte [vstavaný linter](https://jenkins.io/doc/book/pipeline/development/#linter).
- Job-y sa snažte uržiavať čo najjednoduchšie.
- Používajte **template builder** pre zjednodušnie opakujúcich sa úloh.
- Nevkladajte kvantum _bash skriptov_ do každého _job_-u. Ak je to nevyhnutné presuňte skript do Git repozitára a ten si následne _checkout_-nite.
- Používajte `checkout scm` pre automaticky _checkout_ revizie _branch_-u repozitára
- Používajte `$env.BRANCH_NAME` pre určovanie logiky na základe _branch_-u v pipeline skripte
- Pre urýchlenie debugovania job-u používajte v detaile _buildu_ možnosť "_Reply_", kde môžete priamo "on demand" upravovať pipeline skripty a zároveň ho aj spúšťat.
- Neukladajte pipeline skripty v rámci Jenkins filtesystému (radšej ich udržiavajte vo verziovacom systéme).
- Nevkladajte blok _states_ do ploku _parallel_ môže to viest k neočakávaným výsledkom, logickým problémom v _Stage View_ a pod.
- Všetko podstatné, vykonávajte v **stage** bloku. Toto vám umožní prehľadnejšiu vizualizáciu, debugovanie a podobne.
```groovy
stage('build') {
    // build
}
stage('test') {
    // test
)
```
- Spúštané príkazy, _shell sprikty_, _build_-y a podobne, obalujte do **node** bloku.
```groovy
stage{'build'} {
    node {
        checkout scm
        sh 'echo "hello world"'
    }
}
```
- Využívajte silu paralelizmu. Ak je to možné spúštajte úlohy paralelne.
```groovy
parallel (
    'resultUnit': {
        junit 'tests/_output/*.xml'
    },
    'resultHtml': {
        publishHTML([])
    }
)
```
- Nevytárajte ("nesetujte") premenné prostredia priamo pomocou globálnej `env` premennej, používajte radšej `withEnv` syntax.
```groovy
withEnv(["PATH+MAVEN=${tool 'm3'}/bin"]) {
    sh "mvn clean verify"
}
```
- Preferujte `stash` namiesto `archive`, **stash** a **unstash** sú vytorené pre zdieľanie súborov ako aj pre zdieľanie zdrojových kódov medzi _stages_ a _nodes_.
Na druhej strane _archive_ je stavaný pre dlhotrvajúce súbory ako napríklad vygenerovaný binárny súbor.
```groovy
stash excludes: 'target/', name: 'source'
unstash 'source'
```
- Pri každom _pipeline_ skripte používajte na prvom riadku príkaz `#!groovy` alebo `#!/usr/bin/env groovy`.
- Obalujte vstupy od používateľa v bloku `timeout`.
```groovy
timeout(time:5, unit:'DAYS') {
    input message:'Approve deployment?', submitter: 'it-ops'
}
```
- V prípade, že potrebujete pracovať s asociativným poľom `[key,value]` použíte `Map` funkciu:
```groovy
@NonCPS 
def entries(m) {
    m.collect {k, v -> [k, v]}
}
```

