import { useEffect, useRef, useState } from "react";

import { Events } from "../modifyEvents";
import { format } from "date-fns";
import { updateEvent } from "../methods/updateEvent";
import { fetchEvents } from "../methods/fetchEvents";

type ScheduleModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  events: Events;
  setEvents: React.Dispatch<React.SetStateAction<Events>>;
};

const UpdateScheduleModal = ({
  isOpen,
  setIsOpen,
  events,
  setEvents,
}: ScheduleModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalTitleInputRef = useRef<HTMLInputElement>(null);
  const modalDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const modalStartInputRef = useRef<HTMLInputElement>(null);
  const modalEndInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      if (
        modalTitleInputRef.current &&
        modalDescriptionInputRef.current &&
        modalStartInputRef.current &&
        modalEndInputRef.current
      ) {
        modalTitleInputRef.current.value = "";
        modalDescriptionInputRef.current.value = "";
        modalStartInputRef.current.value = "";
        modalEndInputRef.current.value = "";
      }
      dialogRef.current?.close();
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    switch (true) {
      case !modalTitleInputRef.current?.value:
        setError("Name is required");
        return;
      case !modalStartInputRef.current?.value:
        setError("Start date is required");
        return;
      case !modalEndInputRef.current?.value:
        setError("End date is required");
        return;
      case new Date(modalStartInputRef.current!.value).getTime() >
        new Date(modalEndInputRef.current!.value).getTime():
        setError("End date should be greater than start date");
        return;
      case (new Date(modalEndInputRef.current!.value).getTime() -
        new Date(modalStartInputRef.current!.value).getTime()) /
        1000 /
        60 <
        15:
        setError("Event should be at least 15 minutes from now");
        return;
      case new Date(modalStartInputRef.current!.value).getDay() !=
        new Date(modalEndInputRef.current!.value).getDay():
        setError("Start and end date should be on the same day");
        return;
      default:
        setError("");
    }

    const data = {
      id: dialogRef.current?.dataset.eventid ?? "",
      name: modalTitleInputRef.current?.value ?? "",
      startDateTime: modalStartInputRef.current?.value ?? "",
      endDateTime: modalEndInputRef.current?.value ?? "",
      description: modalDescriptionInputRef.current?.value ?? "",
      theme: "Meeting",
    };

    const updatedEvent = await updateEvent(data, setEvents, events);
    const fetchedEvent = fetchEvents();
    setIsOpen(false);

    modalTitleInputRef.current.value = "";
    modalDescriptionInputRef.current!.value = "";
    modalStartInputRef.current.value = "";
    modalEndInputRef.current.value = "";
  }

  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  return (
    <dialog
      id="#update-schedule-modal"
      ref={dialogRef}
      data-eventid
      className="fixed inset-0 z-50 w-96 rounded-lg"
    >
      <div className="bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <button
            className="-mr-2 -mt-2 rounded-full p-1 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">close</span>
            <div className="size-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                svg-inline=""
                role="presentation"
                focusable="false"
              >
                <path
                  data-v-f3d34a40=""
                  d="M17 7L7 17M7 7l10 10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </button>
        </div>

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <label>
              <span>Name</span>
              <input
                required
                id="update-name"
                ref={modalTitleInputRef}
                type="text"
                className="block w-full rounded-lg border p-1"
              />
            </label>
            <div className="grid gap-4">
              <label>
                <span>Start</span>
                <input
                  required
                  id="update-startDateTime"
                  ref={modalStartInputRef}
                  type="datetime-local"
                  min={currentDate}
                  className="ml-2 rounded-lg border p-1"
                />
              </label>
              <label>
                <span>End</span>
                <input
                  required
                  id="update-endDateTime"
                  ref={modalEndInputRef}
                  type="datetime-local"
                  min={currentDate}
                  className="ml-2 rounded-lg border p-1"
                />
              </label>
            </div>
            <label>
              <span>Description</span>
              <textarea
                ref={modalDescriptionInputRef}
                id="update-description"
                className="block w-full rounded-lg border p-1"
              ></textarea>
            </label>
            <p className="text-sm text-red-500">{error}</p>
            <button className="rounded-lg bg-slate-800 p-2 text-white hover:bg-slate-900">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateScheduleModal;
