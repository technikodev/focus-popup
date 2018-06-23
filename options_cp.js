//options.js with chrome-promise

function clear() {
	chrome.storage.local.clear(function() {
		var error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
		console.log('Storage cleared');
	});
}
//clear();

const chromep = new ChromePromise();

/*chromep.storage.local.set({foo: 'bar'}).then(function() {
  alert('foo set');
  return chromep.storage.local.get('foo');
}).then(function(items) {
  console.log(JSON.stringify(items)); // => {"foo":"bar"}
});*/

chromep.storage.local.get('initial').then(function(item) {
	console.log('item:', item);
	console.log('item.initial:', item.initial);
	console.log('item[\'initial\']:', item['initial']);
	if (item.initial == false) {
		console.log('initial was false');
		return chromep.storage.local.get(['initial', 'width', 'fullscreen']);
	} else {
		chromep.storage.local.set({initial: false, width: 'half', fullscreen: false}).then(function() {
			console.log('initialised settings');
		});
		return chromep.storage.local.get(['initial', 'width', 'fullscreen']);
	}
}).then(function(state) {
	console.log('state.initial:', state.initial);
	console.log('state.width:', state.width);
	console.log('state.fullscreen:', state.fullscreen);
	document.querySelector('#widthselectbox').value = state.width;
	document.querySelector('#fullscreencheckbox').checked = state.fullscreen;
	document.querySelector('#status').innerText = 'Restored';
	setTimeout(function() {
  			document.querySelector('#status').innerText = '';
  		}, 1000);
	console.log('#widthselectbox:', document.querySelector('#widthselectbox'));
	console.log('#fullscreencheckbox:', document.querySelector('#fullscreencheckbox'));
});

function save_options() {
	chromep.storage.local.set({
		width: document.querySelector('#widthselectbox').value,
		fullscreen: document.querySelector('#fullscreencheckbox').checked
	}).then(function() {
  		document.querySelector('#status').innerText = 'Options saved.';
  		setTimeout(function() {
  			document.querySelector('#status').innerText = '';
  		}, 750);
  		
	});
}

document.getElementById('save').addEventListener('click', save_options);
