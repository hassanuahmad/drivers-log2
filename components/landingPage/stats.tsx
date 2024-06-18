import NumberTicker from "@/components/magicui/number-ticker";

const stats = [
    { id: 1, name: "Lessons added", value: 1800 },
    { id: 2, name: "Students added", value: 500 },
];

export default function Stats() {
    return (
        <>
            <div className="py-24 sm:py-32 bg-gradient-to-tr from-primary-color-400 via-primary-color-300 to-primary-color-500">
                <div className="mx-auto container px-6 lg:px-8">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 text-center">
                        {stats.map((stat) => (
                            <div
                                key={stat.id}
                                className="mx-auto flex max-w-xs flex-col gap-y-2"
                            >
                                <dt className="text-base leading-7 text-gray-600">
                                    {stat.name}
                                </dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    <NumberTicker value={stat.value} />+
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </>
    );
}
