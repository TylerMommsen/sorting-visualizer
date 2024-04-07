import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function Merge(arr, left, middle, right) {
	const n1 = middle - left + 1;
	const n2 = right - middle;

	// create temp arrays
	const L = new Array(n1);
	const R = new Array(n2);

	for (let i = 0; i < n1; i++) {
		L[i] = arr[left + i];
	}

	for (let j = 0; j < n2; j++) {
		R[j] = arr[middle + 1 + j];
	}

	// merge the temp arrays back into arr[left..right]
	let i = 0; // initial index of the first subarray
	let j = 0; // initial index of the second subarray
	let k = left; // initial index of the merged subarray

	while (i < n1 && j < n2) {
		if (L[i] <= R[j]) {
			arr[k] = L[i];
			DisplayBars(arr, [k]);
			i++;
		} else {
			arr[k] = R[j];
			DisplayBars(arr, [k]);
			j++;
		}
		await delay(speed);
		k++;
	}

	// copy the remaining elements of L[] if there are any
	while (i < n1) {
		arr[k] = L[i];
		DisplayBars(arr, [k]);
		await delay(speed);
		i++;
		k++;
	}

	// copy the remaining elements of R[] if there are any
	while (j < n2) {
		arr[k] = R[j];
		DisplayBars(arr, [k]);
		await delay(speed);
		j++;
		k++;
	}
}

export default async function MergeSort(arr, left, right) {
	async function Algorithm(arr, left, right) {
		if (left >= right) {
			return; // returns recursively
		}

		const middle = left + Math.floor((right - left) / 2);
		await Algorithm(arr, left, middle);
		await Algorithm(arr, middle + 1, right);
		await Merge(arr, left, middle, right);
	}

	await Algorithm(arr, left, right - 1);

	DisplayBars(arr);

	return;
}
