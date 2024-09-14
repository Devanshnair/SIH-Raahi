import {
  endOfDay,
  format,
  interval,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { Events } from "./modifyEvents";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { deleteEvent } from "./methods/deleteEvent";
import { fetchEvents } from "./methods/fetchEvents";

type EventStickersProps = {
  days: Date[];
  event: Events[0];
  events: Events;
  setEvents: React.Dispatch<React.SetStateAction<Events>>;
  setUpdateModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventSticker = ({
  days,
  event,
  setEvents,
  setUpdateModalIsOpen,
}: EventStickersProps) => {
  const startColNo = days.findIndex((day) =>
    isWithinInterval(
      event.endDateTime,
      interval(startOfDay(day), endOfDay(day)),
    ),
  );

  const top =
    ((new Date(event.startDateTime).getTime() -
      startOfDay(new Date(event.startDateTime)).getTime()) *
      2) /
    1000 /
    60;

  const height =
    ((new Date(event.endDateTime).getTime() -
      new Date(event.startDateTime).getTime()) *
      2) /
    1000 /
    60;

  const scheduledTime = `${format(event.startDateTime, "h:mm")} to ${format(event.endDateTime, "h:mm")}`;

  function handleClick() {
    (document.querySelector("#update-modal-name")! as HTMLInputElement).value =
      event?.name;
    (
      document.querySelector("#update-modal-startDateTime")! as HTMLInputElement
    ).value = format(event?.startDateTime, "yyyy-MM-dd'T'HH:mm");

    (
      document.querySelector("#update-modal-endDateTime")! as HTMLInputElement
    ).value = format(event?.endDateTime, "yyyy-MM-dd'T'HH:mm");

    console.log(event?.theme);

    (
      document.querySelector("#update-modal-theme")! as HTMLSelectElement
    ).value = event?.theme;

    // (
    //   document.querySelector("#update-modal-theme")! as HTMLSelectElement
    // ).textContent = event?.theme;

    (
      document.querySelector(
        "#update-modal-description",
      )! as HTMLTextAreaElement
    ).value = event?.description ?? "";
    (
      document.querySelector("[data-eventid]") as HTMLDialogElement
    ).dataset.eventid = event?.id ?? "";

    setUpdateModalIsOpen(true);
  }

  async function handleDelete(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    const cancel = confirm(
      `Sure, you want to cancel your meeting with ${event?.name}?`,
    );
    if (!cancel) return;
    const deleted = await deleteEvent({ id: event.id });
    console.log(deleted);

    return deleted;
  }

  // const handleResize = (
  //   e: MouseEvent | TouchEvent | PointerEvent,
  //   info: PanInfo,
  // ) => {
  //   console.log(info.delta.y);
  //   if (info.delta.y > 15 && dimensions.height >= 60) {
  //     setEndTime((prev) => ({
  //       height: Math.max(60, prev.height + info.delta.y),
  //     }));
  //   }
  // };

  return (
    <>
      <motion.a
        href="#"
        id={event.id}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          gridColumnStart: startColNo + 1,
          gridColumnEnd: startColNo + 2,
        }}
        key={event.startDateTime}
        data-time={event.startDateTime}
        className={`absolute w-full bg-transparent p-[0.15rem]`}
        onClick={
          new Date(event.endDateTime) > new Date() ? handleClick : undefined
        }
        onContextMenu={async (e) => {
          const deleted = await handleDelete(e);
          if (!deleted) return;
          console.log(deleted);
          const fetchedEvent = await fetchEvents();
          console.log(fetchedEvent);
          setEvents(fetchedEvent);
        }}
        // onDrag={handleResize}
      >
        <div
          className={twMerge(
            `pointer-events-none flex h-full w-full flex-col gap-0 rounded-xl px-2 ${event.theme}`,
            `${height > 45 && "p-2"}`,
          )}
        >
          <p
            className={`name ${height < 60 ? "truncate text-sm" : "truncate"}`}
          >
            {event.name}
          </p>
          <time
            className={`${height < 60 && "hidden"} mt-auto py-1 text-sm`}
            dateTime={scheduledTime}
          >
            {scheduledTime}
          </time>
        </div>
      </motion.a>
    </>
  );
};

export default EventSticker;
