import { useState, useRef, useEffect } from "react";

type Option = string;

type CustomSelectProps = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function CustomSelect({
  options,
  value = "",
  onChange,
  placeholder = "Select an option",
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option === value);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? selectedOption : placeholder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-chevron-down ml-2 h-4 w-4 text-gray-400"
          data-id="3"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <input
            ref={inputRef}
            type="text"
            className="w-full rounded-t-md border-b border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
            placeholder="Search options..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul
            className="max-h-60 overflow-auto py-1 text-base focus:outline-none sm:text-sm"
            role="listbox"
          >
            {filteredOptions.map((option) => (
              <li
                key={option}
                className={`relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-slate-100 ${
                  value === option ? "bg-slate-50" : ""
                }`}
                role="option"
                aria-selected={value === option}
                onClick={() => handleSelectOption(option)}
              >
                <span className="block truncate">{option}</span>
                {value === option && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600">
                    {/* <Check className="h-5 w-5" aria-hidden="true" /> */}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
