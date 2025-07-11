import React from "react";
import SearchProducts from "./SearchProducts";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  closeMenu: (e: React.MouseEvent<HTMLElement>) => void;
}

const MobileNav: React.FC<Props> = ({ closeMenu }) => {
  const t = useTranslations("Header");

  const placeholder = t("Search");

  return (
    <nav
      className="absolute top-0 left-0 mt-15 h-screen w-full bg-white"
      id="mobile-menu"
      aria-label="Main mobile navigation menu"
      data-id="open-menu"
    >
      <div className="justify-between items-start pl-10 gap-12 flex flex-col pt-12">
        <SearchProducts placeholder={placeholder} />
        <ul className="flex flex-col gap-12 items-start" onClick={closeMenu}>
          <li>
            <Link data-id="mobile-shop-link" href="/shop">
              {t("Nav.shop")}
            </Link>
          </li>
          <li>
            <Link href="/stories">{t("Nav.stories")}</Link>
          </li>
          <li className="flex flex-col gap-2">
            <span>{t("Nav.promotions.title")}</span>
            <ul className="flex flex-col gap-3 capitalize text-xs">
              <li>
                <Link href="/promotions/eco-friendly">
                  {t("Nav.promotions.tag1")}
                </Link>
              </li>
              <li>
                <Link href="/promotions/vegan">{t("Nav.promotions.tag2")}</Link>
              </li>
              <li>
                <Link href="/promotions/new-arrival">
                  {t("Nav.promotions.tag3")}
                </Link>
              </li>
            </ul>
          </li>
          <li className="flex flex-col gap-2">
            <span>{t("Nav.rooms.title")}</span>
            <ul className="flex flex-col gap-3 capitalize text-xs">
              <li>
                <Link href="/rooms/kitchen">{t("Nav.rooms.tag1")}</Link>
              </li>
              <li>
                <Link href="/rooms/living-room">{t("Nav.rooms.tag2")}</Link>
              </li>
              <li>
                <Link href="/rooms/outdoors">{t("Nav.rooms.tag3")}</Link>
              </li>
              <li>
                <Link href="/rooms/furniture">{t("Nav.rooms.tag4")}</Link>
              </li>
            </ul>
          </li>
          <li className="flex flex-col gap-2">
            <span>{t("Nav.specials.title")}</span>
            <ul className="flex flex-col gap-3 text-xs">
              <li>
                <Link href="/specials/3-for-2">{t("Nav.specials.tag1")}</Link>
              </li>
              <li>
                <Link href="/specials/4-for-3">{t("Nav.specials.tag2")}</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNav;
