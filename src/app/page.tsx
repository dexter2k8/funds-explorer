import Input from "@/components/Input";
import styles from "./page.module.scss";
import Logo from "../../public/assets/logo";
import Button from "@/components/Button";
import Link from "next/link";

export default function SignIn() {
  const { main, container, head, item } = styles;

  return (
    <main className={main}>
      <form className={container}>
        <div className={head}>
          <Logo />
          <span>Funds Explorer</span>
        </div>
        <div className={item}>
          <label htmlFor="email">Email</label>
          <Input id="email" />
        </div>
        <div className={item}>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" />
        </div>
        <Button size="large" variant="primary">
          Sign In
        </Button>
        <Link href="/sign-up">Create an account</Link>
      </form>
    </main>
  );
}
