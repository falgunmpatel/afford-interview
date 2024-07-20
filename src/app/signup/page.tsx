"use client";
import React, { useState } from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

interface SignupForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const signupFormSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { control, handleSubmit } = useForm<SignupForm>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    setError(false);
    setLoading(true);
    try {
      console.log(data);

      const response = await axios.post(`http://localhost:3030/signup`, data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-4xl mx-auto p-8"
    >
      <Controller
        name="firstname"
        control={control}
        render={({ field }) => (
          <div>
            <InputLabel htmlFor="email" className="w-full">
              First Name:
            </InputLabel>
            <Input id="firstname" {...field} />
          </div>
        )}
      />
      <Controller
        name="lastname"
        control={control}
        render={({ field }) => (
          <div>
            <InputLabel htmlFor="lastname">LastName:</InputLabel>
            <Input id="lastname" {...field} />
          </div>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <div>
            <InputLabel htmlFor="email">Email:</InputLabel>
            <Input id="email" {...field} />
          </div>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <div>
            <InputLabel htmlFor="password">Password:</InputLabel>
            <Input id="password" {...field} />
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignupPage;
