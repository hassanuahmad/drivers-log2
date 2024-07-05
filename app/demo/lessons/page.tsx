import SectionHeading from "@/components/sectionHeading";
import LessonForm from "@/app/demo/lessons/lessonForm";
import View from "@/app/demo/lessons/view";

export default async function Page() {
    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Lesson Information"
                    description="Select student and add a lesson. If you have no students, please first add a student in the Students page."
                />
                <LessonForm />
                <View />
            </div>
        </>
    );
}
