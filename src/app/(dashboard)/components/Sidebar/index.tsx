import Link from "next/link";
import styles from "./styles.module.scss";
import Logo from "../../../../../public/assets/logo";

export default function Sidebar() {
  const { sidebar } = styles;

  return (
    <aside className={sidebar}>
      <Link href="/dashboard">
        <Logo />
        Funds Explorer
      </Link>
    </aside>
  );
}
