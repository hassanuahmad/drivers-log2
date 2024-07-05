"use client";

import { useState } from "react";
import { ChevronsUpDown, Check, File } from "lucide-react";

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { DataTable } from "@/app/demo/student-progress/data-table";
import { columns } from "@/app/demo/student-progress/columns";
import TotalNumbers from "@/components/totalNumbers";
import { formatTotalHours } from "@/utils/utils";
import { StudentFormValues, LessonFormValues } from "@/types/shared/forms";
import { StudentProgressLessonType } from "@/types/lessons";
import { useDemoContext } from "@/app/demo/demoContext";

type StudentRecordType = StudentFormValues & { id: number };
type LessonRecordType = LessonFormValues & { duration: number };

export default function StudentProgressForm() {
    const {
        students: studentRecords,
        getStudentRecords,
        studentLessonTotals,
    } = useDemoContext();
    const [selectedStudent, setSelectedStudent] =
        useState<StudentRecordType | null>(null);
    const [studentLessons, setStudentLessons] = useState<
        StudentProgressLessonType[]
    >([]);
    const [isSelectedStudentOpen, setIsSelectedStudentOpen] =
        useState<boolean>(false);

    const getStudentLessons = (record: StudentRecordType) => {
        const records = getStudentRecords(record);
        setStudentLessons(
            records.map(
                (lesson: LessonRecordType): StudentProgressLessonType => ({
                    ...lesson,
                    selected_student: Number(lesson.selected_student),
                }),
            ),
        );
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
                                ? `${selectedStudent?.first_name} ${selectedStudent?.last_name}`
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
                                    {studentRecords.map((record: any) => (
                                        <CommandItem
                                            key={record.id}
                                            onSelect={() => {
                                                setSelectedStudent(record);
                                                getStudentLessons(record);
                                                setIsSelectedStudentOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedStudent?.id === record.id
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                            {record.first_name} {record.last_name}
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
                        {formatTotalHours(studentLessonTotals.total_hours || 0)}
                    </div>
                    <TotalNumbers
                        title="Total Interac"
                        numbers={studentLessonTotals.total_interac}
                    />
                    <TotalNumbers
                        title="Total Cash"
                        numbers={studentLessonTotals.total_cash}
                    />
                </div>
            </div>
            {/* @ts-ignore */}
            <DataTable columns={columns} data={studentLessons || []} />
            <div className="flex justify-end pt-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <Button
                                    size="sm"
                                    disabled={true}
                                    variant="outline"
                                    className="h-8 gap-1"
                                >
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export Report
                                    </span>
                                </Button>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                BDE Report Export: The edit feature is only available in the
                                full version of our product. Purchase the full version to access
                                all features and functionality.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </>
    );
}
