import React, { useState, useCallback } from "react";

type Option = {
  value: string;
  label: string;
};

type NoticePeriodSelectProps = {
  options: Option[];
  initialValue: number;
  initialUnit: string;
  onChange: (value: number, unit: string) => void;
};

export default function NoticePeriodSelect({
  options,
  initialValue,
  initialUnit,
  onChange,
}: NoticePeriodSelectProps) {
  const [value, setValue] = useState(initialValue);
  const [unit, setUnit] = useState(initialUnit);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (newValue: number, newUnit: string) => {
      onChange(newValue, newUnit);
    },
    [onChange],
  );

  const handleIncrement = () => {
    const newValue = value + 1;
    setValue(newValue);
    handleChange(newValue, unit);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, value - 1);
    setValue(newValue);
    handleChange(newValue, unit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
      handleChange(newValue, unit);
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    setIsOpen(false);
    handleChange(value, newUnit);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="h-10 max-w-24 rounded-md border border-slate-300 py-2 pl-2 pr-8 text-right focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
        />
        <div className="absolute bottom-0 right-1 top-0 flex flex-col justify-center">
          <button
            onClick={handleIncrement}
            className="text-slate-500 hover:text-slate-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down ml-2 size-3 rotate-180 text-slate-400"
              data-id="3"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          <button
            onClick={handleDecrement}
            className="text-slate-500 hover:text-slate-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down ml-2 size-3 text-slate-400"
              data-id="3"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex h-10 w-28 items-center justify-between rounded-md border border-slate-300 bg-white px-2 py-2 pl-4 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:ring-offset-slate-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === unit)?.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down ml-2 h-4 w-4 text-slate-400"
            data-id="3"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 z-20 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`${
                    option.value === unit
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-700"
                  } block w-full px-4 py-2 text-left text-sm hover:bg-slate-100 hover:text-slate-900`}
                  role="menuitem"
                  onClick={() => handleUnitChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
