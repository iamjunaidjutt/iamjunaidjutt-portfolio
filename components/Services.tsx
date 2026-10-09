"use client";

import { BrainCircuit, CloudCog, Code2, DatabaseZap } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";

const iconMap: Record<string, React.ElementType> = {
	BrainCircuit,
	Code2,
	DatabaseZap,
	CloudCog,
};

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
						The kinds of work I&apos;m most useful for.
					</p>
				</motion.div>
				<div className="capability-grid">
					{PROFILE_DATA.services.map(
						({ icon, title, description }, index) => {
							const Icon = iconMap[icon];
							return (
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
									{Icon && <Icon />}
									<h3>{title}</h3>
									<p>{description}</p>
								</motion.div>
							);
						},
					)}
				</div>
			</div>
		</section>
	);
};

export default Services;
