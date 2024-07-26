import Link from "next/link";
import styles from "./styles.module.scss";
import Logo from "../../../../../public/assets/logo";
import { MdDashboard, MdLogout, MdOutlineSettings, MdOutlineTableChart } from "react-icons/md";
import { useState } from "react"; // TODO: remove when dashboard is ready

const sidebarItems = [
  { label: "Dashboard", value: "/dashboard", icon: <MdDashboard /> },
  { label: "Analytics", value: "/analytics", icon: <MdOutlineTableChart /> },
  { label: "Settings", value: "/settings", icon: <MdOutlineSettings /> },
];

interface ISidebarProps {
  collapsed: boolean;
  pathname: string;
}

export default function Sidebar({ collapsed, pathname }: ISidebarProps) {
  const { sidebar, head, items, foot } = styles;

  const [active, setActive] = useState(0);

  return (
    <nav className={sidebar} data-collapsed={collapsed}>
      <div className={head}>
        <Link href="/dashboard">
          <Logo />
          <span>Funds Explorer</span>
        </Link>
      </div>

      <ul className={items}>
        {sidebarItems.map((item, i) => (
          <li key={i} data-active={i === active} onClick={() => setActive(i)}>
            {/* <li key={i} data-active={pathname === item.value}> */}
            {/* TODO: uncomment when dashboard is ready */}
            {/* <Link href={item.value}> */}
            <Link href="#">
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={foot}>
        <Link href="/">
          <MdLogout />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
