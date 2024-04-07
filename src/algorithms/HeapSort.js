import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function Heapify(arr, n, i) {
	let largest = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;

	if (l < n && arr[l] > arr[largest]) largest = l;

	if (r < n && arr[r] > arr[largest]) largest = r;

	if (largest != i) {
		let swap = arr[i];
		arr[i] = arr[largest];
		arr[largest] = swap;
		DisplayBars(arr, [i, largest]);
		await delay(speed);

		await Heapify(arr, n, largest);
	}
}

export default async function HeapSort(arr) {
	let n = arr.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		await Heapify(arr, n, i);
	}

	for (let i = n - 1; i > 0; i--) {
		let temp = arr[0];
		arr[0] = arr[i];
		arr[i] = temp;
		DisplayBars(arr, [0, i]);
		await delay(speed);

		await Heapify(arr, i, 0);
	}

	DisplayBars(arr);

	return;
}
