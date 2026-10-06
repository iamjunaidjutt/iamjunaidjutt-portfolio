import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import SocialMediaSideBar from "@/components/SocialMediaSideBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-roboto",
});
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-poppins",
});

const siteTitle = "Muhammad Junaid | AI/ML & Full-stack Engineer";
const siteDescription =
	"Muhammad Junaid is a software engineer in Lahore. He builds backend systems and web apps, including the LLM features of a legal platform used by law firms in the US.";

export const metadata: Metadata = {
	metadataBase: new URL("https://iamjunaidjutt.vercel.app"),
	title: siteTitle,
	description: siteDescription,
	authors: [{ name: "Muhammad Junaid" }],
	keywords: [
		"Muhammad Junaid",
		"Software Engineer",
		"AI/ML Engineer",
		"Full-stack Developer",
		"Backend Developer",
		"LLM",
		"RAG",
		"ASP.NET Core",
		"Next.js",
		"Azure",
		"Lahore",
		"Pakistan",
	],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		url: "/",
		title: siteTitle,
		description: siteDescription,
		siteName: "Muhammad Junaid",
		images: [
			{
				url: "/images/profile.png",
				alt: "Muhammad Junaid",
			},
		],
	},
	twitter: {
		card: "summary",
		title: siteTitle,
		description: siteDescription,
		images: ["/images/profile.png"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico?v=2" sizes="any" />
			</head>
			<body
				className={cn(
					roboto.className,
					"text-base lg:text-lg relative",
				)}
			>
				<ThemeProvider attribute="class">
					<SmoothScroll />
					<SocialMediaSideBar />
					<div className="lg:pl-20">
						<Navbar />
						<ScrollToTop />
						{children}
						<Toaster />
						<Separator className="footer-separator" />
						<Footer />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
