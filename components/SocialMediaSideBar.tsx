import React from "react";
import { Github, Linkedin, Waves, XIcon } from "lucide-react";

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
		<div className="social-sidebar hidden lg:block w-20 h-screen fixed top-0 left-0 text-center z-50">
			<div className="flex flex-col items-center h-full">
				<Waves className="text-3xl m-8" />
				<div className="flex flex-col items-center justify-center h-full">
					<SocialMediaLink
						link="https://www.linkedin.com/in/iamjunaidjutt"
						icon={
							<Linkedin className="text-xl mb-8 hover:text-coral hover:animate-spin" />
						}
					/>
					<SocialMediaLink
						link="https://www.github.com/iamjunaidjutt"
						icon={
							<Github className="text-xl mb-8 hover:text-coral hover:animate-spin" />
						}
					/>
					<SocialMediaLink
						link="https://x.com/iamjunaidjutt_"
						icon={
							<XIcon className="text-xl mb-8 hover:text-coral hover:animate-spin" />
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default SocialMediaSideBar;
