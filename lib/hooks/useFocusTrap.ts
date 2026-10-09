import { useEffect } from "react";

const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement>(
	containerRef: React.RefObject<T>,
	active: boolean
): void {
	useEffect(() => {
		if (!active) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Tab" || !containerRef.current) return;

			// Find all focusable elements inside the container and filter for visible ones.
			const focusableEls = Array.from(containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS))
				.filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0);

			if (focusableEls.length === 0) return;

			const firstElement = focusableEls[0];
			const lastElement = focusableEls[focusableEls.length - 1];

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		};

		// Add capture phase listener to ensure it catches Tab before browser moves focus
		document.addEventListener("keydown", handleKeyDown, true);

		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
		};
	}, [active, containerRef]);
}
