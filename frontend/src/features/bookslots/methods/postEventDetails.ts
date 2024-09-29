import { baseURL } from "../../../App";

export type EventDetails = {
  mentee: {
    email: string;
    name: string;
    phone_number: "+1234567890";
  };
  event: {
    description: string;
    startDateTime: string;
    endDateTime: string;
    mentor: string;
  };
};

export async function postEventDetails(eventDetails: EventDetails) {
  const send = await fetch(`${baseURL}/api/book-event/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventDetails),
  });

  const response = await send.json();

  return response;
}
