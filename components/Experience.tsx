"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const roles = [
	{
		period: "Dec 2025 — Present",
		title: "Associate Software Engineer (AI/ML)",
		company: "Devsinc · Lahore, Pakistan",
		copy: "Building AI-driven legal technology solutions for LawPractice AI with ASP.NET Core, LLMs, RAG, and agentic workflows. I work directly with clients on requirements related to document extraction, reading, processing, and document generation, utilizing technologies such as OpenCV, Azure Document Intelligence, Azure Foundry, Azure SQL Database, Azure Cosmos DB, and RabbitMQ background workers.",
		tags: [
			"ASP.NET Core",
			"OpenAI",
			"LLMs",
			"RAG",
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
		copy: "Contributed to the engineering workflow for LawPractice AI that led into my current role, building solutions across backend development, delivery practices, and AI-enabled product work.",
		tags: ["Backend", "AI/ML", "Client collaboration"],
		link: "https://drive.google.com/file/d/1kbY3Bnu1EXWsCYwJMx6Knzlx5xFwLyaX/view?usp=sharing",
		linkLabel: "View offer letter",
	},
	{
		period: "Aug 2024 — Nov 2024",
		title: "Software Engineer Intern",
		company: "Kryptomind LLC · Lahore, Pakistan",
		copy: "Developed responsive React and Next.js interfaces, integrated REST APIs, and led frontend work for ResQ CRM,which result in 80% reduced load time using server side rendering. I also explored 3D animated experiences, blockchain, smart contracts, and wallet integrations for Web3 products.",
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
							<p className="timeline-copy">{role.copy}</p>
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
