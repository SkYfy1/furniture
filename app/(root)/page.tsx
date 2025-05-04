import CardSection from "@/components/CardSection";
import MotionList from "@/components/MotionList";
import Product from "@/components/Product";
import SaleOverview from "@/components/SaleOverview";
import { db } from "@/db/drizzle";
import { productsTable } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export default async function Home() {
  const plants = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, "Plants"));

  const outlet = await db
    .selectDistinctOn([productsTable.category])
    .from(productsTable)
    .where(
      or(
        eq(productsTable.category, "Plants"),
        eq(productsTable.category, "Flowers"),
        eq(productsTable.category, "Phones")
      )
    )
    .limit(5)
    .orderBy(productsTable.category);

  return (
    <div className="grid-cols-custom grid lg:gap-4 lg:gap-y-5 gap-1 lg:my-5">
      <SaleOverview />
      <CardSection />
      <section className="lg:pt-24 pt-20 col-start-2 col-end-5 h-full w-full flex-col flex gap-8">
        <div className="flex gap-2 flex-col">
          <h1 className="lg:text-3xl text-2xl font-bold">
            To Plant a Garden is To Believe in Tomorrow
          </h1>
          <p className="text-sm lg:text-base">
            Our plants are sure to brighten up your home (and your future).
          </p>
        </div>
        <MotionList>
          {plants.map((plant) => (
            <Product key={plant.id} data={plant} />
          ))}
        </MotionList>
      </section>
      <section className="w-full bg-green-50 pt-24 col-span-5 px-8 lg:px-0">
        <div className="container pb-10">
          <h1 className="text-3xl font-bold">Outlet</h1>
          <p>Enjoy discounts on the following:</p>
        </div>
        <div className="container">
          <MotionList className="gap-3 justify-start">
            {outlet.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </MotionList>
        </div>
      </section>
    </div>
  );
}
