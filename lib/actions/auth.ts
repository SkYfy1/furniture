"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const singOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = credentials;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Signin exists" };
  }
};

export const signUp = async (credentials: AuthCredentials) => {
  const { email, name, password } = credentials;

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
