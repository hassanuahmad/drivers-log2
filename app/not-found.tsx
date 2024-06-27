import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <>
            <main className="container mx-auto h-screen flex flex-col justify-center px-6 py-24 sm:py-32 lg:px-8">
                <div>
                    <p className="text-base font-semibold text-primary-color-500">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10">
                        <Link href="/">
                            <Button variant="primary">Go back home</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
