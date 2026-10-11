"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { PROFILE_DATA } from "@/data/profile";

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
					<h2>{PROFILE_DATA.about.heading}</h2>
				</div>
				<div className="about-copy">
					{PROFILE_DATA.about.paragraphs.map((p, i) => (
						<p key={i}>{p}</p>
					))}
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
					<span>{PROFILE_DATA.meta.location} · {PROFILE_DATA.meta.workPreference}</span>
				</div>
				<div>
					<GraduationCap className="h-5 w-5 text-coral" />
					<span>{PROFILE_DATA.education.degree.title} · {PROFILE_DATA.education.degree.institution}</span>
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
