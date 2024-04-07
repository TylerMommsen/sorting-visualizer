import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function InsertionSort(arr, left, right) {
	let i, key, j;

	for (i = left + 1; i <= right; i++) {
		key = arr[i];
		j = i - 1;

		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			DisplayBars(arr, [j + 1]);
			await delay(speed);

			j = j - 1;
		}

		arr[j + 1] = key;
	}

	DisplayBars(arr);

	return;
}
