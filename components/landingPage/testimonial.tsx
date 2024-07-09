import { Quote } from "lucide-react";

export default function Testimonial() {
    return (
        <>
            <section className="relative isolate overflow-hidden bg-white px-6 pb-24 sm:pb-32 sm:pt-0 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <Quote className="h-8 w-8" />
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                            <p>
                                Drivers log is a wonderful application. Found it
                                user friendly and quite an efficient application
                                for keeping track of students info, lessons and
                                other details. It is also helpful to keep track
                                of my expenses (fuel, car maintenance) and
                                amount received from students (Interac, cash
                                etc) which is quite a big help at the end of the
                                year for tax preparation. Furthermore, it can be
                                accessed from anywhere and any device.
                                Accessibility is worth mentioning. Overall, I’d
                                recommend driving instructors and schools to use
                                and get the most out of this application.
                            </p>
                        </blockquote>
                        <figcaption className="mt-10">
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <div className="font-semibold text-gray-900">
                                    Navid Ahmad
                                </div>
                                <svg
                                    viewBox="0 0 2 2"
                                    width={3}
                                    height={3}
                                    aria-hidden="true"
                                    className="fill-gray-900"
                                >
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <div className="text-gray-600">
                                    Instructor at East Start Driving School
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>
        </>
    );
}
