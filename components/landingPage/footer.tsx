import Image from "next/image";
import logo from "../../public/logo.svg";

const footerLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
    { name: "About Us", href: "#about" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            <footer className="bg-gray-100">
                <div className="mx-auto container px-4 py-16 sm:px-6 lg:px-8">
                    <div className="flex justify-center text-teal-600">
                        <Image src={logo} alt="Drivers Log Logo" className="w-auto h-16" />
                    </div>

                    <p className="mx-auto mt-6 max-w-lg text-center leading-relaxed text-gray-500">
                        Transforming the way driving schools and instructors manage their
                        business. Simplify scheduling, track student progress, and maintain
                        vehicles effortlessly with Drivers Log.
                    </p>

                    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                        © {year} Drivers Log, All rights reserved.
                        {/*{footerLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    className="text-gray-700 transition hover:text-gray-700/75"
                                    href={link.href}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        */}
                    </ul>
                </div>
            </footer>
        </>
    );
}
