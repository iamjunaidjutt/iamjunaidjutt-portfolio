import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SECTION_IDS, SectionId } from "@/config/sections";

export function useActiveSection() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<SectionId | null>(null);

	useEffect(() => {
		if (pathname !== "/") {
			setActiveSection(null);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id as SectionId);
					}
				}
			},
			{ rootMargin: "-40% 0px -40% 0px", threshold: 0 }
		);

		SECTION_IDS.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [pathname]);

	return activeSection;
}
