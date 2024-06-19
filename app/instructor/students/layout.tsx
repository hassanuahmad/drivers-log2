import { Metadata } from "next";
import GoogleMapsProvider from "@/app/instructor/students/googleMapsProvider";

export const metadata: Metadata = {
    title: "Students",
};

export default function StudentsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GoogleMapsProvider>
                <section>{children}</section>
            </GoogleMapsProvider>
        </>
    );
}
