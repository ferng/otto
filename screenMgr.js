chrome.browserAction.onClicked.addListener(function (tab) {
  executeExtension(arrayOfTabs[0], true);
});

chrome.commands.onCommand.addListener(function(command) {
  if(command == "fill_data"){
    chrome.tabs.query({currentWindow: true, active : true},
      function(arrayOfTabs){
        executeExtension(arrayOfTabs[0], true);
      }
    );
  }

});

function executeExtension(tab, enableLazyMode) {
  if (tab.url.search("^http:\/\/.*\/runlog\/app$") != -1) {
    chrome.tabs.executeScript(tab.id, {
      "file": "scrApp.js"
    });
  }
}
