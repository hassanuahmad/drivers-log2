import SectionHeading from "@/components/sectionHeading";
import { getInstructorStudentsAction } from "@/utils/actions";
import StudentProgressForm from "@/app/instructor/student-progress/studentProgressForm";

export default async function Page() {
    const studentRecords = await getInstructorStudentsAction();
    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Student Progress"
                    description="View student progress and generate reports."
                />
            </div>
            <div className="container mx-auto">
                <StudentProgressForm studentRecords={studentRecords} />
            </div>
        </>
    );
}
