"use client";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import student from "../../public/student.png";
import lesson from "../../public/lesson.png";
import vehicle from "../../public/vehicle.png";
import progress from "../../public/progress.png";

const features = [
    {
        name: "Add Students",
        description: "Quickly enroll new students with all essential details.",
        href: "/register",
        cta: "Get Started",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:-translate-x-10">
                <img className="rounded-xl" src={student.src} />
            </div>
        ),
    },
    {
        name: "Schedule Lessons",
        description: "Easily plan and organize driving lessons.",
        href: "/register",
        cta: "Get Started",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:-translate-x-10">
                <img className="rounded-xl" src={lesson.src} />
            </div>
        ),
    },
    {
        name: "Track Progress",
        description: "Monitor student improvements and milestones.",
        href: "/register",
        cta: "Get Started",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:-translate-x-10">
                <img className="rounded-xl" src={progress.src} />
            </div>
        ),
    },
    {
        name: "Manage Vehicle",
        description: "Keep track of vehicle maintenance and service schedules.",
        className: "col-span-3 lg:col-span-1",
        href: "/register",
        cta: "Get Started",
        background: (
            <div className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:-translate-x-10">
                <img className="rounded-xl" src={vehicle.src} />
            </div>
        ),
    },
];

export default function Features() {
    return (
        <>
            <div className="container mx-auto">
                <h2 className="my-8 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Management Features
                    <br />
                    Instructors{" "}
                    <span className="underline decoration-primary-color-500 underline-offset-4">
                        Really Want
                    </span>
                </h2>
                <BentoGrid className="mb-32 mt-16">
                    {features.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </>
    );
}
