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
    <div className="h-full w-full flex justify-center items-center min-h-[70vh]">
      <div className="w-1/3 flex flex-col gap-0">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold pb-2">
              {register ? "Register" : "Login"}
            </h1>
            <p>We`ll send you a magick link.</p>
          </div>
          <button
            className="bg-black text-white py-2 px-4 rounded-sm"
            onClick={handleChangeForm}
          >
            {register ? "Sign Up" : "Sign In"}
          </button>
        </div>
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
    </div>
  );
};

export default Page;
