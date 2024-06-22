import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Access | Drivers Log",
};

export default function AccessLayout({
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
