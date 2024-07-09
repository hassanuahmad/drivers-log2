import { Step } from "react-joyride";

const steps: Step[] = [
    {
        target: "body",
        content:
            "Welcome to Drivers Log! Let's get you started with a quick tour of the main features.",
        placement: "center",
        disableBeacon: true,
    },
    {
        target: "#Students",
        content:
            "First, let's add a student. Click on the Students tab and add a student.",
        placement: "bottom",
    },
    {
        target: "#Lessons",
        content:
            "Great! Now that you have a student, let's add a lesson. Click on the Lessons tab.",
        placement: "bottom",
    },
    {
        target: "#select-student",
        content:
            "Select the student you just added from this dropdown to assign them a lesson.",
        placement: "bottom",
    },
    {
        target: "#lesson-form",
        content:
            "Fill in the lesson details here. Don't forget to set the date, start time, end time, and payment information.",
        placement: "top",
    },
    {
        target: "#monthly-stats",
        content:
            "Here you can see your monthly statistics, including total hours, total payments received.",
        placement: "top",
    },
    {
        target: "#lesson-table",
        content:
            "This table shows all the lessons you've added. You can search and manage your lessons from here.",
        placement: "top",
    },
    {
        target: "#more-button",
        content:
            "Click here to access additional features like Vehicle Maintenance, Student Progress, and Statistics.",
        placement: "bottom",
    },
    {
        target: "body",
        content:
            "Congratulations! You're now ready to efficiently manage your driving lessons. If you need assistance, click on the profile icon and select 'Support' to contact our help team.",
        placement: "center",
    },
];

export default steps;
