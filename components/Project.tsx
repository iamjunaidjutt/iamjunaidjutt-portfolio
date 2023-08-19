"use client";

import Image from "next/image";
import { ExternalLink, GithubIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectProps {
	id: number;
	name: string;
	description: string;
	techStack: string[];
	image: string;
	tag: string;
	liveLink: string;
	codeLink: string;
}

const item = {
	hidden: { opacity: 0, y: 30 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1,
			ease: "easeOut",
		},
	},
};

const Project: React.FC<ProjectProps> = ({
	id,
	name,
	description,
	techStack,
	image,
	tag,
	liveLink,
	codeLink,
}) => {
	return (
		<motion.div
			className="flex flex-1 flex-col md:flex-row max-md:gap-y-5 md:gap-x-5 md:w-3/4 border-2 border-myBgBlue dark:border-myBlue rounded-lg shadow-lg"
			variants={item}
			whileHover={{ scale: 1.05 }}
		>
			{id % 2 !== 0 && (
				<Image
					src={image}
					alt={name}
					width={500}
					height={500}
					className="object-cover max-md:rounded-t-lg md:rounded-l-lg"
				/>
			)}
			<div className="flex flex-col items-start justify-between gap-5 p-3 md:m-5">
				<h3 className="text-lg md:text-xl font-bold">{name}</h3>
				<p className="text-sm md:text-lg">
					{description
						.slice(0, 200)
						.slice(0, description.lastIndexOf(" ")) + "..."}
				</p>
				<div className="flex flex-wrap flex-row gap-3 text-xs md:text-sm">
					{techStack.map((tech) => (
						<Badge key={tech}>{tech}</Badge>
					))}
				</div>
				<div className="flex flex-col md:flex-row md:items-center gap-y-5 justify-between w-full">
					<p className="text-xs md:text-sm">{tag}</p>
					<div className="flex gap-3 text-xs md:text-sm">
						<Button>
							<ExternalLink className="mr-2 h-4 w-4" />
							<Link href={liveLink} target="_blank">
								View Live
							</Link>
						</Button>
						<Button>
							<GithubIcon className="mr-2 h-4 w-4" />
							<Link href={codeLink} target="_blank">
								View Code
							</Link>
						</Button>
					</div>
				</div>
			</div>
			{id % 2 === 0 && (
				<Image
					src={image}
					alt={name}
					width={500}
					height={500}
					className="object-cover max-md:rounded-b-lg md:rounded-r-lg"
				/>
			)}
		</motion.div>
	);
};

export default Project;
