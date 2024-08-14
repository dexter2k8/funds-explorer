"use client";
import { ChangeEvent, CSSProperties, FC, forwardRef, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { parseDate } from "@/utils/lib";
import { FaCalendar } from "react-icons/fa";
import type { ISelectDateProps } from "./types";
import { ControlledSelectDate } from "./__components__/ControlledSelectDate";

const SelectDateBasic: FC<ISelectDateProps> = forwardRef<HTMLInputElement, ISelectDateProps>(
  ({ id, value = parseDate(new Date()), onChange, disabled }, ref) => {
    const [date, setDate] = useState(value);
    const [showCalendar, setShowCalendar] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isAbove, setIsAbove] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value) setDate(value);
    }, [value]);

    useEffect(() => {
      const input = inputRef?.current;
      const calendar = calendarRef?.current;
      if (!input || !calendar) return;

      const handleMouseOver = () => {
        const { left, top } = input.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setPosition({ top, left });
        setIsAbove(top > windowHeight / 2);
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (!calendar.contains(event.target as Node) && !input.contains(event.target as Node))
          setShowCalendar(false);
      };

      input.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        input.removeEventListener("mouseover", handleMouseOver);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
      onChange?.(e.target.value);
    };

    const handleChangeCalendar = (date: Date) => {
      onChange?.(parseDate(date));
      setDate(parseDate(date));
      setShowCalendar(false);
    };

    const positionStyle = {
      "--top": position.top,
      "--left": position.left,
    };

    return (
      <div ref={ref} className="select-date">
        <input
          id={id}
          disabled={disabled}
          ref={inputRef}
          className="calendar__input"
          type="date"
          value={date}
          onChange={handleChangeInput}
          onClick={() => setShowCalendar(!showCalendar)}
        />
        <FaCalendar className="calendar__icon" />
        <div
          className="calendar"
          ref={calendarRef}
          data-show={showCalendar}
          style={positionStyle as CSSProperties}
        >
          <Calendar
            date={new Date(date + "T00:00:00")}
            onChange={handleChangeCalendar}
            weekdayDisplayFormat="EEEEE" // change weekday to format S,M,T,W,T,F,S
            maxDate={new Date()}
            color="var(--dark)" // selected date color
          />
        </div>
      </div>
    );
  }
);

const SelectDate = SelectDateBasic as FC<ISelectDateProps> & {
  Controlled: typeof ControlledSelectDate;
};

SelectDate.Controlled = ControlledSelectDate;

export default SelectDate;
