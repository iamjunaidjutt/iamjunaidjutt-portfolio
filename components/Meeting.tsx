"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

const Meeting = () => {
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
					<p className="eyebrow">06 / Contact</p>
					<h2>Have a product problem worth solving?</h2>
					<p>
						Tell me what you&apos;re building. I&apos;m always
						interested in thoughtful conversations around AI,
						full-stack products, and engineering craft.
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
							Schedule a meeting{" "}
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
