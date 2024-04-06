import { speed } from "../main";
import DisplayBars from "../utils/DisplayBars";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function BubbleSort(bars) {
	let swapped = false;
	do {
		swapped = false;
		for (let i = 0; i < bars.length - 1; i++) {
			if (bars[i - 1] > bars[i]) {
				swapped = true;
				[bars[i - 1], bars[i]] = [bars[i], bars[i - 1]];
				DisplayBars(bars, [i - 1, i]);
				await delay(speed);
			}
		}
	} while (swapped);

	DisplayBars(bars);

	return;
}
