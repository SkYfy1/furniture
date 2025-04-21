import Filters from "@/components/Filters";
import React from "react";

interface Props {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ min: string; max: string; orderBy: string }>;
}

const Page: React.FC<Props> = async ({ params, searchParams }) => {
  const type = (await params).type;
  const filters = await searchParams;

  console.log(filters);
  return (
    <>
      <div className="container px-4 capitalize mb-10">
        <h2 className="text-3xl font-bold py-3.5">{type}</h2>
        <p className="mb-10">{type}</p>
        <Filters />
      </div>
    </>
  );
};

export default Page;
