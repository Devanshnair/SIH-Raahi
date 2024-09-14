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
import { useDeleteEvent } from "./methods/deleteEvent";

import { setEventInUpadateModal } from "./modals/utils";

type EventStickersProps = {
  days: Date[];
  event: Events[0];
  events: Events;
  setUpdateModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventSticker = ({
  days,
  event,
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
    setEventInUpadateModal(event);
    setUpdateModalIsOpen(true);
  }

  const { mutateAsync: deleteEvent } = useDeleteEvent();

  function onDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event.id);
    }
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
        onContextMenu={(e) => onDelete(e)}
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
            className={`${height < 70 && "hidden"} mt-auto py-1 text-sm`}
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
