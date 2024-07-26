import styles from "./styles.module.scss";
import { MdMenu } from "react-icons/md";

interface IHeaderProps {
  menuClick: () => void;
  title: string;
}

export default function Header({ menuClick, title }: IHeaderProps) {
  const { header } = styles;
  return (
    <header className={header}>
      <button onClick={menuClick}>
        <MdMenu />
      </button>
      <h2>{title}</h2>
    </header>
  );
}
