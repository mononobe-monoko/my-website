// gallery.js - ギャラリー用データ読み込みと表示

document.addEventListener("DOMContentLoaded", async () => {
	const galleryEl = document.getElementById("gallery");

	// JSONデータをフェッチ
	const response = await fetch("data/gallery.json");
	const galleryData = await response.json();

	// グローバル変数としてLightboxで使用
	window.galleryData = galleryData;

	galleryData.forEach((item, idx) => {
		const div = document.createElement("button");
		div.className = "thumb";
		div.setAttribute("aria-label", item.title);
		div.innerHTML = `<div class="polaroid"><img src="${item.src}" alt="${item.title}"><div class="caption">${item.title}</div></div>`;
		div.addEventListener("click", () => window.openLightbox(idx, galleryData));
		galleryEl.appendChild(div);
	});
});
