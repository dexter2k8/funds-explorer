import Link from "next/link";
import styles from "./styles.module.scss";
import Logo from "../../../../../public/assets/logo";
import { MdDashboard, MdDonutLarge, MdLogout } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { RiGroupFill, RiMessage2Fill } from "react-icons/ri";

const sidebarItems = [
  { name: "Dashboard", icon: <MdDashboard /> },
  { name: "My Store", icon: <FaShoppingBag /> },
  { name: "Analytics", icon: <MdDonutLarge /> },
  { name: "Message", icon: <RiMessage2Fill /> },
  { name: "Team", icon: <RiGroupFill /> },
];

export default function Sidebar() {
  const { sidebar, head, items, foot } = styles;

  return (
    <aside className={sidebar}>
      <div className={head}>
        <Link href="/dashboard">
          <Logo />
          <span>Funds Explorer</span>
        </Link>
      </div>

      <ul className={items}>
        {sidebarItems.map((item, i) => (
          <li key={i}>
            <a href="#">
              {item.icon}
              <span>{item.name}</span>
            </a>
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
