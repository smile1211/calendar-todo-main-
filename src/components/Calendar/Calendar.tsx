import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarContent from '../CalendarContent/CalendarContent';
import styles from './Calendar.module.css'

export default function Calendar() {
    return (
        <section className={styles.calendar}>
            <CalendarHeader/>
            <CalendarContent/>
        </section>
    );
}

