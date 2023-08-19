import Image from "next/image";
import Link from "next/link";

import MainNav from "@/components/MainNav";

const Navbar = () => {
	return (
		<div className="fixed w-screen lg:w-[95.7%] top-0 right-0 lg:ml-20 z-40">
			<div className="dark:shadow-gray-800 shadow-gray-300 shadow flex items-center space-x-6 justify-between px-14 py-1 bg-blue-100 dark:bg-gray-900">
				<Link href="/">
					<Image
						src="/logos/logo-mini.png"
						width={65}
						height={65}
						alt="logo"
					/>
				</Link>
				<MainNav />
			</div>
		</div>
	);
};

export default Navbar;
