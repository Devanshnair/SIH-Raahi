export type Events = {
  id: string;
  name: string;
  startDateTime: string;
  endDateTime: string;
  description?: string;
  event_status?: string;
  theme: string;
}[];

export const meetings = [
  {
    id: 1,

    name: "Leslie Alexander",
    startDateTime: "2024-08-11T13:00",
    endDateTime: "2024-08-11T14:30",
    description: "Meeting with Leslie Alexander",
    theme: "theme1",
  },
  {
    id: 2,
    name: "Michael Foster",

    startDateTime: "2024-08-20T09:00",
    endDateTime: "2024-08-20T11:30",
    description: "Meeting with Michael Foster",
    theme: "theme3",
  },
  {
    id: 3,
    name: "Dries Vincent",
    startDateTime: "2024-08-20T17:00",
    endDateTime: "2024-08-20T18:30",
    description: "Meeting with Dries Vincent",
    theme: "theme1",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    startDateTime: "2024-08-09T13:00",
    endDateTime: "2024-08-09T14:30",
    description: "Meeting with Leslie Alexander",
    theme: "theme2",
  },
  {
    id: 5,
    name: "Michael Foster",
    startDateTime: "2024-08-13T14:00",
    endDateTime: "2024-08-13T14:30",
    description: "Meeting with Michael Foster",
    theme: "theme3",
  },
];

export function addCalendarEvent(
  data: {
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
  setEvents([
    ...events,
    {
      id: data.id,
      name: data.name,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
      description: data.description,
      theme: data.theme,
    },
  ]);
  return;
}

export function updateCalendarEvent(
  data: {
    id: string;
    name: string;
    startDateTime: string;
    endDateTime: string;
    description: string;
  },
  setEvents: React.Dispatch<React.SetStateAction<Events>>,
  events: Events,
) {
  const updatedEvents = events.map((event) => {
    if (event.id === data.id) {
      return {
        ...event,
        name: data.name,
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        description: data.description,
      };
    }
    return event;
  });
  setEvents(updatedEvents);
  console.log(updatedEvents);
  return;
}
