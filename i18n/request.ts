import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookiesLoc = (await cookies()).get("FRNTR_LOCALE")?.value;
  const locale = (cookiesLoc ?? "en") as supportedLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
