---
title: "Adwords scripts tips and tricks"
layout: post
date: 2018-10-30 10:00
image: /assets/images/adwords-code-gs.png
headerImage: false
tag: [adwords, scripts]
star: true
category: blog
author: arzzen
commentIssueId: 15
description: Adwords scripts tips and tricks. 
---


I would like to provide a small collection of helper functions. 
You can it pasting into every script you work on.



How to capitalize words?
```
function capitalizeWords(replaced) {
    var words = replaced.split(/[- ]/g);
    for(var i=0; i < words.length; i++) {
        replaced = replaced.replace(words[i], words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
    }

    return replaced;
}
```

how to truncate string to specific length?
```
function truncate(string, length, truncation) {
    length = length || 30;
    truncation = _.isUndefined(truncation) ? '...' : truncation;
    return string.length > length ? string.slice(0, length - truncation.length) + truncation : String(string);
}
```

How to find google spreadsheet by name, if does not exist they created it.
```javascript
function getSheet(spreadsheet, name) {
    var spreadSheet;

    if (spreadsheet.indexOf('https://') !== -1) {
        spreadSheet = SpreadsheetApp.openByUrl(spreadsheet);
    } else {
        spreadSheet = SpreadsheetApp.openById(spreadsheet);
    }

    var sheet = spreadSheet.getSheetByName(name);
    if (!sheet) {
        sheet = spreadSheet.insertSheet(name).setName(name);
    }

    return sheet;
}
```

How to check if a string is a number? Used when grabbing numbers from the sheet.
```
function isNumber(n) {
    if(typeof n == "number") {
        return true;
    }

    n = n.trim();
    var digits = n.split("");
    for(var d in digits) {
        if(digits[d]==".") {
            continue;
        }

        if(isNaN(digits[d])) {
            return false;
        }
    }

    return true;
}
```

How to calculate Return On Advertising Spend (ROAS)?
```
function calculateRoas(conversionValue, cost) {
    if(cost == 0 || conversionValue == 0 || cost > conversionValue) {
        return 0;
    }
   
    return conversionValue / cost;
}
```

How to turn an array of logs into a numbered string?
```
function stringifyLogs(logs) {
    var s = "";
    for(var l in logs) {
        s += (parseInt(l) + 1) + ") ";
        s += logs[l] + " ";
    }

    return s;
}
```

Get AdWords Formatted date for "n" days back.
```
function getAdWordsFormattedDate(d, format) {
    var date = new Date();
    date.setDate(date.getDate() - d);
    return Utilities.formatDate(date, AdWordsApp.currentAccount().getTimeZone(), format);
}
```

How to round number value by precision?
```
function round(num, n) {    
    return +(Math.round(num + "e+" + n) + "e-" + n);
}
```

How to add user (email) to editors to the spreadsheet?
```
function addEditors(spreadsheet, editors) {
    var currentEditors = spreadsheet.getEditors();
    var emails = [];
    for(var c in currentEditors) {
        emails.push(currentEditors[c].getEmail().trim().toLowerCase()); 
    }

    for(var e in editors) {
        var index = emails.indexOf(editors[e])
        if(emails.indexOf(editors[e]) == -1) {
            spreadsheet.addEditor(editors[e]);
        }
    }
}
```

How to fetch remote script and execute it?
```
function executeScript(url) {
    var content = UrlFetchApp.fetch(url).getContentText();
    eval(content);
}
```

How to send an email when there is an error in the function?
```
function notifyOnError(theFunction) {
    var TO_NOTIFY = [
        'your-username@email-domain.com'
    ];
    
    try {
        return theFunction();
    } catch (e) {
        Logger.log(e);
        var subject = '[SCRIPT FAILURE] ' + theFunction.name;
        var body = 'The script ' + theFunction.name + ' has failed with the following error: ' + e;
        for (var i in TO_NOTIFY) {
            MailApp.sendEmail(TO_NOTIFY[i], subject, body);
        }
    }
}
```

Usage:
```
notifyOnError(function yourFunctionName() {
    // your code 
});
```


How to check if value is in array?
```
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
```


How to create the label if it does not already exist?
```
function createLabelIfNeeded(name) {  
    if (!AdWordsApp.labels().withCondition("Name = '" + name + "'").get().hasNext()) {
        AdWordsApp.createLabel(name);
    }
}
```

