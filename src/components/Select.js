import { Listbox } from "@headlessui/react";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";

const Select = ({
  options,
  value,
  onChange,
  label,
  className,
  optionsStyle = "-top-32",
}) => {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && <label className="font-semibold">{label}</label>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative w-full">
          <Listbox.Button
            className={
              "w-full rounded-lg border border-primary py-2 px-4 text-black50 focus:outline-yellow-600"
            }>
            <span className="block truncate text-left">{value.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AiFillCaretDown className="text-lg" />
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={`absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${optionsStyle}`}>
            {options.map((option, index) => {
              return (
                <Listbox.Option
                  key={index}
                  value={option}
                  className="group relative select-none py-2 px-8 pl-8 text-sm hover:bg-yellow-500 cursor-pointer hover:text-white">
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-yellow-600 group-hover:text-white">
                          <BsCheck className="text-lg" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
