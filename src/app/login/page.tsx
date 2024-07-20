"use client";
import React, { useState } from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const formSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3030/users/${data.email}/login`,
        {
          password: data.password,
        }
      );
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputLabel htmlFor="email">Email:</InputLabel>
      <Input {...register("email")} />
      <InputLabel htmlFor="password">Password:</InputLabel>
      <Input {...register("password")} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginPage;
