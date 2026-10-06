"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const Meeting = () => {
	const pathname = usePathname();
	return (
		<section className="contact-band" id="contact-cta">
			<motion.div
				className="page-width contact-inner"
				initial={{ opacity: 0, y: 28 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<div>
					<p className="eyebrow">
						{pathname === "/" ? "08 / Contact" : "01 / Contact"}
					</p>
					<h2>Working on something? Let&apos;s talk.</h2>
					<p>
						Tell me what you&apos;re working on. I&apos;m open to
						full-time roles, and happy to talk about AI, backend
						work, or web apps.
					</p>
				</div>
				<div className="flex flex-col gap-3 shrink-0 max-md:mt-8 w-full sm:w-auto">
					<Button
						asChild
						size="lg"
						className="bg-coral text-on-ink hover:bg-coral/90"
					>
						<Link
							href="https://cal.com/iamjunaidjutt"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Calendar className="mr-2 h-4 w-4" />
							Book a call{" "}
							<ArrowUpRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
					>
						<Link href="mailto:info.iamjunaidjutt@gmail.com">
							<Mail className="mr-2 h-4 w-4" />
							Email me <ArrowUpRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</motion.div>
		</section>
	);
};

export default Meeting;
