import type { Metadata } from "next";

export const metadata: Metadata = {
	alternates: { canonical: "/contact" },
	openGraph: {
		url: "/contact",
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
