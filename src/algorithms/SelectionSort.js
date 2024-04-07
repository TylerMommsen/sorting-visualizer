import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function SelectionSort(arr, n) {
	async function Swap(arr, xp, yp) {
		let temp = arr[xp];
		arr[xp] = arr[yp];
		arr[yp] = temp;
		DisplayBars(arr, [xp, yp]);
		await delay(speed);
	}

	async function Algorithm(arr, n) {
		let i, j, minIdx;

		for (i = 0; i < n - 1; i++) {
			minIdx = i;
			for (j = i + 1; j < n; j++) {
				if (arr[j] < arr[minIdx]) {
					minIdx = j;
				}
			}

			await Swap(arr, minIdx, i);
		}
	}

	await Algorithm(arr, n);

	DisplayBars(arr);

	return;
}
