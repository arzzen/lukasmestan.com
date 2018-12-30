---
title: "Program evaluation and review technique"
layout: post
date: 2017-06-21 16:00
tag: [bash, pert, review, evaluation, statistics]
image: https://arzzen.github.io/git-quick-stats/bg.png
headerImage: false
projects: true
star: false
description: "A simple utility to estimate tasks using PERT (Program evaluation and review technique)"
category: project
author: arzzen
commentIssueId: 22
externalLink: false
---

<center>
    <img alt="pert" src="https://cloud.githubusercontent.com/assets/6382002/13582789/8205bac0-e4ae-11e5-9a03-894e32943f30.gif" />
</center>

> `pert` a simple utility to estimate tasks using PERT (Program evaluation and review technique)

---
### Usage

Comma separated task list in the form `"1,2,12 4,5,9 2,3,6"`, where whitespace separates tasks.
(or you can use piping inputs `echo "1,2,3 10,30,40" | pert`)

Usage: 

`pert [optimistic,realistic,pessimistic]`

Example:

`pert 1,3,4`

`pert 10,15,20 5,7,10`

`pert "1,2,3" "15,17,20"`

`cat data.txt | pert`

`echo "1,2,3 9,10,14" | pert`


### Install

```bash
$ git clone https://github.com/arzzen/pert.git && cd pert
$ sudo make install
```

For uninstalling, open up the cloned directory and run

```bash
sudo make uninstall
```

### Example

Command:

`$ ./pert 5,7,10 2,3,4 10,12,14`

Output:
{% highlight raw %}
Tasks

 +--------------------------------------------------------------------------------------+
 | #            | optimistic | realistic | pessimistic | duration |     risk | variance |
 +--------------------------------------------------------------------------------------+
 | 1. task      |          5 |         7 |          10 |     7.16 |     0.83 |     0.68 |
 | 2. task      |          2 |         3 |           4 |     3.00 |     0.33 |     0.10 |
 | 3. task      |         10 |        12 |          14 |    12.00 |     0.66 |     0.43 |
 +--------------------------------------------------------------------------------------+
 | summary      |          - |         - |           - |    22.16 |     1.82 |     1.21 |
 +--------------------------------------------------------------------------------------+

Three point estimates

 +----------------------------------------+
 | confidence    |            |           |
 +----------------------------------------+
 | 1 Sigma - 68% |      20.34 |     23.98 |
 | 2 Sigma - 95% |      18.52 |     25.80 |
 | 3 Sigma - 99% |      16.70 |     27.62 |
 +----------------------------------------+
{% endhighlight %}


---

[Check it out](https://github.com/arzzen/pert/) here.
If you need some help, just [tell me](https://github.com/arzzen/pert/issues).
