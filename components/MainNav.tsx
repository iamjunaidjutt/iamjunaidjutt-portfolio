"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/theme/toggle-theme";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainNav = () => {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		if (pathname !== "/") {
			setActiveSection("");
			return;
		}

		const sectionIds = [
			"about",
			"experience",
			"stack",
			"training",
			"projects",
			"leadership",
		];

		const handleScroll = () => {
			const isAtBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 100;

			if (isAtBottom) {
				setActiveSection("projects");
				return;
			}

			const scrollPosition = window.scrollY + 220;
			let current = "";

			for (const id of sectionIds) {
				const element = document.getElementById(id);
				if (element) {
					const top =
						element.getBoundingClientRect().top + window.scrollY;
					if (scrollPosition >= top) {
						current = id;
					}
				}
			}

			setActiveSection(current);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [pathname]);

	const handleNavClick = (path: string) => {
		if (path.startsWith("/#")) {
			setActiveSection(path.replace("/#", ""));
		}
	};

	const routes = [
		{ label: "About", path: "/#about" },
		{ label: "Experience", path: "/#experience" },
		{ label: "Stack", path: "/#stack" },
		{ label: "Training", path: "/#training" },
		{ label: "Work", path: "/#projects" },
		{ label: "Leadership", path: "/#leadership" },
		{ label: "Contact", path: "/contact" },
	];

	return (
		<>
			<nav className="hidden md:flex md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm md:text-base">
				{routes.map((route) => {
					const isActive =
						pathname === "/contact"
							? route.path === "/contact"
							: route.path === `/#${activeSection}`;

					return (
						<motion.div key={route.path} whileHover={{ scale: 1.1 }}>
							<Link
								href={route.path}
								onClick={() => handleNavClick(route.path)}
								className={cn(
									"hover:text-gray-500 transition-colors",
									isActive
										? "text-coral border-b border-dashed border-coral font-medium"
										: "",
								)}
							>
								{route.label}
							</Link>
						</motion.div>
					);
				})}
				<div className="flex items-center gap-2">
					<Button
						asChild
						size="sm"
						variant="outline"
						className="border-border hover:text-coral hover:border-coral transition-colors"
					>
						<a
							href="/Junaid_CV.pdf"
							target="_blank"
							rel="noopener noreferrer"
							download="Muhammad_Junaid_CV.pdf"
						>
							<Download className="mr-1.5 h-4 w-4" />
							CV
						</a>
					</Button>
					<ModeToggle />
				</div>
			</nav>
			<nav className="flex md:hidden items-center gap-2">
				<Button
					asChild
					size="sm"
					variant="outline"
					className="h-9 px-2.5 text-xs border-border"
				>
					<a
						href="/Junaid_CV.pdf"
						target="_blank"
						rel="noopener noreferrer"
						download="Muhammad_Junaid_CV.pdf"
					>
						<Download className="mr-2 h-5 w-5" />
						CV
					</a>
				</Button>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"} size="icon">
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 p-3 mr-14">
						{routes.map((route) => {
							const isActive =
								pathname === "/contact"
									? route.path === "/contact"
									: route.path === `/#${activeSection}`;

							return (
								<DropdownMenuItem key={route.path} asChild>
									<Link
										href={route.path}
										onClick={() =>
											handleNavClick(route.path)
										}
										className={cn(
											"w-full cursor-pointer",
											isActive
												? "text-coral font-semibold"
												: "",
										)}
									>
										{route.label}
									</Link>
								</DropdownMenuItem>
							);
						})}
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<a
								href="/resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 cursor-pointer w-full"
							>
								<Download className="h-5 w-5" />
								CV
							</a>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</>
	);
};

export default MainNav;
