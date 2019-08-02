---
title: "Adwords scripts example tips and tricks - second part"
layout: post
date: 2019-08-02 10:00
image: /assets/images/adwords-code-gs.png
headerImage: false
tag: [adwords, scripts]
star: false
category: blog
author: arzzen
commentIssueId: 30
description: Adwords scripts example tips and tricks - second part. 
---

Following the previous blog post about [tips and tricks for Adwords Scripts](https://lukasmestan.com/adwords-scripts-tips-and-tricks/), 
here is another post stuffed with tips and tricks to ease your workflow!


You can it pasting into every script you work on.


How to split date string to date separated by comma?
```javascript
/**
 * Convenience function fo reformat a string date from YYYYMMDD to YYYY-MM-DD.
 *
 * @param {string} date String in form YYYYMMDD.
 * @return {string} String in form YYYY-MM-DD.
 */
function separateDateString(date) {
  return [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2)].join('-');
}
```

How to retrieves all the IDs from set of entities?
```javascript                                                                         
/**
 * Retrieves the IDs of a set of Google Ads scripts entities.
 *
 * @param {Object} iterator An iterator over a Google Ads scripts entity that has a getId() method.
 * @return {Array.<number>} An array of IDs of the entities.
 */
function getEntityIds(iterator) {
  var ids = [];

  while (iterator.hasNext()) {
    ids.push(iterator.next().getId());
  }

  return ids;
}
```

How to compare two numbers?
```javascript   
/**
 * Compares two numbers using a given operator.
 *
 * @param {number} firstNumber The first number in the comparison.
 * @param {number} secondNumber The second number in the comparison.
 * @param {string} operator The operator for the comparison.
 * @return {boolean} The result of the comparison 'val1 op val2'.
 */
function compare(firstNumber, secondNumber, operator) {
  switch (operator) {
    case '=':
      return firstNumber == secondNumber;
    case '!=':
      return firstNumber != secondNumber;
    case '<':
      return firstNumber < secondNumber;
    case '>':
      return firstNumber > secondNumber;
    case '<=':
      return firstNumber <= secondNumber;
    case '>=':
      return firstNumber >= secondNumber;
  }
}
```

How to convert value to float?
```javascript   
/**
 * Convert value to float.
 *
 * @param {string} value
 * @return {number} The converted value.
 */
function toFloat(value) {
  value = value.toString().replace(/,/g, '');
  return parseFloat(value);
}
```

How to remove leading and trailing character from the text?
```javascript   
/**
 * Removes leading and trailing match type punctuation from the first and
 * last character of a keyword's text, if any.
 *
 * @param {string} text A keyword's text to remove punctuation from.
 * @param {string} open The character that may be the first character.
 * @param {string} close The character that may be the last character.
 * @return {Object} The same text, trimmed of open and close if present.
 */
function trimKeyword(text, open, close) {
  if (text.substring(0, 1) == open &&
      text.substring(text.length - 1) == close) {
    return text.substring(1, text.length - 1);
  }

  return text;
}
```

How to test if text is appear in other text?
```javascript   
/**
 * Tests whether all of the tokens in one keyword's raw text appear in
 * order in the tokens of a second keyword's text.
 *
 * @param {string} keywordText1 the raw keyword text whose tokens may
 *     appear in the other keyword text.
 * @param {string} keywordText2 the raw keyword text which may contain
 *     the tokens of the other keyword in order.
 * @return {boolean} Whether all tokens in keywordText1 appear in order
 *     among the tokens of keywordText2.
 */
function isSubsequence(keywordText1, keywordText2) {
  return (' ' + keywordText2 + ' ').indexOf(' ' + keywordText1 + ' ') >= 0;
}
```

How to get number of days between two timestamps?
```javascript   
/**
 * Returns the number of days between two timestamps.
 *
 * @param {number} firstTime the newer (more recent) timestamps
 * @param {number} secondTime the older timestamps
 * @return {number} number of full days between the given dates
 */
function dayDifference(firstTime, secondTime) {
  return parseInt((secondTime - firstTime) / (24 * 3600 * 1000));
}
```

How to get current timestamp value?
```javascript   
/**
 * Returns the current timestamp.
 *
 * @return {number} the current timestamp
 */
function getTimestamp() {
  return new Date().getTime();
};
```

How to protect spreadsheet tab?
```javascript   
/**
 * Adds protection and notes to a sheet / tab.
 *
 * @param {object} the sheet to add protection to
 */
function setSheetProtection(tab) {
    var protection = tab.protect().setDescription(tab.getName() + ' Protection');
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
        protection.setDomainEdit(false);
    }
};

// usage
var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
var tab = spreadsheet.getSheetByName('TAB_NAME');
setSheetProtection(tab);
```

How to remove protection from spreadsheet tab?
```javascript   
/**
 * Remove the protection from a sheet / tab.
 *
 * @param {object} the sheet to remove protection from
 */
function removeSheetProtection(tab) {
    var protection = tab.getProtections(SpreadsheetApp.ProtectionType.SHEET)[0];
    if (protection && protection.canEdit()) {
      protection.remove();
    }
    tab.clearNotes();
};
```

How to create data folder in Google Drive?
```javascript   
/**
 * Creates a new Google Drive folder. If folder name is already in
 * use will pick the first folder with a matching name.
 *
 * @return {Folder} Google Drive folder to store reports.
 */
function getDriveFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER);
  // Assume first folder is the correct one.
  if (folders.hasNext()) {
   Logger.log('Folder name found.  Using existing folder.');
   return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER);
}
```

How to write data to Google Drive?
```javascript   
/**
 * Writes a file to Drive, compressing as a zip file.
 *
 * @param {!Folder} folder The parent folder for the file.
 * @param {string} fileName The name for the file.
 * @param {string} data The data to write to the file.
 */
function saveCompressedFile(folder, fileName, data) {
  var compressed = Utilities.zip([Utilities.newBlob(data)]);
  compressed.setName(fileName);
  folder.createFile(compressed);
}
```
