---
title: "Poznáte Jenkinsfile?"
layout: post
date: 2017-07-05 17:00
image: /assets/images/jenkinspipeline.png
headerImage: false
tag: [jenkins, pipeline, CI, jenkinsfile]
star: false
category: blog
author: arzzen
commentIssueId: 3
description: Jenkins pipeline
---

Vo všeobecnosti je považované za dobrú "best practice" vytvárať a načítať pipeline skript z iného zdroja, 
ktorý môžete použiť pomocou verziovacieho systému (<abbr title="Version Control System">VCS</abbr>).
Komplexný pipeline skript je ťažkopádne písať a udržiavať v rámci rozhrania UI Jenkins-u. 

Používanie **Jenkinsfile** v rámci repozitára prináša niekoľko výhod:

- **<abbr title="single source of truth">SSOT</abbr>** - "single source of truth" je koncepcia, ktorá sa snaží zabezpečiť, aby všetci v organizácii 
používali rovnaké údaje pri prijímaní rozhodnutí,
- **zdieľanie nastavení** pipeline členmi teamu,
- **code review** a iterácie zmien.


## Praktická ukážka

Groovy skript môže obsahovať funkcie (napríklad `def test(type) {`), podmienené kroky/testy, cykly, _try/catch/finally_ bloky, 
premenné (pomocou príkazu def `def premenna = hodnota`) a podobne.


```groovy
#!groovy

node {
    try {
        stage('Checkout') { 
            checkout([
                $class: 'GitSCM', 
                branches: [[name: '*/master']], 
                browser: [
                    $class: 'BitbucketWeb', 
                    repoUrl: 'https://bitbucket.org/user/project'
                ], 
                doGenerateSubmoduleConfigurations: false, 
                userRemoteConfigs: [[
                    credentialsId: 'jenkins', 
                    url: 'git@bitbucket.org:user/project.git'
                ]]
            ])
        }
        stage('Lint') {
            sh "find . -type f -name '*.php' -exec php -l {} ; | grep -v \"No syntax errors detected\""
        }
        stage('Test') {
            parallel(
                'resultUnit': {
                    junit 'tests/_output/*.xml'
                },
                'resultHtml': {
                    publishHTML([
                        allowMissing: false, 
                        alwaysLinkToLastBuild: true, 
                        keepAll: false, 
                        reportDir: 'tests/_output/', 
                        reportFiles: 'report.html', 
                        reportName: 'HTML Report'
                    ])
                }
            )
        }
        stage('Results') {
            echo "Success"
            step([$class: 'WsCleanup'])
        }
    } catch (e) {
        currentBuild.result = "FAILED"
        throw e
    }
}
```

### Node

```groovy
node {
```

Vačšina úloh v rámci pipeline skriptu je vykonávaná v kontexte jedného alebo viacerých blokov _node_.

**Vykonáva dve veci**:

1. Naplánuje úlohu, ktorá sa pridá do fronty na spustenie a akonáhle je _executor_ voľný, krok sa spustí.
2. Vytvára pracovný priestor (_workspace_), iba pre spustenú úlohu. 

Pokiaľ máte nakonfigurovaného iného _agent_-a môžete ho vynútiť tým že zadáte parameter príkazu _node_, napríklad: `node('nazovagenta') {`
v inom prípade sa použije hlavný _master_ agent.

### Stage

_Stage_ je krok, ktorý výtvára podmnožinu v rámci pipeline, napríklad: "Checkout", "Test", "Deploy"...
Tento krok využívajú mnohé doplnky na vizualizáciu alebo na prezentáciu statusu prípadne postupu.

<center>
    <img alt="jenkins-pipeline" src="/assets/images/stage-view.jpg" />
</center>

### Parallel

Paralelizmus vykonáva súčasne veľa práce s prostriedkami, ktoré má k dispozícii.

**Dôvody prečo a kedy používať paralelizmus pri spúšťaní:**

- ak časť práce môžete rozdeliť medzi viacerých _worker_-ov,
- ak skript potrebuje príliš veľa procesov a prostriedkov,
- ak _Jenkins_ server je dostatočne výkonný s množstvom procesorov, ktoré môžete využiť,
- ak pipeline skript používa integračné testy, ktoré závisia od (pomalých) externých služieb.

<img alt="jenkins-pipeline" src="/assets/images/jenkins-parallel.png" />


### Step

```groovy
step([$class: 'WsCleanup'])
```

_Step_ je úloha na spustenie, ktorá vraví Jenkinsu, čo sa má vykonať. 

Napríklad, spustenie _shell_ príkazu sa vykonáva `sh([script: 'echo hello'])`, prípadne, skrátena verzia `sh 'echo hello'`.
Príkaz `step([$class: 'WsCleanup'])` vyčistí pracovný priestor vykonávaného _job_-u.

Na rozdiel od "jednoduchého" používania príkazov `git` je príkaz `checkout(` všeobecnejší krok 
špecifikujúci akúkoľvek zložitú konfiguráciu podporovanú doplnom Git. 


## Zdroje

- [Using a Jenkinsfile](https://jenkins.io/doc/book/pipeline/jenkinsfile/)
- [Pipeline Syntax](https://jenkins.io/doc/book/pipeline/syntax/)
- [Pipeline as a code with Jenkins](https://ysegorov.github.io/2016/jenkinsfile/)