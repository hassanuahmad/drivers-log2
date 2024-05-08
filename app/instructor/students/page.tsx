import StudentForm from "@/app/instructor/students/studentForm";
import SectionHeading from "@/components/sectionHeading";

export default function Page() {
  return (
    <>
      <SectionHeading
        title="Student Information"
        description="Add student information so that they can be assigned to a lesson and also they can be
                    viewed below in the table."
      />
      <StudentForm />
    </>
  );
}
