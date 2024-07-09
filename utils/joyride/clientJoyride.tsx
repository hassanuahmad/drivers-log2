"use client";

import dynamic from "next/dynamic";

const JoyrideComponent = dynamic(() => import("./joyride"), { ssr: false });

export default function ClientJoyride() {
    return <JoyrideComponent />;
}
