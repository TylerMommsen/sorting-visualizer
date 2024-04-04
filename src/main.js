import "./style.scss";
import BubbleSort from "./algorithms/BubbleSort";
import RandomizeBars from "./utils/RandomizeBars";
import DisplayBars from "./utils/DisplayBars";

let barsLength = 20;
let bars = [];

function VisualizeMoves(swaps) {
	if (swaps.length === 0) return;

	const [i, j] = swaps.shift();
	[bars[i], bars[j]] = [bars[j], bars[i]];
	DisplayBars(bars);
	setTimeout(() => {
		VisualizeMoves(swaps);
	}, 50);
}

const algorithmsList = document.getElementById("algorithms");

algorithmsList.addEventListener("click", function (event) {
	if (event.target.tagName === "BUTTON") {
		const algorithmName = event.target.textContent || event.target.innerText;

		switch (algorithmName) {
			case "Bubble Sort":
				const copy = [...bars];
				const swaps = BubbleSort(copy);
				VisualizeMoves(swaps);
			default:
				return;
		}
	}
});

RandomizeBars(bars, barsLength);
DisplayBars(bars);
