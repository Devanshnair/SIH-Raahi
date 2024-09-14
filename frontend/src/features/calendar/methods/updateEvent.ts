import { baseURL, TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

export async function updateEvent(event: Events[0]) {
  console.log(event);
  const putData = {
    id: event.id,
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
  const send = await fetch(`${baseURL}/api/events/${putData.id}/update`, {
    method: "PUT",
    body: JSON.stringify(putData),
    headers: header,
  });

  const response = await send.json();
  return response;
}
