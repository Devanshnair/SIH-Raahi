import { TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

export const baseURL = "https://annoyed-mollee-sudo-rm-rf-83c225c7.koyeb.app";

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
