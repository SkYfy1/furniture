import Image from "next/image";
import React from "react";

const CardSection = () => {
  // [grid-auto-rows:minmax(678px,_780px)]
  //   grid-rows-[678px_789px] auto-rows-[minmax(678px,_780px)]
  return (
    <>
      <div className="flex gap-4 flex-col lg:flex-row bg-orange col-start-2 col-end-5 pt-20 pl-10">
        <div className="lg:max-w-2/5 flex flex-col gap-3 pr-8 pb-10 lg:p-0">
          <h1 className="lg:text-5xl text-4xl font-bold">
            Time To Get Productive
          </h1>
          <p className="text-sm lg:w-2/3 lg:text-base">
            The first step in determining your ideal working hours is to figure
            out when your mind and body naturally work best.
          </p>
        </div>
        <Image
          src="/main/time-to-get-productive_4.jpeg"
          height={800}
          width={950}
          alt="laptop image"
        />
      </div>
      <div className="col-start-2 col-span-3 lg:col-end-2 min-h-full bg-green">
        <div className="flex flex-col gap-2 pb-8 pt-20 pl-10">
          <h1 className="text-2xl font-bold">
            Let Nature Into Your Living Room
          </h1>
          <p className="text-sm lg:text-base">
            Choose from a wide variety of plants that add life and style to any
            space.
          </p>
        </div>
        <Image
          className="pl-10"
          src="/main/time-to-get-productive_4.jpeg"
          height={500}
          width={500}
          alt="laptop image"
        />
      </div>
      <div className="lg:col-start-3 col-start-2 lg:col-end-3 col-span-3 min-h-full bg-olive pl-10 pt-15 lg:pl-0 lg:pt-0 flex flex-col rounded-md border border-transparent hover:border-black cursor-pointer">
        <div className="flex flex-col gap-2 lg:pt-20 lg:pl-10 pr-10 lg:pr-0">
          <h1 className="lg:text-2xl text-xl font-bold">
            Japandi Interior Design Stylee
          </h1>
          <p className="text-sm lg:text-base">
            Japandi interior design is a hybrid of east and west. The style is
            increasingly popular, and it is here to stay. The style creates
            interiors that are minimal without being cold...
          </p>
        </div>
        <Image
          className="lg:pt-16 pt-6 h-full lg:pl-10"
          src="/main/chairs-rug_4.jpeg"
          height={500}
          width={500}
          alt="chairs"
        />
      </div>
      <div className="lg:col-start-4 col-start-2 col-span-3 lg:col-end-4 min-h-full bg-olive flex flex-col  rounded-md border border-transparent hover:border-black cursor-pointer">
        <div className="flex flex-col gap-2 pb-6 pt-15 px-8 lg:pt-20 lg:pl-10">
          <h1 className="text-2xl font-bold">Plant Starter Pack</h1>
          <p className="text-sm lg:text-base">
            How do you pull off multiple plants in a single space? Read about
            our favorite design tricks.
          </p>
        </div>
        <Image
          className="h-full w-full"
          src="/main/plant-starter-pack_4.jpeg"
          height={500}
          width={500}
          alt="plant"
        />
      </div>
    </>
  );
};

export default CardSection;
