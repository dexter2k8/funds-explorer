"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/Input";
import Logo from "../../public/assets/logo";
import Button from "@/components/Button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/schemas/validateLogin";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import type { ISignInProps } from "@/store/useAuth/types";
import api from "@/services/api";

export default function SignIn() {
  const { main, container, head, item } = styles;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();
  const { control, handleSubmit } = useForm<ISignInProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignInProps> = async (data) => {
    setLoading(true);
    (await signIn(data)) && router.replace("/dashboard");
    setLoading(false);
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
        <Button loading={loading} size="large" variant="primary">
          Sign In
        </Button>
        <Link href="/sign-up">Create an account</Link>
      </form>
      <button onClick={fetchFunds}>fetch</button>
    </main>
  );
}

const fetchFunds = async () => {
  const res = await fetch("http://dexternet.ddns.net:3001/");
  return console.log(await res.json());
};
