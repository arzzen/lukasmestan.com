---
title: "How to handle all errors in Adwords scripts"
layout: post
date: 2018-11-04 10:00
image: /assets/images/adwords-code-gs.png
headerImage: false
tag: [adwords, scripts]
star: false
category: blog
author: arzzen
commentIssueId: 19
description: How to handle all errors in Adwords scripts. 
---

In complex adwords scripts, some errors and exceptions can occur...

Applying this function you will be automatically alerted via email if your code starts to fail. 
```
/**
 * Sends an email when there is an error in theFunction
 *
 * @param {Object} theFunction
 * @return {Mixed}
 */
function notifyOnError(theFunction) {
    var TO_NOTIFY = [
        'your-username@email-domain.com'
    ];
    
    try {
        return theFunction();
    } catch (e) {
        Logger.log(e);

        var date = Utilities.formatDate(new Date(), AdWordsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd');
        var subject = '[SCRIPT FAILURE] ' + theFunction.name;
        var body = '[' + date + '] The script ' + theFunction.name + ' has failed with the following error: ' + e;
        for (var i in TO_NOTIFY) {
            MailApp.sendEmail(TO_NOTIFY[i], subject, body);
        }
    }
}
```
Now, not only will you see the message in the logs, but you will receive also an email with the error message as well.
You could also write the error information to a spreadsheet doc using the `SpreadsheetApp` class.


## Working on client accounts (non-MCC scripts)

Wrapping your entire main function allows you to easily be notified whenever your script starts failing.
```
function main() {
    notifyOnError(function yourFunctionName() {
        // process your code here
        ...
    });
}
```
> Don't forget to change `yourFunctionName` to your name, which describe your script.


## Working on accounts in parallel (MCC scripts)

For catching errors in an MCC level script which runs in parallel is different. 
The methods in `executeInParallel` are considered to be independent methods. 
You will need to put a try-catch logic in `main()`, `processClientAccount()` and `afterProcessAllClientAccounts()` functions. 

```
function main() {
    MccApp.accounts().executeInParallel("processClientAccount", "afterProcessAllClientAccounts");
}

function processClientAccount() {
    return notifyOnError(function yourFunctionName() {
        var clientAccount = AdWordsApp.currentAccount();

        // process your code here
        ...

        // optionally, return a result, as a text.
        return "";
    });
}

function afterProcessAllClientAccounts(results) {
    for (var i in results) {
        var status = results[i].getStatus();
        if (status !== 'OK') {
            notifyOnError(function yourFunctionName() {
                throw Error(results[i].getError());
            });
        }
    }
}
```
> Don't forget to change `yourFunctionName` to your name, which describe your script.
