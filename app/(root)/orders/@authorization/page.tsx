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
      <div className="lg:w-1/3 flex flex-col">
        <div className="mb-8 flex items-center justify-between gap-2">
          <div>
            <h1 className="md:text-2xl text-xl font-semibold pb-2">
              {register ? "Register" : "Login"}
            </h1>
            <p className="text-sm">We`ll send you a magick link.</p>
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
