"use client";

import { ArrowUpRight, BookOpen, Cloud, Network } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";

const Training = () => (
	<section className="section-band training-band" id="training">
		<div className="page-width">
			<motion.div
				className="section-heading-row"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			>
				<div>
					<p className="eyebrow">04 / Training</p>
					<h2 className="section-title">
						Learning by building the thing.
					</h2>
				</div>
				<p className="section-intro">
					These are the courses where I built projects instead of just
					watching videos.
				</p>
			</motion.div>
			<div className="training-grid">
				{PROFILE_DATA.coursesList.map((item, index) => {
					const Icon = item.description === 'Cloud' ? Cloud : item.description === 'Network' ? Network : BookOpen;
					return (
						<motion.article
							className="training-card"
							key={item.title}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{
								duration: 0.5,
								delay: index * 0.08,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<Icon className="training-icon" />
							<p className="training-provider">{item.instructor}</p>
							<h3>{item.title}</h3>
							<ul className="training-description training-list">
								{item.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
							<div className="tag-row">
								{item.tags.map((tag) => (
									<span className="soft-tag" key={tag}>
										{tag}
									</span>
								))}
							</div>
							<Link
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								className="training-certificate"
							>
								View certificate
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</motion.article>
						);
					})}
			</div>
			<motion.div
				className="training-note"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			>
				<span>What these courses covered</span>
				<strong>
					Agentic AI · RAG · LLMs · CI/CD · Cloud infrastructure
				</strong>
				<ArrowUpRight className="h-4 w-4" />
			</motion.div>
		</div>
	</section>
);

export default Training;
