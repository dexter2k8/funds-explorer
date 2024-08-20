"use client";
import styles from "./styles.module.scss";
import Sidebar from "@/app/(dashboard)/__components__/Sidebar";
import { PropsWithChildren, useState } from "react";
import Header from "./__components__/Header";
import { usePathname } from "next/navigation";
import "react-tooltip/dist/react-tooltip.css";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { layout, container, content } = styles;
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const title = pathname.split("/")[1].toUpperCase();

  return (
    <div className={layout}>
      <Sidebar pathname={pathname} collapsed={collapsed} />
      <div className={container}>
        <Header label={title} menuClick={() => setCollapsed(!collapsed)} />
        <div className={content}>{children}</div>
      </div>
    </div>
  );
}
