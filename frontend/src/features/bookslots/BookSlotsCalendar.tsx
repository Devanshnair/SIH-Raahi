import {
  add,
  eachDayOfInterval,
  format,
  startOfDay,
  startOfToday,
} from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { fetchWeeklySlots } from "./methods/fetchWeeklySlots";

type slot = {
  start: string;
  end: string;
};

type weekSlotsType = {
  startTime: string;
  endTime: string;
  day: string;
  slots: slot[];
  date: string;
};

type selectedSlotsType = {
  day: string;
  slot: slot | null;
};

const useWeeklySlots = (id: string) => {
  return useQuery({
    queryKey: ["weeklySlots"],
    queryFn: () => fetchWeeklySlots(id),
  });
};

export default function BookSlotsCalendar({ mentorId }: { mentorId: string }) {
  const [weekSlots, setWeekSlots] = useState<weekSlotsType[]>();

  console.log(weekSlots);

  const { data, isLoading, error } = useWeeklySlots(mentorId);

  useEffect(() => {
    if (data) {
      setWeekSlots(data);
    }
  }, [data]);

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

  console.log(selectedDay);

  const clickedPrevCount = useRef(0);
  const clickedNextCount = useRef(0);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div className="h-full w-full max-w-xl rounded-3xl bg-white p-1">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-xl font-semibold text-slate-900">
            {format(currentWeek[0], "MMMM yyyy")}
          </h2>
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                if (clickedPrevCount.current < 0) return;
                previousWeek();
                clickedPrevCount.current = clickedPrevCount.current - 1;
                clickedNextCount.current = clickedNextCount.current - 1;
              }}
              disabled={clickedPrevCount.current == 0}
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
                if (clickedNextCount.current >= 1) return;
                nextWeek();
                clickedNextCount.current = clickedNextCount.current + 1;
                clickedPrevCount.current = clickedPrevCount.current + 1;
              }}
              disabled={clickedNextCount.current == 7}
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
        <div className="grid grid-cols-7 border-b border-slate-200 pb-5 pt-1">
          {currentWeek.map((day) => (
            <div
              key={format(day, "yyyy-mm-dd")}
              className="grid place-items-center"
            >
              <p className="text-sm font-medium text-slate-400">
                {format(day, "EEE")}
              </p>
              <button
                className="pt-2 font-semibold text-slate-700"
                onClick={() => {
                  setSelectedDay(currentWeek.find((d) => d === day) ?? today);
                }}
              >
                <span
                  className={`${day.toDateString() == new Date(selectedDay).toDateString() && "rounded-[50%] bg-slate-800 text-white"} size-7 p-[7px]`}
                >
                  {format(day, "dd")}
                </span>
              </button>
            </div>
          ))}
        </div>
        <div className="mx-auto grid max-h-[370px] max-w-full grid-cols-3 place-items-center justify-center gap-3 overflow-y-auto px-6 py-8">
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
        <div className="mx-auto flex max-w-[530px] justify-center pb-6 max-md:mx-6">
          <button className="w-full rounded-full bg-slate-900 p-2 font-medium text-white">
            Book
          </button>
        </div>
      </div>
    </>
  );
}
