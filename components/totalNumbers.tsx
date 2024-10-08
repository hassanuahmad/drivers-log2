export type TotalNumbersProps = {
    title: string;
    numbers: number;
};

export default function TotalNumbers({ title, numbers }: TotalNumbersProps) {
    return (
        <>
            <div className="h-10 px-4 py-2 text-sm text-gray-500">
                <span className="text-sm font-bold text-gray-500">
                    {title}:{" "}
                </span>
                ${numbers}
            </div>
        </>
    );
}
