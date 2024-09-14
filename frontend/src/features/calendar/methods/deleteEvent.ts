import { useMutation, useQueryClient } from "react-query";
import { baseURL, TOKEN } from "../../../App";
import { Events } from "../modifyEvents";

async function deleteEvent(id: string): Promise<Events[0]> {
  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    "ngrok-skip-browser-warning": "true",
  };
  const send = await fetch(`${baseURL}/api/events/${id}/delete`, {
    method: "DELETE",
    headers: header,
  });

  const response = await send.json();

  return response;
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries("calendarEvents");
    },
  });
}
