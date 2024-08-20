"use client";
import { createRef, useEffect, useState } from "react";
import classes from "./styles.module.css";

interface ITabsProps {
  items: ITabItemProps[];
  defaultSelected?: number;
}

export interface ITabItemProps {
  key: number;
  label: React.ReactNode;
  children?: React.ReactNode;
}

export default function Tabs({ items, defaultSelected = 0 }: ITabsProps) {
  const activeRef = createRef<HTMLLIElement>();
  const [selected, setSelected] = useState<number>(defaultSelected);
  const [offset, setOffset] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const { activeLine, tabList, tabItem } = classes;

  useEffect(() => {
    const activeEl = activeRef.current;
    setOffset(activeEl?.offsetLeft || 0);
    setWidth(activeEl?.clientWidth || 0);
  }, [activeRef, selected]);

  return (
    <>
      <ul className={tabList}>
        {items.map((item) => (
          <li
            key={item.key}
            className={tabItem}
            ref={selected === item.key ? activeRef : undefined}
            onClick={() => setSelected(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div
        className={activeLine}
        style={{ width: width, transform: `translate(${offset}px, -3px)` }}
      />
      <div>{items[selected]?.children}</div>
    </>
  );
}
