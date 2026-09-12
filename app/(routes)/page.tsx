import About from "@/components/About";
import Experience from "@/components/Experience";
import HeroSection from "@/components/HeroSection";
import Leadership from "@/components/Leadership";
import Meeting from "@/components/Meeting";
import PageWrapper from "@/components/PageWrapper";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Training from "@/components/Training";

export default function HomePage() {
	return (
		<>
			<PageWrapper>
				<HeroSection />
				<About />
				<Experience />
				<Skills />
				<Training />
				<Services />
				<Projects />
				<Leadership />
				<Meeting />
			</PageWrapper>
		</>
	);
}

