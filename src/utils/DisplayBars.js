import Bar from "../components/Bar";

export default function DisplayBars(bars, currentlySwapped) {
	let barContainer = document.getElementById("bar-container");
	barContainer.innerHTML = "";
	for (let i = 0; i < bars.length - 1; i++) {
		let currBar = Bar();
		currBar.style.height = bars[i] + "%";
		currBar.style.width = 100 / bars.length + "%";

		if (currentlySwapped && currentlySwapped.includes(i)) {
			currBar.style.background = "linear-gradient(to top right, #ff6a00, #ff9143)";
		}

		barContainer.appendChild(currBar);
	}
}
