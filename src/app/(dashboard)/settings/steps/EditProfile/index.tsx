"use client";
import Button from "@/components/Button";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";

export default function EditProfile() {
  const { form, item } = styles;
  const { control, handleSubmit } = useForm();
  return (
    <center>
      <form className={form}>
        <div className={item}>
          <label htmlFor="name">Name</label>
          <Input.Controlled control={control} name="name" id="name" />
        </div>
        <div className={item}>
          <label htmlFor="email">Email</label>
          <Input.Controlled control={control} name="email" id="email" />
        </div>
        <Button
          //   loading={loading}
          size="large"
          variant="primary"
        >
          Update
        </Button>
      </form>
      <Button>Change Password</Button>
    </center>
  );
}
