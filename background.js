/*
Open In Popup
by Azza; MIT License
*/

/*
This function is no longer needed because this background script can get access to the current tab's url using chrome.tabs.query
function mainprogram() {
	chrome.tabs.executeScript(null, {file: 'main.js'});
}
*/

/*function makewindow(pageurl) {
	chrome.windows.create({
			url: pageurl,
			state: 'fullscreen',
			type: 'popup'
		});
}*/

function linkprogram(info, tab) {
	//var myWindow = window.open(info.linkUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.linkUrl, 
		state: 'normal',
		type: 'popup'
	});
}
function linkprogramfs(info, tab) {
	//var myWindow = window.open(info.linkUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.linkUrl, 
		state: 'fullscreen',
		type: 'popup'
	});
}

function itemprogram(info, tab) {
	//var myWindow = window.open(info.srcUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.srcUrl, 
		state: 'normal',
		type: 'popup'
	});
}
function itemprogramfs(info, tab) {
	//var myWindow = window.open(info.srcUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.srcUrl, 
		state: 'fullscreen',
		type: 'popup'
	});
}

function frameprogram(info, tab) {
	//var myWindow = window.open(info.frameUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.frameUrl, 
		state: 'normal',
		type: 'popup'
	});
}
function frameprogramfs(info, tab) {
	//var myWindow = window.open(info.frameUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.frameUrl, 
		state: 'fullscreen',
		type: 'popup'
	});
}

function pageprogram(info, tab) {
	//var myWindow = window.open(info.pageUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.pageUrl, 
		state: 'normal',
		type: 'popup'
	});
}
function pageprogramfs(info, tab) {
	//var myWindow = window.open(info.pageUrl, '', 'fullscreen=yes,menubar=no');
	chrome.windows.create({
		url: info.pageUrl, 
		state: 'fullscreen',
		type: 'popup'
	});
}

function x(e) {
	console.log(e);
}

function baprogram(info, tab) {
	if (checkedState) {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			chrome.windows.create({
				url: tabs[0].url, 
				state: 'fullscreen',
				type: 'popup'
			});
		});
	} else {
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			chrome.windows.create({
				url: tabs[0].url, 
				state: 'normal',
				type: 'popup'
			});
		});
	}
}
/*function baprogramfs(info, tab) {
	//var myWindow = window.open(info.pageUrl, '', 'fullscreen=yes,menubar=yes');
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		var myWindow = window.open(tabs[0].url, '', 'fullscreen=yes,menubar=yes');
	});
	
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		chrome.windows.create({
			url: tabs[0].url, 
			//tabId: 'My site',
			//focused: true,
			state: 'fullscreen',
			type: 'popup'
		});
	});
	console.log('happened');
}*/


//browser button
chrome.browserAction.onClicked.addListener(function(tab) {
  	//mainprogram(); is no longer needed	
	/*chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		var myWindow = window.open(tabs[0].url, '', 'fullscreen=yes,menubar=no');
	});*/
	baprogram();
});

