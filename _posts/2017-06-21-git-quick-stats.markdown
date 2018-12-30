---
title: "Git quick statistics :chart_with_upwards_trend:"
layout: post
date: 2017-06-21 15:00
tag: [git, bash, statistics]
image: https://arzzen.github.io/git-quick-stats/bg.png
headerImage: false
projects: true
star: false
description: "Git quick statistics is a simple and efficient way to access various statistics in git repository"
category: project
author: arzzen
commentIssueId: 21
externalLink: false
---

<center>
    <img alt="git-stats" src="https://arzzen.github.io/git-quick-stats/bg.png" />
</center>

> `git quick-stats` is a simple and efficient way to access various statistics in git repository.

Any git repository contains a tonne of information about commits, contributors, and files. Extracting this information is not always trivial, mostly because of a gadzillion options to a gadzillion git commands – I don’t think there is a single person alive who knows them all. Probably not even Linus Torvalds himself :).

---

## Usage

```bash
git quick-stats
# or 
git-quick-stats
```

Or you can use (non-interactive) direct execution:

`git quick-stats <optional-command-to-execute-directly>`

Possible arguments: 
> suggestReviewers, detailedGitStats, commitsByHour, commitsByWeekday, commitsByMonth, commitsPerDay, commitsPerAuthor, myDailyStats, contributors,
branchTree, branchesByDate, changelogs, changelogsByAuthor


#### Git log since / until

You can set variable `_GIT_SINCE`, `_GIT_UNTIL` and limit the git log

```bash
export _GIT_SINCE="2017-20-01"
export _GIT_UNTIL="2017-22-01"
```

then run `git quick-stats` (affect all stats, except "My daily status" and "Git changelogs" )


#### Git log limit 

You can set variable `_GIT_LIMIT` for limited output (it will affect: "Git changelogs" and "Branch tree view" )

```bash
export _GIT_LIMIT=20
```

#### Git pathspec

You can exclude directory from the stats by using [pathspec](https://git-scm.com/docs/gitglossary#gitglossary-aiddefpathspecapathspec)

```bash
export _GIT_PATHSPEC=':!directory'
```


## Installation

#### Unix like OS

```bash
git clone https://github.com/arzzen/git-quick-stats.git && cd git-quick-stats
sudo make install
```

For uninstalling, open up the cloned directory and run

```bash
sudo make uninstall
```

For update/reinstall

```bash
sudo make reinstall
```

#### OS X (homebrew)

```bash
brew install git-quick-stats
```

#### Windows (cygwin)

* [installer](https://gist.github.com/arzzen/35e09866dfdadf2108b2420045739245) 
* [uninstaller](https://gist.github.com/arzzen/21c660014d0663b6c5710014714779d6)


## System requirements

* Unix like OS with a proper shell
* Tools we use: git ; awk ; sed ; tr ; echo ; grep ; cut ; sort ; head ; uniq ; column.



---

[Check it out](https://github.com/arzzen/git-quick-stats) here.
If you need some help, just [tell me](https://github.com/arzzen/git-quick-stats/issues).
