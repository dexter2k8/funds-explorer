import UserDetails from "../UserDetails";
import styles from "./styles.module.scss";
import { MdMenu } from "react-icons/md";

interface IHeaderProps {
  menuClick: () => void;
  title: string;
}

export default function Header({ menuClick, title }: IHeaderProps) {
  const { header, content } = styles;
  return (
    <header className={header}>
      <div className={content}>
        <button onClick={menuClick}>
          <MdMenu />
        </button>
        <h2>{title}</h2>
      </div>
      {/* TODO: Add user details */}
      <UserDetails username="Dexter" email="LqS2f@example.com" />
    </header>
  );
}
