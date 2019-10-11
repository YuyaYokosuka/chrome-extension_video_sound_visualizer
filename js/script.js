running = false;
let soundSpectrums = []

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request){
		case "add":
			addVisualizer();
			sendResponse({running: running});
			break;
		case "status":
			sendResponse({running: running});
		default:
			console.log("undefined request " + request);
	}

});

function addVisualizer() {
	if(running == false){
		chrome.storage.local.get({
			alpha: 0.3,
			forceMuteOff: false
		}, function(items) {
			console.log(items);
			for (let videoElement of videoElements()){
				if(items.forceMuteOff)forceMuteOff(videoElement);
				soundSpectrums.push(new SoundSpectrum(videoElement, items.alpha));
			}
			refleshFrames();
			running = true;
			console.log('start video audio visualiser');
		})

	}else{
		console.log('already on');
	}
	return running;
}

function videoElements(){
	return document.getElementsByTagName("video");
}

function forceMuteOff(videoElement){
	videoElement.muted = false;
}

function refleshFrames(){
	soundSpectrums.forEach(function(soundSpectrum){
		soundSpectrum.draw();
	});
	requestAnimationFrame(refleshFrames);
}