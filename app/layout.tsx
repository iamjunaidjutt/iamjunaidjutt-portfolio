import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";
import SocialMediaSideBar from "@/components/SocialMediaSideBar";
import Navbar from "@/components/Navbar";
import SiteMap from "@/components/SiteMap";
import { Separator } from "@/components/ui/separator";

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

export const metadata: Metadata = {
	title: "Muhammad Junaid",
	description: "Muhammad Junaid's personal website",
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
					`bg-blue-100 dark:bg-gray-900 text-black dark:text-white text-base lg:text-lg  relative circle-scatter circle-scatter-c`
				)}
			>
				<ThemeProvider attribute="class">
					<SocialMediaSideBar />
					<div className="lg:pl-20">
						<Navbar />
						{children}
						<Toaster />
						<Separator className="bg-primary opacity-20" />
						<SiteMap />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
