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
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div>
			{showScrollTopButton && (
				<ChevronsUp
					className="fixed bottom-5 right-6 text-4xl border border-myBgBlue dark:border-myBlue hover:bg-myBgBlue hover:dark:text-myBlue hover:border-white cursor-pointer transition ease-in duration-300 delay-100 rounded-full p-2 drop-shadow-lg shadow-myGray animate-bounce z-40"
					size={40}
					onClick={scrollTop}
				/>
			)}
		</div>
	);
};

export default ScrollToTop;
