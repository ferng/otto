"use strict";

var sessionDataMap = {};
prepSessionData();

var part1Fields = 
  [
    {"field": "customer1Surname", "value": getSessionData("sname") },
    {"field": "customer1Forename", "value": getSessionData("fname") },
    {"field": "customer1Postcode", "value": "N1 0JB" },
    {"field": "customer1DateOfBirth", "value": "01/01/1980" },
    {"field": "customer1Num_0", "value": getSessionData("num0") },
    {"field": "customer1Num_1", "value": getSessionData("num1") },
    {"field": "customer1Num_2", "value": getSessionData("num2") },
    {"field": "customer1Num", "value": getSessionData("num0") + getSessionData("num1") + getSessionData("num2") },
    {"field": "grantInd", "value": 1 }
  ]

var part2Fields = 
  [
    {"field": "data.sourceId", "value": 1 },
    {"field": "data.someOtherField", "value": 0 },
    {"field": "data.oneMoreField", "value": 0 },
  ]

var part3Fields = 
  [
    {"field": "data.startDate", "value": getDate() },
    {"field": "confirmReadMessage", "value": 1 }
  ]


var title = document.getElementsByTagName("frame")[2].contentDocument.getElementsByClassName("wizardLeft")[0].innerHTML;
console.log(title); 
switch (title) {
  case "WindowTitle1":
    part1Fields.forEach(popData);
    break;
  case "WindowTitle2":
    part2Fields.forEach(popData);
    break;
  case "WindowTitle3":
    part3Fields.forEach(popData);
    break;
  case "WindowTitle4":
    document.getElementsByTagName("frame")[2].contentDocument.forms['AppForm'].elements["activeCust.answerText"][0].value="test";
    document.getElementsByTagName("frame")[2].contentDocument.forms['AppForm'].elements["activeCust.answerText"][1].value="test";
    triggerSubmit(2, 6);
    break;
}


function prepSessionData() {
  addSessionData("sname", "fernS" + getRandomString(5, 97, 26));
  addSessionData("fname", "fernF" + getRandomString(5, 97, 26));
  addSessionData("num0", getRandomString(2, 97, 26));
  addSessionData("num1", getRandomString(6, 48, 10));
  addSessionData("num2", getRandomString(1, 97, 26));
}


function addSessionData(key, value) {
  sessionDataMap[key] = value;
}


function getSessionData(key) {
  return sessionDataMap[key];
}


function popData(elementData) {
  var field = document.getElementsByTagName("frame")[2].contentDocument.forms['ApplForm'].elements[elementData.field];
  var tagType = field.nodeName;
  if (tagType == "SELECT") {
    if (typeof(elementData.value) == "number") {
      field.selectedIndex=elementData.value;
    } else {
      field.value=elementData.value;
    }
  } else if (typeof(field.nodeName) == "undefined") {
    if (field[0].nodeName == "INPUT" && field[0].type == "radio") {
      field[elementData.value].checked=true;
    }
  } else {
    var fieldType = field.type;
    if (fieldType == "checkbox") {
      field.checked=elementData.value;
    } else {
      field.value=elementData.value;
    }
  }
}


function triggerSubmit(frameIndex, tagIndex) {
  document.getElementsByTagName("frame")[frameIndex].contentDocument.getElementsByTagName("a")[tagIndex].click();
}


function getRandomString(len, asciiStart, rangeLen)
{
  var rndStr = "";
  var offset;

  for( var i=0; i < len; i++ ) {
    offset = (Math.random() * 100) % rangeLen;
    rndStr += String.fromCharCode(asciiStart + offset);
  }

  return rndStr;
}


function getDate() {
  var today = new Date();
  today.setDate(today.getDate()+2)

  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  dd = (dd < 10) ? "0" + dd : dd;
  mm = (mm < 10) ? "0" + mm : mm;

  return dd + '/'+ mm + '/'+ yyyy;
}