How to find the date days ago?
```
function getDateDaysAgo(days) {
    var the_past = new Date();
    the_past.setDate(the_past.getDate() - days);
    return Utilities.formatDate(the_past, AdWordsApp.currentAccount().getTimeZone(), "yyyyMMdd");
}
```

How to compare dates?
```
function diffDays(firstDate, secondDate) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}
```

How to check if object is empty?
```
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
```

How to calculate average quality score for date?
```
function getAverageQualityScore(date) {
    var timeZone = AdWordsApp.currentAccount().getTimeZone();
    var dateString = Utilities.formatDate(date, timeZone, 'yyyyMMdd');

    var kw_iter = AdWordsApp.keywords()
        .withCondition("Status = ACTIVE")
        .forDateRange(dateString + ',' + dateString)
        .withCondition("Impressions > 0")
        .orderBy("Impressions DESC")
        .withLimit(50000)
        .get()
    ;

    var sum_qs = 0;
    var count_qs = 0;
    while (kw_iter.hasNext()) {
        var kw = kw_iter.next();
        var kw_stats = kw.getStatsFor("YESTERDAY");
        var imps = kw_stats.getImpressions();
        var qs = kw.getQualityScore();
        var imps_weighted_qs = (qs * imps);

        count_qs++;
        sum_qs += qs;
    }

    return sum_qs / count_qs;
}
```

Get comparator for sort function
```
function getComparator(sortFieldName, reverse) {
    return function (obj1, obj2) {
        var retVal = 0;
        var val1 = parseInt(obj1[sortFieldName], 10);
        var val2 = parseInt(obj2[sortFieldName], 10);
        if (val1 < val2)
            retVal = -1;
        else if (val1 > val2)
            retVal = 1;
        else
            retVal = 0;

        if (reverse) {
            retVal = -1 * retVal;
        }

        return retVal;
    }
}
```

usage:
```
keywordArray.sort(getComparator("Clicks", true));
```

How to find value in column in spreadsheet?
```
function findInColumn(column, data, sheet, initRow) {
    var column = sheet.getRange(column + ":" + column);
    var values = column.getValues();

    var row = initRow || 0;
    while (values[row] && values[row][0] !== data) {
        row++;
    }

    if (values[row] && values[row][0] === data) {
        var line = row + 1;
        return {
            line: line,
            values: values[row],
        }
    } else {
        return -1;
    }
}
```

usage:
```
value = findInColumn('A', keyword, spreadsheet);
```



## TL&DR AdWords scripts limitations:

There was various limits and limitations in Google Ads scripts that you should be aware of. These limits can change at any time without warning, so ensure that your scripts are flexible and contain error handling.

#### Ads scripts:

* Ads Manager scripts can **normally execute** for a maximum of **30 minutes** after which they will be cancelled.
* Script uses the **executeInParallel** method to process accounts in parallel, and specify a callback method, 
then it can execute up to a maximum of **60 minutes** before being cancelled
* When using **executeInParallel** method, a script can process **up to 50 accounts**.

_All of the changes made before the script was cancelled will be applied._

#### Limits:

* **Each entities** will return at most **50,000 entities** (iterator.hasNext() will return false after that, and a warning will be logged):
    * keywords, 
    * ads, 
    * ad groups, 
    * campaigns.
* A single selector can handle at most **10,000 IDs in selector** .withIds(). If 10,000 or more IDs are specified, 
selector.get() will throw a runtime error. Similarly, specifying an Id IN [LIST] condition with a list of IDs > 10,000 will 
result in a runtime error.
* A single script can process at most **250,000 entities of all types**. iterator.hasNext() will return false afterwards for any iterator, and a warning will be logged.
* A single script can **create 250,000 keywords and ads** at the most. Successive attempts to create entities will fail, and a warning will be logged.
* **Logging output** will be **truncated at 100Kb**. A warning will be logged if that happens.
* The **processAccount** method from executeInParallel can return **up to 10MB** of data.
* The **upload file** is limited to **50MB and one million rows**, and will be rejected upon submission if it exceeds these limits.
* An **upload job times** out after **2 hours** and the job will stop processing any remaining data from the uploaded file



