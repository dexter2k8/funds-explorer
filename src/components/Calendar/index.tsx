import styles from "./styles.module.scss";
import { Calendar as ReactCalendar } from "react-calendar";
export default function Calendar() {
  return (
    <div className={styles.calendar}>
      <ReactCalendar locale="en-US" />
    </div>
  );
}
