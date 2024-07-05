import SectionHeading from "@/components/sectionHeading";
import StudentProgressForm from "@/app/demo/student-progress/studentProgressForm";

export default async function Page() {
    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Student Progress"
                    description="View student progress and generate reports."
                />
            </div>
            <div className="container mx-auto">
                <StudentProgressForm />
            </div>
        </>
    );
}
