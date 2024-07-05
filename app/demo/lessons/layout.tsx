import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lessons | Demo",
};

export default function LessonsDemoLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children} </section>;
}
