"use client";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import Link from "next/link";
import { CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";
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

type UserInfoType = {
    email: string;
    name: string;
};

export default function AccessNavbar() {
    const router = useRouter();
    const supabase = createClient();
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
            <Disclosure as="nav" className="bg-white shadow">
                {({ open }) => (
                    <>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <Image
                                            src={logo}
                                            alt="Drivers Log Logo"
                                            className="w-auto h-48"
                                        />
                                    </Link>
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
