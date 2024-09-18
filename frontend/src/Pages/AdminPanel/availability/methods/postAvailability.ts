import { baseURL, TOKEN } from "../../../../App";
import { Availability } from "../Availability";

export async function postAvailability(availability: Availability[]) {
  const URL = `${baseURL}/api/slots/`;
  console.log(availability);
  availability = availability.filter((a) => a.startTime && a.endTime !== "");
  const data = { availability: availability };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to post availability");
  }
  return response.json();
}
