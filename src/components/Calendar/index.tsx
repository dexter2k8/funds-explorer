import { useState } from "react";
import "./styles.scss";
import { Calendar as DateRangeCalendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { parseDate } from "@/utils/lib";

export default function Calendar() {
  const [date, setDate] = useState(parseDate(new Date()));
  console.log(date);

  return (
    <div className="calendar">
      <input
        className="calendar__input"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <DateRangeCalendar
        date={new Date(date + "T00:00:00")}
        onChange={(date) => setDate(parseDate(date))}
        weekdayDisplayFormat="EEEEE" // change weekday to format S,M,T,W,T,F,S
        maxDate={new Date()}
        color="var(--dark)" // selected date color
      />
    </div>
  );
}
