import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Students | Demo",
};

export default function StudentsDemoLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section>{children}</section>
        </>
    );
}
