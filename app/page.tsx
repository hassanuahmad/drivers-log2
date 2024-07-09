import Hero from "@/components/landingPage/hero";
import Features from "@/components/landingPage/features";
import Testimonial from "@/components/landingPage/testimonial";
import Stats from "@/components/landingPage/stats";
import Pricing from "@/components/landingPage/pricing";
import LandingPagePricingBtn from "@/components/landingPage/landingPagePricingBtn";
import Cta from "@/components/landingPage/cta";
import Footer from "@/components/landingPage/footer";

export default async function Home() {
    return (
        <>
            <Hero />
            <div id="features">
                <Features />
            </div>
            <Testimonial />
            <Stats />
            <div id="pricing">
                <Pricing
                    heading="Simple one-time payment, lifetime value"
                    subheading="Get unlimited access to all the tools and features you need to
                        manage your driving school or individual instructing effectively and
                        efficiently."
                    ButtonComponent={LandingPagePricingBtn}
                />
            </div>
            <Cta />
            <Footer />
        </>
    );
}
