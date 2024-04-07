import DisplayBars from "../utils/DisplayBars";
import InsertionSort from "./InsertionSort";

export default async function BucketSort(arr) {
	let n = arr.length;
	let buckets = Array.from({ length: n }, () => []);

	// put array elements in different buckets
	for (let i = 0; i < n; i++) {
		let bi = Math.floor(n * arr[i]);
		bi = Math.min(bi, n - 1); // Ensure bi is within bounds
		buckets[bi].push(arr[i]);
	}

	// sort individual buckets using insertion sort
	for (let i = 0; i < n; i++) {
		InsertionSort(buckets[i], 0, buckets[i].length - 1);
	}

	// concatenate all buckets into arr[]
	let index = 0;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < buckets[i].length; j++) {
			arr[index++] = buckets[i][j];
		}
	}

	DisplayBars(arr);

	return;
}
