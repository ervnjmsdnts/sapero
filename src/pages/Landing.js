import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCars } from "../api/cars";
import ModelCard from "../components/ModelCard";

const Landing = () => {
  const { data: cars } = useCars();

  const availableCars = useMemo(
    () =>
      cars?.filter(
        (car) =>
          car.image && car.status !== "rented" && car.status !== "reserved"
      ),
    [cars]
  );

  const randomCars = useMemo(
    () => availableCars?.sort(() => Math.random() - 0.5).slice(0, 2),
    [availableCars]
  );

  return (
    <>
      <section className="flex h-[50vh] flex-col gap-4 items-center justify-center">
        <h3 className="font-bold text-center text-3xl">
          Easy and fastway to rent a car
        </h3>
        <p className="text-xl font-light">Don't Dream It. Drive It.</p>
        <Link
          to="/models"
          className="py-2 px-8 font-semibold mt-8 text-lg hover:bg-yellow-500 bg-yellow-600 rounded-full">
          Get Started
        </Link>
      </section>
      <section className="mx-4 my-6 md:mx-64">
        <h3 className="text-2xl text-center md:text-left font-semibold">
          Top Choices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-10 items-center">
          {randomCars?.map((car) => (
            <ModelCard key={car._id} {...car} isUse isLanding />
          ))}
        </div>
      </section>
    </>
  );
};

export default Landing;
