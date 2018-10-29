---
title: "Adwords scripts multi-file support"
layout: post
date: 2018-10-28 10:00
image: /assets/images/adwords-scripts-multi-files.png
headerImage: false
tag: [adwords, scripts]
star: true
category: blog
author: arzzen
commentIssueId: 17
description: Adwords scripts multiple files with examples. 
---

On [July 18, 2018 google adwords](https://ads-developers.googleblog.com/2018/07/new-features-in-adwords-scripts.html) 
teams announce the launch of a new feature called "Multi-file script support".
The new feature is in the new AdWords (google ads) interface, there are clearly "files" of code within each "Script".
Default file is Code.gs (you are not limited to a single Code.gs file). You can spread server code across multiple files for ease of development. 

<img src="/assets/images/adwords-scripts-multi-files.png" alt="adwords multiple files" />

All of the server files are loaded into the same global namespace, so you should use classes or functions when you want to provide safe encapsulation.
This functionality lets you separate your utility logic from your business logic, organize your code and generally produce more maintainable scripts.

_Simply said:_
> You don't need to do anything, every function in every script files in the same project is accessible from any script file...,  
the separation in script files is only a comfortable way to store things the way you want. The project is the only "real" container.


## Some useful hints about "main" function

1. The `main` function is required
2. Script must have only one `main` function 
3. The `main` function can be in any file, but only once

## Useful examples

I would like to provide a small example, how to use multiple file feature. 
You can create `Log.gs` file on left side in editor and paste "log" functions.

<img src="/assets/images/adwords-log-gs.png" alt="adwords log.gs file" />

**Log.gs** file:
```javascript
function log(s) {
    Logger.log("[LOG]: " + s);
}

function notice(s) {
    Logger.log("[NOTICE]: " + s);
}

function info(s) {
    Logger.log("[INFO]: " + s);
}

function warning(s) {
    Logger.log("[WARNING]: " + s);
}

function error(s) {
    throw new Error(s);
}
```

In the main `Code.gs` file you can use our log functions.  

<img src="/assets/images/adwords-code-gs.png" alt="adwords code.gs file" />

**Code.gs** file:
```javascript
function main() {
    log('log message');
    notice('notice message');
    info('info message');
    warning('warning message');
    error('error message');
}
```

After running your script you can see result in **LOGS** output:

<img src="/assets/images/adwords-logs-report.png" alt="adwords logs script" />




