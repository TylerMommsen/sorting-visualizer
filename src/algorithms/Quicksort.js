import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Quicksort(arr, low, high) {
	// function that handles partitioning the array and returning the partition index
	async function Partition(arr, low, high) {
		let pivot = arr[high];
		let i = low - 1;

		for (let j = low; j <= high - 1; j++) {
			if (arr[j] < pivot) {
				i++;
				[arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
				DisplayBars(arr, [i, j]);
				await delay(speed);
			}
		}

		[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // swap pivot to its correct position
		return i + 1;
	}

	// the main quicksort algorithm
	async function Algorithm(arr, low, high) {
		if (low < high) {
			// pi is the partitioning index, arr[pi] is now at the right place
			let pi = await Partition(arr, low, high);

			// Seperately sort elements before parition and after partition
			await Algorithm(arr, low, pi - 1);
			await Algorithm(arr, pi + 1, high);
		}
	}

	await Algorithm(arr, low, high);

	DisplayBars(arr);

	return;
}
