/*
Open In Popup
by Azza; MIT License
*/


const chromep = new ChromePromise();

function x(e) {
	console.log('Something happened:', e);
}

function restore() {
	chromep.storage.local.get('initial').then(function(item) {
		//console.log('restore()');
		//console.log('item.initial:', item.initial);
		if (item.initial == false) {
			//console.log('initial was false');
			return chromep.storage.local.get(['initial', 'width', 'fullscreen', 'close']);
		} else {
			chromep.storage.local.set({initial: false, width: 'default', fullscreen: false, close: false}).then(function() {
				//console.log('initialised settings');
			});
			return chromep.storage.local.get(['initial', 'width', 'fullscreen']);
		}
	}).then(function(state) {
		//console.log('state.width:', state.width);
		//console.log('state.fullscreen:', state.fullscreen);
		//console.log('screen.width', screen.width)
	}).catch(function(reason) {
		x(reason);
	});
}
restore();

//the full function
function makewindow(url) {
	//make an object for the new window
	if (windowobj) {
		delete windowobj;
	}
	var windowobj = {};
	
	//initialise some of the window values
	windowobj.url = url;
	windowobj.type = 'popup';
	
	//states: set the state
	chromep.storage.local.get('width').then(function(item) {
		if (item.width == 'default') {
			//console.log('no set width, so: default');
		} else if (item.width == 'half') {
			scrnwdth = screen.width / 2;
			windowobj.width = scrnwdth;
			scrnhght = screen.height;
			windowobj.height = scrnhght;
		} else if (item.width == 'third') {
			scrnwdth = screen.width / 3;
			windowobj.width = scrnwdth;
			scrnhght = screen.height;
			windowobj.height = scrnhght;
		} else if (item.width == 'full') {
			scrnwdth = screen.width;
			scrnhght = screen.height;
			windowobj.width = scrnwdth;
			windowobj.height = scrnhght;
		} else {
			console.log('there was nothing set in item.width:', item.width);
		}
		return chromep.storage.local.get('fullscreen')
	//widths: set the width
	}).then(function (item) {
		if (item.fullscreen == true) {
			windowobj.state = 'fullscreen';
			if (windowobj.width) {
				delete windowobj.width;
			}
			if (windowobj.height) {
				delete windowobj.height;
			}
		} else {
			windowobj.state = 'normal';
		}
		//console.log(windowobj);
		chrome.windows.create(windowobj);
	}).catch(function(reason) {
		x(reason);
	});
	
}

function linkprogram(info, tab) {
	makewindow(info.linkUrl);
}

function itemprogram(info, tab) {
	makewindow(info.srcUrl);
}

function frameprogram(info, tab) {
	makewindow(info.frameUrl);
}

function pageprogram(info, tab) {
	makewindow(info.pageUrl);
}

function baprogram(info, tab) {
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		makewindow(tabs[0].url);
	});
}


//browser button
chrome.browserAction.onClicked.addListener(function(tab) {
  	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		makewindow(tabs[0].url);
	});
});


//context menu initialisation
chrome.contextMenus.create({id: 'opencurrentpagepopupwindow', title: 'Open Current Page In Popup', contexts: ['page', 'editable'], onclick: pageprogram});
chrome.contextMenus.create({id: 'openlinkpopupwindow', title: 'Open Link In Popup', contexts: ['link', 'selection'], onclick: linkprogram});
chrome.contextMenus.create({id: 'openitempopupwindow', title: 'Open Item In Popup', contexts: ['image', 'video', 'audio'], onclick: itemprogram});
chrome.contextMenus.create({id: 'openframepopupwindow', title: 'Open Frame In Popup', contexts: ['frame'], onclick: frameprogram});
chrome.contextMenus.create({id: 'opencurrentpagepopupwindowba', title: 'Open Current Page In Popup From Button', contexts: ['browser_action'], onclick: baprogram});


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
    
	var patt = /http:\/\//i;
	var pattwo = /https:\/\//i;
	
	var check = text.match(patt);
	var checktwo = text.match(pattwo);
	
	if (check != null || checktwo != null) {
		//good on ya
		//console.log('works out alright');
	} else {
		//console.log('');
		//console.log(text);
		text = 'http://' + text;
		//console.log(text);
	}
	
	makewindow(text);
  }
);


//inter-extension functionality
chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		//if (sender.id == blacklistedExtension)
      	//	return;  // don't allow this extension access
    	if (request.focuspopup) {
    		makewindow(request.focuspopup);
      		//sendResponse({targetData: 'success'});
      	}
    	//else if (request.activateLasers) {
      	//	var success = activateLasers();
      	//sendResponse({activateLasers: success});
    	//}
  });