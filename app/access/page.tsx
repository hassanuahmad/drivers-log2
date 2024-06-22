import AccessNavbar from "@/components/accessNavbar";
import Pricing from "@/components/landingPage/pricing";
import Alert from "@/app/access/alert";
import AccessPagePricingBtn from "@/app/access/accessPagePricingBtn";

export default function Page() {
    return (
        <>
            <AccessNavbar />
            <div className="container mx-auto mt-4">
                <Alert />
            </div>
            <div className="container mx-auto mt-1">
                <Pricing
                    heading="Welcome to Drivers Log!"
                    subheading="Our platform provides the essential tools and features to effectively and efficiently manage your driving school or individual instructing. While our service is paid, we offer an excellent one-time payment plan to ensure you get the best value."
                    ButtonComponent={AccessPagePricingBtn}
                />
            </div>
        </>
    );
}
