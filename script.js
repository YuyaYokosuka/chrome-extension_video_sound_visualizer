let soundSpectrums = []

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request){
		case "add":
			addVisualizer();
			break;
		default:
			console.log("undefined request " + request);
	}
});

function addVisualizer() {
	for (let videoElement of videoElements()){
		soundSpectrums.push(new SoundSpectrum(videoElement));
	}
	refleshFrames();
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