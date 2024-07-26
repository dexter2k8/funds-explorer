"use client";
import Input from "@/components/Input";
import styles from "./page.module.scss";
import Logo from "../../public/assets/logo";
import Button from "@/components/Button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/schemas/validateLogin";

interface ISignInProps {
  email: string;
  password: string;
}

export default function SignIn() {
  const { main, container, head, item } = styles;
  const { control, handleSubmit } = useForm<ISignInProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignInProps> = (data) => {
    console.log(data);
  };

  return (
    <main className={main}>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <div className={head}>
          <Logo />
          <span>Funds Explorer</span>
        </div>
        <div className={item}>
          <label htmlFor="email">Email</label>
          <Input.Controlled control={control} name="email" id="email" />
        </div>
        <div className={item}>
          <label htmlFor="password">Password</label>
          <Input.Controlled control={control} name="password" id="password" type="password" />
        </div>
        <Button size="large" variant="primary">
          Sign In
        </Button>
        <Link href="/sign-up">Create an account</Link>
      </form>
    </main>
  );
}
