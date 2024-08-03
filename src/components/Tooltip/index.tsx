"use client";
import { useEffect, useRef, useState } from "react";
import type { ITooltipProps } from "./types";
import { calculatePosition } from "./helper";
import classes from "./styles.module.css";

interface IPosition {
  top: number;
  left: number;
}

export default function Tooltip({
  delay = 0,
  placement = "top",
  textAlign = "left",
  ...props
}: ITooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<IPosition>({
    top: 0,
    left: 0,
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const target = props.targetRef?.current;

  useEffect(() => {
    if (!target) return;

    const handleMouseOver = () => {
      timeoutRef.current = window.setTimeout(() => {
        const rect = target.getBoundingClientRect();
        const { width, height } = tooltipRef.current!.getBoundingClientRect();
        setShow(true);
        setPosition(calculatePosition(placement, rect, width, height));
      }, delay);
    };

    const handleMouseOut = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShow(false);
    };

    target.addEventListener("mouseover", handleMouseOver);
    target.addEventListener("mouseout", handleMouseOut);

    return () => {
      target.removeEventListener("mouseover", handleMouseOver);
      target.removeEventListener("mouseout", handleMouseOut);
    };
  }, [delay, placement, target]);

  return (
    <div
      className={classes.tooltip}
      ref={tooltipRef}
      data-show={show}
      data-placement={placement}
      data-hide-arrow={props.hideArrow}
      style={{
        top: position.top,
        left: position.left,
        maxWidth: props.maxWidth,
        textAlign: textAlign,
      }}
    >
      {props.message}
    </div>
  );
}
