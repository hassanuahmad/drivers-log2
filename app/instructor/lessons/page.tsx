import SectionHeading from "@/components/sectionHeading";
import LessonForm from "@/app/instructor/lessons/lessonForm";
import { getInstructorStudentsAction } from "@/utils/actions";
import { monthOptions } from "@/utils/utils";
import View from "@/app/instructor/lessons/view";
import {
    getLessonAction,
    getLessonsTotal,
} from "@/app/instructor/lessons/actions";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;
    if (!userId) return null;
    const studentRecords = await getInstructorStudentsAction();
    const month = monthOptions[new Date().getMonth()].value;
    const year = new Date().getFullYear();
    const lessonRecords = await getLessonAction(month, year);
    const lessonTotal = await getLessonsTotal(userId, month, year);

    return (
        <>
            <div className="container mx-auto">
                <SectionHeading
                    title="Lesson Information"
                    description="Select student and add a lesson. If you have no students, please first add a student in the Students page."
                />
            </div>
            <div className="container mx-auto">
                <LessonForm studentRecords={studentRecords} />
            </div>
            <div className="container mx-auto py-10">
                <View
                    lessonRecords={lessonRecords}
                    lessonTotal={lessonTotal}
                    getLessonAction={getLessonAction}
                    getLessonsTotal={getLessonsTotal}
                />
            </div>
        </>
    );
}
