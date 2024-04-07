import { soundOn } from "../main";
import { playSound } from "./SoundManager";
import Bar from "../components/Bar";

export default async function DisplayBars(bars, currentlySwapped) {
	// give each bar a relative value between 0 and 100 to give a nice staircase look when displaying finished sort
	let normalizedBars = bars.map((bar) => {
		return (bar * 100) / bars.length;
	});

	let barContainer = document.getElementById("bar-container");
	barContainer.innerHTML = "";
	for (let i = 0; i < normalizedBars.length; i++) {
		let currBar = Bar();
		currBar.style.height = normalizedBars[i] + "%";
		currBar.style.width = 100 / normalizedBars.length + "%";

		if (currentlySwapped && currentlySwapped.includes(i)) {
			currBar.style.background = "linear-gradient(to top right, #ff6a00, #ff9143)";
			const pitchRate = bars[i] / Math.max(...bars) + 0.5;
			// Play the sound with adjusted pitch
			if (soundOn) {
				playSound(pitchRate);
			}
		}

		barContainer.appendChild(currBar);
	}
}
