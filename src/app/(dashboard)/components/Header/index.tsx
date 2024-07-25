import styles from "./styles.module.scss";
import { MdMenu } from "react-icons/md";

interface IHeaderProps {
  menuClick: () => void;
}

export default function Header({ menuClick }: IHeaderProps) {
  const { header } = styles;
  return (
    <header className={header}>
      <button onClick={menuClick}>
        <MdMenu />
      </button>
      <h1>Header</h1>
    </header>
  );
}
