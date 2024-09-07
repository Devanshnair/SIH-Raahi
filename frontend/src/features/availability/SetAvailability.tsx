import { useState } from "react";
import { postAvailability } from "./methods/postAvailability";

export type Availability = {
  day: string;
  checked: boolean;
  startTime: string;
  endTime: string;
};

const SetAvailability = () => {
  const [availability, setAvailability] = useState<Availability[]>([
    { day: "Monday", checked: false, startTime: "", endTime: "" },
    { day: "Tuesday", checked: false, startTime: "", endTime: "" },
    { day: "Wednesday", checked: false, startTime: "", endTime: "" },
    { day: "Thursday", checked: false, startTime: "", endTime: "" },
    { day: "Friday", checked: false, startTime: "", endTime: "" },
    { day: "Saturday", checked: false, startTime: "", endTime: "" },
    { day: "Sunday", checked: false, startTime: "", endTime: "" },
  ]);

  function handleSubmit() {
    const fields = document.querySelectorAll("input[type=time]");
    const data: Availability[] = availability;

    for (let i = 0; i < fields.length; i += 2) {
      const from = fields[i] as HTMLInputElement;
      const to = fields[i + 1] as HTMLInputElement;
      const day = from.id.split("-")[0];
      const dayIndex = availability.findIndex((a) => a.day === day);

      if (dayIndex !== -1) {
        data[dayIndex] = {
          day,
          checked: availability[dayIndex].checked,
          startTime: availability[dayIndex].checked ? from.value : "",
          endTime: availability[dayIndex].checked ? to.value : "",
        };
      }
    }

    setAvailability(data);
    postAvailability(data);
  }

  return (
    <section className="min-h-screen bg-slate-100 p-16">
      <div className="mx-auto max-w-2xl">
        <h3 className="p-2 text-lg font-medium text-slate-800">
          Set Availability
        </h3>
        <div className="rounded-xl border-slate-200 bg-white p-6">
          <div className="flex w-full items-center justify-between">
            <h4 className="font-semibold text-slate-800">Default</h4>
            <button
              className="rounded-lg bg-slate-800 p-2 px-4 font-medium text-white shadow-sm"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          <div className="mt-8">
            {availability.map((dayAvailability) => (
              <DayAvailability
                dayAvailability={dayAvailability}
                setAvailability={setAvailability}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function DayAvailability({
  dayAvailability,
  setAvailability,
}: {
  dayAvailability: Availability;
  setAvailability: React.Dispatch<React.SetStateAction<Availability[]>>;
}) {
  return (
    <div
      key={dayAvailability.day}
      className="mt-4 flex min-h-10 items-start justify-between pb-2"
    >
      <div className="flex items-start gap-2">
        <input
          onChange={() =>
            setAvailability((prev) =>
              prev.map((day) =>
                day.day === dayAvailability.day
                  ? { ...day, checked: !day.checked }
                  : day,
              ),
            )
          }
          type="checkbox"
          id={`checkbox-${dayAvailability.day}`}
          className="peer relative mt-1 h-4 w-4 shrink-0 appearance-none rounded-sm border-2 border-slate-500 checked:border-0 checked:bg-slate-800"
        />
        <label
          htmlFor={`checkbox-${dayAvailability.day}`}
          className="ms-2 block font-medium text-slate-700"
        >
          {dayAvailability.day}
        </label>
        <svg
          className="pointer-events-none absolute ml-[2.25px] mt-[6.5px] hidden h-3 w-3 stroke-white peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      {dayAvailability.checked == true ? (
        <TimeRangeSelect day={dayAvailability.day} />
      ) : (
        <p className="font-medium text-slate-400">Not available</p>
      )}
    </div>
  );
}

function TimeRangeSelect({ day }: { day: string }) {
  const [addedRanges, setAddedRanges] = useState(0);
  return (
    <div className="-mt-[6px] grid gap-4">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <input
            id={`${day}-availability-from`}
            type="time"
            className="rounded-lg border-slate-200 bg-slate-50 p-2 px-4"
          />
          <span>to</span>
          <input
            id={`${day}-availability-to`}
            type="time"
            className="rounded-lg border-slate-200 bg-slate-50 p-2 px-4"
          />
        </div>
        <button
          className="ml-3 hidden fill-slate-800"
          onClick={() => setAddedRanges((prev) => prev + 1)}
        >
          <span className="sr-only">add range</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
          </svg>
        </button>
      </div>
      {[...Array(addedRanges)].map((_, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <input
              type="time"
              className="rounded-lg border-slate-200 bg-slate-50 p-2 px-4"
            />
            <span>to</span>
            <input
              type="time"
              className="rounded-lg border-slate-200 bg-slate-50 p-2 px-4"
            />
          </div>
          <button
            className="ml-3 flex items-center fill-slate-800"
            onClick={(e) => {
              console.log(e.target.closest("button").parentElement);
              e.target.closest("button").parentElement?.remove();
            }}
          >
            <span className="sr-only">remove</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 1 1-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 0 1-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0 1 22.62-22.62L256 233.37l52.69-52.68a16 16 0 0 1 22.62 22.62L278.63 256z"></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SetAvailability;
