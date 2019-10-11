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
		for (let videoElement of videoElements()){
			soundSpectrums.push(new SoundSpectrum(videoElement));
		}
		refleshFrames();
		running = true;
		console.log('start video audio visualiser');
	}else{
		console.log('already on');
	}
	return running;
}

function videoElements(){
	return document.getElementsByTagName("video");
}

function refleshFrames(){
	soundSpectrums.forEach(function(soundSpectrum){
		soundSpectrum.draw();
	});
	requestAnimationFrame(refleshFrames);
}