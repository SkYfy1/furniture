"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials, signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React, { useState } from "react";

const Page = () => {
  const [register, setRegister] = useState(true);
  const handleChangeForm = () => {
    setRegister((prev) => !prev);
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center min-h-[70vh]">
      <button onClick={handleChangeForm}>
        {register ? "Register form" : "Login Form"}
      </button>
      {register ? (
        <AuthForm
          type="SIGN_UP"
          defaultValues={{ name: "", email: "", password: "" }}
          submitHandler={signUp}
          schema={signUpSchema}
        />
      ) : (
        <AuthForm
          type="SIGN_IN"
          defaultValues={{ email: "", password: "" }}
          submitHandler={signInWithCredentials}
          schema={signUpSchema}
        />
      )}
    </div>
  );
};

export default Page;
