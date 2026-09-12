import React from "react";
import { Github, Linkedin, Waves } from "lucide-react";

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

const XIcon: React.FC<{ size?: number, className?: string }> = ({ size = 22, className = "" }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
	>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

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
