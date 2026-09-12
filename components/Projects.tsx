"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
	const projects = [
		{
			name: "Gold Investment Estimations Assistant",
			category: "AI & automation",
			description:
				"A conversational assistant combining live metal rates, Gemini, and Whisper speech-to-text to provide real-time investing information and multimodal interaction.",
			impact: "Live rates · ~90% transcription accuracy",
			stack: ["Python", "Gemini", "Whisper", "Gradio"],
			image: undefined,
			link: undefined,
		},
		{
			name: "ResQ CRM",
			category: "Full-stack product",
			description:
				"A CRM platform with rider tracking, dashboards, authentication, chat, forms, filters, and server-rendered views connected to Firebase and REST APIs.",
			impact: "Real-time rider tracking · SSR and caching",
			stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Promptopia",
			category: "AI community product",
			description:
				"An AI prompt discovery and sharing platform with Google authentication, searchable tags, user profiles, and prompt management flows.",
			impact: "Live project · Public source available",
			stack: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
			image: "/projects/promptopia.png",
			link: "https://promptopia-chi-ten.vercel.app/",
			code: "https://github.com/iamjunaidjutt/promptopia",
		},
		{
			name: "Mawaddah",
			category: "Product platform",
			description:
				"A matchmaking platform with OAuth and token authentication, role-based permissions, multi-step forms, profile matching, subscriptions, and dynamic dashboards.",
			impact: "Schema designed from scratch · Optimized backend",
			stack: ["Next.js", "Node.js", "Supabase", "Vercel"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Fake News Detector",
			category: "Machine learning",
			description:
				"A BiLSTM-based NLP classifier with preprocessing pipelines and a Flask interface for real-time predictions on benchmark data.",
			impact: "85–90% validation accuracy",
			stack: ["Python", "TensorFlow", "BiLSTM", "Flask"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Emotion Recognition",
			category: "Computer vision",
			description:
				"A CNN model trained to detect facial expressions across seven emotions, using OpenCV to analyze image content and evaluate predictions.",
			impact: "~85% accuracy · 144 analyzed photos",
			stack: ["Python", "TensorFlow", "Keras", "OpenCV"],
			image: undefined,
			link: undefined,
		},
	];
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
						<p className="eyebrow">05 / Selected work</p>
						<h2 className="section-title">
							Projects with a reason to exist.
						</h2>
					</div>
					<p className="section-intro">
						A selection of AI experiments and product systems. Each
						one is framed by the problem, the contribution, and what
						changed.
					</p>
				</motion.div>
				<div className="project-grid">
					{projects.map((project, index) => (
						<motion.article
							className={`project-card ${index === 0 ? "project-featured" : ""}`}
							key={project.name}
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.45, delay: index * 0.04 }}
						>
							{project.image ? (
								<div className="project-image">
									<Image
										src={project.image}
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
									{project.category}
								</p>
								<h3>{project.name}</h3>
								<p className="project-description">
									{project.description}
								</p>
								<p className="project-impact">
									{project.impact}
								</p>
								<div className="tag-row">
									{project.stack.map((item) => (
										<span className="soft-tag" key={item}>
											{item}
										</span>
									))}
								</div>
								<div className="project-links">
									{project.link ? (
										<Link
											href={project.link}
											target="_blank"
										>
											<ArrowUpRight className="h-4 w-4" />
											Live project
										</Link>
									) : (
										<span className="unavailable">
											Private / link unavailable
										</span>
									)}
									{project.code ? (
										<Link
											href={project.code}
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
