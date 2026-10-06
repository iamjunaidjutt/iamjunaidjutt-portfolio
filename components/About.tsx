"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const About = () => {
	return (
		<section className="section-band section-cream" id="about">
			<motion.div
				className="page-width about-grid"
				initial={{ opacity: 0, y: 28 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<div>
					<p className="eyebrow">01 / About</p>
					<h2>
						I mostly build backend systems, and lately that means working
						with LLMs.
					</h2>
				</div>
				<div className="about-copy">
					<p>
						I&apos;m a software engineer at Devsinc in Lahore. I work on LawPractice.ai, a tool that law firms in the United States use. More than 300 firms use it now.
					</p>
					<p>
						Most of my work is backend. Law firms send us messy files. Our system reads them, finds the important details, and writes new documents, like demand letters. I help build and fix these parts. I also work on the prompts we give the AI. Better prompts helped cut mistakes in the documents by about 90%.
					</p>
					<p>
						I started with frontend work. At Kryptomind I built web pages with Next.js and made one project load much faster. Later I led a team of three on a CRM called ResQ. I also built projects on my own, like Mawaddah, a matchmaking website.
					</p>
					<p>
						I studied software engineering at FAST-NUCES. I also helped lead the marketing team at SOFTEC, where we raised more than PKR 1,000,000 from sponsors.
					</p>
					<p>
						I like to understand what people need before I write any code. I want my work to still run after the demo is over.
					</p>
					<Button
						asChild
						variant="outline"
						className="about-button mt-5 border-ink/20"
					>
						<Link href="#experience">
							See my experience{" "}
							<ArrowUpRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</motion.div>
			<motion.div
				className="page-width facts-grid"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{
					duration: 0.6,
					delay: 0.15,
					ease: [0.22, 1, 0.36, 1],
				}}
			>
				<div>
					<MapPin className="h-5 w-5 text-coral" />
					<span>Lahore, Pakistan · Remote is fine</span>
				</div>
				<div>
					<GraduationCap className="h-5 w-5 text-coral" />
					<span>BS Software Engineering · FAST-NUCES</span>
				</div>
				<div>
					<Sparkles className="h-5 w-5 text-coral" />
					<span>AI/ML · Full-stack · Platform engineering</span>
				</div>
			</motion.div>
		</section>
	);
};

export default About;
