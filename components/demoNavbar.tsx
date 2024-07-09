"use client";

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../public/demoLogo.svg";

const navigation = [
    // { name: "Dashboard", href: "/instructor/dashboard" },
    { name: "Lessons", href: "/demo/lessons" },
    { name: "Students", href: "/demo/students" },
];

const dropdownNavigation = [
    { name: "Vehicle Maintenance", href: "/demo/vehicle" },
    { name: "Student Progress", href: "/demo/student-progress" },
    { name: "Statistics", href: "/demo/statistics" },
];

// Used to render all navigation in mobile view
const allNavigation = navigation.concat(dropdownNavigation);

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function DemoNavbar() {
    return (
        <>
            <Disclosure as="nav" className="bg-white shadow">
                {({ open }) => (
                    <>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/instructor/lessons">
                                        <Image
                                            src={logo}
                                            alt="Drivers Log Logo"
                                            className="w-auto h-48"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-2 text-gray-900">
                                    {navigation.map((item, itemIdx) => (
                                        <Link key={itemIdx} href={item.href} id={item.name}>
                                            <Button variant="ghost">{item.name}</Button>
                                        </Link>
                                    ))}
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div id="more-button">
                                            <MenuButton className="inline-flex w-full justify-center px-3 py-2 gap-x-1.5 bg-white text-sm rounded-md font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
                                                More
                                                <ChevronDownIcon
                                                    className="-mr-1 h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </MenuButton>
                                        </div>
                                        <Transition
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {dropdownNavigation.map((item, itemIdx) => (
                                                    <MenuItem key={itemIdx}>
                                                        {({ focus }) => (
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    focus ? "bg-gray-100" : "text-gray-900",
                                                                    "block text-sm",
                                                                )}
                                                            >
                                                                <Button variant={"ghost"}>{item.name}</Button>
                                                            </Link>
                                                        )}
                                                    </MenuItem>
                                                ))}
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    {/* Profile dropdown */}
                                    <div className="relative ml-3 flex items-center">
                                        <Link href="/register">
                                            <Button variant="primary">Get Started</Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-color">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 pb-3 pt-2">
                                {allNavigation.map((item, itemIdx) => (
                                    <DisclosureButton
                                        key={itemIdx}
                                        as="a"
                                        href={item.href}
                                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                            <div className="px-4 py-2">
                                <Link href="/register">
                                    <Button variant="primary">Get Started</Button>
                                </Link>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </>
    );
}