//checkbox controller
var checkedState = false; //initial state
function changestuff() {
	checkedState = !checkedState;
	if (checkedState) {
		//if checked, remove the previous item and put in the item again but with a different onclick. This stops the onclick function being stacked as it happens when using .update
		chrome.contextMenus.remove('opencurrentpagepopupwindow');
		chrome.contextMenus.create({id: 'opencurrentpagepopupwindow', title: 'Open Current Page In Popup Fullscreen', contexts: ['page', 'editable'], onclick: pageprogramfs});
		
		chrome.contextMenus.remove('openlinkpopupwindow');
		chrome.contextMenus.create({id: 'openlinkpopupwindow', title: 'Open Link In Popup Fullscreen', contexts: ['link', 'selection'], onclick: linkprogramfs});
		
		chrome.contextMenus.remove('openitempopupwindow');
		chrome.contextMenus.create({id: 'openitempopupwindow', title: 'Open Item In Popup Fullscreen', contexts: ['image', 'video', 'audio'], onclick: itemprogramfs});
		
		chrome.contextMenus.remove('openframepopupwindow');
		chrome.contextMenus.create({id: 'openframepopupwindow', title: 'Open Frame In Popup Fullscreen', contexts: ['frame'], onclick: frameprogramfs});
		
		chrome.contextMenus.remove('opencurrentpagepopupwindowba');
		chrome.contextMenus.create({id: 'opencurrentpagepopupwindowba', title: 'Open Current Page In Popup Fullscreen', contexts: ['browser_action'], onclick: baprogram});
		
		//chrome.browserAction.onClicked.removeListener(function(tab) {baprogram();})
		//chrome.browserAction.onClicked.addListener(function(tab) {baprogramfs();});
	} else {
		chrome.contextMenus.remove('opencurrentpagepopupwindow');
		chrome.contextMenus.create({id: 'opencurrentpagepopupwindow', title: 'Open Current Page In Popup', contexts: ['page', 'editable', 'selection'], onclick: pageprogram});
		
		chrome.contextMenus.remove('openlinkpopupwindow');
		chrome.contextMenus.create({id: 'openlinkpopupwindow', title: 'Open Link In Popup', contexts: ['link', 'selection'], onclick: linkprogram});
		
		chrome.contextMenus.remove('openitempopupwindow');
		chrome.contextMenus.create({id: 'openitempopupwindow', title: 'Open Item In Popup', contexts: ['image', 'video', 'audio'], onclick: itemprogram});
		
		chrome.contextMenus.remove('openframepopupwindow');
		chrome.contextMenus.create({id: 'openframepopupwindow', title: 'Open Frame In Popup', contexts: ['frame'], onclick: frameprogram});
		
		chrome.contextMenus.remove('opencurrentpagepopupwindowba');
		chrome.contextMenus.create({id: 'opencurrentpagepopupwindowba', title: 'Open Current Page In Popup', contexts: ['browser_action'], onclick: baprogram});
		
		//chrome.browserAction.onClicked.removeListener(function(tab) {baprogramfs();})
		//chrome.browserAction.onClicked.addListener(function(tab) {baprogram();});
	}
}


//context menu initialisation
chrome.contextMenus.create({id: 'opencurrentpagepopupwindow', title: 'Open Current Page In Popup', contexts: ['page', 'editable'], onclick: pageprogram});
chrome.contextMenus.create({id: 'openlinkpopupwindow', title: 'Open Link In Popup', contexts: ['link', 'selection'], onclick: linkprogram});
chrome.contextMenus.create({id: 'openitempopupwindow', title: 'Open Item In Popup', contexts: ['image', 'video', 'audio'], onclick: itemprogram});
chrome.contextMenus.create({id: 'openframepopupwindow', title: 'Open Frame In Popup', contexts: ['frame'], onclick: frameprogram});
chrome.contextMenus.create({id: 'opencurrentpagepopupwindowba', title: 'Open Current Page In Popup From Button', contexts: ['browser_action'], onclick: baprogram});

chrome.contextMenus.create({id: 'fullscreenboolean', type: 'checkbox', title: 'Fullscreen?', contexts: ['browser_action'], checked: checkedState, onclick: changestuff});


//omnibox version

//searching
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    if (text === '') {
    	chrome.omnibox.setDefaultSuggestion({description: 'Open a URL in a popup window'});
    }
    
    var patt = /http:\/\//i;
	var pattwo = /https:\/\//i;
	
	var check = text.match(patt);
	var checktwo = text.match(pattwo);
	
	if (check != null || checktwo != null) {
		text = text;
	} else {
		text = 'http://' + text;
	}
    chrome.omnibox.setDefaultSuggestion({description: 'Open <url>' + text + '</url> in a popup window'});
})

//entered
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    
    //var newUrl = encodeURIComponent(text);

	var patt = /http:\/\//i;
	var pattwo = /https:\/\//i;
	
	var check = text.match(patt);
	var checktwo = text.match(pattwo);
	
	if (check != null || checktwo != null) {
		//good on ya
		console.log('works out alright');
	} else {
		console.log('');
		console.log(text);
		text = 'http://' + text;
		console.log(text);
	}
    if (checkedState) {
			chrome.windows.create({
				url: text, 
				state: 'fullscreen',
				type: 'popup'
			//}, x);
			});
	} else {
			chrome.windows.create({
				url: text, 
				state: 'normal',
				type: 'popup'
			//}, x);
			});
	}
  });