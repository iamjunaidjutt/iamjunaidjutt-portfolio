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
			"Built backend features for LawPractice.ai using ASP.NET Core, LLMs, RAG, and MCP, contributing to a 70% reduction in document preparation time and 7x faster demand letter turnaround.",
			"Helped build APIs and AI agents that read, extract, process, and generate legal documents, while improving prompts to reduce documentation errors by about 90%.",
			"Maintained OCR, document reading, and document writing pipelines for multiple document types, fixed production issues, and added new pipelines for a platform used by more than 300 law firms.",
			"Used OpenCV, Azure Document Intelligence, Azure Foundry, Azure SQL Database, Azure Cosmos DB, and RabbitMQ background workers to build and run these features.",
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
			"Contributed to product work that led into the Associate Software Engineer role.",
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
			"Built user interfaces with animations and 3D models using GSAP and React Three Fiber across several projects.",
			"Used Next.js, TypeScript, and React to connect frontend applications to REST APIs, including server-side rendering and code splitting that improved a Lighthouse score from 55 to 90.",
			"Worked on an NFT marketplace and learned Web3 fundamentals, including blockchain, smart contracts, and wallet integration.",
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
						Where I&apos;ve built things.
					</h2>
				</div>
				<p className="section-intro">
					A practical path from full-stack product development into AI
					systems, shaped by client work and constant experimentation.
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
					<p className="eyebrow">Continuous learning</p>
					<h3>AI, ML &amp; delivery</h3>
					<p>
						Focused training in Agentic AI, Generative AI, LLM
						engineering, RAG, QLoRA, supervised machine learning,
						DevOps, and React.
					</p>
				</div>
				<ArrowUpRight className="education-arrow" />
			</motion.div>
		</div>
	</section>
);

export default Experience;
