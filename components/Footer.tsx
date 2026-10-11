import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

const navigation = [
	{ label: "About", href: "/#about" },
	{ label: "Experience", href: "/#experience" },
	{ label: "Stack", href: "/#stack" },
	{ label: "Training", href: "/#training" },
	{ label: "Work", href: "/#projects" },
	{ label: "Leadership", href: "/#leadership" },
	{ label: "Contact", href: "/contact" },
];

const Footer = () => (
	<footer className="site-footer">
		<div className="page-width footer-main">
			<div className="footer-intro">
				<p className="footer-brand">{PROFILE_DATA.identity.name}</p>
				<p>
					{PROFILE_DATA.identity.footerDescription}
				</p>
				<a
					className="footer-email"
					href={`mailto:${PROFILE_DATA.contact.email}`}
				>
					{PROFILE_DATA.contact.email}{" "}
					<ArrowUpRight className="h-4 w-4" />
				</a>
			</div>
			<div className="footer-nav">
				<p className="footer-label">Explore</p>
				<div className="footer-nav-grid">
					{navigation.map((item) => (
						<Link href={item.href} key={item.href}>
							{item.label}
						</Link>
					))}
				</div>
			</div>
			<div className="footer-connect">
				<p className="footer-label">Connect</p>
				<div className="footer-social-row">
					<a
						href={PROFILE_DATA.socials.linkedin}
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
					>
						<Linkedin />
					</a>
					<a
						href={PROFILE_DATA.socials.github}
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
					>
						<Github />
					</a>
					<a
						href={`mailto:${PROFILE_DATA.contact.email}`}
						aria-label="Email"
					>
						<Mail />
					</a>
				</div>
				<p className="footer-location">
					Open to work: {PROFILE_DATA.meta.location} or remote
				</p>
			</div>
		</div>
		<div className="page-width footer-bottom">
			<span>© {new Date().getFullYear()} {PROFILE_DATA.identity.name}</span>
			<span>AI/ML · Full-Stack · Platform Engineering</span>
		</div>
	</footer>
);

export default Footer;
