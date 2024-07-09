"use client";
import { useState, useEffect, useRef } from "react";
import { Dialog as DialogHeadless, DialogPanel } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import Image from "next/image";
import logo from "../public/newlogo.svg";
import { Button } from "@/components/ui/button";

const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
];

export default function HomePageNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const refs = useRef<Record<string, HTMLElement | null>>({});
    const contactUsLink =
        "https://docs.google.com/forms/d/e/1FAIpQLSf1bQKCC538eKcVEFXSOtBV79zYzR2OuPLEUx8zzeyC5rM-BQ/viewform?usp=sf_link";

    useEffect(() => {
        navigation.forEach((item) => {
            const id = item.href.replace("#", "");
            refs.current[id] = document.getElementById(id);
        });
    }, []);

    const handleScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        refs.current[targetId]?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    return (
        <>
            <header className="inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 absolute">
                <div className="mx-auto flex w-full container items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center gap-x-6">
                        <button
                            type="button"
                            className="-m-3 p-3 md:hidden"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
                        </button>
                        <Link href="/">
                            <Image src={logo} alt="logo" className="w-auto h-48" />
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:gap-x-2 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
                        {navigation.map((item, itemIdx) => (
                            <Link
                                key={itemIdx}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                            >
                                <Button variant="primaryLink">{item.name}</Button>
                            </Link>
                        ))}
                        <Link href={contactUsLink} target="_blank">
                            <Button variant="primaryLink">Contact</Button>
                        </Link>
                    </nav>
                    <div className="flex flex-1 items-center justify-end gap-x-4">
                        <Link href="/login">
                            <Button variant="primaryLink">Sign In</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                    </div>
                </div>
                <DialogHeadless
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                        <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            <Link href="/" className="-ml-0.5">
                                <Image src={logo} alt="logo" width={200} />
                            </Link>
                        </div>
                        <div className="mt-2 space-y-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a
                                href={contactUsLink}
                                target="_blank"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Contact Us
                            </a>
                        </div>
                    </DialogPanel>
                </DialogHeadless>
            </header>
        </>
    );
}
