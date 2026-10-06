"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.07,
			duration: 1.4,
			smoothWheel: true,
			wheelMultiplier: 0.60,
			anchors: true,
		});
		let animationFrameId = 0;
		const handleScrollToTop = () => lenis.scrollTo(0);

		const raf = (time: number) => {
			lenis.raf(time);
			animationFrameId = requestAnimationFrame(raf);
		};

		animationFrameId = requestAnimationFrame(raf);
		window.addEventListener("lenis:scroll-to-top", handleScrollToTop);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("lenis:scroll-to-top", handleScrollToTop);
			lenis.destroy();
		};
	}, []);

	return null;
};

export default SmoothScroll;
