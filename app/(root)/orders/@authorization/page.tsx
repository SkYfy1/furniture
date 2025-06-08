"use client";

import AuthForm from "@/components/forms/AuthForm";
import {
  GitHubSignInButton,
  GoogleSignInButton,
} from "@/components/forms/SignInButtons";
import { signInWithCredentials, signUp } from "@/lib/actions/auth";
import { signInSchema, signUpSchema } from "@/lib/validations";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Page = () => {
  const [register, setRegister] = useState(false);
  const t = useTranslations("OrdersPage.Auth");
  const handleChangeForm = () => {
    setRegister((prev) => !prev);
  };

  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center items-center min-h-[70vh]">
      <div className="lg:w-1/3 flex flex-col">
        <div className="mb-8 flex items-center justify-between gap-2">
          <div>
            <h1 className="md:text-2xl text-xl font-semibold pb-2">
              {register ? t("titles.signUp") : t("titles.login")}
            </h1>
            <p className="text-sm">{t("subTitle")}</p>
          </div>
          <button
            className="bg-black text-white py-2 px-4 rounded-sm cursor-pointer"
            onClick={handleChangeForm}
          >
            {register ? t("titles.login") : t("titles.signUp")}
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
          <>
            <AuthForm
              type="SIGN_IN"
              defaultValues={{ email: "", password: "" }}
              submitHandler={signInWithCredentials}
              schema={signInSchema}
            />
            <div className=" flex justify-center relative mt-4">
              <div className="w-full z- h-[1px] absolute bg-black left-0 top-1/2"></div>
              <div className="z-2 bg-white w-1/8 h-full text-center">or</div>
            </div>
            <div className=" flex flex-col gap-4 mt-4">
              <GoogleSignInButton />
              <GitHubSignInButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
