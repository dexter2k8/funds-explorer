"use client";
import styles from "../page.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "../../../public/assets/logo";
import schema from "@/schemas/validateSignUp";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import type { ISignUpProps } from "@/store/useAuth/types";

export default function SignUp() {
  const { main, container, head, item } = styles;
  const { signUp } = useAuth();
  const router = useRouter();
  const { control, handleSubmit } = useForm<ISignUpProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignUpProps> = async (data: ISignUpProps) => {
    (await signUp(data)) && router.push("/");
  };

  return (
    <main className={main}>
      <form className={container} onSubmit={handleSubmit(onSubmit)}>
        <div className={head}>
          <Logo />
          <span>Funds Explorer</span>
        </div>
        <div className={item}>
          <label htmlFor="name">Name</label>
          <Input.Controlled control={control} name="name" id="name" />
        </div>
        <div className={item}>
          <label htmlFor="email">Email</label>
          <Input.Controlled control={control} name="email" id="email" />
        </div>
        <div className={item}>
          <label htmlFor="password">Password</label>
          <Input.Controlled control={control} name="password" id="password" type="password" />
        </div>
        <div className={item}>
          <label htmlFor="confirmPassword"> Confirm password</label>
          <Input.Controlled
            control={control}
            name="confirmPassword"
            id="confirmPassword"
            type="password"
          />
        </div>
        <Button size="large" variant="primary">
          Create account
        </Button>
        <Link href="/">Return to Sign In</Link>
      </form>
    </main>
  );
}
