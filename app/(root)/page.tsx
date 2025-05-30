import CardSection from "@/components/CardSection";
import MotionList from "@/components/MotionList";
import Product from "@/components/Product";
import SaleOverview from "@/components/SaleOverview";
import {
  getOneProductFromThreeCategories,
  getProductsByCategory,
} from "@/lib/data/products";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const [plants, outlet] = await Promise.all([
    getProductsByCategory("Plants"),
    getOneProductFromThreeCategories(),
  ]);
  const t = await getTranslations("HomePage");

  return (
    <div className="grid-cols-custom grid lg:gap-4 lg:gap-y-5 gap-1 lg:my-5">
      <SaleOverview />
      <CardSection />
      <section className="lg:pt-24 pt-20 col-start-2 col-end-5 h-full w-full flex-col flex gap-8">
        <div className="flex gap-2 flex-col">
          <h1 className="lg:text-3xl text-2xl font-bold">
            {t("Slider.title")}
          </h1>
          <p className="text-sm lg:text-base">{t("Slider.subTitle")}</p>
        </div>
        <MotionList>
          {plants.map((plant) => (
            <Product
              name={plant.name}
              category={plant.category}
              key={plant.id}
              data={plant}
            />
          ))}
        </MotionList>
      </section>
      <section className="w-full bg-green-50 pt-24 col-span-5 px-8 lg:px-0">
        <div className="container pb-10">
          <h1 className="text-3xl font-bold">{t("Outlet.title")}</h1>
          <p>{t("Outlet.subTitle")}</p>
        </div>
        <div className="container">
          <MotionList className="gap-3 justify-start">
            {outlet.map((product) => (
              <Product
                name={product.name}
                category={product.category}
                key={product.id}
                data={product}
              />
            ))}
          </MotionList>
        </div>
      </section>
    </div>
  );
}
