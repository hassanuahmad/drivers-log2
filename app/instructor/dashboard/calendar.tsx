"use client";

import React, { useState, useEffect, useRef } from "react";
// @ts-ignore
import Calendar, { EventObject } from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { Button } from "@/components/ui/button";

type Lesson = {
    date: string;
    start_time: string;
    end_time: string;
    student: {
        first_name: string;
        last_name: string;
        phone_number: string;
    };
};

type TUICalendarProps = {
    data: Lesson[];
};

export default function TUICalendar({ data }: TUICalendarProps) {
    const calendarRef = useRef<Calendar>(null);
    const [currentWeekRange, setCurrentWeekRange] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const transformEvents = (eventData: Lesson[]): EventObject[] => {
        return eventData.map((item) => ({
            id: `${item.date}-${item.start_time}`,
            calendarId: "1",
            title: `${item.student.first_name} ${item.student.last_name}`,
            start: new Date(`${item.date}T${item.start_time}`),
            end: new Date(`${item.date}T${item.end_time}`),
            category: "time",
            backgroundColor: "#1ba8a5",
            color: "white",
            raw: {
                phoneNumber: item.student.phone_number,
            },
        }));
    };

    const templates = {
        time: function (event: EventObject) {
            return `
                <div style="color: white;"};"> 
                    <div style="font-weight: bold;">
                        ${event.title}
                    </div>
                    <div>
                        ${new Date(event.start).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })}
                        - ${new Date(event.end).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })}
                    </div>
                     <div>
                        Phone: ${event.raw.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                    </div>
                </div >
        `;
        },
    };

    const updateCurrentWeekRange = () => {
        const calendarInstance = calendarRef.current.getInstance();
        const currentDateRange = calendarInstance.getDateRangeStart().toDate();
        const startOfWeek = new Date(currentDateRange);
        const endOfWeek = new Date(currentDateRange);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        const formatDate = (date: Date) => {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        };

        setCurrentWeekRange(
            `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)} `
        );
    };

    useEffect(() => {
        if (calendarRef.current) {
            updateCurrentWeekRange();
        }
    }, []);

    const moveToNextWeek = () => {
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.move(1);
        updateCurrentWeekRange();
    };

    const moveToPreviousWeek = () => {
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.move(-1);
        updateCurrentWeekRange();
    };

    const moveToToday = () => {
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.today();
        updateCurrentWeekRange();
    };

    const theme = {
        common: {
            dayName: { color: "inherit" },
            saturday: { color: "inherit" },
            holiday: { color: "inherit" },
        },
        week: {
            today: { color: "#1ba8a5" },
            dayGridLeft: { borderRight: "none" },
            nowIndicatorLabel: { color: "#1ba8a5" },
            nowIndicatorPast: { border: "1px dashed #1ba8a5" },
            nowIndicatorBullet: { backgroundColor: "#1ba8a5" },
            nowIndicatorToday: { border: "1px solid #1ba8a5" },
        },
    };

    return (
        <div className="my-10">
            <h2 className="mb-4 text-center text-2xl font-bold">
                3 Week Lessons Schedule
            </h2>
            <div
                className={`mb-4 ${isMobile ? "flex flex-col space-y-2" : "flex items-center justify-between"} `}
            >
                <div className="text-lg font-semibold">{currentWeekRange}</div>
                <div
                    className={`${isMobile ? "flex justify-end space-x-8" : "space-x-4"} `}
                >
                    <Button variant="secondary" onClick={moveToPreviousWeek}>
                        {isMobile ? "Prev" : "Previous Week"}
                    </Button>
                    <Button variant="secondary" onClick={moveToToday}>
                        Today
                    </Button>
                    <Button variant="secondary" onClick={moveToNextWeek}>
                        {isMobile ? "Next" : "Next Week"}
                    </Button>
                </div>
            </div>
            <Calendar
                ref={calendarRef}
                height="900px"
                view={isMobile ? "day" : "week"}
                week={{
                    dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    taskView: false,
                    eventView: ["time"],
                    hourStart: 6,
                    hourEnd: 22,
                }}
                events={transformEvents(data)}
                template={templates}
                theme={theme}
                isReadOnly={true}
                onAfterRenderSchedule={updateCurrentWeekRange}
            />
        </div>
    );
}
