import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Welcome Back | Drivers Log",
};

export default function LoginLayout({
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
