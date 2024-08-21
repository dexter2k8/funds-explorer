"use client";
import { useEffect } from "react";
import Button from "@/components/Button";
import styles from "./styles.module.scss";
import Input from "@/components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "@/app/paths";
import { useSWR } from "@/hook/useSWR";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@/schemas/validateEditProfile";
import type { IGetSelfUser } from "@/app/api/get_self_user/types";
import type { IEditProfileProps } from "./types";

export default function EditProfile() {
  const { form, item } = styles;
  const { control, setValue, handleSubmit } = useForm<IEditProfileProps>({
    resolver: yupResolver(schema),
  });

  const { response } = useSWR<IGetSelfUser>(API.GET_SELF_USER);
  useEffect(() => {
    if (response) {
      setValue("name", response.name);
      setValue("email", response.email);
      setValue("avatar", response.avatar);
    }
  }, [response]);

  const onSubmit: SubmitHandler<IEditProfileProps> = async (data) => {
    console.log(data, response);
    const updatedData = { ...response, ...data };
  };

  return (
    <center>
      <form className={form} onSubmit={handleSubmit(onSubmit)}>
        <div className={item}>
          <label htmlFor="name">Name</label>
          <Input.Controlled control={control} name="name" id="name" />
        </div>
        <div className={item}>
          <label htmlFor="email">Email</label>
          <Input.Controlled control={control} name="email" id="email" />
        </div>
        <div className={item}>
          <label htmlFor="avatar">Avatar URL</label>
          <Input.Controlled control={control} name="avatar" id="avatar" />
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
