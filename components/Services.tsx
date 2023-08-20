"use client";

import React from "react";

import { motion } from "framer-motion";
import {
	Database,
	Globe,
	PenTool,
	Puzzle,
	Server,
	ShoppingCart,
} from "lucide-react";

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

const Services = () => {
	return (
		<div className="bg-myBgBlue">
			<div className="container py-24 mx-auto md:px-6">
				<section className="my-16 text-center">
					<h2 className="mb-16 text-2xl md:text-4xl font-bold text-white font-poppins">
						Services that I offers
					</h2>
					<motion.div
						className="grid gap-x-6 gap-y-3 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12"
						variants={variants}
						initial="hidden"
						animate="show"
					>
						<motion.div
							className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white shadow-lg"
							variants={item}
							whileHover={{ scale: 1.1 }}
						>
							<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
								<Globe size={35} />
							</div>
							<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
								Web Development
							</h3>
							<p>
								Crafting elegant and efficient web applications
								using the latest technologies, ensuring a
								seamless user experience and optimized
								performance.
							</p>
						</motion.div>
						<motion.div
							className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white shadow-lg"
							variants={item}
							whileHover={{ scale: 1.1 }}
						>
							<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
								<PenTool size={35} />
							</div>
							<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
								UI/UX Design
							</h3>
							<p>
								Creating intuitive and visually appealing
								interfaces that resonate with users and enhance
								their interaction with your products.
							</p>
						</motion.div>
						<motion.div
							className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white shadow-lg"
							variants={item}
							whileHover={{ scale: 1.1 }}
						>
							<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
								<ShoppingCart size={35} />
							</div>
							<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
								E-commerce Solutions
							</h3>
							<p>
								Building customizable e-commerce platforms that
								streamline product management, secure
								transactions, and boost online sales.
							</p>
						</motion.div>
						<motion.div
							className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white shadow-lg"
							variants={item}
							whileHover={{ scale: 1.1 }}
						>
							<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
								<Database size={35} />
							</div>
							<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
								Frontend Development
							</h3>
							<p>
								Implementing responsive and dynamic frontend
								interfaces that provide seamless interactions
								and optimal user engagement.
							</p>
						</motion.div>
						<motion.div
							className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white shadow-lg"
							variants={item}
							whileHover={{ scale: 1.1 }}
						>
							<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
								<Server size={35} />
							</div>
							<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
								Backend Development
							</h3>
							<p>
								Creating robust and scalable backend systems
								that power your applications, ensuring data
								security and efficient operations.
							</p>
						</motion.div>
						<motion.div
							className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white shadow-lg"
							variants={item}
							whileHover={{ scale: 1.1 }}
						>
							<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
								<Puzzle size={35} />
							</div>
							<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
								Custom Solutions
							</h3>
							<p>
								Designing and developing tailored solutions to
								meet unique business challenges, ensuring a
								perfect fit for your needs.
							</p>
						</motion.div>
					</motion.div>
				</section>
			</div>
		</div>
	);
};

export default Services;
