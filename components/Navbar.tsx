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
			className={`site-nav fixed top-0 left-0 right-0 z-40 lg:pl-20 ${scrolled ? "is-scrolled" : ""}`}
		>
			<div className="page-width flex min-w-0 items-center justify-between gap-3 py-1">
				<Link href="/" className="shrink-0">
					<Image
						src="/logos/logo.png"
						width={65}
						height={65}
						alt="logo"
						priority
						className="dark:hidden"
					/>
					<Image
						src="/logos/logo_dark.png"
						width={65}
						height={65}
						alt="logo"
						priority
						className="hidden dark:block"
					/>
				</Link>
				<MainNav />
			</div>
		</div>
	);
};

export default Navbar;
