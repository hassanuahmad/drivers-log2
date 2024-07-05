import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vehicle Maintenance | Demo",
};

export default function VehicleDemoLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
