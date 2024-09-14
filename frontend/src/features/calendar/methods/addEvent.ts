import { baseURL, TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

export async function addEvent(event: Omit<Events[0], "id">) {
  console.log(event);
  const data = {
    name: event.name,
    startDateTime: new Date(event.startDateTime).toISOString(),
    endDateTime: new Date(event.endDateTime).toISOString(),
    description: event.description,
    theme: event.theme,
  };
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    "ngrok-skip-browser-warning": "true",
  };
  const send = await fetch(`${baseURL}/api/create/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: header,
  });

  const response = await send.json();
  return response;
}
