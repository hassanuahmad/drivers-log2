import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Maintenance",
};

export default function VehicleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
