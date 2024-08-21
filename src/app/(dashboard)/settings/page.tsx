import Tabs, { ITabItemProps } from "@/components/Tabs";
import styles from "./styles.module.scss";
import EditProfile from "./steps/EditProfile";
import ManageUsers from "./steps/ManageUsers";
import { ManageFunds } from "./steps/ManageFunds";

export default function Settings() {
  const { settings } = styles;

  const tabItems: ITabItemProps[] = [
    { key: 0, label: "Edit profile", children: <EditProfile /> },
    { key: 1, label: "Manage Funds", children: <ManageFunds /> },
    { key: 2, label: "Manage Users", children: <ManageUsers /> },
  ];

  return (
    <div className={settings}>
      <main>
        <Tabs items={tabItems} minWidth="25rem" />
      </main>
    </div>
  );
}
