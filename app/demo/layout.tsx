import { Metadata } from "next";
import DemoNavbar from "@/components/demoNavbar";
import Banner from "@/app/demo/banner";
import { DemoProvider } from "@/app/demo/demoContext";

export const metadata: Metadata = {
    title: "Demo | Drivers Log",
};

export default function DemoLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Banner />
            <DemoNavbar />
            <DemoProvider>{children}</DemoProvider>
        </section>
    );
}
