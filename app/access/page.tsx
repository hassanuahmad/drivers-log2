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
                    heading="Get Full Access to Drivers Log"
                    subheading=" Unlock all features with a one-time payment. No subscriptions, no hidden fees - just lifetime access to everything Drivers Log offers."
                    ButtonComponent={AccessPagePricingBtn}
                />
            </div>
        </>
    );
}
