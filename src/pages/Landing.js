import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCars } from "../api/cars";
import ModelCard from "../components/ModelCard";
import { IoRocketSharp } from "react-icons/io5";
import { MdShareLocation } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa";
import LandingCard from "../components/LandingCard";
import Testimonial from "../components/Testimonial";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "../components/Footer";

const whyChooseSapero = [
  {
    title: "Easy and Fast",
    Icon: IoRocketSharp,
    isUp: false,
  },
  {
    title: "Many Pickup Locations",
    Icon: MdShareLocation,
    isUp: true,
  },
  {
    title: "Satisfied Customers",
    Icon: FaPeopleArrows,
    isUp: false,
  },
];

const testimonials = [
  {
    name: "John Doe",
    title: "CEO",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit aliquam etiam erat velit scelerisque in dictum.",
    image: "https://picsum.photos/200",
  },
  {
    name: "Jane Doe",
    title: "CEO",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla aliquet enim tortor at auctor urna.",
    image: "https://picsum.photos/200",
  },
  {
    name: "Rabbit Doe",
    title: "CEO",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum.",
    image: "https://picsum.photos/200",
  },
];

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
    () => availableCars?.sort(() => Math.random() - 0.5).slice(0, 3),
    [availableCars]
  );

  return (
    <>
      <div className="my-8">
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
          <h3 className="text-2xl text-center font-semibold">Top Choices</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-10 items-center">
            {randomCars?.map((car) => (
              <ModelCard key={car._id} {...car} isUse isLanding />
            ))}
          </div>
        </section>
        <section className="mx-4 mt-32 md:mx-64">
          <h3 className="text-2xl text-center font-semibold">
            Why choose Sapero?
          </h3>
          <div className="flex justify-center flex-wrap gap-4 mt-24">
            {whyChooseSapero.map((item) => (
              <LandingCard key={item.title} {...item} />
            ))}
          </div>
        </section>
        <section className="mx-4 mt-32 md:mx-64">
          <h3 className="text-2xl text-center font-semibold">
            What people are saying
          </h3>
          <Carousel showStatus={false} emulateTouch>
            {testimonials.map((item) => (
              <div className="flex justify-center mx-2 items-start flex-wrap gap-4 mt-16">
                <Testimonial key={item.name} {...item} />
              </div>
            ))}
          </Carousel>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
