"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import {
    StudentFormValues,
    VehicleFormValues,
    LessonFormValues,
} from "@/types/shared/forms";
import { TotalVehicle } from "@/types/vehicle";
import { LessonTotal } from "@/types/lessons";

type StatRecords = {
    lessons: number;
    total_hours: number;
    total_revenue: number;
    students: number;
    passed_students: number;
    failed_students: number;
    gas: number;
    maintenance: number;
    monthly_data: MonthlyData[];
};

type MonthlyData = {
    month: string;
    payment_amount: number;
    duration: number;
};

type LessonRecordValues = LessonFormValues & {
    duration: number;
    students: StudentFormValues;
    name: string;
};

type DemoContextState = {
    students: StudentFormValues[];
    setStudents: React.Dispatch<React.SetStateAction<StudentFormValues[]>>;
    lessons: LessonRecordValues[];
    setLessons: React.Dispatch<React.SetStateAction<LessonRecordValues[]>>;
    lessonTotals: LessonTotal;
    setLessonTotals: React.Dispatch<React.SetStateAction<LessonTotal>>;
    vehicles: VehicleFormValues[];
    setVehicles: React.Dispatch<React.SetStateAction<VehicleFormValues[]>>;
    totalVehicles: TotalVehicle;
    setTotalVehicles: React.Dispatch<React.SetStateAction<TotalVehicle>>;
    studentLessonTotals: LessonTotal;
    setStudentLessonTotals: React.Dispatch<React.SetStateAction<LessonTotal>>;
};

type DemoContextActions = {
    addStudent: (student: StudentFormValues) => void;
    addLesson: (lesson: LessonRecordValues) => void;
    addVehicle: (vehicle: VehicleFormValues) => void;
    getStudentRecords: (record: { id: number }) => LessonRecordValues[];
    getStatRecords: () => StatRecords;
};

