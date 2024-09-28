import React from "react";
import { Eye, Award, Calendar, Star } from "lucide-react";
import { useEvents } from "../../../features/calendar/methods/fetchEvents";
import { format } from "date-fns";
import { Events } from "../../../features/calendar/modifyEvents";

const Header: React.FC = () => (
  <header className="mb-8">
    <h2 className="text-3xl font-bold text-slate-800">
      Welcome back, Yanshuman!
    </h2>
    <p className="text-slate-500">
      Here's what's happening with your mentor profile today.
    </p>
  </header>
);

const StatsCard: React.FC<{
  icon: React.ElementType;
  value: number | string;
  label: string;
  trend: number;
}> = ({ icon: Icon, value, label, trend }) => (
  <div className="rounded-xl border bg-white p-6 shadow shadow-slate-200">
    <div className="mb-4 flex items-center justify-between">
      <div className="rounded-full bg-indigo-100 p-3 text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>
      <span
        className={`text-sm font-medium ${trend > 0 ? "text-green-500" : "text-red-500"}`}
      >
        {trend > 0 ? "+" : ""}
        {trend}%
      </span>
    </div>
    <h3 className="mb-1 text-2xl font-bold text-gray-800">{value}</h3>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const BookingItem: React.FC<Events[0]> = ({
  name,
  startDateTime,
  endDateTime,
}) => (
  <div className="mx-4 flex items-center rounded-lg border bg-white p-4">
    <div className="flex-grow">
      <h4 className="font-semibold text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">
        <time dateTime={format(startDateTime, "ccc hh:mm aaa")}>
          {format(startDateTime, "ccc hh:mm aaa")}
        </time>
        -
        <time dateTime={format(endDateTime, "hh:mm aaa")}>
          {format(endDateTime, "hh:mm aaa")}
        </time>
      </p>
    </div>
    <button className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
      View
    </button>
  </div>
);

const PromotionCard: React.FC = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white shadow-lg">
    <div className="relative z-10">
      <h3 className="mb-2 text-2xl font-bold">Boost Your Earnings!</h3>
      <p className="mb-4">
        Refer friends and earn up to 80% on their earnings.
      </p>
      <button className="mt-7 rounded-lg bg-white px-6 py-2 font-medium text-indigo-600 transition-colors hover:bg-gray-100">
        Refer Now
      </button>
    </div>
    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-300 opacity-20"></div>
    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-300 opacity-20"></div>
  </div>
);

const HomePage: React.FC = () => {
  const { data } = useEvents();

  const bookings: Events | undefined = data?.filter(
    (event) => event.status === "Scheduled",
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <Header />
        <main className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-grow">
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <StatsCard
                  icon={Eye}
                  value={1234}
                  label="Profile Views"
                  trend={12}
                />
                <StatsCard
                  icon={Award}
                  value={56}
                  label="Sessions This Month"
                  trend={8}
                />
                <StatsCard
                  icon={Star}
                  value={4.9}
                  label="Average Rating"
                  trend={2}
                />
                <StatsCard
                  icon={Calendar}
                  value={23}
                  label="Upcoming Sessions"
                  trend={-5}
                />
              </div>
            </div>
            <div className="-mt-10 w-2/5">
              <h3 className="ml-4 bg-white text-xl font-bold text-gray-800">
                Upcoming Bookings
              </h3>
              <div className="max-h-[23.4rem] space-y-4 overflow-auto overscroll-contain pt-4">
                {bookings ? (
                  bookings.map((booking, index) => (
                    <BookingItem key={index} {...booking} />
                  ))
                ) : (
                  <p className="mx-4">Loading...</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="basis-[61%]">
              <PromotionCard />
            </div>
            <div className="basis-[40%]">
              <div className="rounded-xl border bg-white p-6 shadow shadow-slate-200">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Update Profile",
                    "View Analytics",
                    "Manage Schedule",
                    "Support",
                  ].map((action) => (
                    <button
                      key={action}
                      className="rounded-lg bg-gray-100 p-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="my-2 mr-2 min-h-[calc(100vh-1rem)] rounded-lg bg-white pb-4 shadow-sm">
      <h3 className="border-b p-6 px-8 text-3xl font-semibold text-slate-800">
        Home
      </h3>
      <HomePage />
    </div>
  );
};

export default Dashboard;
