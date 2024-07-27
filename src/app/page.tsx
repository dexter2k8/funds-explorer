"use client";
import styles from "./page.module.scss";
import Input from "@/components/Input";
import Logo from "../../public/assets/logo";
import Button from "@/components/Button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/schemas/validateLogin";
import { ISignInProps } from "@/store/useAuth/types";
import { useAuth } from "@/store/useAuth";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { main, container, head, item } = styles;
  const router = useRouter();
  const { signIn } = useAuth();
  const { control, handleSubmit } = useForm<ISignInProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignInProps> = async (data) => {
    (await signIn(data)) && router.replace("/dashboard");
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
      {/* <button onClick={() => GetFunds()}>get funds</button> */}
    </main>
  );
}

async function GetFunds() {
  try {
    const response = await api.client.get("/api/get_funds");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
