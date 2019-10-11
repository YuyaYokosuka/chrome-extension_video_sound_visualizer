chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, "add", null, function(response){
		if(response && 'running' in response) changeIcon(response.running);
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, selectInfo){
	chrome.tabs.sendMessage(tabId, "status", null, function(response){
		if(response && 'running' in response) changeIcon(response.running);
	});
})

chrome.tabs.onActiveChanged.addListener(function(tabId, selectInfo){
	chrome.tabs.sendMessage(tabId, "status", null, function(response){
		if(response && 'running' in response) changeIcon(response.running);
	});
})

function changeIcon(running){
	if(running){
		chrome.browserAction.setIcon({path:"icon/on.png"});
	}else{
		chrome.browserAction.setIcon({path:"icon/off.png"});
	}
}