import { motion } from "framer-motion";
import { useState } from "react";
import { meetings } from "../../../features/calendar/modifyEvents";
import { format } from "date-fns";

const filter = ["Upcoming", "Past"];

const Bookings = () => {
  const [selected, setSelected] = useState("Upcoming");

  type d = { [key: string]: (typeof meetings)[0][] };

  console.table(meetings);

  const fileredMeetings = (() => {
    if (selected === "Upcoming") {
      return meetings.filter(
        (meeting) =>
          meeting.startDateTime >
          new Date(meetings[0].startDateTime).toISOString(),
      );
    }
    if (selected === "Past") {
      return meetings.filter(
        (meeting) =>
          meeting.startDateTime <
          new Date(meetings[0].startDateTime).toISOString(),
      );
    }
    return meetings;
  })();

  const meetingsReimagined = fileredMeetings.reduce((acc: d[], meeting) => {
    const date = format(meeting.startDateTime, "yyyy-MM-dd");
    if (!acc.find((d: d) => Object.hasOwn(d, date))) {
      const obj = {
        [date]: [meeting],
      };
      acc.push(obj);
    } else {
      const index = acc.findIndex((d: d) => Object.hasOwn(d, date));
      acc[index][date].push(meeting);
    }
    return acc;
  }, []);

  return (
    <div className="my-2 mr-2 min-h-[calc(100vh-1rem)] rounded-lg bg-white pb-4 shadow-sm">
      <h3 className="border-b p-6 px-8 text-3xl font-semibold text-slate-800">
        Bookings
      </h3>
      <div className="mx-8 mt-6">
        <div className="flex max-w-max rounded-lg border bg-slate-50 p-px">
          {filter.map((text, i) => (
            <motion.button
              key={i}
              className={`${selected == text ? "bg-white" : "border-transparent"} block basis-full rounded-lg border p-1 px-4 font-semibold text-slate-700`}
              onClick={() => setSelected(text)}
            >
              {text}
            </motion.button>
          ))}
        </div>
        <div className="mt-8 grid gap-6">
          {meetingsReimagined.map((date, i) => (
            <div key={i} className="">
              <h4 className="px-2 font-medium text-slate-800">
                {format(Object.keys(date)[0], "E, dd MMM")}
              </h4>
              <div className="mt-4 grid gap-4">
                {date[Object.keys(date)[0]].map((meeting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
                  >
                    <div>
                      <h5 className="text-lg font-semibold text-slate-800">
                        {meeting.name}
                      </h5>
                      <p className="text-sm text-slate-500">
                        {format(meeting.startDateTime, "hh:mm a")} -{" "}
                        {format(meeting.endDateTime, "hh:mm a")}
                      </p>
                    </div>
                    <div>
                      <button className="font-semibold text-slate-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
