"use client";

import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";

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
				{PROFILE_DATA.experience.map((role, index) => (
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
								{role.stack.map((tag) => (
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
					<h3>{PROFILE_DATA.education.degree.title}</h3>
					<p>{PROFILE_DATA.education.degree.institution} · {PROFILE_DATA.education.degree.period}</p>
				</div>
				<div>
					<p className="eyebrow">Learning</p>
					<h3>AI, Backend, Frontend, and DevOps</h3>
					<p>
						Mostly self-paced courses on Udemy, Coursera, Github, and Youtube where I built projects along the way
					</p>
				</div>
				<ArrowUpRight className="education-arrow" />
			</motion.div>
		</div>
	</section>
);

export default Experience;
