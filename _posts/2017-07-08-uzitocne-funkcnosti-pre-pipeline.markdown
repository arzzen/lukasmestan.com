---
title: "Užitočné funkčnosti pre pipeline"
layout: post
date: 2017-07-08 10:00
image: /assets/images/jenkinspipeline.png
headerImage: false
tag: [jenkins, pipeline, CI, jenkinsfile]
star: true
category: blog
author: arzzen
commentIssueId: 4
description: Užitočné funkčnosti pre pipeline
---


Kľúčovou súčasťou [Pipeline](/jenkins-pipeline) pluginu je štandardný mechanizmus spúšťania krokov (_steps_), 
 na základe vlastného Groovy prekladača, ktorý beží v hlavnom procese _Jenkins_-u.

Skripty spúšťané s vypnutým _sandbox_-om umožňujú priame volanie interného API _Jenkins_-u.
Skripty môžu byť užitočným riešením pre chýbajúcu funkčnosť. Spávcovia môžu tieto skripty schvaľovať so zreteľom na bezpečnostné riziko.
Vypnutie _sandbox_ módu sa vykonáva zrušením zakliknutého políčka "_Use Groovy Sandbox_" v konfigurácii _Job_-u.

"_Logika volaná vo funkciách, ktoré majú anotáciu [`@NonCPS`](https://github.com/jenkinsci/workflow-cps-plugin/blob/master/README.md#technical-design) je spúšťaná izolovane cez normálny **Groovy runtime**._"

