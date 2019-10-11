class SoundSpectrum{
	videoElement;
	canvas;
	canvasCtx;
	analyserNode;
	bufferLength;
	dataArray;

	alpha;

	constructor(videoElement, alpha){
		this.videoElement = videoElement;

		this.canvas = this.createCanvas(this.videoElement);
		this.videoElement.parentNode.appendChild(this.canvas);
		this.canvasCtx = this.canvas.getContext('2d');

		//Create audio source
		let audioCtx = new AudioContext();

		//Set up audio node network
		this.analyserNode = audioCtx.createAnalyser();
		this.analyserNode.fftSize = 256;
		this.bufferLength = this.analyserNode.frequencyBinCount;
		this.dataArray = new Uint8Array(this.bufferLength);
		this.analyserNode.connect(audioCtx.destination);

		// connext audio node
		let audioSourceNode = audioCtx.createMediaElementSource(this.videoElement);
		audioSourceNode.connect(this.analyserNode);

		this.alpha = alpha || 0.3
	}

	createCanvas(videoElement){
		let canvas = document.createElement('canvas');
		canvas.style.position = 'absolute';
		canvas.style.pointerEvents = 'none';
		return canvas;
	}

	draw(){
		this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.canvas.style.top = this.videoElement.offsetTop + 'px';
		this.canvas.style.left = this.videoElement.offsetLeft + 'px';
		this.canvas.width = this.videoElement.offsetWidth;
		this.canvas.height = this.videoElement.offsetHeight;

		this.canvasCtx.globalAlpha = this.alpha;
		//this.canvasCtx.fillStyle = 'black';
		//this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawSoundSpectrum();
	}

	drawSoundSpectrum() {
		//Get spectrum data
		this.analyserNode.getByteFrequencyData(this.dataArray);
	
		//Draw spectrum
		let barWidth = (this.canvas.width / this.bufferLength) * 2.5;
		let posX = 0;
		for (let i = 0; i < this.bufferLength; i++) {
			let barHeight = this.dataArray[i] * (this.canvas.height / this.analyserNode.fftSize);
			this.canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 150) + ', 50, 50)';
			this.canvasCtx.fillRect(posX, this.canvas.height - barHeight, barWidth, barHeight);
			posX += barWidth + 1;
		}
	}
}
