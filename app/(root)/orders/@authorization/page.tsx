"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials, signUp } from "@/lib/actions/auth";
import { signInSchema, signUpSchema } from "@/lib/validations";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Page = () => {
  const [register, setRegister] = useState(true);
  const t = useTranslations("OrdersPage.Auth");
  const handleChangeForm = () => {
    setRegister((prev) => !prev);
  };

  return (
    <div className="h-full w-full flex justify-center items-center min-h-[70vh]">
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
          <AuthForm
            type="SIGN_IN"
            defaultValues={{ email: "", password: "" }}
            submitHandler={signInWithCredentials}
            schema={signInSchema}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
