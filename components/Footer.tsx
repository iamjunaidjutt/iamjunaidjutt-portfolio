import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Footer = () => {
	return (
		<section className="container-md ">
			<div className="grid grid-cols-1 md:grid-cols-4 p-10 md:mx-20 gap-5 md:my-10">
				<p className="text-2xl font-poppins font-bold">
					Muhammad Junaid
				</p>
				<div className="flex flex-col gap-6">
					<p className="text-base font-bold">Navigation</p>
					<div className="flex flex-col gap-3 text-sm">
						<Link
							href={"/"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							Home
						</Link>
						<Link
							href={"/#about"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							About
						</Link>
						<Link
							href={"/contact"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							Contact
						</Link>
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<p className="text-base font-bold">Find me on</p>
					<div className="flex flex-col gap-3 text-sm">
						<Link
							href={"https://www.linkedin.com/in/iamjunaidjutt"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							LinkedIn
						</Link>
						<Link
							href={"https://www.github.com/iamjunaidjutt"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							Github
						</Link>
						<Link
							href={"https://twitter.com/iamjunaidjutt_"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							Twitter
						</Link>
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<p className="text-base font-bold">Contact me</p>
					<div className="flex flex-col gap-3 text-sm">
						<p>Lahore, Pakistan</p>
						<Link
							href={
								"https://api.whatsapp.com/send?phone=03074254648"
							}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							+92-307-4254648
						</Link>
						<Link
							href={"mailto:info.iamjunaidjutt@gmail.com"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue w-max"
							)}
						>
							info.iamjunaidjutt@gmail.com
						</Link>
					</div>
				</div>
			</div>
			<Separator className="bg-myBgBlue" />
			<div className="flex my-3 max-md:flex-col md:items-center max-md:text-center md:justify-between md:mx-20">
				<p className="text-sm md:text-base max-md:mx-5">
					&copy; {new Date().getFullYear()} Designed & Developed by{" "}
					<Link
						href={"mailto:info.iamjunaidjutt@gmail.com"}
						className={cn(
							"text-myBgBlue dark:text-myBlue hover:border-b border-myBlue dark:border-myBlue"
						)}
					>
						iamjunaidjutt
					</Link>
					. All rights are reserved!
				</p>
				<div className="flex justify-center mt-4 mb-3 h-auto text-xl md:hidden">
					<div className=" p-3 mx-2 rounded-full border border-myBgBlue dark:border-myBlue hover:bg-myBgBlue hover:dark:text-myBlue hover:border-white hover:animate-spin">
						<Link
							href="https://www.linkedin.com/in/iamjunaidjutt"
							target="_blank"
						>
							<Linkedin />
						</Link>
					</div>
					<div className=" p-3 mx-2 rounded-full border border-myBgBlue dark:border-myBlue hover:bg-myBgBlue hover:dark:text-myBlue hover:border-white hover:animate-spin">
						<Link
							href="https://www.github.com/iamjunaidjutt"
							target="_blank"
						>
							<Github />
						</Link>
					</div>
					<div className=" p-3 mx-2 rounded-full border border-myBgBlue dark:border-myBlue hover:bg-myBgBlue hover:dark:text-myBlue hover:border-white hover:animate-spin">
						<Link
							href="https://twitter.com/iamjunaidjutt_"
							target="_blank"
						>
							<Twitter />
						</Link>
					</div>
				</div>
				<div className="flex items-center justify-center gap-3">
					<p className="text-sm md:text-base max-md:hidden">
						Owned by{" "}
					</p>
					<Image
						src="/logos/logo-footer.png"
						alt="Logos"
						width={45}
						height={45}
						className="object-cover max-md:hidden"
					/>
				</div>
			</div>
		</section>
	);
};

export default Footer;
