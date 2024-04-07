export default async function IsSorted(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i] > arr[i + 1]) {
			return false; // Early return if any element is greater than its successor
		}
	}
	return true; // The array is sorted
}
