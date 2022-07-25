import React, { useMemo } from "react";
import { useCars } from "../api/cars";
import ModelCard from "../components/ModelCard";
import Select from "../components/Select";
import Spinner from "../components/Spinner";

const typeOptions = [
  { value: "All", label: "All" },
  { value: "Sedan", label: "Sedan" },
  { value: "Crossover", label: "Crossover" },
  { value: "SUV", label: "SUV" },
  { value: "Coupe", label: "Coupe" },
  { value: "Hatchback", label: "Hatchback" },
  { value: "Convertible", label: "Convertible" },
  { value: "Cabriolet", label: "Cabriolet" },
  { value: "Minivan", label: "Minivan" },
  { value: "Pickup", label: "Pickup" },
  { value: "Van", label: "Van" },
  { value: "Wagon", label: "Wagon" },
];

const Models = () => {
  const [selectedType, setSelectedType] = React.useState(typeOptions[0]);

  const { data: cars, isValidating } = useCars();

  const isLoading = useMemo(() => {
    return isValidating || !cars;
  }, [isValidating, cars]);

  const filterByValues = useMemo(
    () =>
      cars?.filter((car) => {
        if (selectedType.value === "All") {
          return car;
        }
        return car.type === selectedType.value;
      }),
    [cars, selectedType]
  );

  const availableCars = useMemo(
    () =>
      filterByValues?.filter(
        (car) =>
          car.image && car.status !== "rented" && car.status !== "reserved"
      ),
    [filterByValues]
  );

  return (
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-2xl font-semibold">Book your suitable car</h3>
      <div className="w-48 self-center mt-4">
        <Select
          options={typeOptions}
          value={selectedType}
          onChange={setSelectedType}
          optionsStyle="-bottom-64 text-gray-600"
        />
      </div>
      {isLoading ? (
        <div className="flex mt-10 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {availableCars?.map((car) => (
              <ModelCard key={car._id} {...car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Models;
