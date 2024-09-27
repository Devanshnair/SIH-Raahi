import {
  add,
  eachDayOfInterval,
  format,
  startOfDay,
  startOfToday,
} from "date-fns";
import { useRef, useState } from "react";
import { weekSlotsType } from "./methods/fetchWeeklySlots";
import { Link } from "react-router-dom";

type slot = {
  start: string;
  end: string;
};

type selectedSlotsType = {
  day: string;
  slot: slot;
};

export default function BookSlotsCalendar({
  weekSlots,
}: {
  weekSlots: weekSlotsType[];
}) {
  const [selectedSlots, setSelectedSlots] = useState<selectedSlotsType>();
  const today = startOfToday();

  const [selectedDay, setSelectedDay] = useState(today);

  const [currentWeek, setCurrentWeek] = useState(
    eachDayOfInterval({
      start: startOfDay(selectedDay),
      end: add(startOfDay(selectedDay), { days: 6 }),
    }),
  );

  function previousWeek() {
    const previousWeekStart = add(currentWeek[0], { days: -7 });
    const previousWeekEnd = add(currentWeek[0], { days: -1 });
    const previousWeek = eachDayOfInterval({
      start: previousWeekStart,
      end: previousWeekEnd,
    });
    setCurrentWeek(previousWeek);
  }

  function nextWeek() {
    const nextWeekStart = add(currentWeek[6], { days: 1 });
    const nextWeekEnd = add(currentWeek[6], { days: 7 });
    const nextWeek = eachDayOfInterval({
      start: nextWeekStart,
      end: nextWeekEnd,
    });
    setCurrentWeek(nextWeek);
  }

  const clickedCount = useRef(0);

  return (
    <>
      <div className="mx-auto h-full w-full max-w-xl self-center rounded-3xl bg-white p-1 shadow-sm">
        <div className="flex items-center justify-between p-6 pb-4 max-xs:px-3">
          <h2 className="text-xl font-semibold text-slate-900">
            {format(currentWeek[0], "MMMM yyyy")}
          </h2>
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                if (clickedCount.current <= 0) return;
                previousWeek();
                clickedCount.current = clickedCount.current - 1;
              }}
              disabled={clickedCount.current == 0}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <div className="size-6" aria-hidden="true">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.4806 15.9941C13.8398 15.6529 13.8398 15.0998 13.4806 14.7586L8.47062 10L13.4806 5.24142C13.8398 4.90024 13.8398 4.34707 13.4806 4.00589C13.1214 3.66471 12.539 3.66471 12.1798 4.00589L6.51941 9.38223C6.1602 9.72342 6.1602 10.2766 6.51941 10.6178L12.1798 15.9941C12.539 16.3353 13.1214 16.3353 13.4806 15.9941Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                if (clickedCount.current >= 7) return;
                nextWeek();
                clickedCount.current = clickedCount.current + 1;
              }}
              disabled={clickedCount.current == 7}
              className="-my-1.5 -mr-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <div className="size-6" aria-hidden="true">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.51941 15.9941C6.1602 15.6529 6.1602 15.0998 6.51941 14.7586L11.5294 10L6.51941 5.24142C6.1602 4.90024 6.1602 4.34707 6.51941 4.00589C6.87862 3.66471 7.46101 3.66471 7.82022 4.00589L13.4806 9.38223C13.8398 9.72342 13.8398 10.2766 13.4806 10.6178L7.82022 15.9941C7.46101 16.3353 6.87862 16.3353 6.51941 15.9941Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-slate-200 pb-5 pt-3">
          {currentWeek.map((day) => (
            <div
              key={format(day, "yyyy-mm-dd")}
              className="grid place-items-center"
            >
              <p className="text-sm font-medium text-slate-400">
                {format(day, "EEE")}
              </p>
              <button
                className="pt-1 font-semibold text-slate-700"
                onClick={() => {
                  setSelectedDay(currentWeek.find((d) => d === day) ?? today);
                }}
              >
                <span
                  className={`${day.toDateString() == new Date(selectedDay).toDateString() && "bg-slate-800 text-white"} grid size-8 place-items-center rounded-[50%]`}
                >
                  {format(day, "dd")}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="@container">
          <div className="mx-auto grid h-[270px] max-w-full grid-cols-2 place-content-start justify-center gap-3 overflow-y-auto px-6 py-8 @md:grid-cols-3">
            {(weekSlots?.find((d) => d.day == format(selectedDay, "EEEE"))
              ?.slots ?? false) ? (
              weekSlots
                ?.find((d) => d.day == format(selectedDay, "EEEE"))
                ?.slots.map((slot) => {
                  return (
                    <button
                      onClick={() =>
                        setSelectedSlots({
                          day: format(selectedDay, "EEEE"),
                          slot: slot,
                        })
                      }
                      key={slot.start + slot.end}
                      className={`flex w-full min-w-max place-content-center items-center gap-2 rounded-xl border p-1 py-4 leading-6 ${selectedSlots?.slot == slot ? "border-slate-700 text-slate-700" : "border-slate-200 text-slate-400"} `}
                    >
                      <time dateTime={slot.start} className="font-medium">
                        {format(slot.start, "hh:mm")}
                      </time>
                      <span>-</span>
                      <time dateTime={slot.end} className="font-medium">
                        {format(slot.end, "hh:mm")}
                      </time>
                    </button>
                  );
                })
            ) : (
              <div className="place col-span-3 grid items-center text-center text-slate-400">
                No slots available
              </div>
            )}
          </div>
        </div>
        <div className="mx-6 flex max-w-[530px] justify-center pb-6 max-md:mx-6">
          <Link
            className="w-full rounded-full bg-slate-900 p-2 text-center font-medium text-white"
            to="/mentor/success"
          >
            Book
          </Link>
        </div>
      </div>
      {/* {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="scale-100 transform rounded-lg bg-white p-8 opacity-100 shadow-lg transition-all duration-300 ease-in-out">
            <div className="mb-4 text-2xl font-bold text-green-600">
              Booked Successfully! 🎉
            </div>
            <p className="text-gray-600">Your slot has been reserved.</p>
            <div className="mt-4 text-sm text-gray-500">
              This message will disappear in a few seconds...
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
