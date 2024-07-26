"use client";
import styles from "./styles.module.scss";
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { PropsWithChildren, useState } from "react";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

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
