import Bar from "../components/Bar";

export default function DisplayBars(bars) {
	let barContainer = document.getElementById("bar-container");
	barContainer.innerHTML = "";
	for (let i = 0; i < bars.length - 1; i++) {
		let currBar = Bar();
		currBar.style.height = bars[i] * 100 + "%";
		barContainer.appendChild(currBar);
	}
}
