---
title: "Jenkins CI Pipeline scripting"
layout: post
date: 2018-10-22 10:00
image: /assets/images/uzitocne-funkcnosti.png
headerImage: false
tag: [jenkins, pipeline, CI, scripts]
star: false
category: blog
author: arzzen
commentIssueId: 15
description: Jenkins pipeline tips and trics
---

Jenkins pipeline is a suite of Jenkins plugins. Pipelines can be seen as a sequence of stages 
to perform the tasks just detailed, among others, thus providing continuous releases of your application. 

In Jenkins, Pipelines are specified by using a specific DSL following almost the same structure as Groovy to 
specify its statements and expressions. Pipelines has specific sentences or elements to define script sections, which follow the Groovy syntax.

## A collection of examples, tips and tricks of scripting for the Jenkins Pipeline

How to get actual working directory:
```groovy
def workspace = pwd()
```

Function for fetch direcotry name:
```groovy
def getFolderName() {
    def array = pwd().split("/")
    return array[array.length - 2];
}
```

How to edit system `PATH` variable:
```groovy
env.PATH = "${workspace}/env/bin:/usr/bin:${env.PATH}"
```

How to get git commit hash:
```groovy
def commitHash = sh(returnStdout: true, script: 'git rev-parse HEAD').trim().take(7)
```

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Clanok 2 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1559149447115060"
     data-ad-slot="7990264026"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

How to get commit message:
```groovy
def commitText = sh(returnStdout: true, script: 'git show -s --format=format:"*%s*  _by %an_" HEAD').trim()
```

How to get git commit hash from previous build:
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

How to get git commit hash from previous success build:
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

How to clone git repository?
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

How to transform JSON string to Groovy object?
```groovy
def jsonParse(json) {
    return new groovy.json.JsonSlurper().parseText(json)
}

// example
def json = '{"foo": "bar", "baz": "qux"}'
def data = jsonParse(json)

echo data.foo
echo data.baz
```

How to revers sort lists?
```groovy
@NonCPS
def sortReverse(list) {
    list.reverse()
}
```

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Clanok 2 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1559149447115060"
     data-ad-slot="7990264026"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

How to get job status?
```groovy
import groovy.json.JsonSlurper

def getJobStatus(String jobName){
    def rx = httpRequest "https://jenkins.example.com/job/${jobName}/lastBuild/api/json"
    def rxJson = new JsonSlurper().parseText(rx.getContent())
    return rxJson['result']
}
```

How to get diff between two dates?
```groovy
def timeDiff(st) {
    def delta = (new Date()).getTime() - st.getTime()
    def seconds = delta.intdiv(1000) % 60
    def minutes = delta.intdiv(60 * 1000) % 60

    return "${minutes} min ${seconds} sec"
}


// example
def start = new Date()

// another commands...

echo "Time spent: ${timeDiff(start)}"
```

How to check if date is in date range?
```groovy
def testDate = Date.parse('yyyy-MM-dd', '2017-07-07')

def startDate = Date.parse('yyyy-MM-dd', '2017-06-03')
def endDate = Date.parse('yyyy-MM-dd', '2017-08-12')

boolean isWithinRange(Date testDate) {
   return !(testDate.before(startDate) || testDate.after(endDate))
}
```

How to load data from csv file?
```groovy
def filenames = readFile 'filenames.txt'
def filenameArray = filenames.split(",")

for(int i = 0; i < filenameArray.size(); i++) {
    def file = filenameArray[i]
    echo file
}
```

How to use docker?
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


How to list all jobs?
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

How to delete all build from job history?
```groovy
def jobName = "education-webapp"
def job = Jenkins.instance.getItem(jobName)
job.getBuilds().each { it.delete() }
job.nextBuildNumber = 1
job.save()
```

How to load all slaves?
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

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Clanok 2 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1559149447115060"
     data-ad-slot="7990264026"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

How to load data from url?
```groovy
def fetchDataFromRestApi(def url) {
    def projectsApi = new URL("${url}")
    return new groovy.json.JsonSlurper().parse(projectsApi.newReader())
}
```

How to load repository detail from Gitlab by using REST API?
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

// example
def projectDetails = getGitProjectDetails("project-name", "https://gitlab.com/", "supertrupersecrettoken")

echo projectDetails.projectTags
echo projectDetails.defaultBranch
echo projectDetails.isActive
```
