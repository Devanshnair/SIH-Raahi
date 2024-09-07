import { TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

const URL = "https://live-merely-drum.ngrok-free.app/api/get/";

export async function fetchEvents(): Promise<Events> {
  const response = await fetch(URL, {
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
