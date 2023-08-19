import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

const Meeting = () => {
	return (
		<div className="bg-myBgBlue">
			<div className="container py-24 md:w-1/2 mx-auto text-center md:px-6">
				<h2 className="mb-16 text-2xl md:text-4xl font-bold text-white font-poppins">
					If you have any questions or would like to work together,
					feel free to reach out!
				</h2>
				<Button size={"lg"} variant={"destructive"}>
					<ExternalLink className="mr-2 h-4 w-4" />
					<Link
						href={"https://cal.com/iamjunaidjutt"}
						target="_blank"
					>
						Schedule a meeting
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default Meeting;
