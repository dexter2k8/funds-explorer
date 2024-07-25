"use client";
import styles from "./styles.module.scss";
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { PropsWithChildren, useState } from "react";
import Header from "./components/Header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const { layout, container } = styles;
  return (
    <div className={layout}>
      <Sidebar collapsed={collapsed} />
      <div className={container}>
        <Header menuClick={() => setCollapsed(!collapsed)} />
        {children}
      </div>
    </div>
  );
}
