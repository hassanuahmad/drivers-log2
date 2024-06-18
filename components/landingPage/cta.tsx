import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
    return (
        <>
            <div className="container mx-auto flex justify-center">
                <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:pb-32">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Transform Your Driving Instruction.
                        <br />
                        Start Using Drivers Log Today.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-700">
                        Streamline scheduling, track progress, and manage vehicles
                        effortlessly. Ideal for driving schools and independent instructors.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/register">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
