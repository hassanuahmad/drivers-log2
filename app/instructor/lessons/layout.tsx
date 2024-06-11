import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lessons",
};

export default function LessonsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
