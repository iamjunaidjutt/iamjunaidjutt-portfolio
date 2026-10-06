"use client";

import Image from "next/image";
import {
	ArrowDown,
	ArrowUpRight,
	Briefcase,
	Github,
	Linkedin,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
	return (
		<div className="hero-grid page-width">
			<motion.div
				className="hero-copy"
				initial={{ opacity: 0, y: 24 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
			>
				<p className="eyebrow hero-status-pill">
					<span className="status-dot" /> Open to full-time roles · Lahore
					or remote
				</p>
				<h1>
					Muhammad Junaid
					<span className="hero-title-accent">
						AI &amp; Full-Stack Engineer
					</span>
				</h1>
				<p className="hero-role">
					I build backend systems for a legal platform used by 300+ law
					firms, mostly the parts where{" "}
					<strong>LLMs read and write documents</strong>.
				</p>
				<p className="hero-lede">
					Associate Software Engineer at <strong>Devsinc</strong>,
					working on LawPractice.ai, which plaintiff law firms in the
					United States use. Before this I built frontends with Next.js
					and React.
				</p>
				<div className="hero-actions">
					<Button asChild size="lg" className="hero-primary-button">
						<Link href="#projects">
							<Briefcase className="mr-2 h-4 w-4" />
							See my work
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="hero-secondary-button border-ink/20 bg-transparent"
					>
						<Link href="/contact">
							Get in touch{" "}
							<ArrowUpRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
				<div className="hero-links">
					<Link
						href="https://www.linkedin.com/in/iamjunaidjutt/"
						target="_blank"
					>
						<Linkedin className="mr-2 h-4 w-4" />
						LinkedIn
					</Link>
					<Link
						href="https://github.com/iamjunaidjutt"
						target="_blank"
					>
						<Github className="mr-2 h-4 w-4" />
						GitHub
					</Link>
				</div>
			</motion.div>
			<div className="hero-portrait-wrap">
				<motion.div
					className="hero-portrait"
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
				>
					<Image
						src="/images/profile.png"
						width={512}
						height={512}
						alt="Muhammad Junaid"
						priority
						className="h-full w-full object-contain object-bottom"
					/>
				</motion.div>
			</div>
			<div className="hero-meta">
				<span>Associate Software Engineer (AI/ML) · Devsinc</span>
				<span>BS Software Engineering · FAST-NUCES</span>
				<span>Lahore, Pakistan · Remote is fine</span>
			</div>
			<Link href="#about" className="scroll-cue">
				<ArrowDown className="h-4 w-4" /> Scroll down
			</Link>
		</div>
	);
};

export default HeroSection;
