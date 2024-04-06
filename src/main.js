import "./style.scss";
import BubbleSort from "./algorithms/BubbleSort";
import Shuffle from "./utils/Shuffle";
import DisplayBars from "./utils/DisplayBars";
import Quicksort from "./algorithms/Quicksort";
import InsertionSort from "./algorithms/InsertionSort";
import MergeSort from "./algorithms/MergeSort";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let barsLength = 50;
let bars = [];
let currentlySelectedAlgorithm = "Quicksort";
export let speed = 50;
let algorithmRunning = false;

// create the bars initially or whenever the user changes the bars length size
function InitBars() {
	for (let i = 1; i <= barsLength; i++) {
		bars.push((i * 100) / barsLength);
	}
}

// display the final sweep of the full array for a nice visual touch
async function VisualizeFinal() {
	for (let i = 0; i < barsLength - 1; i++) {
		DisplayBars(bars, [i]);
		await delay(10);
	}

	DisplayBars(bars);
}

const selectAlgorithmBtn = document.getElementById("select-algorithm");
const algorithmOptions = document.querySelector(".algorithm-options");
const sizeSlider = document.getElementById("size-slider");
const visualizeBtn = document.getElementById("visualize-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const speedSlider = document.getElementById("speed-slider");

// hide or open dropdown list for algorithms
selectAlgorithmBtn.addEventListener("click", function (event) {
	algorithmOptions.classList.toggle("show");
	event.stopPropagation();
});

// add listener to each algorithm option in dropdown list
algorithmOptions.querySelectorAll("div").forEach(function (option) {
	option.addEventListener("click", function () {
		selectAlgorithmBtn.querySelector("p").textContent = option.textContent;
		currentlySelectedAlgorithm = option.textContent;
		visualizeBtn.textContent = `Visualize ${option.textContent}`;
		algorithmOptions.classList.remove("show");
	});
});

document.addEventListener("click", function (event) {
	let targetElement = event.target;
	let clickInsideDropdown =
		algorithmOptions.contains(targetElement) || selectAlgorithmBtn.contains(targetElement);

	if (!clickInsideDropdown && algorithmOptions.classList.contains("show")) {
		console.log("ergvihj");
		algorithmOptions.classList.remove("show");
	}
});

// disable size slider when algorithm is running
function toggleSliderDisabledState(isDisabled) {
	const slider = document.getElementById("size-slider");
	slider.disabled = isDisabled;
}

// adjust the amount of bars
sizeSlider.addEventListener("input", function () {
	if (!algorithmRunning) {
		const sizeValue = parseInt(this.value);
		document.getElementById("size-value").textContent = sizeValue;
		barsLength = sizeValue + 1;
		bars = [];
		InitBars();
		DisplayBars(bars);
	}
});

// adjust the speed of the sorting algorithm
speedSlider.addEventListener("input", function () {
	const speedValue = parseInt(this.value);
	document.getElementById("speed-value").textContent = speedValue + "ms";
	speed = speedValue;
});

// start the sorting algorithm
visualizeBtn.addEventListener("click", async function () {
	algorithmRunning = true;
	toggleSliderDisabledState(true);
	switch (currentlySelectedAlgorithm) {
		case "Quicksort":
			await Quicksort(bars, 0, barsLength - 1);
			break;
		case "Bubble Sort":
			await BubbleSort(bars);
			break;
		case "Insertion Sort":
			await InsertionSort(bars, barsLength);
			break;
		case "Merge Sort":
			await MergeSort(bars, 0, barsLength);
			break;
		default:
			return;
	}

	await VisualizeFinal();
	algorithmRunning = false;
	toggleSliderDisabledState(false);
});

shuffleBtn.addEventListener("click", function () {
	Shuffle(bars);
	DisplayBars(bars);
});

InitBars();
DisplayBars(bars);
