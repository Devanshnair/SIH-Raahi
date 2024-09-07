import { TOKEN } from "../../../App";
import { Availability } from "../SetAvailability";

export const URL = "https://live-merely-drum.ngrok-free.app/api/slots/";

export async function postAvailability(availability: Availability[]) {
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

  console.log(await response.json());
  return response.json();
}
