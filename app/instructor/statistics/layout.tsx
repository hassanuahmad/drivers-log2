import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statistics",
};

export default function StatisticsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
