export default function BubbleSort(bars) {
	let swaps = [];
	let swapped = false;
	do {
		swapped = false;
		for (let i = 0; i < bars.length - 1; i++) {
			if (bars[i - 1] > bars[i]) {
				swapped = true;
				swaps.push([i - 1, i]);
				[bars[i - 1], bars[i]] = [bars[i], bars[i - 1]];
			}
		}
	} while (swapped);
	return swaps;
}
