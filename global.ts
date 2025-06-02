import messages from "./messages/en.json";
export const locales = ["en", "fr"] as const;

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof messages;
  }
}
