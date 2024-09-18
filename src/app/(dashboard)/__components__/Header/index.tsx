import styles from "./styles.module.scss";
import UserDetails from "../UserDetails";
import { MdMenu } from "react-icons/md";
import { useSWR } from "@/hook/useSWR";
import { API } from "@/app/paths";
import { IGetSelfUser } from "@/app/api/get_self_user/types";
import { useEffect } from "react";
import { useAuth } from "@/store/useAuth";

interface IHeaderProps {
  menuClick: () => void;
  label: string;
}

export default function Header({ menuClick, label }: IHeaderProps) {
  const { header, menu, title, content } = styles;
  const { setValue } = useAuth();

  const { response } = useSWR<IGetSelfUser>(API.GET_SELF_USER);

  useEffect(() => {
    if (response) setValue("isAdmin", response.admin);
  }, [response]);

  return (
    <header className={header}>
      <div className={content}>
        <div className={menu}>
          <button onClick={menuClick}>
            <MdMenu />
          </button>
          <h2 className={title}>{label}</h2>
        </div>
        <UserDetails username={response?.name} email={response?.email} avatar={response?.avatar} />
      </div>
    </header>
  );
}
