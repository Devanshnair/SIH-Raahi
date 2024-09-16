import { useQuery } from "react-query";
import { baseURL } from "../../../App";

type slot = {
  start: string;
  end: string;
};

export type weekSlotsType = {
  startTime: string;
  endTime: string;
  day: string;
  slots: slot[];
  date: string;
};

export async function fetchWeeklySlots(
  mentorId: string,
): Promise<weekSlotsType[]> {
  const response = await fetch(`${baseURL}/api/${mentorId}/slots`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export const useWeeklySlots = (id: string) => {
  return useQuery({
    queryKey: ["weeklySlots", id],
    queryFn: () => fetchWeeklySlots(id),
  });
};
