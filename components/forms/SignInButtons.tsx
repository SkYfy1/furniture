import React from "react";
import { Button } from "../ui/Button";
import { signInGitHub, signInGoogle } from "@/lib/actions/auth";
import Image from "next/image";

export const GoogleSignInButton = () => {
  return (
    <Button className="bg-white text-black" onClick={signInGoogle}>
      <Image
        src="/main/google.png"
        width={20}
        height={20}
        alt="GitHub logo image"
      />
      Sign in with Google
    </Button>
  );
};

export const GitHubSignInButton = () => {
  return (
    <Button className="bg-white text-black" onClick={signInGitHub}>
      <Image
        src="/main/githublogo.png"
        width={20}
        height={20}
        alt="GitHub logo image"
      />
      Sign in with GitHub
    </Button>
  );
};
