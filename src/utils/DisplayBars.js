// Initialize the Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

// Function to load sound
async function loadSound(url) {
	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
	return audioBuffer;
}

let playingSounds = 0;

function playSound(audioBuffer, pitchRate) {
	playingSounds++;
	updateGain(playingSounds);

	const source = audioContext.createBufferSource();
	source.buffer = audioBuffer;
	source.playbackRate.value = pitchRate;
	source.connect(gainNode);
	source.onended = () => {
		playingSounds--;
		updateGain(playingSounds);
	};
	source.start();
}

function updateGain(numberOfSounds) {
	const baseVolume = 0.5;
	// Check if numberOfSounds is 0 to avoid division by 0
	if (numberOfSounds <= 1) {
		gainNode.gain.value = baseVolume; // Set to default/full volume when no sounds are playing
	} else {
		// Decrease volume as more sounds play
		gainNode.gain.value = baseVolume / Math.sqrt(numberOfSounds);
	}
}

const sound = await loadSound("/swapsound.mp3");

import Bar from "../components/Bar";

export default async function DisplayBars(bars, currentlySwapped) {
	let barContainer = document.getElementById("bar-container");
	barContainer.innerHTML = "";
	for (let i = 0; i < bars.length - 1; i++) {
		let currBar = Bar();
		currBar.style.height = bars[i] + "%";
		currBar.style.width = 100 / bars.length + "%";

		if (currentlySwapped && currentlySwapped.includes(i)) {
			currBar.style.background = "linear-gradient(to top right, #ff6a00, #ff9143)";
			const pitchRate = bars[i] / Math.max(...bars) + 0.5;
			// Play the sound with adjusted pitch
			playSound(sound, pitchRate);
		}

		barContainer.appendChild(currBar);
	}
}
