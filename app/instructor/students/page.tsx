import StudentForm from "@/app/instructor/students/studentForm";
import SectionHeading from "@/components/sectionHeading";
import { DataTable } from "@/app/instructor/students/data-table";
import { columns } from "@/app/instructor/students/columns";
import { getStudentsAction } from "@/app/instructor/students/actions";

export default async function Page() {
    const studentRecords = await getStudentsAction();

    return (
        <>
            <div className="container mx-auto py-10">
                <SectionHeading
                    title="Student Information"
                    description="Add student information so that they can be assigned to a lesson and also they can be
                    viewed below in the table."
                />
            </div>
            <div className="container mx-auto">
                <StudentForm />
            </div>
            <div className="container mx-auto py-10">
                {/* FIX: Fix the type here! */}
                <DataTable columns={columns} data={studentRecords || []} />
            </div>
        </>
    );
}
