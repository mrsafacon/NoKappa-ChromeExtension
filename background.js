var hideObj = {
  code : "[data-a-target='emote-name']{display:none !important;}",
  allFrames : true
 };

var showObj = {
 code : "[data-a-target='emote-name']{display:inline !important;}",
 allFrames : true
};

var showIcon = { path : {
  "16" : "icons/show16.png",
  "32" : "icons/show32.png"
}};

var hideIcon = { path : {
  "16" : "icons/hide16.png",
  "32" : "icons/hide32.png"
}};

var queryInfo = {url : "*://*/*"};

var show;



function toggle(){
  if(show === true)show = false;
  else  show = true;
  chrome.storage.local.set({"show": show});
  chrome.tabs.query(queryInfo, updateAllTabs);
}

function updateAllTabs(tabs){
  //console.log(tabs);
  if(show === true){
    chrome.browserAction.setIcon(showIcon);
    for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.insertCSS(tabs[i].id, showObj);
    }
  } else {
    for (var i = 0; i < tabs.length; i++) {
        chrome.browserAction.setIcon(hideIcon);
        chrome.tabs.insertCSS(tabs[i].id, hideObj);
    }
  }
}


//-----------Initialize (load current state)------------

chrome.storage.local.get(["show"],init);

function init(result){
  if(result.show !== null)show = result.show;
  else show = false;

  chrome.tabs.query(queryInfo, updateAllTabs);
}


//--------------Click plugin button to toggle-----------

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
  toggle();
}



//------------Reapply on changes ----------

chrome.tabs.onUpdated.addListener(update);

function update(id, changeInfo, tab){
  if(show === true) chrome.tabs.insertCSS(id, showObj);
  else chrome.tabs.insertCSS(id, hideObj);
}
