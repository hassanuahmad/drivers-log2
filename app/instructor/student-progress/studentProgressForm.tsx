"use client";

import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { createClient } from "@/utils/supabase/client";
import { DataTable } from "@/app/instructor/student-progress/data-table";
import { columns } from "@/app/instructor/student-progress/columns";
import TotalNumbers from "@/components/totalNumbers";
import { formatTotalHours } from "@/utils/utils";
import { StudentFormValues } from "@/types/shared/forms";
import { StudentProgressLessonType } from "@/types/lessons";

type StudentRecordType = {
    student_id: number;
    students: StudentFormValues;
};

type StudentProgressFormProps = {
    studentRecords: StudentRecordType[];
};

export default function StudentProgressForm({
    studentRecords,
}: StudentProgressFormProps) {
    const [selectedStudent, setSelectedStudent] =
        useState<StudentRecordType | null>(null);
    const [studentLessons, setStudentLessons] = useState<
        StudentProgressLessonType[]
    >([]);
    const [lessonTotals, setLessonTotals] = useState({
        total_hours: 0,
        total_interac: 0,
        total_cash: 0,
    });
    const [isSelectedStudentOpen, setIsSelectedStudentOpen] =
        useState<boolean>(false);

    const getStudentLessons = async (record: StudentRecordType) => {
        const supabase = createClient();
        const { data: student, error } = await supabase
            .from("lessons")
            .select("* , students(first_name, last_name, bde)")
            .eq("selected_student", record.student_id);

        if (error) {
            console.error(
                "Error fetching student lessons in getStudentLessons: ",
                error,
            );
            return;
        }

        setStudentLessons(student);

        const totals = student.reduce(
            (acc, lesson) => {
                acc.totalDuration += lesson.duration;
                if (lesson.payment_type === "Interac") {
                    acc.totalInterac += lesson.payment_amount;
                }
                if (lesson.payment_type === "Cash") {
                    acc.totalCash += lesson.payment_amount;
                }
                return acc;
            },
            { totalDuration: 0, totalInterac: 0, totalCash: 0 },
        );

        setLessonTotals({
            total_hours: totals.totalDuration,
            total_interac: totals.totalInterac,
            total_cash: totals.totalCash,
        });
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between py-4">
                <Popover
                    open={isSelectedStudentOpen}
                    onOpenChange={setIsSelectedStudentOpen}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={isSelectedStudentOpen}
                            className="w-[200px] justify-between"
                        >
                            {selectedStudent
                                ? `${selectedStudent?.students?.first_name} ${selectedStudent?.students?.last_name}`
                                : "Select Student..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput
                                placeholder="Search student..."
                                className="focus:border-none focus:ring-0"
                            />
                            <CommandEmpty>No student found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {studentRecords.map((record) => (
                                        <CommandItem
                                            key={record.students.id}
                                            onSelect={() => {
                                                setSelectedStudent(record);
                                                getStudentLessons(record);
                                                setIsSelectedStudentOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedStudent?.students?.id === record.students?.id
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                            {record.students.first_name} {record.students.last_name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="flex items-center pt-4 sm:pt-0">
                    <div className="h-10 px-4 py-2 text-sm text-gray-500">
                        <span className="text-sm font-bold text-gray-500">
                            Total Hours:{" "}
                        </span>
                        {formatTotalHours(lessonTotals.total_hours || 0)}
                    </div>
                    <TotalNumbers
                        title="Total Interac"
                        numbers={lessonTotals.total_interac}
                    />
                    <TotalNumbers title="Total Cash" numbers={lessonTotals.total_cash} />
                </div>
            </div>
            <DataTable columns={columns} data={studentLessons || []} />
        </>
    );
}
