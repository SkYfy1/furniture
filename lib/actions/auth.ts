"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import ratelimit from "../ratelimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const singOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = credentials;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-fast");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Invalid Credentials" };
  }
};

export const signUp = async (credentials: AuthCredentials) => {
  const { email, name, password } = credentials;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length > 0) {
    return { success: false, message: "User already exists!" };
  }

  const hashedPassword = await hash(password, 12);

  try {
    await db.insert(usersTable).values({
      email,
      name,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Signup exists" };
  }
};