type DemoContextType = DemoContextState & DemoContextActions;

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [students, setStudents] = useState<StudentFormValues[]>([]);
    const [lessons, setLessons] = useState<LessonRecordValues[]>([]);
    const [lessonTotals, setLessonTotals] = useState({
        total_hours: 0,
        total_interac: 0,
        total_cash: 0,
    });
    const [vehicles, setVehicles] = useState<VehicleFormValues[]>([]);
    const [totalVehicles, setTotalVehicles] = useState({
        gas_total: 0,
        maintenance_total: 0,
    });
    const [studentLessonTotals, setStudentLessonTotals] = useState({
        total_hours: 0,
        total_interac: 0,
        total_cash: 0,
    });

    useEffect(() => {
        const storedStudents = sessionStorage.getItem("students");
        if (storedStudents) setStudents(JSON.parse(storedStudents));

        const storedLessons = sessionStorage.getItem("lessons");
        if (storedLessons) {
            const lessonRecords = JSON.parse(storedLessons);
            setLessons(JSON.parse(storedLessons));

            const totals = lessonRecords.reduce(
                (acc: any, lesson: LessonRecordValues) => {
                    acc.totalDuration += lesson.duration;
                    if (lesson.payment_type === "Interac") {
                        acc.totalInterac += lesson.payment_amount;
                    }
                    if (lesson.payment_type === "Cash") {
                        acc.totalCash += lesson.payment_amount;
                    }
                    return acc;
                },
                { totalDuration: 0, totalInterac: 0, totalCash: 0 }
            );

            setLessonTotals({
                total_hours: totals.totalDuration,
                total_interac: totals.totalInterac,
                total_cash: totals.totalCash,
            });
        }

        const storedVehicle = sessionStorage.getItem("vehicle");
        if (storedVehicle) {
            const vehicleRecords = JSON.parse(storedVehicle);
            setVehicles(JSON.parse(storedVehicle));

            const totals = vehicleRecords.reduce(
                (acc: any, vehicle: VehicleFormValues) => {
                    acc.totalGas += vehicle.gas;
                    acc.totalMaintenance += vehicle.maintenance;
                    return acc;
                },
                { totalGas: 0, totalMaintenance: 0 }
            );

            setTotalVehicles({
                gas_total: totals.totalGas,
                maintenance_total: totals.totalMaintenance,
            });
        }
    }, []);

    const addStudent = (student: StudentFormValues) => {
        const updatedStudents = [...students, student];
        setStudents(updatedStudents);
        sessionStorage.setItem("students", JSON.stringify(updatedStudents));
    };

    const addLesson = (lesson: LessonRecordValues) => {
        const studentInfo = students.filter(
            (student) => student.id === Number(lesson.selected_student)
        );
        const lessonInfo = {
            ...lesson,
            students: studentInfo[0],
            name: `${studentInfo[0].first_name}  ${studentInfo[0].last_name}`,
        };

        const updatedLessons = [...lessons, lessonInfo];
        setLessons(updatedLessons);
        setLessonTotals({
            ...lessonTotals,
            total_hours: lessonTotals.total_hours + lesson.duration,
            total_interac:
                lesson.payment_type === "Interac"
                    ? lessonTotals.total_interac + lesson.payment_amount
                    : lessonTotals.total_interac,
            total_cash:
                lesson.payment_type === "Cash"
                    ? lessonTotals.total_cash + lesson.payment_amount
                    : lessonTotals.total_cash,
        });
        sessionStorage.setItem("lessons", JSON.stringify(updatedLessons));
    };

    const addVehicle = (vehicle: VehicleFormValues) => {
        const updatedVehicle = [...vehicles, vehicle];
        setVehicles(updatedVehicle);
        setTotalVehicles({
            ...totalVehicles,
            gas_total: totalVehicles.gas_total + vehicle.gas,
            maintenance_total:
                totalVehicles.maintenance_total + vehicle.maintenance,
        });
        sessionStorage.setItem("vehicle", JSON.stringify(updatedVehicle));
    };

    const getStudentRecords = (record: { id: number }) => {
        const studentLessons = lessons.filter(
            (lesson) => lesson.students.id === Number(record.id)
        );

        const totals = studentLessons.reduce(
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
            { totalDuration: 0, totalInterac: 0, totalCash: 0 }
        );

        setStudentLessonTotals({
            total_hours: totals.totalDuration,
            total_interac: totals.totalInterac,
            total_cash: totals.totalCash,
        });

        return studentLessons;
    };

    const getStatRecords = () => {
        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const initMonthlyData = () => {
            return monthNames.map((month) => ({
                month: month,
                payment_amount: 0,
                duration: 0,
            }));
        };

        const { lessonStats, monthlyData } = lessons.reduce(
            (acc, lesson) => {
                acc.lessonStats.totalHours += lesson.duration;
                acc.lessonStats.totalRevenue += lesson.payment_amount;
                if (lesson.road_test === "Pass")
                    acc.lessonStats.passedStudents += 1;
                if (lesson.road_test === "Fail")
                    acc.lessonStats.failedStudents += 1;

                const lessonDate = new Date(lesson.date);
                const monthIndex = lessonDate.getMonth();
                acc.monthlyData[monthIndex].payment_amount +=
                    lesson.payment_amount;
                acc.monthlyData[monthIndex].duration += lesson.duration;

                return acc;
            },
            {
                lessonStats: {
                    totalHours: 0,
                    totalRevenue: 0,
                    passedStudents: 0,
                    failedStudents: 0,
                },
                monthlyData: initMonthlyData(),
            }
        );

        const vehicleStats = vehicles.reduce(
            (acc, vehicle) => {
                acc.totalGas += vehicle.gas;
                acc.totalMaintenance += vehicle.maintenance;
                return acc;
            },
            { totalGas: 0, totalMaintenance: 0 }
        );

        let stats = {
            lessons: lessons.length,
            total_hours: lessonStats.totalHours,
            total_revenue: lessonStats.totalRevenue,
            students: students.length,
            passed_students: lessonStats.passedStudents,
            failed_students: lessonStats.failedStudents,
            gas: vehicleStats.totalGas,
            maintenance: vehicleStats.totalMaintenance,
            monthly_data: monthlyData,
        };

        return stats;
    };

    return (
        <DemoContext.Provider
            value={{
                students,
                setStudents,
                addStudent,
                lessons,
                setLessons,
                lessonTotals,
                setLessonTotals,
                addLesson,
                vehicles,
                setVehicles,
                addVehicle,
                totalVehicles,
                setTotalVehicles,
                getStudentRecords,
                studentLessonTotals,
                setStudentLessonTotals,
                getStatRecords,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
};

export const useDemoContext = () => {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error("useDemoContext must be used within a DemoProvider");
    }
    return context;
};
