import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Student Progress",
};

export default function StudentProgressLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
