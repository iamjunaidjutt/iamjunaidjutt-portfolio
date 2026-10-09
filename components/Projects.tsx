"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

import { PROFILE_DATA } from "@/data/profile";

const Projects = () => {
	const projects = [
		{
			name: "ResQ CRM",
			category: "Web app",
			description: "A CRM for managing leads, tracking riders, and keeping staff in touch.",
			bullets: [
				"Led a frontend team of three and built role-based login, lead dashboards, forms, popups, chat, and advanced filters for about 25 staff members in the United States.",
				"Added Google Maps so staff can see riders' live locations, with Firebase Cloud Storage updating them every few seconds.",
				"Moved the app from client-side to server-side rendering with caching. The main dashboard now loads in about 1.8 seconds instead of 3.5.",
			],
			impact: "Live rider tracking · 1.8s dashboard load",
			stack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Mawaddah",
			category: "Web app",
			description: "A marriage matchmaking site, built from requirements gathering through deployment.",
			bullets: [
				"Built login with tokens and Google, role-based access, multi-step forms, matching by age, city, and preferences, paid subscriptions, and dashboards with filters.",
				"Designed the Supabase database and added indexes for matching and filtering. The main matching query went from about 350 ms to 120 ms on test data.",
				"Deployed on Vercel. Main pages load in under 2 seconds, with a mobile Lighthouse performance score of 86.",
			],
			impact: "350ms → 120ms matching query",
			stack: ["Next.js", "Node.js", "Supabase", "Vercel"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Gold Investment Estimations Assistant",
			category: "AI app",
			description: "A chat assistant that answers questions about gold investing, using the live gold price.",
			bullets: [
				"Connected MetalPriceAPI to Google Gemini 2.0 so answers use the current gold price.",
				"Added voice input with OpenAI Whisper so you can speak your question, and built the interface with Gradio.",
				"Handled API errors and missing data. If the price isn't available, it uses the last saved price or says so instead of guessing.",
			],
			impact: "Live gold prices · Voice input",
			stack: ["Python", "Gemini", "Whisper", "Gradio"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Promptopia",
			category: "Web app",
			description: "A site for finding and sharing AI prompts.",
			impact: "Live demo · Source on GitHub",
			bullets: [
				"Built Google sign-in, prompt creation and editing, searchable tags, and user profile pages with Next.js and MongoDB.",
			],
			stack: ["Next.js", "React", "MongoDB", "Tailwind CSS"],
			image: "/projects/promptopia.png",
			link: "https://promptopia-chi-ten.vercel.app/",
			code: "https://github.com/iamjunaidjutt/promptopia",
		},
		{
			name: "Fake News Detector",
			category: "Machine learning",
			description: "A model that tells fake news articles from real ones.",
			bullets: [
				"Built a BiLSTM model in TensorFlow. On a test set of 14,308 articles from the WELFake dataset it reached 96.2% accuracy and a ROC-AUC of 0.993.",
				"Cleaned the text with NLTK, stopped training early when scores stopped improving, and weighted the classes. Precision and recall were both 0.96.",
				"Put it in a Flask app where you paste an article and get a label (real or fake) with a confidence score.",
			],
			impact: "96.2% accuracy · 0.993 ROC-AUC",
			stack: ["Python", "TensorFlow", "BiLSTM", "Flask"],
			image: undefined,
			link: undefined,
			code: "https://github.com/iamjunaidjutt/Fake-News-Detector",
		},
		{
			name: "Emotion Recognition",
			category: "Computer vision",
			description: "A CNN that picks one of seven emotions from a face photo.",
			bullets: [
				"Used OpenCV to find and crop the face, resize it, and convert it to grayscale.",
				"Trained on 144 photos of 18 people, split by person so the same person is never in both the training and test sets.",
				"Added flips and small rotations to the training photos, which raised accuracy from 72% to 84% (27 of 32 test photos correct).",
			],
			impact: "84% accuracy · 7 emotions",
			stack: ["Python", "TensorFlow", "Keras", "OpenCV"],
			image: undefined,
			link: undefined,
		},
		{
			name: "Boston House Price Prediction",
			category: "Machine learning",
			description: "A web app that predicts Boston house prices from 13 features.",
			bullets: [
				"Built a linear regression model with scikit-learn. On 167 test houses it got an R² of 0.73, with predictions off by about $3,100 on average.",
				"Put it in a Flask app with a form, and clear errors when the input is missing or wrong.",
				"Set up GitHub Actions to deploy to Heroku on every push to main, and added a Dockerfile.",
			],
			impact: "R² 0.73 · $3,100 average error",
			stack: ["Python", "Scikit-learn", "Pandas", "Flask", "Docker", "GitHub Actions", "Heroku"],
			image: undefined,
			link: undefined,
			code: "https://github.com/iamjunaidjutt/Boston-House-Price-Prediction",
		},
		{
			name: "Buxom Cosmetics",
			category: "Web app",
			description: "An online store with a shopping cart and an admin panel.",
			bullets: [
				"Built JWT login, a product catalogue with pagination and filters, and a shopping cart.",
				"Added an admin panel to add, edit, and remove products, using Prisma with MySQL.",
				"Used Redux Toolkit for state and Stripe (test mode) for payments.",
			],
			impact: "Catalog · Admin CMS · Payments",
			stack: ["React.js", "Node.js", "Express.js", "MySQL", "Prisma ORM", "Redux Toolkit", "Stripe"],
			image: undefined,
			link: undefined,
			code: "https://github.com/iamjunaidjutt/Buxom-Cosmetics",
		},
		{
			name: "POS Pharmacy",
			category: "Desktop application",
			description: "A desktop point-of-sale app for a pharmacy: sales, stock, and reports.",
			bullets: [
				"Built product management, stock tracking, sales records, and login with hashed passwords and user roles.",
				"Added daily sales and low-stock reports with JasperReports.",
				"Wrote JUnit tests in 16 test classes, covering the database classes, login and register, inventory, and the cart.",
			],
			impact: "Inventory · Sales · 16 JUnit test classes",
			stack: ["Java", "Java Swing", "Hibernate", "MySQL", "JUnit", "JasperReports"],
			image: undefined,
			link: undefined,
			code: "https://github.com/iamjunaidjutt/pos",
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
							Things I&apos;ve built.
						</h2>
					</div>
					<p className="section-intro">
						Some real products, some things I built to learn.
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
											Not public
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
