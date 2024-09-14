import {
  add,
  endOfDay,
  format,
  interval,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfToday,
} from "date-fns";

import { Events } from "../modifyEvents";
import { useEffect, useMemo, useRef } from "react";
import EventSticker from "../EventSticker";

const TimeSlotsWidth = "75px";
const CellsHeight = "120px";

type DaysViewProps = {
  days: Date[];
  events: Events;
  setEvents: React.Dispatch<React.SetStateAction<Events>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DaysView = ({
  days,
  events,
  setEvents,
  setModalIsOpen,
  setUpdateModalIsOpen,
}: DaysViewProps) => {
  const today = startOfToday();
  const currentDays = interval(days[0], endOfDay(days[days.length - 1]));
  const currentDaysEvents = useMemo(
    () =>
      events.filter((event) =>
        isWithinInterval(event.startDateTime, currentDays),
      ),
    [events, currentDays],
  );

  const currentHourRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calendarHasScrolled = sessionStorage.getItem("calendarHasScrolled");

    const scrollToCurrentHour = () => {
      if (currentHourRef.current) {
        currentHourRef.current.scrollIntoView({ behavior: "smooth" });
      }
      console.log(currentHourRef.current);
    };
    if (!calendarHasScrolled) {
      scrollToCurrentHour();
      sessionStorage.setItem("calendarHasScrolled", "true");
    }
  }, []);

  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  return (
    <>
      <div className="overflow-clip rounded-t-2xl border border-slate-200 bg-slate-50">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `${TimeSlotsWidth} repeat(${days.length}, 1fr)`,
          }}
          className="sticky top-0 z-10 border-b border-gray-200 bg-slate-50 py-2"
        >
          <div></div>
          {/* DayCells  */}
          {days.map((day) => (
            <div
              key={format(day, "dd-mm-yy")}
              className="flex items-center justify-center p-2 text-slate-400"
            >
              {days.length == 1 ? format(day, "EEEE") : format(day, "EEE")}
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={`${isSameDay(day, today) ? "ml-1 bg-slate-700 text-white" : "text-slate-700"} flex size-7 items-center justify-center rounded-[50%]`}
              >
                {format(day, "dd")}
              </time>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateAreas: `
              "timeSlots buffer"
              "timeSlots cells"
            `,
            gridTemplateColumns: `${TimeSlotsWidth} 1fr`,
            overflowY: "auto",
            overscrollBehavior: "contain",
            scrollBehavior: "smooth",
            scrollPadding: "2.5rem",
            height: "calc(100vh - 8.725rem)",
          }}
          className="no-scrollbar"
        >
          <div
            style={{
              gridArea: "timeSlots",
              display: "grid",
              gridTemplateRows: `repeat(48,60px)`,
              alignItems: "center",
            }}
          >
            {/* TimeSlots */}
            {[
              "12 AM",
              "1 AM",
              "2 AM",
              "3 AM",
              "4 AM",
              "5 AM",
              "6 AM",
              "7 AM",
              "8 AM",
              "9 AM",
              "10 AM",
              "11 AM",
              "12 PM",
              "1 PM",
              "2 PM",
              "3 PM",
              "4 PM",
              "5 PM",
              "6 PM",
              "7 PM",
              "8 PM",
              "9 PM",
              "10 PM",
              "11 PM",
            ].map((time) => (
              <time
                dateTime={time}
                key={time}
                className="row-span-2 flex justify-end self-start p-3 text-sm text-slate-400"
              >
                {time}
              </time>
            ))}
          </div>
          <div
            style={{ gridArea: "buffer", height: "23px" }}
            className="grid grid-flow-col"
          >
            {[...Array(days.length)].map((_, index) => (
              <div
                key={index}
                className="relative h-full border-b border-l border-slate-200 bg-slate-100/90"
              >
                <span className="absolute h-full w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    <defs>
                      <pattern
                        id="pattern_LotO"
                        patternUnits="userSpaceOnUse"
                        width="15"
                        height="15"
                        patternTransform="rotate(45)"
                      >
                        <line
                          x1="0"
                          y="0"
                          x2="0"
                          y2="15"
                          stroke="#94a3b833"
                          stroke-width="2"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#pattern_LotO)"
                      opacity="1"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "relative",
              display: "grid",
              gridArea: "cells",
              gridTemplateRows: `repeat(24, ${CellsHeight})`,
              gridAutoFlow: "column",
            }}
          >
            {[...Array(days.length * 24)].map((_, index) => {
              function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
                const elem = e.target as HTMLElement;
                let { time } = elem.dataset;

                if (!time) {
                  time = new Date().toISOString();
                  return;
                }

                const date = Math.max(
                  new Date(time).getTime(),
                  new Date().getTime(),
                );

                (
                  document.querySelector("#startDateTime")! as HTMLInputElement
                ).value = format(new Date(date), "yyyy-MM-dd'T'HH:mm");
                (
                  document.querySelector("#endDateTime")! as HTMLInputElement
                ).value = format(
                  add(new Date(date), { minutes: 15 }),
                  "yyyy-MM-dd'T'HH:mm",
                );
                (
                  document.querySelector("#endDateTime")! as HTMLInputElement
                ).min = format(
                  add(new Date(date), { minutes: 15 }),
                  "yyyy-MM-dd'T'HH:mm",
                );

                setModalIsOpen(true);
              }
              return (
                <div
                  key={add(days[0], { hours: index }).toISOString()}
                  className="grid h-full grid-rows-2 border-b border-l border-slate-200"
                >
                  {isBefore(add(days[0], { hours: index }), new Date()) ? (
                    <div className="relative grid grid-rows-2 bg-slate-100/90">
                      <span className="absolute h-full w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                        >
                          <defs>
                            <pattern
                              id="pattern_LotO"
                              patternUnits="userSpaceOnUse"
                              width="15"
                              height="15"
                              patternTransform="rotate(45)"
                            >
                              <line
                                x1="0"
                                y="0"
                                x2="0"
                                y2="15"
                                stroke="#94A3B8"
                                stroke-width="2"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="100%"
                            height="100%"
                            fill="url(#pattern_LotO)"
                            opacity="1"
                          />
                        </svg>
                      </span>
                      <span
                        data-time={add(days[0], { hours: index, minutes: 0 })}
                      ></span>
                      <span
                        className="border-b border-dashed border-slate-200"
                        data-time={add(days[0], { hours: index, minutes: 15 })}
                      ></span>
                    </div>
                  ) : (
                    <div className={`grid grid-rows-2`}>
                      <span
                        data-time={add(days[0], { hours: index, minutes: 0 })}
                        onClick={(e) => handleClick(e)}
                      ></span>
                      <span
                        className="border-b border-dashed border-slate-200"
                        data-time={add(days[0], { hours: index, minutes: 15 })}
                        onClick={(e) => handleClick(e)}
                      ></span>
                    </div>
                  )}
                  {isBefore(
                    add(days[0], { hours: index, minutes: 60 }),
                    new Date(),
                  ) ? (
                    <div className="relative grid grid-rows-2 bg-slate-100/90">
                      <span className="absolute h-full w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                        >
                          <defs>
                            <pattern
                              id="pattern_LotO"
                              patternUnits="userSpaceOnUse"
                              width="15"
                              height="15"
                              patternTransform="rotate(45)"
                            >
                              <line
                                x1="0"
                                y="0"
                                x2="0"
                                y2="15"
                                stroke="#fca5a5"
                                stroke-width="2"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width="100%"
                            height="100%"
                            fill="url(#pattern_LotO)"
                            opacity="1"
                          />
                        </svg>
                      </span>
                      <span
                        data-time={add(days[0], { hours: index, minutes: 30 })}
                      ></span>
                      <span
                        data-time={add(days[0], { hours: index, minutes: 45 })}
                      ></span>
                    </div>
                  ) : (
                    <div className={`grid grid-rows-2`}>
                      <span
                        data-time={add(days[0], { hours: index, minutes: 30 })}
                        onClick={(e) => handleClick(e)}
                      ></span>
                      <span
                        ref={
                          add(days[0], { hours: index }).getDay() ==
                            currentDay &&
                          currentHour ==
                            add(days[0], { hours: index }).getHours()
                            ? currentHourRef
                            : null
                        }
                        data-time={add(days[0], { hours: index, minutes: 45 })}
                        onClick={(e) => handleClick(e)}
                      ></span>
                    </div>
                  )}
                </div>
              );
            })}

            {currentDaysEvents.map((event) => {
              return (
                <EventSticker
                  days={days}
                  event={event}
                  events={events}
                  setEvents={setEvents}
                  setUpdateModalIsOpen={setUpdateModalIsOpen}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DaysView;
