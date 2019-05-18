---
title: "Working with dates and times in Google Ads scripts"
layout: post
date: 2019-05-18 10:00
image: /assets/images/adwords-code-gs.png
headerImage: false
tag: [adwords, ads scripts, google, date, time]
star: false
category: blog
author: arzzen
commentIssueId: 28
description: Working with dates and times in Google Ads scripts
---

How to understand that even though the AdWords account time was Central, 
dates generated in an AdWords script are based off of the server time where the script is running?
At that time, scripts may running in a data center on Pacific time. Since data centers can move, 
and it’s possible the script can execute in a data center in a different time zone, it’s better to rely on your accounts time instead.

When creating a date object using a string that does not provide a timezone offset, 
in Google Ads scripts, the timezone is assumed to be America/Los_Angeles (Pacific time), 
regardless of the timezone associated with the Google Ads account.

## How to format date object?

If you would like to render the date object as a string using a custom format and timezone for 
logging or other purposes, always use `Utilities.formatDate(date, timeZone, format)`.

Date and time formats are specified by date and time pattern strings.
Within date and time pattern strings, unquoted letters from 'A' to 'Z' and from 'a' to 'z' are 
interpreted as pattern letters representing the components of a date or time string. 
Text can be quoted using single quotes (') to avoid interpretation. `"''"` represents a single quote. 
All other characters are not interpreted; they're simply copied into the output string during formatting or 
matched against the input string during parsing. 
 
#### Speficitation of Date and Time Patterns:

|**Letter**| 	**Date or Time Component** 	|**Presentation** 	|**Examples**|
|---|---|---|---|
|G 	|Era designator 	|Text 	|AD|
|y 	|Year 	|Year 	|1996; 96|
|Y 	|Week year 	|Year 	|2009; 09|
|M 	|Month in year 	|Month 	|July; Jul; 07|
|w 	|Week in year 	|Number 	|27|
|W 	|Week in month 	|Number 	|2|
|D 	|Day in year 	|Number 	|189|
|d 	|Day in month 	|Number 	|10|
|F 	|Day of week in month 	|Number 	|2|
|E 	|Day name in week 	|Text 	|Tuesday; Tue|
|u 	|Day number of week (1 = Monday, ..., 7 = Sunday) 	|Number 	|1|
|a 	|Am/pm marker 	|Text 	|PM|
|H 	|Hour in day (0-23) 	|Number 	|0|
|k 	|Hour in day (1-24) 	|Number 	|24|
|K 	|Hour in am/pm (0-11) 	|Number 	|0|
|h 	|Hour in am/pm (1-12) 	|Number 	|12|
|m 	|Minute in hour 	|Number 	|30|
|s 	|Second in minute 	|Number 	|55|
|S 	|Millisecond 	|Number 	|978|
|z 	|Time zone 	|General time zone 	|Pacific Standard Time; PST; GMT-08:00|
|Z 	|Time zone 	|RFC 822 time zone 	|-0800|
|X 	|Time zone 	|ISO 8601 time zone 	|-08; -0800; -08:00|
    

#### Examples

The following examples show how date and time patterns are interpreted in the U.S. locale. 
The given date and time are 2019-05-17 12:08:56 local time in the U.S. Pacific Time time zone.

|**Date and Time Pattern** |	**Result**|
|---|---|
|"yyyy.MM.dd G 'at' HH:mm:ss z" 	|2019.05.17 AD at 12:08:56 PDT|
|"EEE, MMM d, ''yy" 	|Sat, May 17, '01|
|"h:mm a" 	|12:08 PM|
|"hh 'o''clock' a, zzzz" 	|12 o'clock PM, Pacific Daylight Time|
|"K:mm a, z" 	|0:08 PM, PDT|
|"yyyyy.MMMMM.dd GGG hh:mm aaa" 	|02019.May.17 AD 12:08 PM|
|"EEE, d MMM yyyy HH:mm:ss Z" 	|Sat, 17 May 2019 12:08:56 -0700|
|"yyMMddHHmmssZ" 	|190517120856-0700|
|"yyyy-MM-dd'T'HH:mm:ss.SSSZ" 	|2019-05-17T12:08:56.235-0700|
|"yyyy-MM-dd'T'HH:mm:ss.SSSXXX" 	|2019-05-17T12:08:56.235-07:00|
 

To get the year, month, date, day, hours, or minutes for a date object in your account's timezone, 
use `Utilities.formatDate(date, timeZone, format)` with a format specifying the part of the date or time you want, 
and use `AdsApp.currentAccount().getTimeZone()` to get your account's timezone.

You should generally avoid using methods from javascript `Date` object:

- getFullYear()
- getMonth()
- getDate()
- getDay()
- getHours()
- getMinutes()

The following example method I used in order to make sure all dates were set in the same time zone (not the server time at Google).

```javascript
/**
 * The time will convert to whatever server/data center the script is running on,
 * make sure the time is set to the Adwords account time
 * 
 * @param {Date} date|undefined
 */
function getProperDate(dateObject) {
  var date = dateObject || new Date();
  return new Date(Utilities.formatDate(date, AdsApp.currentAccount().getTimeZone(), "MMM dd,yyyy HH:mm:ss Z"));
}
```
