import "./style.scss";
import BubbleSort from "./algorithms/BubbleSort";
import Shuffle from "./utils/Shuffle";
import DisplayBars from "./utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let barsLength = 50;
let bars = [];
let currentlySelectedAlgorithm = null;
let speed = 50;

// create the bars initially or whenever the user changes the bars length size
function InitBars() {
	for (let i = 1; i <= barsLength; i++) {
		bars.push((i * 100) / barsLength);
	}
}

// display the swaps/moves of an algorithm
async function VisualizeMoves(swaps) {
	if (swaps.length === 0) {
		// do a nice final display of each bar in the list
		for (let i = 0; i < bars.length - 1; i++) {
			DisplayBars(bars, [i]);
			await delay(10);
		}

		DisplayBars(bars);
		return;
	}

	const [i, j] = swaps.shift();
	[bars[i], bars[j]] = [bars[j], bars[i]];
	DisplayBars(bars, [i, j]);
	await delay(speed);
	VisualizeMoves(swaps);
}

const algorithmsList = document.getElementById("algorithm-selections");
const sizeSlider = document.getElementById("size-slider");
const visualizeBtn = document.getElementById("visualize-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const speedSlider = document.getElementById("speed-slider");

// select a different sorting algorithm
algorithmsList.addEventListener("change", function () {
	currentlySelectedAlgorithm = this.value;

	visualizeBtn.innerText = `Visualize ${this.value}`;
});

// adjust the amount of bars
sizeSlider.addEventListener("input", function () {
	const sizeValue = parseInt(this.value);
	document.getElementById("size-value").textContent = sizeValue;
	barsLength = sizeValue + 1;
	bars = [];
	InitBars();
	DisplayBars(bars);
});

// adjust the speed of the sorting algorithm
speedSlider.addEventListener("input", function () {
	const speedValue = parseInt(this.value);
	document.getElementById("speed-value").textContent = speedValue + "ms";
	speed = speedValue;
});

// start the sorting algorithm
visualizeBtn.addEventListener("click", function () {
	switch (currentlySelectedAlgorithm) {
		case "Bubble Sort":
			const copy = [...bars];
			const swaps = BubbleSort(copy);
			VisualizeMoves(swaps);
		default:
			return;
	}
});

shuffleBtn.addEventListener("click", function () {
	Shuffle(bars);
	DisplayBars(bars);
});

InitBars();
DisplayBars(bars);
