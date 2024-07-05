import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statistics | Demo",
};

export default function StatisticsDemoLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
