import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function GetPosition(num, place) {
	return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function GetMax(arr) {
	let max = 0;
	for (let num of arr) {
		if (max < Math.floor(num).toString().length) {
			max = Math.floor(num).toString().length;
		}
	}
	return max;
}

export default async function RadixSort(arr) {
	const max = GetMax(arr); // Get the maximum number of digits

	for (let i = 0; i < max; i++) {
		let buckets = Array.from({ length: 10 }, () => []);

		// Distribute the array elements into buckets
		for (let j = 0; j < arr.length; j++) {
			buckets[GetPosition(arr[j], i)].push(arr[j]);

			DisplayBars(arr, [j]);
			await delay(speed);
		}

		// Flatten the buckets back into the array
		arr = [].concat(...buckets);
	}

	DisplayBars(arr);

	return arr;
}
