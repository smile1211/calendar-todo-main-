import { useDate, useTodos } from '../../context/GlobalContextProvider';
import styles from "./CalendarContent.module.css";

function getMonthDays(year: number, month: number) {
    const days: (number | null)[] = [];
    const date = new Date(year, month, 1);
    const firstDayOfWeek = date.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(null);
    }

    while (date.getMonth() === month) {
        days.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export default function CalendarContent() {
    const { currentDate, updateCurrentDate } = useDate();
    const { todos } = useTodos();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getMonthDays(year, month);
    const weekdayHeaders = ["일", "월", "화", "수", "목", "금", "토"];

    const handleDateClick = (day: number | null) => {
        if (day !== null) {
            const newDate = new Date(year, month, day);
            updateCurrentDate(newDate);
        }
    };

    const getTodoStatus = (
        year: number,
        month: number,
        day: number
    ): string => {
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
        const dayTodos = todos[dateKey] || [];

        const allDone = dayTodos.every((todo) => todo.completed);
        const anyTodo = dayTodos.length > 0;

        if (anyTodo && allDone) {
            return "done";
        } else if (anyTodo) {
            return "doing";
        }
        return "";
    };

    return (
        <section className={styles["calendar-content"]}>
            <div className={styles["calendar-grid"]}>
                {weekdayHeaders.map((header) => (
                    <div key={header} className={styles["calendar-header"]}>
                        {header}
                    </div>
                ))}
                {days.map((day, index) => {
                    const dayStatus = day ? getTodoStatus(year, month, day) : "";
                    return (
                        <div
                            key={index}
                            className={`${styles["calendar-day"]} ${
                                day === currentDate.getDate()
                                    ? styles["selected"]
                                    : ""
                            } ${styles[dayStatus]}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day || ""}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
