import React from "react";
import { Github, Linkedin, Twitter, Waves } from "lucide-react"; // Assuming you're using lucide-react icons

interface SocialMediaLinkProps {
	link: string;
	icon: React.ReactElement;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ link, icon }) => {
	return (
		<a href={link} target="_blank" rel="noopener noreferrer">
			{icon}
		</a>
	);
};

const SocialMediaSideBar: React.FC = () => {
	return (
		<div className="hidden lg:block w-20 h-screen fixed top-0 left-0 text-center dark:shadow-gray-800 shadow-gray-300 shadow z-50 bg-blue-100 dark:bg-gray-900">
			<div className="flex flex-col items-center h-full">
				<Waves className="text-3xl m-8" />
				<div className="flex flex-col items-center justify-center h-full">
					<SocialMediaLink
						link="https://www.linkedin.com/in/iamjunaidjutt"
						icon={
							<Linkedin className="text-xl mb-8 hover:text-myBlue hover:animate-spin" />
						}
					/>
					<SocialMediaLink
						link="https://www.github.com/iamjunaidjutt"
						icon={
							<Github className="text-xl mb-8 hover:text-myBlue hover:animate-spin" />
						}
					/>
					<SocialMediaLink
						link="https://twitter.com/iamjunaidjutt_"
						icon={
							<Twitter className="text-xl mb-8 hover:text-myBlue hover:animate-spin" />
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default SocialMediaSideBar;
