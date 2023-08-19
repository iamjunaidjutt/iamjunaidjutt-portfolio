"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
	const [isShown, setIsShown] = useState(false);

	const handleMouseEnter = () => {
		setIsShown(true);
	};

	const handleMouseLeave = () => {
		setIsShown(false);
	};

	return (
		<div className="md:grid grid-cols-2 mt-20">
			<div className="bg-dark-primary relative  dark:text-white text-black flex flex-col items-center md:items-start justify-center max-md:text-center max-md:pt-86 max-md:py-64  md:h-full px-7 md:px-16 ">
				<h1 className="text-3xl md:text-5xl font-bold mb-4 font-poppins">
					Hi! I'm{" "}
					<span className="text-myBgBlue dark:text-myBlue">
						Muhammad Junaid
					</span>
				</h1>
				<p className=" mb-8">
					Aspiring Entrepreneur | Student | Software Engineer
				</p>
				<Button variant={"destructive"} size={"lg"}>
					<Phone className="mr-2 h-4 w-4" />
					<Link href="/contact">Contact Me</Link>
				</Button>
			</div>
			<div
				className="hidden md:flex items-center justify-center"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Image
					src={isShown ? "/images/JHover.png" : "/images/J.png"}
					width={450}
					height={50}
					alt="J-Logo"
					className="object-cover"
				/>
			</div>
		</div>
	);
};

export default HeroSection;
