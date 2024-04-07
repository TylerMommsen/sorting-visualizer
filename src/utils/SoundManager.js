let sound = null;

// Function to load sound
async function loadSound(url) {
	const response = await fetch(url);
	const arrayBuffer = await response.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
	return audioBuffer;
}

// Initialize the Audio Context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);

let playingSounds = 0;

export async function playSound(pitchRate) {
	const sound = await getSound();

	playingSounds++;
	updateGain(playingSounds);

	const source = audioContext.createBufferSource();
	source.buffer = sound;
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

export async function getSound() {
	if (!sound) {
		sound = await loadSound("/swapsound.mp3");
	}
	return sound;
}
