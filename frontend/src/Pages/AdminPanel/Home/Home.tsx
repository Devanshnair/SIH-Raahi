import { meetings } from "../../../features/calendar/modifyEvents";
import { format } from "date-fns";
import Overview from "./sections/Overview";
import { IoCalendarClearOutline } from "react-icons/io5";

const Dashboard = () => {

  type d = { [key: string]: (typeof meetings)[0][] };

  const Meetings = (() => {
    return meetings;
  })();

const meetingsReimagined = Meetings.reduce((acc: d[], meeting) => {
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
    <div className="m-4 ml-0 grid grid-rows-3 grid-cols-[3fr,2fr] justify-center gap-8 rounded-lg bg-slate-50 px-10 py-8 shadow">
      <div className="row-start-1 row-end-2 ">
        <Overview />
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl pl-1'>New Bookings</h2>
        <div className="row-start-1 row-end-3 grid gap-4 border border-slate-300 rounded-lg p-3 h-[29.5rem] overflow-y-scroll">
          {meetingsReimagined.map((date, i) => (
            <div key={i} className="">
              <div className="grid gap-4">
                {date[Object.keys(date)[0]].map((meeting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex gap-5 justify-center items-center">
                      <div className="flex justify-center items-center h-10 w-10 bg-slate-800 shadow-md rounded-lg">
                        <IoCalendarClearOutline className="h-[1.35rem] w-[1.35rem] text-slate-50"/>
                      </div>
                      <div>
                        <h5 className="text font-bold text-slate-800">
                          {meeting.name}
                        </h5>
                        <p className="text-sm text-slate-500">
                          {format(Object.keys(date)[0], "E, dd MMM")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="font-semibold text-sm text-slate-700">
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

export default Dashboard;
