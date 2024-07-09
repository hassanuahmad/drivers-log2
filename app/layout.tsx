import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Drivers Log - Streamline Your Driving Instruction Workflow",
    description:
        "Effortless Lesson Management for Driving Instructors - Optimize Your Teaching with a Platform Designed for Efficient Lesson and Student Tracking, Student Progress, Vehicle Upkeep, and More",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main>{children}</main>
                <Toaster position="top-right" richColors={true} />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
