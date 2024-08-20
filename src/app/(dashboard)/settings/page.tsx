import Tabs, { ITabItemProps } from "@/components/Tabs";
import styles from "./styles.module.scss";
import EditProfile from "./steps/EditProfile";

export default function Settings() {
  const { settings } = styles;

  const tabItems: ITabItemProps[] = [
    { key: 0, label: "Edit profile", children: <EditProfile /> },
    { key: 1, label: "Manage Users", children: <section>Manage Users</section> },
    { key: 2, label: "Manage Funds", children: <section>Manage Funds</section> },
  ];
  return (
    <div className={settings}>
      <main>
        <Tabs items={tabItems} minWidth="25rem" />
      </main>
    </div>
  );
}
