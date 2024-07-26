import styles from "./styles.module.scss";
import { MdOutlinePerson } from "react-icons/md";
import Image from "next/image";

interface IUserDetailsProps {
  avatar?: string;
  username: string;
  email: string;
}

export default function UserDetails({ avatar, username, email }: IUserDetailsProps) {
  return (
    <div
      className={styles.userDetails}
      onMouseEnter={(e) => e.currentTarget.classList.add(styles.show)}
      onMouseLeave={(e) => e.currentTarget.classList.remove(styles.show)}
    >
      <figure>
        {avatar ? (
          <Image src={avatar} alt="avatar" width={40} height={40} />
        ) : (
          <MdOutlinePerson size={40} />
        )}
      </figure>
      <section>
        <div>
          <h4>{username}</h4>
          <p>{email}</p>
        </div>
      </section>
    </div>
  );
}
