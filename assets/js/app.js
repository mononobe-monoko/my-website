// app.js - SPA切替と共通初期化

document.addEventListener("DOMContentLoaded", () => {
	// ====================
	// ナビゲーション切替
	// ====================
	const navButtons = document.querySelectorAll(".nav button");
	navButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			document.querySelectorAll('[role="tabpanel"]').forEach((panel) => (panel.hidden = true));
			navButtons.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");
			const view = btn.dataset.view;
			document.getElementById("view-" + view).hidden = false;
		});
	});

	// 初期表示は自己紹介ページ
	document.getElementById("nav-home").click();

	// ====================
	// Lightbox 基本設定
	// ====================
	const lightbox = document.getElementById("lightbox");
	const lbImg = document.getElementById("lightbox-img");
	const lbTitle = document.getElementById("lightbox-title");
	const lbDesc = document.getElementById("lightbox-desc");
	const lbClose = document.getElementById("lightbox-close");
	let currentIndex = 0;

	window.openLightbox = function (i, dataArray) {
		currentIndex = i;
		const item = dataArray[i];
		lbImg.src = item.src;
		lbTitle.textContent = item.title;
		lbDesc.textContent = item.desc;
		lightbox.classList.add("open");
		lightbox.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
	};

	function closeLightbox() {
		lightbox.classList.remove("open");
		lightbox.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
	}

	lbClose.addEventListener("click", closeLightbox);
	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox) closeLightbox();
	});

	window.addEventListener("keydown", (e) => {
		if (!lightbox.classList.contains("open")) return;
		if (e.key === "Escape") closeLightbox();
		if (e.key === "ArrowRight") window.openLightbox((currentIndex + 1) % window.galleryData.length, window.galleryData);
		if (e.key === "ArrowLeft") window.openLightbox((currentIndex - 1 + window.galleryData.length) % window.galleryData.length, window.galleryData);
	});
});
