import CardSection from "@/components/CardSection";
import MotionList from "@/components/MotionList";
import Product from "@/components/Product";
import SaleOverview from "@/components/SaleOverview";

export default function Home() {
  return (
    <div className="grid-cols-custom grid gap-5 gap-y-5 my-5">
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
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </MotionList>
      </section>
      <section className="w-full bg-green-50 pt-24 col-span-5 px-8 lg:px-0">
        <div className="container pb-10">
          <h1 className="text-3xl font-bold">Outlet</h1>
          <p>Enjoy discounts on the following:</p>
        </div>
        <div className="container">
          <MotionList className="gap-3 justify-start">
            <Product />
            <Product />
            <Product />
          </MotionList>
        </div>
      </section>
    </div>
  );
}
