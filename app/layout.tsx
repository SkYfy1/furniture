import { Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import StoreProvider from "./StoreProvider";
import { getLocale, getMessages } from "next-intl/server";
import { Messages, NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const t: Messages = await getMessages();

  const title = t.TabTitles.Main;

  return {
    metadataBase: new URL("https://furniture-pi-seven.vercel.app/"),
    title: {
      template: `${title} | %s `,
      default: `${title}`,
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${montserrat.className} antialiased`}>
        <StoreProvider>
          <SessionProvider session={session}>
            <NextIntlClientProvider>
              {children}
              <Analytics />
            </NextIntlClientProvider>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
