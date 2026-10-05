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
			description: "A conversational assistant for gold investment questions using live market data and voice input.",
			bullets: [
				"Connected MetalPriceAPI to Google Gemini 2.0 so answers use current gold prices.",
				"Added OpenAI Whisper voice input and built the interface with Gradio.",
				"Handled API failures and missing prices by using the last saved price or clearly reporting that data is unavailable.",
			],
			impact: "Live gold prices · Voice input",
			stack: ["Python", "Gemini", "Whisper", "Gradio"],
			image: undefined,
			link: undefined,
		},
		{
			name: "ResQ CRM",
			category: "Full-stack product",
			description: "A CRM platform for staff operations, rider tracking, communication, and lead management.",
			bullets: [
				"Led a frontend team of three and built role-based login, lead dashboards, forms, popups, chat, and advanced filters for about 25 staff members in the United States.",
				"Added Google Maps and Firebase Cloud Storage to show riders' live locations with updates every few seconds.",
				"Moved the dashboard from client-side rendering to server-side rendering with caching, reducing load time from about 3.5 seconds to 1.8 seconds.",
			],
			impact: "Live rider tracking · 1.8s dashboard load",
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
			bullets: [
				"Built a platform for discovering, sharing, and managing prompts with user profiles and searchable tags.",
			],
			stack: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
			image: "/projects/promptopia.png",
			link: "https://promptopia-chi-ten.vercel.app/",
			code: "https://github.com/iamjunaidjutt/promptopia",
		},
		{
			name: "Mawaddah",
			category: "Product platform",
			description: "A marriage matchmaking platform built from requirements gathering through deployment.",
			bullets: [
				"Built token and Google authentication, role-based access, multi-step forms, matching by age, city, and preferences, paid subscriptions, and filtered dashboards.",
				"Designed the Supabase database and added indexes for matching and filtering, reducing the main query from about 350 ms to 120 ms on test data.",
				"Deployed to Vercel with pages loading in under two seconds and an 86 mobile Lighthouse performance score.",
			],
			impact: "350ms → 120ms matching query",
			stack: ["Next.js", "Node.js", "Supabase", "Vercel"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Fake News Detector",
			category: "Machine learning",
			description: "A BiLSTM-based NLP classifier that identifies fake and real news articles.",
			bullets: [
				"Trained the model on 14,308 WELFake test articles, reaching 96.2% accuracy and a 0.993 ROC-AUC score.",
				"Cleaned text with NLTK, used early stopping and class weights, and achieved 0.96 precision and recall.",
				"Deployed the model in Flask so users can paste an article and receive a label with a confidence score.",
			],
			impact: "96.2% accuracy · 0.993 ROC-AUC",
			stack: ["Python", "TensorFlow", "BiLSTM", "Flask"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Emotion Recognition",
			category: "Computer vision",
			description: "A CNN model that detects seven emotions from face photos.",
			bullets: [
				"Used OpenCV to detect and crop faces, resize images, and convert them to grayscale.",
				"Split 144 photos from 18 people by person so the same person was never in both training and test data.",
				"Used flips and small rotations to improve accuracy from 72% to 84%, reaching 27 correct predictions out of 32 test photos.",
			],
			impact: "84% accuracy · 7 emotions",
			stack: ["Python", "TensorFlow", "Keras", "OpenCV"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Boston House Price Prediction",
			category: "Machine learning",
			description: "A regression service that predicts Boston house prices from 13 features.",
			bullets: [
				"Built and evaluated a scikit-learn linear regression model, reaching an R² of 0.73 on 167 test houses with an average error of about $3,100.",
				"Added a Flask form with validation and clear errors for missing or invalid input.",
				"Added Docker support and GitHub Actions deployment to Heroku on pushes to the main branch.",
			],
			impact: "R² 0.73 · $3,100 average error",
			stack: ["Python", "Scikit-learn", "Pandas", "Flask", "Docker", "GitHub Actions", "Heroku"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Buxom Cosmetics",
			category: "E-commerce",
			description: "An online store with customer shopping flows and an administration panel.",
			bullets: [
				"Built JWT login, a product catalogue with pagination and filters, and a shopping cart.",
				"Added an admin CMS for creating, editing, and removing products with Prisma and MySQL.",
				"Used Redux Toolkit for application state and Stripe test mode for payments.",
			],
			impact: "Catalog · Admin CMS · Payments",
			stack: ["React.js", "Node.js", "Express.js", "MySQL", "Prisma ORM", "Redux Toolkit", "Stripe"],
			image: undefined,
			link: undefined,
		},
		{
			name: "POS Pharmacy",
			category: "Desktop application",
			description: "A pharmacy point-of-sale system for sales, inventory, and reporting.",
			bullets: [
				"Built product management, stock tracking, sales records, and role-aware login with hashed passwords.",
				"Added daily sales and low-stock reports with JasperReports.",
				"Wrote JUnit tests across 16 test classes covering users, roles, products, categories, carts, orders, authentication, and inventory.",
			],
			impact: "Inventory · Sales · 16 JUnit test classes",
			stack: ["Java", "Java Swing", "Hibernate", "MySQL", "JUnit", "JasperReports"],
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
						<p className="eyebrow">06 / Selected work</p>
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
								<ul className="project-description project-list">
									{project.bullets.map((bullet) => (
										<li key={bullet}>{bullet}</li>
									))}
								</ul>
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
