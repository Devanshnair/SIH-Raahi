import StatCards from "../../../components/StatCards";

import Overview from "./sections/Overview";
import Activity from "./sections/Activity";
import Domain from "./sections/Domain";
import RecentlyBooked from "./sections/RecentlyBooked";

const Dashboard = () => {
  return (
    <div className="m-4 ml-0 grid grid-rows-[1fr,0.85fr,1fr] items-center justify-center gap-4 rounded-lg bg-slate-50 px-10 py-8 shadow">
      <div className="grid w-full grid-cols-[3fr,2fr] gap-10">
        <Overview />
        <Activity />
      </div>
      <div className="grid h-full w-full grid-cols-[1.78fr,3fr] gap-4">
        <div className="h-full">
          <Domain />
        </div>
        <div className="grid h-full grid-cols-3 items-center justify-center gap-3">
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
      </div>
      <RecentlyBooked />
    </div>
  );
};

export default Dashboard;
