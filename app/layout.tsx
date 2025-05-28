import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import StoreProvider from "./StoreProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://furniture-pi-seven.vercel.app/"),
  title: {
    template: "FRNTR | %s ",
    default: "FRNTR",
  },
  description:
    "Furniture Store – Shop premium furniture, indoor plants, fresh flowers & the latest smartphones. Enjoy stylish home decor, fast delivery & competitive prices. Transform your space today!",
  icons: {
    icon: "/svg/lofofrntr.svg",
  },
  openGraph: {
    title: "Furniture Store",
    description: "Your one-stop shop for home and tech.",
    images: "/svg/lofofrntr.svg",
    url: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <StoreProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
