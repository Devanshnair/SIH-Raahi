import { LuUser } from "react-icons/lu";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const activitydata = [
  {
    name: "Apr",
    Returning: 275,
    New: 41,
  },
  {
    name: "May",
    Returning: 620,
    New: 96,
  },
  {
    name: "Jun",
    Returning: 202,
    New: 192,
  },
  {
    name: "Jul",
    Returning: 500,
    New: 50,
  },
  {
    name: "Aug",
    Returning: 355,
    New: 400,
  },
  {
    name: "Sept",
    Returning: 875,
    New: 200,
  },
  {
    name: "Oct",
    Returning: 700,
    New: 205,
  },
];

const Activity = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div
          className={`flex w-full cursor-pointer items-center justify-start gap-4 rounded px-4`}
        >
          <LuUser className={`h-6 w-6`} />
          <h2 className="text-xl">Activity</h2>
        </div>
        <select
          name="duration"
          id="duration"
          className="h-fit cursor-pointer rounded-3xl border border-slate-900 bg-slate-100 px-3 py-1 text-sm"
        >
          <option value="monthly" className="text-sm">
            Monthly
          </option>
          <option value="weekly" className="text-sm">
            Weekly
          </option>
          <option value="yearly" className="text-sm">
            Yearly
          </option>
        </select>
      </div>
      <div className="h-full w-full">
        <ResponsiveContainer width="100%">
          <LineChart
            width={500}
            height={300}
            data={activitydata}
            margin={{
              right: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="New"
              stroke="#172554"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Returning" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Activity;
