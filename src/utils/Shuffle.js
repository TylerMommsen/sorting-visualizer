export default function Shuffle(bars) {
	for (let i = bars.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[bars[i], bars[j]] = [bars[j], bars[i]];
	}
}
