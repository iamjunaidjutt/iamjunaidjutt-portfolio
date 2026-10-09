"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

import { PROFILE_DATA } from "@/data/profile";

const Projects = () => {
	return (
		<section className="section-band" id="projects">
			<div className="page-width">
				<motion.div
					className="section-heading-row"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				>
					<div>
						<p className="eyebrow">06 / Selected work</p>
						<h2 className="section-title">
							Things I&apos;ve built.
						</h2>
					</div>
					<p className="section-intro">
						Some real products, some things I built to learn.
					</p>
				</motion.div>
				<div className="project-grid">
					{PROFILE_DATA.projects.map((project, index) => (
						<motion.article
							className={`project-card ${index === 0 ? "project-featured" : ""}`}
							key={project.name}
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.45, delay: index * 0.04 }}
						>
							{project.display?.image ? (
								<div className="project-image">
									<Image
										src={project.display.image}
										alt={`${project.name} interface`}
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
									/>
								</div>
							) : (
								<div className="project-index">
									0{index + 1}
								</div>
							)}
							<div className="project-body">
								<p className="project-category">
									{project.display?.category}
								</p>
								<h3>{project.name}</h3>
								<p className="project-description">
									{project.description}
								</p>
								<ul className="project-description project-list">
									{project.display?.bullets?.map((bullet) => (
										<li key={bullet}>{bullet}</li>
									))}
								</ul>
								<p className="project-impact">
									{project.display?.impact}
								</p>
								<div className="tag-row">
									{project.stack.map((item) => (
										<span className="soft-tag" key={item}>
											{item}
										</span>
									))}
								</div>
								<div className="project-links">
									{project.display?.link ? (
										<Link
											href={project.display.link}
											target="_blank"
										>
											<ArrowUpRight className="h-4 w-4" />
											Live project
										</Link>
									) : (
										<span className="unavailable">
											Not public
										</span>
									)}
									{project.display?.githubUrl ? (
										<Link
											href={project.display.githubUrl}
											target="_blank"
										>
											<Github className="h-4 w-4" />
											Source
										</Link>
									) : null}
								</div>
							</div>
						</motion.article>
					))}
				</div>
				<div className="center-link">
					<Link
						href="https://github.com/iamjunaidjutt?tab=repositories"
						target="_blank"
					>
						Browse GitHub repositories{" "}
						<ArrowUpRight className="ml-2 h-4 w-4" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Projects;
