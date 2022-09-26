export function copyToClipboard(e) {
	const cb = navigator.clipboard;
	cb.writeText(e.target.dataset.copy);
}
