import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SiteMap = () => {
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
								"hover:dark:text-myBlue hover:text-myBgBlue"
							)}
						>
							Home
						</Link>
						<Link
							href={"/#about"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue"
							)}
						>
							About
						</Link>
						<Link
							href={"/contact"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue"
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
								"hover:dark:text-myBlue hover:text-myBgBlue"
							)}
						>
							LinkedIn
						</Link>
						<Link
							href={"https://www.github.com/iamjunaidjutt"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue"
							)}
						>
							Github
						</Link>
						<Link
							href={"https://twitter.com/iamjunaidjutt_"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue"
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
								"hover:dark:text-myBlue hover:text-myBgBlue"
							)}
						>
							+92-307-4254648
						</Link>
						<Link
							href={"mailto:info@iamjunaidjutt.tech"}
							className={cn(
								"hover:dark:text-myBlue hover:text-myBgBlue"
							)}
						>
							info@iamjunaidjutt.tech
						</Link>
					</div>
				</div>
			</div>
			<Separator className="bg-myBgBlue" />
			<div className="flex my-3 md:items-center  max-md:text-center md:justify-between md:mx-20">
				<p className="text-sm md:text-base max-md:mx-5">
					&copy; {new Date().getFullYear()} Designed & Developed by{" "}
					<Link
						href={"mailto:info@iamjunaidjutt.tech"}
						className={cn(
							"text-myBgBlue dark:text-myBlue hover:border-b border-myBlue dark:border-myBlue"
						)}
					>
						iamjunaidjutt
					</Link>
					. All rights are reserved!
				</p>
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

export default SiteMap;
