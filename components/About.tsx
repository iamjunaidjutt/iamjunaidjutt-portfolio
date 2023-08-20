"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const About = () => {
	return (
		<>
			<section
				className="bg-myBgBlue grid md:grid-cols-2 py-10"
				id="about"
			>
				<div className="p-14 flex flex-col items-center md:items-start gap-y-10">
					<h2 className="text-2xl md:text-4xl font-bold text-white font-poppins">
						About Me
					</h2>
					<div className="text-gray-200 max-md:text-center">
						<p className="mb-4">
							<span role="img" aria-label="Waving Hand">
								👋&#39;
							</span>{" "}
							Hello there! Welcome to my corner of the web!
						</p>

						<p>
							I&apos; m Muhammad Junaid, a tech enthusiast with
							expertise in web development using technologies like
							Next.js and the MERN stack, complemented by my
							skills in languages such as C++, Java, Spring Boot,
							and OOP. I thrive on solving complex problems with
							elegant solutions and aspire to contribute my skills
							to innovative projects. Collaboration is key to my
							work style, and I&apos; ;m excited to connect with
							professionals who share a passion for technology and
							excellence. Let&apos;s embark on a journey of growth
							and discovery together!
						</p>
					</div>
					<Button variant={"destructive"} size={"lg"}>
						<Briefcase className="mr-2 h-4 w-4" />
						<Link href={"#projects"}>See My Projects</Link>
					</Button>
				</div>
				<div className="flex flex-col items-center justify-center gap-10 py-10">
					<motion.div whileHover={{ scale: 1.1 }}>
						<Image
							src={"/images/profile.jpg"}
							width={250}
							height={250}
							alt="profile"
							className="object-cover rounded-full"
						/>
					</motion.div>
					<h2 className="text-2xl md:text-4xl text-myBlue font-bold font-poppins">
						Muhammad Junaid
					</h2>
				</div>
			</section>
		</>
	);
};

export default About;
