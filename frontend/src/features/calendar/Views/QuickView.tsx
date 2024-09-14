import { format, parseISO } from "date-fns";
import {
  memo,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Events } from "../modifyEvents";
import { motion } from "framer-motion";
import { useDeleteEvent } from "../methods/deleteEvent";
import { setEventInUpadateModal } from "../modals/utils";

type QuickViewProps = {
  events: Events;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  setUpdateModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sideViewIsOpen: boolean;
};

const QuickView = ({
  events,
  setSelectedDay,
  setUpdateModalIsOpen,
  sideViewIsOpen,
}: QuickViewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const text = `${format(
          format(new Date(event.startDateTime), "yyyy-MM-dd'T'HH:mm:ss"),
          "EEE, MMM dd",
        )} ${format(format(new Date(event.startDateTime), "yyyy-MM-dd'T'HH:mm:ss"), "h:mm a")} - ${format(format(new Date(event.startDateTime), "yyyy-MM-dd'T'HH:mm:ss"), "h:mm a")} ${event.name}`;
        return text.toLowerCase().includes(searchTerm.toLowerCase());
      }),
    [events, searchTerm],
  );

  return (
    <motion.aside
      layout
      animate={{
        width: sideViewIsOpen ? "400px" : "0px",
      }}
      transition={{ layout: { duration: 0.3 }, ease: "easeInOut" }}
      className={`mt-12 md:mt-0`}
    >
      <div className="flex min-w-0 justify-start px-1 py-[1.25rem]">
        {/* <button
          type="button"
          className="flex flex-none items-center text-gray-500 hover:text-gray-900"
          onClick={() => setSideViewIsOpen((prev) => !prev)}
        >
          <span className="sr-only">
            {sideViewIsOpen ? "Close Sidebar" : "Open Sidebar"}
          </span>
          <div className="size-6 fill-slate-700" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`${sideViewIsOpen == false && "rotate-180 transform"}`}
            >
              <path d="M11,17a1,1,0,0,1-.71-1.71L13.59,12,10.29,8.71a1,1,0,0,1,1.41-1.41l4,4a1,1,0,0,1,0,1.41l-4,4A1,1,0,0,1,11,17Z" />
              <path d="M15 13H5a1 1 0 0 1 0-2H15a1 1 0 0 1 0 2zM19 20a1 1 0 0 1-1-1V5a1 1 0 0 1 2 0V19A1 1 0 0 1 19 20z" />
            </svg>
          </div>
        </button> */}

        {/* <button
          className="flex items-center gap-1 rounded-lg border bg-blue-600 p-2 py-1 text-white"
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
          Filters
        </button> */}
      </div>

      <div className={`pr-3 [&_>*:not(ol)]:min-w-max`}>
        <div className="px-1">
          <div className="flex overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-1 outline-offset-4">
            <input
              type="text"
              id="search"
              className="w-full rounded-md bg-slate-50 px-2 outline-none placeholder:text-slate-400"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label htmlFor="search">
              <span className="sr-only h-0">Search</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 488.4 488.4"
                  className="size-8 bg-slate-50 fill-slate-400 py-[.35rem]"
                >
                  <g>
                    <g>
                      <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z" />
                    </g>
                  </g>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <h2 className="px-1 pt-4 text-base font-semibold text-slate-700">
          Upcoming events
        </h2>
        <ol
          className={`mt-2 flex h-[calc(100vh-130px)] min-w-[calc(320px-2rem)] flex-col gap-1 overflow-x-auto px-1 pb-4 text-sm leading-6 text-gray-500`}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((meeting) => (
              <Meeting
                key={meeting.id}
                event={meeting}
                setUpdateModalIsOpen={setUpdateModalIsOpen}
                setSelectedDay={setSelectedDay}
              />
            ))
          ) : (
            <p>No meetings found.</p>
          )}
        </ol>
      </div>
    </motion.aside>
  );
};

function Meeting({
  event,
  setUpdateModalIsOpen,
  setSelectedDay,
}: {
  event: Events[0];
  setUpdateModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [MenuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const { mutateAsync: deleteEvent } = useDeleteEvent();

  async function onDelete(e: MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      setMenuIsOpen(false);
    }
  }
  return (
    <li className="mt-1 h-max rounded">
      <a
        href={`#${event.id.toString()}`}
        className={`block p-3 ${event.theme} light h-full w-full rounded-xl outline-offset-2 transition-colors duration-200 ease-in-out`}
        onClick={() => {
          setSelectedDay(parseISO(event.startDateTime));
        }}
      >
        <div className="flex justify-between">
          <time dateTime={format(event.startDateTime, "yyyy-mm-dd")}>
            {format(event.startDateTime, "EEE, MMM dd")}
          </time>
          <div className="relative">
            <button
              className="menu flex h-5 -translate-y-1 translate-x-1 items-center gap-[2.5px] px-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMenuIsOpen((prev) => !prev);
              }}
            >
              {[...Array(3)].map((_, index) => (
                <span key={index} className="dots size-1 rounded-[100%]"></span>
              ))}
            </button>
            <ol
              ref={menuRef}
              className={`${MenuIsOpen ? "absolute" : "hidden"} -right-2 top-3 grid w-32 rounded-lg bg-white px-1 py-[0.3rem] text-slate-700 shadow-md`}
            >
              <li>
                <button
                  className="w-full rounded-md px-1 text-left hover:bg-slate-100 focus:bg-slate-100 disabled:opacity-50"
                  disabled={new Date(event.startDateTime) < new Date()}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEventInUpadateModal(event);
                    setUpdateModalIsOpen(true);
                  }}
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="w-full rounded-md px-1 text-left hover:bg-slate-100 focus:bg-slate-100"
                  onClick={(e) => onDelete(e, event.id)}
                  onBlur={() => setMenuIsOpen(false)}
                >
                  Delete
                </button>
              </li>
            </ol>
          </div>
        </div>
        <p className="name">{event.name}</p>
        <span className="mt-0.5">
          <time dateTime={event.startDateTime}>
            {format(event.startDateTime, "h:mm a")}
          </time>{" "}
          -{" "}
          <time dateTime={event.endDateTime}>
            {format(event.endDateTime, "h:mm a")}
          </time>
        </span>
      </a>
    </li>
  );
}

export default memo(QuickView);
