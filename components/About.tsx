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
						Systems that solve real problems, with AI where it earns
						its place.
					</h2>
				</div>
				<div className="about-copy">
					<p>
						I work across the stack, with a current focus on
						AI-enabled backend systems. At Devsinc, I develop legal
						technology products with ASP.NET Core, FastAPI, LLMs, RAG,
						Microsoft Azure, and CI/CD pipelines while staying close
						to client needs and delivery outcomes.
					</p>
					<p>
						Before that, I built responsive experiences and REST API
						integrations at Kryptomind, led frontend work for a CRM,
						and explored Web3 through blockchain, smart contracts,
						and wallet integrations. I care about clear
						requirements, useful abstractions, and software that
						holds up after the demo.
					</p>
					<Button
						asChild
						variant="outline"
						className="mt-5 border-ink/20"
					>
						<Link href="#experience">
							Explore my experience{" "}
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
					<span>Pakistan · Open to remote collaboration</span>
				</div>
				<div>
					<GraduationCap className="h-5 w-5 text-coral" />
					<span>BS Software Engineering · FAST-NUCES</span>
				</div>
				<div>
					<Sparkles className="h-5 w-5 text-coral" />
					<span>AI/ML · Full-Stack · Platform Engineering</span>
				</div>
			</motion.div>
		</section>
	);
};

export default About;