Pipeline skripty alebo funkcie môžu byť označené anotáciou `@NonCPS`. (CPS = [Continuation Passing Style](https://en.wikipedia.org/wiki/Continuation-passing_style))
Tieto sú potom kompilované (s výnimkou bezpečnostných kontrol sandbox-ov), 
a správajú sa podobne ako "binárne" metódy z platformy _Java_, _Groovy runtime_, jadro _Jenkins_-u alebo _plugin_ kódu. 
**Funkcie označené anotáciou `@NonCPS` môžu bezpečne používať neserializovateľné 
objekty ako lokálne premenné, aj keď by nemali prijímať parametre, ktoré nieje možné rozdeliť, vrátiť alebo ukladať jej hodnoty.**
Všetka logika spúšťania sa vykonáva vo vnútri vlákna "CPS VM", čo je vlastne _Java_ vlákno (java thread), 
ktoré môže spúšťať binárne metódy a zisťovať, čo sa má vykonať ďaľej.

<div class="breaker"></div>

## Praktické ukážky funkci


Zistenie aktuálneho pracovného priestoru:

```groovy
def workspace = pwd()
```


Funkcie pre zistenie názvu pracovného adresára:
```groovy
def getFolderName() {
    def array = pwd().split("/")
    return array[array.length - 2];
}
```

Úprava premennej prostredia `PATH`:
```groovy
env.PATH = "${workspace}/env/bin:/usr/bin:${env.PATH}"
```

Získanie aktuálneho commit hash-u:
```groovy
def commitHash = sh(returnStdout: true, script: 'git rev-parse HEAD').trim().take(7)
```

Získanie aktuálneho commit textu:
```groovy
def commitText = sh(returnStdout: true, script: 'git show -s --format=format:"*%s*  _by %an_" HEAD').trim()
```

Získanie commit hash-u z predchádzajúceho build-u:
```groovy
@NonCPS
def prevBuildLastCommitId() {
    def prev = currentBuild.previousBuild
    def items = null
    def result = null

    if (prev != null && prev.changeSets != null && prev.changeSets.size() && prev.changeSets[prev.changeSets.size() - 1].items.length) {
        items = prev.changeSets[prev.changeSets.size() - 1].items
        result = items[items.length - 1].commitId
    }

    return result
}
```

Získanie commit hash-u z predchádzajúceho úspešného build-u:
```groovy
def getLastSuccessfulCommit() {
    def lastSuccessfulHash = null
    def lastSuccessfulBuild = currentBuild.rawBuild.getPreviousSuccessfulBuild()
    
    if ( lastSuccessfulBuild ) {
        lastSuccessfulHash = commitHashForBuild( lastSuccessfulBuild )
    }

    return lastSuccessfulHash
}
```

Funkcia pre _clone_ git repozitára:
```groovy
def credentialsRepoId = 'GIT_ID'
def cloneRepository(def targetDir, def gitUrl, def branch) {
    checkout([
        $class: 'GitSCM', 
        branches: [[
            name: '*/' + branch
        ]], 
        doGenerateSubmoduleConfigurations: false, 
        extensions: [[
            $class: 'RelativeTargetDirectory', 
            relativeTargetDir: targetDir
        ]], 
        submoduleCfg: [], 
        userRemoteConfigs: [[
            credentialsId: credentialsRepoId, 
            url: gitUrl
        ]]
    ])
}
```

Transforácia JSON na object:
```groovy
def jsonParse(json) {
    return new groovy.json.JsonSlurper().parseText(json)
}

// priklad
def json = '{"foo": "bar", "baz": "qux"}'
def data = jsonParse(json)

echo data.foo
echo data.baz
```

Zoradenie pola z opačnej strany:
```groovy
@NonCPS
def sortReverse(list) {
    list.reverse()
}
```

Získanie stav job-u:
```groovy
import groovy.json.JsonSlurper

def getJobStatus(String jobName){
    def rx = httpRequest "https://jenkins.example.com/job/${jobName}/lastBuild/api/json"
    def rxJson = new JsonSlurper().parseText(rx.getContent())
    return rxJson['result']
}
```

Zistenie rozdielu casu voči aktuálnemu času:
```groovy
def timeDiff(st) {
    def delta = (new Date()).getTime() - st.getTime()
    def seconds = delta.intdiv(1000) % 60
    def minutes = delta.intdiv(60 * 1000) % 60

    return "${minutes} min ${seconds} sec"
}


// pouzitie
def start = new Date()

// nejake prikazy...

echo "Time spent: ${timeDiff(start)}"
```

Zistenie dátum v rozsahu dátumov:
```groovy
def testDate = Date.parse('yyyy-MM-dd', '2017-07-07')

def startDate = Date.parse('yyyy-MM-dd', '2017-06-03')
def endDate = Date.parse('yyyy-MM-dd', '2017-08-12')

boolean isWithinRange(Date testDate) {
   return !(testDate.before(startDate) || testDate.after(endDate))
}
```

Načítanie obsahu súboru/ov (oddelených čiarkou):
```groovy
def filenames = readFile 'filenames.txt'
def filenameArray = filenames.split(",")

for(int i = 0; i < filenameArray.size(); i++) {
    def file = filenameArray[i]
    echo file
}
```

Priklad pouzitia dockeru:
{% raw %}
```groovy
node('docker') {
    stage 'start database'
    
    docker.image('redis:3.0.7-alpine').withRun { c ->
        def ip = hostIp(c)
        
        stage 'client set'
            docker.image('redis:3.0.7-alpine').inside {
                sh "redis-cli -h ${ip} set test 123"
            }
        
        stage 'client get'
            docker.image('redis:3.0.7-alpine').inside {
                sh "redis-cli -h ${ip} get test"
            }
        
        stage 'client del'
            docker.image('redis:3.0.7-alpine').inside {
                sh "redis-cli -h ${ip} del test"
            }
    }
}

def hostIp(container) {
    sh "docker inspect -f {{.NetworkSettings.IPAddress}} ${container.id} > host.ip"
    readFile('host.ip').trim()
}
```
{% endraw %}


Zoznam všetkých _job_-ov:
```groovy
import jenkins.model.*

@NonCPS
def listJobs() {
    Jenkins.instance.items.each {
        println it.name
    }
}

listJobs()
```

Zmazanie všetkých buildov z histórie job-u:
```groovy
def jobName = "education-webapp"
def job = Jenkins.instance.getItem(jobName)
job.getBuilds().each { it.delete() }
job.nextBuildNumber = 1
job.save()
```

Načítanie všetkých _slave_-ov a nasledné spustenie príkazu/ov nad kažým z nich ([serializácia](https://github.com/jenkinsci/pipeline-plugin/blob/master/TUTORIAL.md#serializing-local-variables)):
```groovy
@NonCPS
def getSlaves() {
    def slaves = []
    hudson.model.Hudson.instance.slaves.each {
        slaves << it.name
    }
    return slaves
}

for (String slave : getSlaves()) {
    node(slave) {
        sh "hostname"   
    }
}
```

Načíta dáta z url a vráti [Object parse](http://docs.groovy-lang.org/latest/html/gapi/groovy/json/JsonSlurper.html#parse(java.io.Reader)):
```groovy
def fetchDataFromRestApi(def url) {
    def projectsApi = new URL("${url}")
    return new groovy.json.JsonSlurper().parse(projectsApi.newReader())
}
```


Načítanie detailu projektu cez GitLab REST API na základe projectId:
```groovy
@NonCPS
def getGitProjectDetails(def projectId, def gitUrl, def gitPrivateToken) {
    def projectDetailsApi = new URL("${gitUrl}/projects/${projectId}?private_token=${gitPrivateToken}")
    def projectDetails = new groovy.json.JsonSlurper().parse(projectDetailsApi.newReader())

    def isActive = true
    if( projectDetails.archived ) {
        isActive = false
    }

    def details = new LinkedHashMap();
    details.projectTags = projectDetails.tag_list
    details.defaultBranch = projectDetails.default_branch
    details.isActive = isActive
    
    return details
}

// priklad
def projectDetails = getGitProjectDetails("nazov-projectu", "https://gitlab.com/", "superultratajnytoken")

echo projectDetails.projectTags
echo projectDetails.defaultBranch
echo projectDetails.isActive
```