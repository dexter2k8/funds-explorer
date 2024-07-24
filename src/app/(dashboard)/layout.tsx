import styles from "./styles.module.scss";
import Sidebar from "@/app/(dashboard)/components/Sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { layout, container } = styles;
  return (
    <div className={layout}>
      <Sidebar />
      <div className={container}>
        <header style={{ display: "flex", width: "100%", backgroundColor: "green" }}>
          <h1>Header</h1>
        </header>
        {children}
      </div>
    </div>
  );
}
