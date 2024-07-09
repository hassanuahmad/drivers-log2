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
import { CircleUserRoundIcon, ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../public/newlogo.svg";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const navigation = [
    // { name: "Dashboard", href: "/instructor/dashboard" },
    { name: "Lessons", href: "/instructor/lessons" },
    { name: "Students", href: "/instructor/students" },
];

const dropdownNavigation = [
    { name: "Vehicle Maintenance", href: "/instructor/vehicle" },
    { name: "Student Progress", href: "/instructor/student-progress" },
    { name: "Statistics", href: "/instructor/statistics" },
];

// Used to render all navigation in mobile view
const allNavigation = navigation.concat(dropdownNavigation);

/* const profileNavigation = [
    { name: "Profile", href: "/instructor/profile" },
    { name: "Sign out", href: "/instructor/profile" },
]; */

function classNames(...classes: (string | false | null | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
}

type UserInfoType = {
    email: string;
    name: string;
};

export default function InstructorNavbar() {
    const router = useRouter();
    const supabase = createClient();
    const insightoLink = "https://insigh.to/b/drivers-log";
    const contactUsLink =
        "https://docs.google.com/forms/d/e/1FAIpQLSf1bQKCC538eKcVEFXSOtBV79zYzR2OuPLEUx8zzeyC5rM-BQ/viewform?usp=sf_link";
    const [userInfo, setUserInfo] = useState<UserInfoType>({
        email: "",
        name: "",
    });

    useEffect(() => {
        const getUserEmail = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                console.error("No User found!");
                return null;
            }

            const name = `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;

            setUserInfo({
                email: user.email ?? "",
                name: name,
            });
        };

        getUserEmail();
    }, []);

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out: ", error.message);
        } else {
            router.push("/");
        }
    }

    return (
        <>
            <Disclosure as="nav" className="bg-white shadow navbar">
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <CircleUserRoundIcon className="h-8 w-8" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    {userInfo.name}
                                                    <br />
                                                    <span className="font-normal">{userInfo.email}</span>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {/*
                                                {profileNavigation.map((item, itemIdx) => (
                                                    <div key={itemIdx}>
                                                        <DropdownMenuItem>{item.name}</DropdownMenuItem>
                                                    </div>
                                                ))}
                                                */}
                                                <DropdownMenuItem>
                                                    <Link href={contactUsLink} target="_blank">
                                                        Contact Us
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={insightoLink} target="_blank">
                                                        Feature Request
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={signOut}>
                                                    Sign Out
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
                            <div className="border-t border-gray-200 pb-3 pt-4">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <CircleUserRoundIcon className="h-10 w-10" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">
                                            {userInfo.name}
                                        </div>
                                        <div className="text-sm font-medium text-gray-500">
                                            {userInfo.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    {/*
                                    {profileNavigation.map((item, itemIdx) => (
                                        <DisclosureButton
                                            key={itemIdx}
                                            as="a"
                                            href={item.href}
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                    */}
                                    <DisclosureButton
                                        as="a"
                                        href={contactUsLink}
                                        target="_blank"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Contact Us
                                    </DisclosureButton>
                                    <DisclosureButton
                                        as="a"
                                        href={insightoLink}
                                        target="_blank"
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Feature Request
                                    </DisclosureButton>
                                    <DisclosureButton
                                        as="a"
                                        onClick={signOut}
                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                    >
                                        Sign Out
                                    </DisclosureButton>
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </>
    );
}
