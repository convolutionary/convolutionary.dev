const FRAMES = 7;
const FRAME_MS = 20;

let layer = null;
const ensureLayer = () => {
	if (layer && document.body.contains(layer)) return layer;
	layer = document.createElement("div");
	layer.className = "zoom-rect-layer";
	document.body.appendChild(layer);
	return layer;
};

const lerp = (a, b, t) => a + (b - a) * t;

export const zoomRect = (fromEl, toEl, onDone) => {
	if (!fromEl || !toEl) { onDone && onDone(); return; }
	const from = fromEl.getBoundingClientRect();
	const to = toEl.getBoundingClientRect();
	const host = ensureLayer();

	const rect = document.createElement("div");
	rect.className = "zoom-rect";
	host.appendChild(rect);

	let i = 0;
	const tick = () => {
		const t = (i + 1) / FRAMES;
		rect.style.left = `${lerp(from.left, to.left, t)}px`;
		rect.style.top = `${lerp(from.top, to.top, t)}px`;
		rect.style.width = `${lerp(from.width, to.width, t)}px`;
		rect.style.height = `${lerp(from.height, to.height, t)}px`;
		i += 1;
		if (i < FRAMES) {
			setTimeout(tick, FRAME_MS);
		} else {
			setTimeout(() => { rect.remove(); onDone && onDone(); }, FRAME_MS);
		}
	};
	tick();
};
