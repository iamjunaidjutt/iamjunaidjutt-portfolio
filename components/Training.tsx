"use client";

import { ArrowUpRight, BookOpen, Cloud, Network } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const training = [
	{
		icon: BookOpen,
		title: "AI Engineer · Agentic Track",
		provider: "Udemy",
		bullets: [
			"Built eight AI agent projects using OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and MCP.",
			"Created a simulated trading floor where four agents collaborate, make trades autonomously, and use tools through MCP servers.",
		],
		tags: ["Agents", "MCP", "CrewAI", "LangGraph", "AutoGen"],
		certificate:
			"https://www.udemy.com/certificate/UC-834f64a1-cba5-401e-b922-f5e48c950421/",
	},
	{
		icon: BookOpen,
		title: "AI Engineer · Core Track",
		provider: "Udemy",
		bullets: [
			"Built eight LLM applications across an eight-week course using Hugging Face, LangChain, RAG with vector search, and QLoRA fine-tuning.",
			"Built multi-agent systems and compared open-source and commercial models on coding and business tasks.",
		],
		tags: ["LLM engineering", "RAG", "QLoRA", "Fine-tuning", "HuggingFace"],
		certificate:
			"https://www.udemy.com/certificate/UC-84a36fb6-5a17-4d21-8b97-e570d737727e/",
	},
	{
		icon: Cloud,
		title: "Decoding DevOps",
		provider: "Udemy",
		bullets: [
			"Learned DevOps through hands-on projects with AWS, Linux, Docker, Kubernetes, Terraform, Ansible, Jenkins, GitHub Actions, GitLab CI, Helm, and ArgoCD.",
			"Covered monitoring and used GitHub Copilot and Amazon Q to speed up scripting and automation.",
		],
		tags: [
			"AWS",
			"GCP",
			"Docker",
			"Kubernetes",
			"Terraform",
			"GitOps",
			"Observability",
		],
		certificate:
			"https://www.udemy.com/certificate/UC-b9e48ed9-3b33-41ec-8576-ebf33cdcc014/",
	},
	{
		icon: Network,
		title: "Supervised Machine Learning",
		provider: "DeepLearning.AI · Coursera",
		bullets: [
			"Learned to build and train regression and classification models in Python with NumPy and scikit-learn.",
			"Covered multiple input features, regularization, and model evaluation techniques.",
		],
		tags: ["Machine learning", "Regression", "Classification", "Python"],
		certificate:
			"https://www.coursera.org/account/accomplishments/verify/EZ65K9HN6F86",
	},
	{
		icon: BookOpen,
		title: "React · The Complete Guide",
		provider: "Udemy",
		bullets: [
			"Learned React components, hooks, forms, routing, Context API, and Redux Toolkit.",
			"Covered Next.js fundamentals and deploying React applications.",
		],
		tags: ["React", "Next.js", "Redux", "Frontend"],
		certificate:
			"https://www.udemy.com/certificate/UC-9f0a3caf-cfcf-4a6e-8f7f-2d9ef8c35286/",
	},
];

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
					Recent training is deliberately hands-on: agent systems, LLM
					products, cloud delivery, and the infrastructure that takes
					them to production.
				</p>
			</motion.div>
			<div className="training-grid">
				{training.map(
					(
						{
							icon: Icon,
							title,
							provider,
									bullets,
							tags,
							certificate,
						},
						index,
					) => (
						<motion.article
							className="training-card"
							key={title}
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
							<p className="training-provider">{provider}</p>
							<h3>{title}</h3>
							<ul className="training-description training-list">
								{bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
							<div className="tag-row">
								{tags.map((tag) => (
									<span className="soft-tag" key={tag}>
										{tag}
									</span>
								))}
							</div>
							<Link
								href={certificate}
								target="_blank"
								rel="noopener noreferrer"
								className="training-certificate"
							>
								View certificate
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</motion.article>
					),
				)}
			</div>
			<motion.div
				className="training-note"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			>
				<span>Coursework applied to</span>
				<strong>
					Agentic AI · RAG · LLMs · CI/CD · Cloud infrastructure
				</strong>
				<ArrowUpRight className="h-4 w-4" />
			</motion.div>
		</div>
	</section>
);

export default Training;
