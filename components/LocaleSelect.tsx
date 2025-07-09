"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LocaleSelect = () => {
  const [locale, setLocale] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("FRNTR_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      // Get browser locale (not using bc my locale UA(Not implemented locale))
      // const browseLocale = navigator.language.slice(0, 2);

      setLocale("en");
      document.cookie = `FRNTR_LOCALE=en; path=/; SameSite=Lax; Secure;`;
      router.refresh();
    }
  }, [router]);

  const handleChangeLocale = (value: string) => {
    setLocale(value);
    document.cookie = `FRNTR_LOCALE=${value}; path=/; SameSite=Lax; Secure;`;
    router.refresh();
  };

  return (
    <>
      <label htmlFor="lang" className="sr-only">
        Select language
      </label>
      <select
        data-id="lang-select"
        name="lang"
        id="lang"
        value={locale}
        onChange={(e) => handleChangeLocale(e.target.value)}
        className="p-0.5 pr-2 border-2 rounded-sm"
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </>
  );
};

export default LocaleSelect;
