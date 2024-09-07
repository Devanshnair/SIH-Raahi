import { TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

export async function deleteEvent({ id }: { id: string }): Promise<Events[0]> {
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    "ngrok-skip-browser-warning": "true",
  };
  const send = await fetch(
    `https://live-merely-drum.ngrok-free.app/api/events/${id}/delete`,
    {
      method: "DELETE",
      headers: header,
    },
  );

  const response = await send.json();

  return response;
}
