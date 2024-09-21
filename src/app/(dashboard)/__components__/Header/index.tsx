import { useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { API } from "@/app/paths";
import { useSWR } from "@/hook/useSWR";
import { useAuth } from "@/store/useAuth";
import UserDetails from "../UserDetails";
import styles from "./styles.module.scss";
import type { IGetSelfUser } from "@/app/api/get_self_user/types";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
