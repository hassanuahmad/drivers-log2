export const monthOptions = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
];

export function formatTotalHours(duration: number) {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;
    const hoursLabel = hours > 1 ? "hrs" : "hr";
    return `${hours}${hoursLabel} ${min}m`;
}
