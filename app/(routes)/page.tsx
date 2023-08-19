import About from "@/components/About";
import HeroSection from "@/components/HeroSection";
import Meeting from "@/components/Meeting";
import PageWrapper from "@/components/PageWrapper";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import BottomWave from "@/components/ui/bottomWave1";
import BottomWave2 from "@/components/ui/bottomWave2";

export default function HomePage() {
	return (
		<>
			<PageWrapper>
				<HeroSection />
				<BottomWave />
				<About />
				<BottomWave2 />
				<Skills />
				<BottomWave />
				<Services />
				<BottomWave2 />
				<Projects />
				<BottomWave />
				<Meeting />
				<BottomWave2 />
			</PageWrapper>
		</>
	);
}
