import Tabs, { ITabItemProps } from "@/components/Tabs";
import styles from "./styles.module.scss";

export default function Settings() {
  const { settings } = styles;

  const tabItems: ITabItemProps[] = [
    { key: 0, label: "Edit profile", children: <form>Edit Profile</form> },
    { key: 1, label: "Manage Users", children: <section>Manage Users</section> },
    { key: 2, label: "Manage Funds", children: <section>Manage Funds</section> },
  ];
  return (
    <div className={settings}>
      <main>
        <Tabs items={tabItems} />
      </main>
    </div>
  );
}
