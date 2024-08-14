import { FC, forwardRef, useEffect, useRef, useState } from "react";
import classes from "./styles.module.css";
import { ISelectProps } from "./types";
import { ControlledSelect } from "./__components__/ControlledSelect";

const SelectBasic: FC<ISelectProps> = forwardRef<HTMLInputElement, ISelectProps>(
  ({ type = "default", ...props }, ref) => {
    const { options, defaultValue, placeholder, value, onChange } = props;
    const [selected, setSelected] = useState(defaultValue);
    const [text, setText] = useState(options.find((t) => t.value === defaultValue)?.label ?? "");
    const [open, setOpen] = useState(false);
    const [isAbove, setIsAbove] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleChange = (value: string) => {
      setSelected(value);
      // delay to avoid layout shift when select is closing
      setTimeout(() => {
        setText(options.find((t) => t.value === value)?.label ?? "");
      }, 180);
      onChange?.(value);
      setOpen(false);
    };

    const handleInputFocus = () => {
      setOpen(true);
      setText("");
    };

    const filteredOptions = options.filter((option) => {
      const label = option.label.toLowerCase();
      const searchText = text?.toLowerCase() || "";
      return type === "search" ? label.includes(searchText) : options;
    });

    useEffect(() => {
      const handleScroll = () => {
        if (selectRef.current) {
          const { top } = selectRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          setIsAbove(top > windowHeight / 2);
        }
      };
      window.addEventListener("scroll", handleScroll); // inverte a direção da lista de opções ao passar da metade do viewport

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(`.${classes.container}`)) {
          if (type === "search") {
            setText(options.find((t) => t.value === selected)?.label || "");
          }
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("click", handleClickOutside);
      }
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
      value && setSelected(value);
    }, [value]);

    return (
      <div className={classes.container}>
        <div
          ref={selectRef}
          className={classes.select}
          onClick={() => type !== "search" && setOpen(!open)}
          data-open={open}
          data-placeholder={!options.some((t) => t.value === selected)}
          data-type={type}
        >
          {type === "search" ? (
            <input
              ref={ref}
              id={props.id}
              className={classes.input}
              placeholder={placeholder}
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={handleInputFocus}
            />
          ) : (
            options.find((t) => t.value === selected)?.label || placeholder
          )}
        </div>

        <ul
          className={classes.options}
          data-open={open}
          data-above={isAbove}
          data-empty={!filteredOptions.length}
        >
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className={classes.option}
              onClick={() => handleChange(option.value)}
              data-selected={selected === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

const Select = SelectBasic as FC<ISelectProps> & {
  Controlled: typeof ControlledSelect;
};

Select.Controlled = ControlledSelect;

export default Select;
