import {
    IoMdArrowDropleft,
    IoMdArrowDropright,
    IoIosArrowBack,
    IoIosArrowForward,
} from "react-icons/io";

import styles from "./CalendarHeader.module.css";
import { useDate } from '../../context/GlobalContextProvider';

export default function CalendarHeader() {
    const { currentDate, updateCurrentDate } = useDate();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const handleUpdateDate = (value: number, type: "m" | "y") => {
        const newDate = new Date(currentDate);
        if (type === "y") {
            newDate.setFullYear(currentDate.getFullYear() + value, currentDate.getMonth(), 1);
        } else if (type === "m") {
            newDate.setMonth(currentDate.getMonth() + value, 1);
        }
        updateCurrentDate(newDate);
    };

    const handleTodayClick = () => {
        updateCurrentDate(new Date());
    };

    return (
        <header className={styles["calendar-header"]}>
            <nav className={styles["year-nav"]}>
                <button
                    className={styles["btn-year"]}
                    onClick={() => handleUpdateDate(-1, "y")}
                >
                    <IoMdArrowDropleft />
                </button>
                <span>{year}</span>
                <button
                    className={styles["btn-year"]}
                    onClick={() => handleUpdateDate(1, "y")}
                >
                    <IoMdArrowDropright />
                </button>
            </nav>
            <nav>
                <button className={styles["btn-today"]} onClick={handleTodayClick}>오늘</button>
            </nav>
            <nav className={styles["month-nav"]}>
                <button
                    className={styles["btn-month"]}
                    onClick={() => handleUpdateDate(-1, "m")}
                >
                    <IoIosArrowBack />
                </button>
                <span className={styles["month-text"]}>{month}</span>
                <button
                    className={styles["btn-month"]}
                    onClick={() => handleUpdateDate(1, "m")}
                >
                    <IoIosArrowForward />
                </button>
            </nav>
        </header>
    );
}
