"use client";

import { ArrowUpRight, CalendarDays, Trophy, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";

const TimelineItem = ({
	item,
	index,
}: {
	item: (typeof PROFILE_DATA.leadership)[0];
	index: number;
}) => (
	<motion.article
		className="timeline-item"
		key={`${item.org}-${item.title}`}
		initial={{ opacity: 0, y: 24 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-60px" }}
		transition={{
			duration: 0.5,
			delay: index * 0.1,
			ease: [0.22, 1, 0.36, 1],
		}}
	>
		<div className="timeline-period">
			<CalendarDays className="h-4 w-4" />
			{item.period}
		</div>
		<div className="timeline-content">
			<h3>{item.title}</h3>
			<p className="timeline-company">{item.org}</p>
			<ul className="timeline-copy timeline-list">
				{item.bullets.map((bullet) => (
					<li key={bullet}>{bullet}</li>
				))}
			</ul>
			<div className="tag-row">
				{item.tags.map((tag) => (
					<span className="soft-tag" key={tag}>
						{tag}
					</span>
				))}
			</div>
			<Link
				href={item.link}
				target="_blank"
				rel="noopener noreferrer"
				className="training-certificate"
			>
				{item.linkLabel}
				<ArrowUpRight className="h-4 w-4" />
			</Link>
		</div>
	</motion.article>
);

const Leadership = () => (
	<section className="section-band section-cream" id="leadership">
		<div className="page-width">
			<motion.div
				className="section-heading-row"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			>
				<div>
					<p className="eyebrow">
						07 / Leadership &amp; Volunteering
					</p>
					<h2 className="section-title">
						Outside of code.
					</h2>
				</div>
				<p className="section-intro">
					What I did at university besides studying: sponsorship
					work, event teams, and volunteering.
				</p>
			</motion.div>

			{/* Leadership */}
			<motion.p
				className="leadership-sub-label eyebrow"
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
			>
				<Trophy className="leadership-sub-icon" />
				Leadership
			</motion.p>
			<div className="timeline">
				{PROFILE_DATA.leadership.map((item, index) => (
					<TimelineItem
						key={`${item.org}-${item.title}`}
						item={item}
						index={index}
					/>
				))}
			</div>

			{/* Volunteering */}
			<motion.p
				className="leadership-sub-label eyebrow"
				style={{ marginTop: "3rem" }}
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-60px" }}
				transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
			>
				<Heart className="leadership-sub-icon" />
				Volunteering
			</motion.p>
			<div className="timeline">
				{PROFILE_DATA.volunteering.map((item, index) => (
					<TimelineItem
						key={`${item.org}-${item.title}`}
						item={item}
						index={index}
					/>
				))}
			</div>
		</div>
	</section>
);

export default Leadership;
