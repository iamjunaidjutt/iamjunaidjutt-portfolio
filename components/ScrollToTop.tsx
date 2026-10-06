"use client";

import { useState, useEffect } from "react";
import { ChevronsUp } from "lucide-react";

const ScrollToTop = () => {
	const [showScrollTopButton, setShowScrollTopButton] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 300) {
				setShowScrollTopButton(true);
			} else {
				setShowScrollTopButton(false);
			}
		});
	}, []);

	const scrollTop = () => {
		window.dispatchEvent(new Event("lenis:scroll-to-top"));
	};
	return (
		<div>
			{showScrollTopButton && (
				<ChevronsUp
					className="scroll-top fixed bottom-24 right-6 text-4xl cursor-pointer transition ease-in duration-300 delay-100 rounded-full p-2 drop-shadow-lg animate-bounce z-40"
					size={40}
					onClick={scrollTop}
				/>
			)}
		</div>
	);
};

export default ScrollToTop;
