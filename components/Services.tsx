"use client";

import { BrainCircuit, CloudCog, Code2, DatabaseZap } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
	{
		icon: BrainCircuit,
		title: "AI-enabled systems",
		description:
			"LLM integrations, RAG pipelines, NLP workflows, and agentic automation connected to real product needs.",
	},
	{
		icon: Code2,
		title: "Full-stack products",
		description:
			"Fast, accessible interfaces and robust APIs across Next.js, React, Node.js, Python, and ASP.NET Core.",
	},
	{
		icon: DatabaseZap,
		title: "Platform engineering",
		description:
			"Data modeling, secure authentication, scalable services, and integrations that keep products dependable.",
	},
	{
		icon: CloudCog,
		title: "Cloud delivery",
		description:
			"Azure/AWS deployments, CI/CD pipelines, Docker workflows, and release practices that reduce friction.",
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
						<p className="eyebrow">04 / Capabilities</p>
						<h2 className="section-title">
							The work I can take from concept to delivery.
						</h2>
					</div>
					<p className="section-intro">
						A focused set of engineering capabilities built around
						practical product outcomes.
					</p>
				</motion.div>
				<div className="capability-grid">
					{capabilities.map(({ icon: Icon, title, description }, index) => (
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
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
