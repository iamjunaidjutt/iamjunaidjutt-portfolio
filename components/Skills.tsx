"use client";

import { motion } from "framer-motion";

const groups = [
	[
		"AI & data",
		"LLMs",
		"RAG",
		"Agentic AI",
		"OpenAI Agents SDK",
		"OpenAI API",
		"CrewAI",
		"LangGraph",
		"AutoGen",
		"MCP",
		"Prompt Engineering",
		"LangChain",
		"Hugging Face",
		"QLoRA",
		"Fine-tuning",
		"Vector Search",
		"NLP",
		"TensorFlow",
		"Keras",
		"Scikit-learn",
		"Pandas",
		"NumPy",
		"Matplotlib",
		"Seaborn",
		"OpenCV",
	],
	[
		"Backend & APIs",
		"ASP.NET Core",
		"Node.js",
		"Express",
		"Flask",
		"Django",
		"Django REST Framework",
		"FastAPI",
		"REST APIs",
	],
	[
		"Frontend",
		"Next.js",
		"React",
		"TypeScript",
		"JavaScript",
		"HTML",
		"CSS",
		"Tailwind CSS",
		"Redux Toolkit",
		"React Native",
		"GSAP",
		"Lenis",
		"Framer Motion",
		"Android Studio",
	],
	[
		"Platforms & storage",
		"Microsoft Azure",
		"AWS",
		"AWS Lambda",
		"AWS ECS",
		"AWS EKS",
		"AWS S3",
		"AWS API Gateway",
		"AWS Serverless",
		"GCP",
		"Google Cloud Platform",
		"Linux",
		"Docker",
		"Kubernetes",
		"Terraform",
		"Ansible",
		// "Ansible",
		"Helm",
		"ArgoCD",
		"PostgreSQL",
		"MySQL",
		"MS SQL Server",
		"MongoDB",
		"NoSQL",
		"Firebase",
		"Supabase",
		"Grafana",
		"Prometheus",
		"Loki",
	],
	[
		"Languages & delivery",
		"Python",
		"C#",
		"Java",
		"C++",
		"SQL",
		"Git/GitHub",
		"CI/CD",
		"GitHub Actions",
		"Jenkins",
		"GitLab",
		"GitLab CI/CD",
		// "Helm",
		// "ArgoCD",
		"RabbitMQ",
		// "Kafka",
	],
];

const Skills = () => {
	return (
		<section className="section-band section-cream" id="stack">
			<div className="page-width">
				<motion.div
					className="section-heading-row"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
				>
					<div>
						<p className="eyebrow">03 / Stack</p>
						<h2 className="section-title">What I work with.</h2>
					</div>
					<p className="section-intro">
						Tools I use to turn product requirements into dependable
						software, from interface to infrastructure.
					</p>
				</motion.div>
				<div className="stack-grid">
					{groups.map(([name, ...items], index) => (
						<motion.div
							className="stack-group"
							key={name}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{
								duration: 0.45,
								delay: index * 0.07,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							<h3>{name}</h3>
							<div className="tag-row">
								{items.map((item) => (
									<span className="stack-tag" key={item}>
										{item}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;
