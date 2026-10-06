"use client";

import { ArrowUpRight, CalendarDays, Trophy, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const leadershipItems = [
	{
		period: "Dec 2023 — Mar 2024",
		title: "Aspire Leaders Program",
		org: "Aspire Institute · Remote",
		bullets: [
			"Completed 30 hours of coursework, including three full modules and a culminating project.",
			"Final Project: \"Empowering Minds - Education Outreach for Needy Children in Pakistan\" - a plan to help children in need get a better education.",
		],
		tags: [
			"Leadership Development",
			"Social Impact",
			"Education Outreach",
			"Teamwork",
		],
		link: "https://drive.google.com/file/d/13RdRi2w56hCt0Dt1Wxnzlk1aQKRu6aPO/view?usp=sharing",
		linkLabel: "View certificate",
	},
	{
		period: "Aug 2022 — May 2023",
		title: "Deputy Head of Marketing",
		org: "SOFTEC'23 · FAST-NUCES, Lahore, Pakistan",
		bullets: [
			"Helped lead a marketing team of about 40 members before and during the event.",
			"Worked with company executives to close three sponsorship deals and raise more than PKR 1,000,000, exceeding the target by 25%.",
		],
		tags: [
			"Team Leadership",
			"Sponsorships",
			"Strategic Partnerships",
			"Marketing",
		],
		link: "https://drive.google.com/file/d/1gPtFvc7lbRl_uWWfl82TZ6HQd14IWLCz/view?usp=sharing",
		linkLabel: "View certificate",
	},
];

const volunteeringItems = [
	{
		period: "Nov 2022 — Jan 2023",
		title: "Volunteer · Operations",
		org: "Future Fest'23 · Lahore, Pakistan",
		bullets: [
			"Checked billboards, banners, and other promotional materials.",
			"Looked after security at the auditorium and VIP areas while working with senior police officers, including the District Police Officer.",
			"Helped set up and pack up the event while coordinating with teams and vendors.",
		],
		tags: ["Event Operations", "Logistics", "Security Coordination"],
		link: "https://drive.google.com/file/d/1EFlcRZoIpfwwjiB9TjlKzMBtu00niuLk/view?usp=sharing",
		linkLabel: "View certificate",
	},
	{
		period: "Oct 2021 — Aug 2022",
		title: "Volunteer · Marketing, Software House Enclosure & Infrastructure",
		org: "SOFTEC'22 · FAST-NUCES, Lahore, Pakistan",
		bullets: [
			"Called HR managers and CEOs to arrange sponsorship meetings and joined meetings with the marketing head.",
			"Worked with the setup team to run the Software House Enclosure.",
			"Looked after company exhibits and talked with visitors to keep operations running smoothly.",
		],
		tags: [
			"Marketing",
			"Sponsorships",
			"Stakeholder Relations",
			"Event Management",
		],
		link: "https://drive.google.com/file/d/1m5YY44z8DmlIh-26BHSFRG47CkuriCpd/view?usp=sharing",
		linkLabel: "View certificate",
	},
];

const TimelineItem = ({
	item,
	index,
}: {
	item: (typeof leadershipItems)[0];
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
						Leading teams. Giving back.
					</h2>
				</div>
				<p className="section-intro">
					Beyond engineering — driving sponsorships, managing large
					teams, and contributing to community events at university
					and beyond.
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
				{leadershipItems.map((item, index) => (
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
				{volunteeringItems.map((item, index) => (
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
