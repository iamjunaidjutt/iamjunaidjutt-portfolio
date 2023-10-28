"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MainNav from "@/components/MainNav";

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`fixed w-screen top-0 right-0 z-40 lg:pl-24 ${
				scrolled
					? "bg-blue-100 dark:bg-gray-900 dark:shadow-gray-800 shadow-gray-300 shadow "
					: "bg-transparent"
			}`}
		>
			<div className="flex items-center space-x-6 justify-between px-14 py-1">
				<Link href="/">
					<Image
						src="/logos/logo-mini.png"
						width={65}
						height={65}
						alt="logo"
					/>
				</Link>
				<MainNav />
			</div>
		</div>
	);
};

export default Navbar;
