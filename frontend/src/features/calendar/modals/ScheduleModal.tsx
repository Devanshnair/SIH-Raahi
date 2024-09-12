import { useEffect, useRef, useState } from "react";

import { Events } from "../modifyEvents";
import { format } from "date-fns";
import { addEvent } from "../methods/addEvent";
import { fetchEvents } from "../methods/fetchEvents";

type ScheduleModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  events: Events;
  setEvents: React.Dispatch<React.SetStateAction<Events>>;
};

const ScheduleModal = ({
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
  const modalThemeInputRef = useRef<HTMLSelectElement>(null);
  const [theme, setTheme] = useState("");
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

      case new Date(modalEndInputRef.current!.value).getTime() -
        new Date(modalStartInputRef.current!.value).getTime() <
        15 * 60 * 1000:
        setError("Event should be atleast 15 minutes long");
        return;

      case new Date(modalStartInputRef.current!.value).getTime() >
        new Date(modalEndInputRef.current!.value).getTime():
        setError("End date should be greater than start date");
        return;

      case new Date(modalStartInputRef.current!.value).getDay() !=
        new Date(modalEndInputRef.current!.value).getDay():
        setError("Start and end date has be on the same day for now :,)");
        return;

      default:
        setError("");
    }

    const eventData = {
      name: modalTitleInputRef.current?.value ?? "",
      startDateTime: modalStartInputRef.current?.value ?? "",
      endDateTime: modalEndInputRef.current?.value ?? "",
      description: modalDescriptionInputRef.current?.value ?? "",
      theme:
        modalThemeInputRef.current?.value === ""
          ? "Personal"
          : (modalThemeInputRef.current?.value ?? ""),
    };

    await addEvent(eventData, setEvents, events);
    await fetchEvents();

    setIsOpen(false);

    modalTitleInputRef.current.value = "";
    modalDescriptionInputRef.current!.value = "";
    modalStartInputRef.current.value = "";
    modalEndInputRef.current.value = "";
  }

  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  return (
    <dialog
      ref={dialogRef}
      className="relative z-50 w-full max-w-md rounded-lg p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Schedule Event</h2>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <XIcon size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            required
            id="name"
            ref={modalTitleInputRef}
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-slate-500"
            placeholder="Enter event name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDateTime"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Start
            </label>
            <div className="relative">
              <input
                required
                id="startDateTime"
                ref={modalStartInputRef}
                type="datetime-local"
                min={currentDate}
                className="w-full rounded-md border border-gray-300 px-2 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="endDateTime"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              End
            </label>
            <div className="relative">
              <input
                required
                id="endDateTime"
                ref={modalEndInputRef}
                type="datetime-local"
                min={currentDate}
                className="w-full rounded-md border border-gray-300 px-2 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="theme"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Theme
          </label>
          <select
            ref={modalThemeInputRef}
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          >
            <option value="">Select a theme</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            ref={modalDescriptionInputRef}
            id="description"
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
            rows={3}
            placeholder="Enter event description"
          ></textarea>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2"
          >
            Save Event
          </button>
        </div>
      </form>
    </dialog>
  );
};

import React from "react";

type IconProps = {
  size?: number;
  className?: string;
};

export const XIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`feather feather-x ${className}`}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default ScheduleModal;
