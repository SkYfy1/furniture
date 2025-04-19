import CardSection from "@/components/CardSection";
import Product from "@/components/Product";
import SaleOverview from "@/components/SaleOverview";

export default function Home() {
  return (
    <>
      <SaleOverview />
      <CardSection />
      <section className="pt-24 col-start-2 col-end-5 h-full w-full flex-col flex gap-8">
        <div className="flex gap-2 flex-col">
          <h1 className="text-3xl font-bold">
            To Plant a Garden is To Believe in Tomorrow
          </h1>
          <p>Our plants are sure to brighten up your home (and your future).</p>
        </div>
        <div className="flex gap-3 w-full justify-between">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </section>
      <section className="w-full bg-green-50 pt-24 col-span-5">
        <div className="container pb-10">
          <h1 className="text-3xl font-bold">Outlet</h1>
          <p>Enjoy discounts on the following:</p>
        </div>
        <div className="flex gap-3 w-full container">
          <Product />
          <Product />
          <Product />
        </div>
      </section>
    </>
  );
}
