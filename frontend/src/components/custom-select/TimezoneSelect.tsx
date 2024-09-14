import { useState, useRef, useEffect } from "react";

export default function TimezoneSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTimezones = timezones.filter((tz) =>
    tz.toLowerCase().includes(search.toLowerCase()),
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

  const handleSelectTimezone = (timezone: string) => {
    setSelectedTimezone(timezone);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedTimezone || "Select timezone"}
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
            className="w-full rounded-t-md border-b border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Search timezones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul
            className="max-h-60 overflow-auto py-1 text-base focus:outline-none sm:text-sm"
            role="listbox"
          >
            {filteredTimezones.map((timezone) => (
              <li
                key={timezone}
                className={`relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-slate-50 ${
                  selectedTimezone === timezone ? "bg-slate-100" : ""
                }`}
                role="option"
                aria-selected={selectedTimezone === timezone}
                onClick={() => handleSelectTimezone(timezone)}
              >
                <span className="block truncate">{timezone}</span>
                {selectedTimezone === timezone && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
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
