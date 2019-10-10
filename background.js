_running = false;

chrome.browserAction.onClicked.addListener(function(tab) {
	if(_running == false){
		chrome.tabs.sendMessage(tab.id, "add");
		chrome.browserAction.setIcon({path:"icon/on.png"});
		_running = true;
	}
	console.log('already on');
});