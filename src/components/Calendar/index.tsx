import "./styles.scss";
import { Calendar as ReactCalendar } from "react-calendar";
export default function Calendar() {
  return (
    <div className="calendar">
      <ReactCalendar
        locale="en-US" // idioma do calendário
        minDetail="month" // mostra apenas o mês
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(_, d) => d.toLocaleDateString("en-US", { weekday: "narrow" })} // muda o formato do dia da semana
        maxDate={new Date()}
      />
    </div>
  );
}
