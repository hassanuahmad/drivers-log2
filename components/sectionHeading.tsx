type SectionHeadingProps = {
    title: string;
    description: string;
};

export default function SectionHeading({
    title,
    description,
}: SectionHeadingProps) {
    return (
        <>
            <div className="border-b border-gray-200 py-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    {title}
                </h3>
                <p className="mt-2 max-w-4xl text-sm text-gray-500">{description}</p>
            </div>
        </>
    );
}
