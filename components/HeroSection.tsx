"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
	return (
		<div className="md:grid grid-cols-2 mt-20">
			<div className="bg-dark-primary relative  dark:text-white text-black flex flex-col items-center md:items-start justify-center max-md:text-center max-md:pt-86 max-md:py-64  md:h-full px-7 md:px-16 ">
				<h1 className="text-3xl md:text-5xl font-bold mb-4 font-poppins">
					Hi! I&#39;m{" "}
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
			<div className="hidden md:flex items-center justify-center">
				<div className="relative">
					<Image
						src={"/images/J.png"}
						width={450}
						height={50}
						alt="J-Logo"
						className="object-cover"
					/>
				</div>
				<motion.div
					className="absolute"
					initial={{ opacity: 0, x: 100, y: 0 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ delay: 0.5, duration: 1, type: "tween" }}
					whileHover={{ rotate: 360 }}
				>
					<Image
						src={"/images/JHover.png"}
						width={450}
						height={50}
						alt="JHover-Logo"
						className="object-cover"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroSection;
