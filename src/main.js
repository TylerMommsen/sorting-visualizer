import "./style.scss";
import BubbleSort from "./algorithms/BubbleSort";
import Shuffle from "./utils/Shuffle";
import DisplayBars from "./utils/DisplayBars";
import Quicksort from "./algorithms/Quicksort";
import InsertionSort from "./algorithms/InsertionSort";
import MergeSort from "./algorithms/MergeSort";
import SelectionSort from "./algorithms/SelectionSort";
import RadixSort from "./algorithms/RadixSort";
import BucketSort from "./algorithms/BucketSort";
import HeapSort from "./algorithms/HeapSort";
import IsSorted from "./utils/IsSorted";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let barsLength = 50;
let bars = [];
let currentlySelectedAlgorithm = "Quicksort";
export let speed = 50; // the speed the algorithms execute in milliseconds
let algorithmRunning = false;

// create the bars initially or whenever the user changes the bars length size
function InitBars() {
	for (let i = 1; i <= barsLength; i++) {
		bars.push(i);
	}
}

// display the final sweep of the full array for a nice visual touch
async function VisualizeFinal() {
	for (let i = 0; i < barsLength; i++) {
		if (i - 1 >= 0 && i + 1 < barsLength) {
			DisplayBars(bars, [i - 1, i, i + 1]);
		} else if (i - 1 >= 0) {
			DisplayBars(bars, [i - 1, i]);
		} else {
			DisplayBars(bars, [i, i + 1]);
		}
		await delay(barsLength < 100 ? 30 : speed);
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

// close dropdown menu when user clicks anywhere else on screen
document.addEventListener("click", function (event) {
	let targetElement = event.target;
	let clickInsideDropdown =
		algorithmOptions.contains(targetElement) || selectAlgorithmBtn.contains(targetElement);

	if (!clickInsideDropdown && algorithmOptions.classList.contains("show")) {
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
		barsLength = sizeValue;
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
	toggleSliderDisabledState(true); // disable size adjustment slider
	let isSorted = await IsSorted(bars); // check if the array is already sorted
	if (!isSorted) {
		switch (currentlySelectedAlgorithm) {
			case "Quicksort":
				await Quicksort(bars, 0, barsLength - 1);
				break;
			case "Bubble Sort":
				await BubbleSort(bars);
				break;
			case "Insertion Sort":
				await InsertionSort(bars, 0, barsLength - 1);
				break;
			case "Merge Sort":
				await MergeSort(bars, 0, barsLength);
				break;
			case "Selection Sort":
				await SelectionSort(bars, barsLength);
				break;
			case "Radix Sort":
				let newBars = await RadixSort(bars);
				bars = [];
				bars = [...newBars];
				break;
			case "Bucket Sort":
				await BucketSort(bars);
				break;
			case "Heap Sort":
				await HeapSort(bars);
				break;
			default:
				return;
		}
	}

	await VisualizeFinal();
	algorithmRunning = false;
	toggleSliderDisabledState(false);
});

// shuffle the bars/array
shuffleBtn.addEventListener("click", function () {
	Shuffle(bars);
	DisplayBars(bars);
});

InitBars();
DisplayBars(bars);
