"use client";

import React from "react";
import { TagCloud, TagCloudOptions } from "@frank-mayer/react-tag-cloud";
// same as: import TagCloud from "@frank-mayer/react-tag-cloud"

const MyTagCloud = () => (
	<TagCloud
		options={(w: Window & typeof globalThis): TagCloudOptions => ({
			radius: Math.min(600, w.innerWidth, w.innerHeight) / 2,
			maxSpeed: "fast",
		})}
		onClick={(tag: string, ev: MouseEvent) => alert(tag)}
		onClickOptions={{ passive: true }}
	>
		{[
			"HTML",
			"CSS",
			"React",
			"Next.js",
			"NodeJs",
			"ExpressJS",
			"TailwindCSS",
			"Bootstrap",
			"JavaScript",
			"DOM",
			"Git",
			"GitHub",
			"JQuery",
			"EJS",
			"SQL",
			"MongoDB",
			"Mongoose ODM",
			"REST APIs",
			"PSD to HTML",
			"Linux",
			"Problem Solving",
			"C++",
			"Java",
			"OOP",
			"Data Structures",
			"Team Work",
			"Team Leadership",
			"Team Management",
			"Team Building",
			"Marketing",
			"UI/UX",
			"Adobe Illustrator",
			"Adobe Photoshop",
			"VSCode",
			"TypeScript",
			"Preact",
			"Jest",
			"Next",
			"ESLint",
			"Framer Motion",
		]}
	</TagCloud>
);

export default MyTagCloud;
