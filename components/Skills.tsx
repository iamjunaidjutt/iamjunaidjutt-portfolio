"use client";

import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";

const groups = [
	["AI & data", ...PROFILE_DATA.skills.ai],
	["Backend & APIs", ...PROFILE_DATA.skills.backend],
	["Frontend", ...PROFILE_DATA.skills.frontend],
	["Platforms & storage", ...PROFILE_DATA.skills.platforms],
	["Languages & delivery", ...PROFILE_DATA.skills.languages],
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
						The tools I use, from the interface to the infrastructure
						underneath it.
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
