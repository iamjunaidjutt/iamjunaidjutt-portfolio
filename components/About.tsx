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
						I work across the stack, but lately most of my time goes to
						backend work involving LLMs. At Devsinc I work on
						LawPractice.ai with ASP.NET Core, FastAPI, RAG, Azure, and
						CI/CD pipelines, and I keep in touch with the client about
						what they need. A lot of the work is document pipelines:
						OCR, pulling data out of files, and generating things like
						demand letters.
					</p>
					<p>
						Before that I built frontends and REST integrations at
						Kryptomind, led the frontend team on a CRM, and got into
						Web3 for a while. I care about getting the requirements
						straight first, and about code that still works after the
						demo.
					</p>
					<Button
						asChild
						variant="outline"
						className="mt-5 border-ink/20"
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
