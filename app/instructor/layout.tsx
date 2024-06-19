import { Metadata } from "next";
import InstructorNavbar from "@/components/instructorNavbar";

export const metadata: Metadata = {
    title: "Instructor | Drivers Log",
};

export default function InstructorLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <InstructorNavbar />
            {children}
        </section>
    );
}
