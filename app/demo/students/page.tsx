import StudentForm from "@/app/demo/students/studentForm";
import SectionHeading from "@/components/sectionHeading";
import View from "@/app/demo/students/view";

export default async function Page() {
    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Student Information"
                    description="Add student information so that they can be assigned to a lesson and also they can be
                    viewed below in the table."
                />
                <StudentForm />
                <View />
            </div>
        </>
    );
}
