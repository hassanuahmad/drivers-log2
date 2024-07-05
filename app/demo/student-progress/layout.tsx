import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Student Progress | Demo",
};

export default function StudentProgressDemoLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
