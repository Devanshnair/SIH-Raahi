import { useQuery } from "react-query";
import { baseURL, TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

export async function fetchEvents(): Promise<Events> {
  const response = await fetch(`${baseURL}/api/get`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export const useEvents = () => {
  return useQuery({
    queryFn: fetchEvents,
    queryKey: ["calendarEvents"],
    refetchOnWindowFocus: false,
  });
};
