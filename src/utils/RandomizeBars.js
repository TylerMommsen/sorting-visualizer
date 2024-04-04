export default function RandomizeBars(bars, barsLength) {
	for (let i = 0; i < barsLength; i++) {
		bars.push(Math.random());
	}
}
