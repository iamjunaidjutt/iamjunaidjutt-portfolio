import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const navigation = [
	{ label: "About", href: "/#about" },
	{ label: "Experience", href: "/#experience" },
	{ label: "Stack", href: "/#stack" },
	{ label: "Training", href: "/#training" },
	{ label: "Work", href: "/#projects" },
	{ label: "Contact", href: "/contact" },
];

const Footer = () => (
	<footer className="site-footer">
		<div className="page-width footer-main">
			<div className="footer-intro">
				<p className="footer-brand">Muhammad Junaid</p>
				<p>
					AI/ML and full-stack engineer building useful systems with a
					dependable core.
				</p>
				<a
					className="footer-email"
					href="mailto:info.iamjunaidjutt@gmail.com"
				>
					info.iamjunaidjutt@gmail.com{" "}
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
						href="https://www.linkedin.com/in/iamjunaidjutt"
						target="_blank"
						rel="noreferrer"
						aria-label="LinkedIn"
					>
						<Linkedin />
					</a>
					<a
						href="https://github.com/iamjunaidjutt"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
					>
						<Github />
					</a>
					<a
						href="mailto:info.iamjunaidjutt@gmail.com"
						aria-label="Email"
					>
						<Mail />
					</a>
				</div>
				<p className="footer-location">
					Open for work: Lahore &amp; Remote
				</p>
			</div>
		</div>
		<div className="page-width footer-bottom">
			<span>© {new Date().getFullYear()} Muhammad Junaid</span>
			<span>AI/ML · Full-stack · Platform engineering</span>
		</div>
	</footer>
);

export default Footer;
