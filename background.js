/*
Open In Popup
by Azza; MIT License
*/


/* Azza's code */
function mainprogram() {
	chrome.tabs.executeScript(null, {file: 'main.js'});
}

function newlinkprogram(info, tab) {
	if (info.linkUrl) {
		var myWindow = window.open(info.linkUrl, '', 'fullscreen=yes,menubar=no,statusbar=no');
	} else {
		chrome.tabs.executeScript(null, {file: 'main.js'});
	}
}

//context menu
chrome.contextMenus.create({id: 'openpopupwindow', title: 'Open In Popup', contexts: ['all'], onclick: newlinkprogram});

//browser button
chrome.browserAction.onClicked.addListener(function(tab) {
  mainprogram();
});