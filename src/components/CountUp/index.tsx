"use client";
import { useEffect, useRef, useState } from "react";
import { ICountUpProps, easing } from "./types";

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  easingFunction = "exp",
  decimals = 0,
  prefix = "",
  locale,
}: ICountUpProps) {
  const difference = end - start;
  const startTimeRef = useRef(Date.now()); // Use useRef to store start time
  const [count, setCount] = useState(start);

  const animate = () => {
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
    const progress = elapsedTime / duration;
    const easingFn = easing[easingFunction];
    const easingValue = easingFn(progress);
    const incrementInterval = easingValue * difference;
    const animationId = window.requestAnimationFrame(animate); // Schedule next frame

    if (progress <= 1) {
      setCount(start + incrementInterval);
    } else {
      setCount(end); // Ensure finalNumber is reached accurately
      window.cancelAnimationFrame(animationId); // Stop animation on completion
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => animate(), []); // Start animation only once on component mount

  return (
    <div>
      <span>
        {prefix}
        {locale
          ? count.toLocaleString(locale, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : count.toFixed(decimals)}
      </span>
    </div>
  );
}
