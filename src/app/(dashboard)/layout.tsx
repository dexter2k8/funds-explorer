import styles from "./styles.module.css";
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { layout } = styles;
  return (
    <div className={layout}>
      <Sidebar />
      <div>
        <h1 style={{ backgroundColor: "green" }}>Header</h1>
        {children}
      </div>
    </div>
  );
}
