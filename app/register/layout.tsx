import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get started | Drivers Log",
};

export default function RegisterLayout({
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
