import { useEffect, useMemo, useRef, useState } from "react";
import ScheduleModal from "./modals/ScheduleModal";
import {
  add,
  eachDayOfInterval,
  endOfISOWeek,
  format,
  startOfISOWeek,
  startOfToday,
} from "date-fns";
import Calendar from "./Calendar";
import DaysView from "./Views/DaysView";
import { Events } from "./modifyEvents";
import QuickView from "./Views/QuickView";
import UpdateScheduleModal from "./modals/UpdateScheduleModal";
import UploadModal from "./modals/UploadModal";
import { useEvents } from "./methods/fetchEvents";

const CalendarView = () => {
  const { data, isLoading, error, isError } = useEvents();

  const [events, setEvents] = useState<Events>([]);

  useEffect(() => {
    if (data) {
      data.map((event) => {
        event.startDateTime = format(
          new Date(event.startDateTime).toLocaleString(),
          "yyyy-MM-dd'T'HH:mm",
        );
        event.endDateTime = format(
          new Date(event.endDateTime).toLocaleString(),
          "yyyy-MM-dd'T'HH:mm",
        );
      });
      setEvents(data);
    }
  }, [data]);

  const [view, setView] = useState<"Day" | "Week">("Week");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const currentWeek = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfISOWeek(selectedDay),
        end: endOfISOWeek(selectedDay),
      }),
    [selectedDay],
  );

  const currentMonth = useMemo(
    () => getMonthsOfWeek(currentWeek[0], currentWeek[6]),
    [currentWeek],
  ); // currentMonth is a string

  function previousweek() {
    const prevWeekStart = add(currentWeek[0], { weeks: -1 });
    setSelectedDay(prevWeekStart);
  }

  function nextWeek() {
    const nextWeekStart = add(currentWeek[0], { weeks: 1 });
    setSelectedDay(nextWeekStart);
  }

  function previousDay() {
    const day = add(selectedDay, { days: -1 });
    setSelectedDay(day);
  }

  function nextDay() {
    const day = add(selectedDay, { days: 1 });
    setSelectedDay(day);
  }

  const [sideViewIsOpen, setSideViewIsOpen] = useState(true);

  const uploadDialogRef = useRef<HTMLDialogElement>(null);

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div className="max-w-screen relative mr-2 mt-2 flex max-h-[calc(100vh-0.5rem)] overflow-hidden rounded-t-lg bg-white shadow-sm">
        {isLoading && (
          <div className="absolute z-[999] grid h-full w-full place-items-center bg-slate-50/50 text-3xl font-medium text-slate-700 backdrop-blur-[1.5px]">
            <span className="flex items-center gap-0.5">
              <svg
                className="-ml-1 mr-3 size-8 animate-spin text-slate-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          </div>
        )}
        <div
          style={{
            width: "100%",
            paddingInline: "1rem",
            flexBasis: "100%",
          }}
        >
          <div className="flex items-center justify-between py-4 pb-5 pl-5 pr-1">
            <div className="flex items-center gap-6">
              <button
                title="Jump back to today"
                className="text-md flex items-center gap-2 fill-slate-500 text-slate-500 hover:fill-slate-900 hover:text-slate-900"
                onClick={() => {
                  setSelectedDay(today);
                }}
              >
                <span
                  role="img"
                  aria-hidden="true"
                  className="size-[1.125rem] -translate-y-[1px] transform"
                >
                  <svg
                    viewBox="2 2 16 16"
                    role="presentation"
                    focusable="false"
                    className=""
                  >
                    <g>
                      <path d="M14.5 3C15.8807 3 17 4.11929 17 5.5V14.5C17 15.8807 15.8807 17 14.5 17H11.5C11.5 17 11.5 16.6753 11.5 16.5V16H14.5C15.3284 16 16 15.3284 16 14.5V7H4V14.5C4 15.3284 4.67157 16 5.5 16H8.5V16.5C8.5 16.6753 8.5 17 8.5 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5C3 4.11929 4.11929 3 5.5 3H14.5ZM14.5 4H5.5C4.67157 4 4 4.67157 4 5.5V6H16V5.5C16 4.67157 15.3284 4 14.5 4Z"></path>
                      <path d="M11 9C11 9.55228 10.5523 10 10 10C9.44772 10 9 9.55228 9 9C9 8.44772 9.44772 8 10 8C10.5523 8 11 8.44772 11 9Z"></path>
                      <path d="M11.8841 14.0701C11.7073 14.2822 11.392 14.3109 11.1799 14.1341L10.5 13.5675L10.5 17.5C10.5 17.7762 10.2761 18 9.99999 18C9.72385 18 9.49999 17.7762 9.49999 17.5V13.5675L8.82007 14.1341C8.60794 14.3109 8.29265 14.2822 8.11587 14.0701C7.93909 13.858 7.96775 13.5427 8.17989 13.3659L9.67989 12.1159C9.86531 11.9614 10.1347 11.9614 10.3201 12.1159L11.8201 13.3659C12.0322 13.5427 12.0609 13.858 11.8841 14.0701Z"></path>
                    </g>
                    <g>
                      <path d="M14.5 3C15.8807 3 17 4.11929 17 5.5V14.5C17 15.8807 15.8807 17 14.5 17H11.5C11.5 17 11.5 16.6753 11.5 16.5V16H14.5C15.3284 16 16 15.3284 16 14.5V7H4V14.5C4 15.3284 4.67157 16 5.5 16H8.5V16.5C8.5 16.6753 8.5 17 8.5 17H5.5C4.11929 17 3 15.8807 3 14.5V5.5C3 4.11929 4.11929 3 5.5 3H14.5ZM14.5 4H5.5C4.67157 4 4 4.67157 4 5.5V6H16V5.5C16 4.67157 15.3284 4 14.5 4Z"></path>
                      <path d="M11 9C11 9.55228 10.5523 10 10 10C9.44772 10 9 9.55228 9 9C9 8.44772 9.44772 8 10 8C10.5523 8 11 8.44772 11 9Z"></path>
                      <path d="M11.8841 14.0701C11.7073 14.2822 11.392 14.3109 11.1799 14.1341L10.5 13.5675L10.5 17.5C10.5 17.7762 10.2761 18 9.99999 18C9.72385 18 9.49999 17.7762 9.49999 17.5V13.5675L8.82007 14.1341C8.60794 14.3109 8.29265 14.2822 8.11587 14.0701C7.93909 13.858 7.96775 13.5427 8.17989 13.3659L9.67989 12.1159C9.86531 11.9614 10.1347 11.9614 10.3201 12.1159L11.8201 13.3659C12.0322 13.5427 12.0609 13.858 11.8841 14.0701Z"></path>
                    </g>
                  </svg>
                </span>
                <span>Today</span>
              </button>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={view == "Week" ? previousweek : previousDay}
                  className="-my-1.5 flex flex-none items-center justify-center text-gray-500 hover:text-gray-900"
                >
                  <span className="sr-only">Previous month</span>
                  <div className="h-5 w-5" aria-hidden="true">
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
                  onClick={view == "Week" ? nextWeek : nextDay}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-1.5 flex flex-none items-center justify-center text-gray-500 hover:text-gray-900"
                >
                  <span className="sr-only">Next month</span>
                  <div className="h-5 w-5" aria-hidden="true">
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
                <CalendarButton
                  currentMonth={currentMonth}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* view tab */}
              <div className="flex min-w-48 rounded-lg border bg-slate-50 p-px">
                <button
                  className={`${view == "Day" ? "bg-white" : "border-transparent"} basis-full rounded-lg border p-1 font-semibold text-slate-700`}
                  onClick={() => {
                    setView("Day");
                    setSelectedDay(today);
                  }}
                >
                  Day
                </button>
                <button
                  className={`${view == "Week" ? "bg-white" : "border-transparent"} basis-full rounded-lg border p-1 font-semibold text-slate-700`}
                  onClick={() => {
                    setView("Week");
                    setSelectedDay(currentWeek[0]);
                  }}
                >
                  Week
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="flex items-center gap-1 rounded-lg border bg-slate-900 px-2 py-1 pr-2.5 font-medium text-white"
                  onClick={() => setModalIsOpen(true)}
                >
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 2C7.44772 2 7 2.44772 7 3V7H3C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H7V13C7 13.5523 7.44772
                14 8 14C8.55228 14 9 13.5523 9 13V9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H9V3C9 2.44772 8.55228
                2 8 2Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Event
                </button>
                <div className="flex items-center gap-2">
                  <button
                    className="stroke-slate-400"
                    title="import from ics"
                    onClick={() => {
                      uploadDialogRef.current?.showModal();
                    }}
                  >
                    <span className="sr-only">import</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="transparent"
                        className="size-6"
                      >
                        <path
                          d="M9.31995 11.6799L11.8799 14.2399L14.4399 11.6799"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.88 4V14.17"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20 12.1799C20 16.5999 17 20.1799 12 20.1799C7 20.1799 4 16.5999 4 12.1799"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <button
                    className={`rounded-md p-2 px-2 hover:stroke-slate-800 ${sideViewIsOpen ? "fill-slate-800" : "fill-slate-400"} transition-colors`}
                    onClick={() => setSideViewIsOpen((prev) => !prev)}
                  >
                    <span className="sr-only">Search</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 256 256"
                        enable-background="new 0 0 256 256"
                        className="size-6"
                      >
                        <metadata>
                          Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                        </metadata>
                        <g>
                          <g>
                            <path d="M244.2,205.5l-37.6-49.1c13.3-12.7,21.7-30.5,21.7-50.3c0-38.4-31.3-69.6-69.8-69.6c-38.5,0-69.8,31.3-69.8,69.6c0,38.4,31.3,69.6,69.8,69.6c12.4,0,24-3.3,34.1-9l37.7,49.2c1.7,2.2,4.3,3.4,7,3.4c1.9,0,3.7-0.6,5.3-1.8C246.4,214.8,247.1,209.3,244.2,205.5L244.2,205.5z M104.8,106.1c0-29.5,24.1-53.5,53.7-53.5c29.6,0,53.7,24,53.7,53.5c0,29.5-24.1,53.5-53.7,53.5C128.9,159.6,104.8,135.6,104.8,106.1L104.8,106.1z M71,71.1H18.7c-4.8,0-8.7-3.9-8.7-8.7c0-4.8,3.9-8.7,8.7-8.7H71c4.8,0,8.7,3.9,8.7,8.7C79.7,67.2,75.8,71.1,71,71.1L71,71.1z M68.9,157.1H18.7c-4.8,0-8.7-3.9-8.7-8.7c0-4.8,3.9-8.7,8.7-8.7h50.2c4.8,0,8.7,3.9,8.7,8.7C77.6,153.2,73.7,157.1,68.9,157.1L68.9,157.1z M58.6,114H18.7c-4.8,0-8.7-3.9-8.7-8.7c0-4.8,3.9-8.7,8.7-8.7h39.9c4.8,0,8.7,3.9,8.7,8.7C67.3,110.1,63.4,114,58.6,114L58.6,114z M114.8,201.7h-96c-4.8,0-8.7-3.9-8.7-8.7s3.9-8.7,8.7-8.7h96c4.8,0,8.7,3.9,8.7,8.7S119.6,201.7,114.8,201.7L114.8,201.7z" />
                          </g>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ScheduleModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />

          <UpdateScheduleModal
            isOpen={updateModalIsOpen}
            setIsOpen={setUpdateModalIsOpen}
          />
          <UploadModal dialogRef={uploadDialogRef} />

          <DaysView
            days={view == "Week" ? currentWeek : [selectedDay]}
            events={events}
            setModalIsOpen={setModalIsOpen}
            setUpdateModalIsOpen={setUpdateModalIsOpen}
          />
        </div>
        <QuickView
          events={events}
          setSelectedDay={setSelectedDay}
          setUpdateModalIsOpen={setUpdateModalIsOpen}
          sideViewIsOpen={sideViewIsOpen}
        />
      </div>
    </>
  );
};

function CalendarButton({
  currentMonth,
  selectedDay,
  setSelectedDay,
}: {
  currentMonth: string;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="ml-3 flex items-center gap-2 text-gray-500 hover:text-gray-900"
        onClick={() => setCalendarIsOpen((prev) => !prev)}
      >
        <span className="sr-only">calendar</span>
        <span className="text-md font-semibold text-slate-700">
          {currentMonth}
        </span>
        <div
          className={`${calendarIsOpen && "rotate-180 transform"} size-5 transition-transform`}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      {calendarIsOpen && (
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      )}
    </div>
  );
}

export default CalendarView;

function getMonthsOfWeek(currentWeekStart: Date, currentWeekEnd: Date) {
  const Month =
    format(currentWeekStart, "MMMM-yyyy") ===
    format(currentWeekEnd, "MMMM-yyyy")
      ? format(currentWeekStart, "MMMM-yyyy")
      : `${format(currentWeekStart, "MMMM-yyyy")} - ${format(currentWeekEnd, "MMMM-yyyy")}`;
  return Month;
}
