import { TOKEN } from "../../../App";
import { Events, updateCalendarEvent } from "../modifyEvents";
import { baseURL } from "./fetchEvents";

export async function updateEvent(
  event: {
    id: string;
    name: string;
    startDateTime: string;
    endDateTime: string;
    description: string;
    theme: string;
  },
  setEvents: React.Dispatch<React.SetStateAction<Events>>,
  events: Events,
) {
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
  updateCalendarEvent(response, setEvents, events);

  return response;
}
