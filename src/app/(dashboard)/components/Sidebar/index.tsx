import Link from "next/link";
import styles from "./styles.module.scss";
import Logo from "../../../../../public/assets/logo";
import { MdDashboard, MdDonutLarge, MdLogout } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { RiGroupFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useState } from "react"; // TODO: remove when dashboard is ready

const sidebarItems = [
  { label: "Dashboard", value: "/dashboard", icon: <MdDashboard /> },
  { label: "My Store", value: "/my-store", icon: <FaShoppingBag /> },
  { label: "Analytics", value: "/analytics", icon: <MdDonutLarge /> },
  { label: "Team", value: "/team", icon: <RiGroupFill /> },
];

interface ISidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: ISidebarProps) {
  const pathname = usePathname();
  const { sidebar, head, items, foot } = styles;

  const [active, setActive] = useState(0);

  return (
    <aside className={sidebar} data-collapsed={collapsed}>
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
    </aside>
  );
}
