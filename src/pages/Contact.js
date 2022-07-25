import React from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

import Profile1 from "../assets/images/profile1.png";
import Profile2 from "../assets/images/profile2.jpg";
import Profile3 from "../assets/images/profile3.jpg";
import Portfolio from "../components/Portfolio";

const profiles = [
  {
    isRight: false,
    image: Profile1,
    firstName: "Antonette",
    lastName: "Peliño",
    urls: [
      "https://www.linkedin.com/in/antonette-peli%C3%B1o-118a36209/",
      "https://github.com/Antonettee",
      "https://www.facebook.com/AntonetteTheBoss",
    ],
    description: "Lorem ipsum",
  },
  {
    isRight: true,
    image: Profile2,
    firstName: "Wayne Jaspher",
    lastName: "Rosillo",
    urls: [
      "https://www.linkedin.com/in/wayne-jaspher-rosillo-788119246/",
      "https://github.com",
      "https://www.facebook.com/waynot02",
    ],
    description:
      "I am a Front-End Web Developer specializing in designing websites. I gain experience on every project that we do on Kodego Bootcamp, especially with the people that I get to work with. Like anime characters, they gain their strength by getting inspired by their colleagues.",
    portfolioLink: "https://naofumish02.github.io/portfolio/index.html#Profile",
  },
  {
    isRight: false,
    image: Profile3,
    firstName: "Charlene",
    lastName: "Saez",
    urls: [
      "https://www.linkedin.com/in/charlene-saez-b39469245/",
      "https://github.com/ChrlnSaez",
      "https://www.facebook.com/charlene.saez.3",
    ],
    description:
      "Lorem ipsum hfiuewahfieouw fheowiapuhfeiuwao hfiouwea iuehowa fheiuwoa hfiuweoa hfiuweoah fiuoweah iouwa hfiuowea hfeiwoa hoaei",
  },
];

const Contact = () => {
  return (
    <div className="py-8">
      <section className="flex flex-col justify-center items-center gap-8 mt-10">
        <div className="flex flex-col text-2xl text-center font-semibold text-white">
          <h3>Love to hear from you,</h3>
          <h3>Get in touch</h3>
        </div>
        <div className="flex flex-col h-full md:flex-row items-start gap-4">
          <div className="flex flex-col gap-4">
            <Input
              className="w-72"
              label="Name"
              placeholder="Enter your name..."
            />
            <Input
              className="w-72"
              label="Email"
              placeholder="Enter your email..."
            />
          </div>
          <TextArea
            className="w-72 h-32"
            label="Message"
            placeholder="Enter your message..."
          />
        </div>
        <button className="py-2 px-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-full font-semibold">
          Send message
        </button>
      </section>
      <section className="flex flex-col items-center gap-8 mt-20">
        <h3 className="text-2xl font-semibold text-white">
          Lovely to meet our team
        </h3>
        <div className="flex flex-col gap-12">
          {profiles.map((profile) => (
            <Portfolio
              key={profile.firstName}
              isRight={profile.isRight}
              image={profile.image}
              firstName={profile.firstName}
              lastName={profile.lastName}
              urls={profile.urls}
              description={profile.description}
              portfolioLink={profile.portfolioLink}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
