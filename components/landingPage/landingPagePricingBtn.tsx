import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPagePricingBtn() {
    return (
        <Link href="/register">
            <Button variant="primary" className="mt-10 block w-full">
                Get access
            </Button>
        </Link>
    );
}
