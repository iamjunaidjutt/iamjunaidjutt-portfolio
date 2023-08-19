import React from "react";

import Icon from "@/components/ui/Icon";

const Services = () => {
	const services = [
		{
			icon: "globe",
			title: "Web Development",
			description:
				"Crafting elegant and efficient web applications using the latest technologies, ensuring a seamless user experience and optimized performance.",
		},
		{
			icon: "pen-tool",
			title: "UI/UX Design",
			description:
				"Creating intuitive and visually appealing interfaces that resonate with users and enhance their interaction with your products.",
		},
		{
			icon: "shopping-cart",
			title: "E-commerce Solutions",
			description:
				"Building customizable e-commerce platforms that streamline product management, secure transactions, and boost online sales.",
		},
		{
			icon: "database",
			title: "Frontend Development",
			description:
				"Implementing responsive and dynamic frontend interfaces that provide seamless interactions and optimal user engagement.",
		},
		{
			icon: "server",
			title: "Backend Development",
			description:
				"Creating robust and scalable backend systems that power your applications, ensuring data security and efficient operations.",
		},

		{
			icon: "puzzle",
			title: "Custom Solutions",
			description:
				"Designing and developing tailored solutions to meet unique business challenges, ensuring a perfect fit for your needs.",
		},
	];
	return (
		<div className="bg-myBgBlue">
			<div className="container py-24 mx-auto md:px-6">
				<section className="my-16 text-center">
					<h2 className="mb-16 text-2xl md:text-4xl font-bold text-white font-poppins">
						Services that I offers
					</h2>
					<div className="grid gap-x-6 gap-y-3 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
						{services.map((service, index) => (
							<div
								key={index}
								className="mb-12 md:mb-0 border-2 border-white p-5 rounded-lg hover:bg-myRed hover:cursor-pointer text-white transition duration-300 ease-in-out shadow-lg"
							>
								<div className="mb-4 inline-block rounded-md bg-primary-100 p-4 text-white">
									<Icon name={service.icon} size={35} />
								</div>
								<h3 className="mb-4 text-xl md:text-2xl text-myBlue font-bold font-poppins">
									{service.title}
								</h3>
								<p>{service.description}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Services;
