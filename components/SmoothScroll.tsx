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
		
		const handleStop = () => lenis.stop();
		const handleStart = () => lenis.start();
		window.addEventListener("lenis:stop", handleStop);
		window.addEventListener("lenis:start", handleStart);

		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("lenis:scroll-to-top", handleScrollToTop);
			window.removeEventListener("lenis:stop", handleStop);
			window.removeEventListener("lenis:start", handleStart);
			lenis.destroy();
		};
	}, []);

	return null;
};

export default SmoothScroll;
