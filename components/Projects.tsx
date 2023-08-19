"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import Project from "@/components/Project";

const variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			delayChildren: 0.2,
		},
	},
};

const Projects = () => {
	const projects = [
		{
			id: 1,
			name: "Promptopia",
			description:
				"Promptopia is an innovative AI prompt-creating and sharing website, that empowers users to explore prompts related to various tags and search for specific keywords within the shared prompts contributed by others on the platform. By signing in through Google authentication, users can create and share their prompts, with the added benefit of being able to edit or delete them. Non-authorized users can still browse through the shared prompts, search for any topic of their interest, and view the profiles of specific users by clicking on the prompt user details section.",
			techStack: [
				"React.js",
				"Next.js",
				"Redux.js",
				"Tailwind CSS",
				"MongoDB",
				"Framer Motion",
			],
			image: "/projects/promptopia.png",
			tag: "Personal - Development",
			liveLink: "https://promptopia-chi-ten.vercel.app/",
			codeLink: "https://github.com/iamjunaidjutt/promptopia",
		},
	];
	return (
		<div
			className="p-10 md:p-20 flex flex-col items-center gap-10 md:gap-20"
			id="projects"
		>
			<h2 className="text-2xl md:text-4xl font-bold font-poppins">
				Projects
			</h2>
			<motion.div
				variants={variants}
				initial="hidden"
				animate="show"
				className="flex flex-col items-center gap-10 md:gap-20 w-full"
			>
				{projects.map((project) => (
					<Project key={project.name} {...project} />
				))}
			</motion.div>
			<Button variant={"destructive"} size={"lg"}>
				<Plus className="mr-2 h-4 w-4" />
				<Link
					href={"https://github.com/iamjunaidjutt?tab=repositories"}
					target="_blank"
				>
					View More
				</Link>
			</Button>
		</div>
	);
};

export default Projects;
