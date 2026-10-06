"use client";

import { BrainCircuit, CloudCog, Code2, DatabaseZap } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
	{
		icon: BrainCircuit,
		title: "AI features",
		description:
			"Adding LLMs, RAG, and agents to a product: reading and writing documents, answering questions from your own data, and automating routine steps.",
	},
	{
		icon: Code2,
		title: "Full-stack web apps",
		description:
			"Websites and web apps from the interface down to the API and database, including login and role-based access. Mostly Next.js, React, Node.js, Python, and ASP.NET Core.",
	},
	{
		icon: DatabaseZap,
		title: "Platform engineering",
		description:
			"Setting up the infrastructure apps run on: Docker and Kubernetes, Terraform and Ansible, and monitoring with Grafana, Prometheus, and Loki.",
	},
	{
		icon: CloudCog,
		title: "Cloud and deployment",
		description:
			"Deploying to Azure, AWS, or Vercel with CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI), so a release is routine instead of a big event.",
	},
];

const Services = () => {
	return (
		<section className="section-band capability-band" id="capabilities">
			<div className="page-width">
				<motion.div
					className="section-heading-row"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				>
					<div>
						<p className="eyebrow">05 / What I can do</p>
						<h2 className="section-title">
							What I can help with.
						</h2>
					</div>
					<p className="section-intro">
						The kinds of work I'm most useful for.
					</p>
				</motion.div>
				<div className="capability-grid">
					{capabilities.map(
						({ icon: Icon, title, description }, index) => (
							<motion.div
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
								<Icon />
								<h3>{title}</h3>
								<p>{description}</p>
							</motion.div>
						),
					)}
				</div>
			</div>
		</section>
	);
};

export default Services;
