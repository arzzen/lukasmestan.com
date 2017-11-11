---
title: "Premenné prostredia Gitlab-u a Jenkins pipeline "
layout: post
date: 2017-11-05 10:00
image: /assets/images/jenkins-gitlab-env.png
headerImage: false
tag: [jenkins, pipeline, env]
star: true
category: blog
author: arzzen
commentIssueId: 7
description: Jenkins pipeline, Gitlab a premenné prostredia 
---

## Premenné prostredia:

Premenná prostredia (environment variable alebo skrátene **env**) je dynamická
premenná, ktorá v operačnom systéme zastupuje vlastnosť (súčasťou)
bežiaceho procesu. Premenných prostredia je obvykle viac a možno ich za behu
meniť. Používajú sa v unixových systémoch, v systémoch DOS, ale aj v sysréme
Windows. Ich názov sa v jednotlivých systémoch môže meniť.

Shell-ovský príkaz `env` pre unix systémy sa používa pre vypísanie zoznamu
premenných prostredia.

Zoznam premenných prostredia v rámci jenkins pipeline sú zväčša dostupné
ako globálne premenné. V systéme Jenkins nemusia byt dostupné všetky.

Pre výber všetkých dostupných premenných prostredia v pipeline skripte
môžete použiť funkciu `sh()` pre zavolanie príkazu `env`.

```groovy
echo sh(returnStdout: true, script: 'env')
```


## Gitlab premenné v prostredí Jenkins-u

Pokiaľ používate Gitlab + Jenkins, pravdepodobne máte nainštalovaný [gitlab-plugin](https://wiki.jenkins.io/display/JENKINS/GitLab+Plugin).
Po schválení merge request-u v gitlab-e sa spúšťa trigger jenkins-a, ktorý
má v rámci spusteného job-u dostupné nasledujúce [premenné prostredia](https://github.com/jenkinsci/gitlab-plugin#parameterized-builds):

```shell
gitlabSourceRepoURL=git@gitlab.foo.com:Group/project.git
gitlabSourceRepoHttpUrl=https://gitlab.foo.com/Group/project.git
gitlabSourceRepoSshUrl=git@gitlab.foo.com:Group/project.git
gitlabSourceRepoHomepage=https://gitlab.foo.com/Group/project

# zakladne informacie o repozitari
gitlabSourceRepoName=project
gitlabSourceNamespace=Group

# zakladne informacie o uzivatelovi
gitlabUserEmail=lukas.mestan@github.com
gitlabUserName=Lukáš Mešťan

# typ akcie sprostredkovanej cez gitlab
gitlabActionType=PUSH

# commit hash pred pushnutim 
gitlabBefore=40933992eb6be66d0174a2c84d78123392caaa3b

# commit hash po pushnutim 
gitlabAfter=d3229933e69b4665fad699102953de7ab2f354f9

# posledny commit hash 
gitlabMergeRequestLastCommit=d3229933e69b4665fad699102953de7ab2f354f9

# aktivny branch nad ktorym bola operacia vykonavana
gitlabBranch=master

# nazov zdrojoveho a cieloveho branch-u
gitlabSourceBranch=develop
gitlabTargetBranch=master
```


## Jenkins pipeline

Pokiaľ potrebujete zistiť, kto, prípadne odkiaľ bol job spustený, použite túto
pipeline funkciu, ktorá získa základné informácie o užívateľovi.

```groovy
def getUserInfo() {
    LinkedHashMap user = [:]

    def gitlabRequest = sh(returnStdout: true, script: 'env | grep -qi "gitlabSourceRepoName" && echo "yes" || echo "no"')
    if( gitlabRequest.trim().contains("yes") ) {
        user.project = "${gitlabSourceRepoName}"
        user.username = "${gitlabUserName}"        
        user.description = "GitLab build ${user.project} by ${user.username}"
    } else {
        def job = Jenkins.getInstance().getItemByFullName(env.JOB_BASE_NAME, Job.class)
        def build = job.getBuildByNumber(env.BUILD_ID as int)
        def userId = build.getCause(Cause.UserIdCause).getUserId()
        def userName = build.getCause(Cause.UserIdCause).getUserName()

        user.project = "${JOB_BASE_NAME}"
        user.username = "${userName}"
        user.description = "Manual build ${user.project} by ${user.username}"
    }
    
    return user
}
```

Následné použitie je veľmi jednoduché.

```groovy
def user = getUserInfo()

echo user.project
echo user.username
echo user.description
```