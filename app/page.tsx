import Hero from "@/components/landingPage/hero";
import Features from "@/components/landingPage/features";
import Testimonial from "@/components/landingPage/testimonial";
import Stats from "@/components/landingPage/stats";
import Pricing from "@/components/landingPage/pricing";
import Cta from "@/components/landingPage/cta";
import Footer from "@/components/landingPage/footer";

export default async function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Testimonial />
            <Stats />
            <Pricing />
            <Cta />
            <Footer />
        </>
    );
}
