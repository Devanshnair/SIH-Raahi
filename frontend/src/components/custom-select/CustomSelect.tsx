import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  selectedOption: Option;
  onChange: (option: Option) => void;
};

const CustomSelect = ({
  options,
  selectedOption,
  onChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border bg-white px-4 py-2 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        {selectedOption ? selectedOption.label : "Select an option"}
        <span className="float-right">&#9662;</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selectedOption.value === option.value
                  ? "bg-orange-100 font-bold"
                  : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
