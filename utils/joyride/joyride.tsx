"use client";

import Joyride from "react-joyride";
import steps from "@/utils/joyride/joyrideSteps";
// import { useSearchParams, usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function JoyrideComponent() {
    // const pathname = usePathname();
    const searchParams = useSearchParams();
    const firstTimeUser = searchParams.get("firstTime");

    return (
        <>
            {firstTimeUser === "true" ? (
                <Joyride
                    steps={steps}
                    continuous={true}
                    showProgress={true}
                    showSkipButton={true}
                    styles={{
                        options: {
                            primaryColor: "#1ba8a5",
                            overlayColor: "rgba(0, 0, 0, 0.25)",
                        },
                    }}
                />
            ) : null}
            {/*
            // NOTE: if you want to readd onboarding in demo
            {pathname === "/demo/lessons" ? (
                <Joyride
                    steps={steps}
                    continuous={true}
                    showProgress={true}
                    showSkipButton={true}
                    styles={{
                        options: {
                            primaryColor: "#1ba8a5",
                            overlayColor: "rgba(0, 0, 0, 0.25)",
                        },
                    }}
                />
            ) : null}
            */}
        </>
    );
}
