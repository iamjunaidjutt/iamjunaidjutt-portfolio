"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const roles = [
	{
		period: "Dec 2025 — Present",
		title: "Associate Software Engineer",
		company: "Devsinc · Lahore, Pakistan",
		bullets: [
			"Built backend features for LawPractice.ai using ASP.NET Core, LLMs, RAG, and MCP. My work on processing legal demands and case summaries helped cut document preparation time by 70% and made demand letters about 7x faster to turn around.",
			"Helped build the APIs and AI agents that read, extract, process, and generate documents, and improved their prompts. Together these helped cut documentation errors by about 90%.",
			"Kept the OCR, document reading, and document writing pipelines running across different document types, added new ones when needed, and fixed issues clients reported in production. The platform is now used by 300+ law firms.",
			"Day to day: Azure Document Intelligence and Foundry, Azure SQL and Cosmos DB, RabbitMQ background workers, and OpenCV.",
		],
		tags: [
			"ASP.NET Core",
			"OpenAI",
			"LLMs",
			"RAG",
			"MCP",
			"Azure",
			"Agentic AI",
			"RabbitMQ",
		],
		link: "https://drive.google.com/file/d/155bk8op7Qvs3U1AmrA6ELnfrDXBdWmhB/view?usp=sharing",
		linkLabel: "View offer letter",
	},
	{
		period: "Oct 2025 — Dec 2025",
		title: "Software Engineer Intern",
		company: "Devsinc · Lahore, Pakistan",
		bullets: [
			"Worked on backend development, bug fixes, and AI features for LawPractice.ai.",
			"That work led to my current full-time role.",
		],
		tags: ["Backend", "AI/ML", "Client collaboration"],
		link: "https://drive.google.com/file/d/1kbY3Bnu1EXWsCYwJMx6Knzlx5xFwLyaX/view?usp=sharing",
		linkLabel: "View offer letter",
	},
	{
		period: "Aug 2024 — Nov 2024",
		title: "Software Engineer Intern",
		company: "Kryptomind LLC · Lahore, Pakistan",
		bullets: [
			"Built interfaces with animations and 3D models using GSAP and React Three Fiber across several projects, and used Lenis for smooth scrolling.",
			"Connected Next.js, TypeScript, and React frontends to REST APIs. Server-side rendering and code splitting took one project's Lighthouse score from 55 to 90.",
			"Worked on an NFT marketplace and learned Web3 basics: blockchain, smart contracts, and wallet integration.",
		],
		tags: ["Next.js", "TypeScript", "React", "GSAP", "Firebase", "Web3"],
		link: "https://drive.google.com/file/d/1V97WzynXJDH4v_e7pidoIxPf9BKlb3Dk/view?usp=sharing",
		linkLabel: "View experience letter",
	},
];

const Experience = () => (
	<section className="section-band" id="experience">
		<div className="page-width">
			<motion.div
				className="section-heading-row"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			>
				<div>
					<p className="eyebrow">02 / Experience</p>
					<h2 className="section-title">
						Where I&apos;ve worked.
					</h2>
				</div>
				<p className="section-intro">
					I started in frontend, moved to backend, and ended up working
					on AI features.
				</p>
			</motion.div>
			<div className="timeline">
				{roles.map((role, index) => (
					<motion.article
						className="timeline-item"
						key={`${role.company}-${role.title}`}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{
							duration: 0.5,
							delay: index * 0.1,
							ease: [0.22, 1, 0.36, 1],
						}}
					>
						<div className="timeline-period">
							<CalendarDays className="h-4 w-4" />
							{role.period}
						</div>
						<div className="timeline-content">
							<h3>{role.title}</h3>
							<p className="timeline-company">{role.company}</p>
							<ul className="timeline-copy timeline-list">
								{role.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
							<div className="tag-row">
								{role.tags.map((tag) => (
									<span className="soft-tag" key={tag}>
										{tag}
									</span>
								))}
							</div>
							<Link
								href={role.link}
								target="_blank"
								rel="noopener noreferrer"
								className="training-certificate"
							>
								{role.linkLabel}
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</div>
					</motion.article>
				))}
			</div>
			<motion.div
				className="education-row"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			>
				<div>
					<p className="eyebrow">Education</p>
					<h3>BS Software Engineering</h3>
					<p>FAST-NUCES · 2021 — 2025</p>
				</div>
				<div>
					<p className="eyebrow">Courses</p>
					<h3>Online courses</h3>
					<p>
						Recent ones cover AI agents, LLM apps, DevOps, machine
						learning basics, and React.
					</p>
				</div>
				<ArrowUpRight className="education-arrow" />
			</motion.div>
		</div>
	</section>
);

export default Experience;
