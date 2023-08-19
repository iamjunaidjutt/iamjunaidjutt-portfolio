"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
	const routes = [
		{ label: "Home", path: "/", isActive: false },
		{ label: "Contact", path: "/contact", isActive: false },
	];

	return (
		<>
			<nav className="hidden md:flex md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-10 text-sm md:text-base">
				{routes.map((route) => (
					<motion.div key={route.path} whileHover={{ scale: 1.1 }}>
						<Link
							href={route.path}
							className={cn(
								"hover:text-gray-500",
								pathname === route.path || route.isActive
									? "text-myBgBlue dark:text-myBlue border-b border-dashed border-myBgBlue dark:border-myBlue"
									: ""
							)}
						>
							{route.label}
						</Link>
					</motion.div>
				))}
				<Button variant={"destructive"}>Resume</Button>
				<ModeToggle />
			</nav>
			<nav className="md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"} size="icon">
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 p-3 mr-14">
						{routes.map((route) => (
							<DropdownMenuItem key={route.path}>
								<Link href={route.path}>{route.label}</Link>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button variant={"destructive"}>Resume</Button>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ModeToggle />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</>
	);
};

export default MainNav;
