import StatCards from "../../../components/StatCards";
import Activity from "../Home/sections/Activity";
import Domain from "../Home/sections/Domain";
import RecentlyBooked from "../Home/sections/RecentlyBooked";

const Analytics = () => {
  return (
    <div className="my-2 mr-2 min-h-[calc(100vh-1rem)] rounded-lg bg-white pb-4 shadow-sm">
      <h3 className="border-b p-6 px-8 text-3xl font-semibold text-slate-800">
        Analytics
      </h3>
      <div className="ml-0 grid grid-rows-[1fr,2fr,2fr] items-center gap-6 rounded-lg px-10 py-8 shadow">
        <div className="grid h-full w-full grid-cols-3 items-center justify-evenly gap-3">
          <StatCards
            title="Total Earnings"
            value="₹44,000"
            pillText="2.75%"
            trend="up"
            period="From Jan 1st - Sept 31st"
          />
          <StatCards
            title="Average Bookings per month"
            value="7"
            pillText="1.01%"
            trend="down"
            period="From Jan 1st - Sept 31st"
          />
          <StatCards
            title="Current month earnings"
            value="₹3700"
            pillText="1.25%"
            trend="up"
            period="Sept 2024"
          />
        </div>
        <div className="grid h-full w-full grid-cols-[1.5fr,3fr] gap-4">
          <div className="h-full">
            <Domain />
          </div>
          <Activity />
        </div>
        <RecentlyBooked />
      </div>
    </div>
  );
};

export default Analytics;
