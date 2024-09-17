import { useEffect, useRef, useState } from "react";

import { Events } from "../modifyEvents";
import { format } from "date-fns";
import { updateEvent } from "../methods/updateEvent";
import { useMutation, useQueryClient } from "react-query";

type ScheduleModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateScheduleModal = ({ isOpen, setIsOpen }: ScheduleModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalTitleInputRef = useRef<HTMLInputElement>(null);
  const modalDescriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const modalStartInputRef = useRef<HTMLInputElement>(null);
  const modalEndInputRef = useRef<HTMLInputElement>(null);
  const modalThemeInputRef = useRef<HTMLSelectElement>(null);

  const [theme, setTheme] = useState();
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync: updateCalendarEvent, isLoading } = useMutation({
    mutationFn: (event: Events[0]) => updateEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries("calendarEvents");
    },
  });

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
      theme:
        modalThemeInputRef.current?.value === ""
          ? "Personal"
          : (modalThemeInputRef.current?.value ?? ""),
    };

    await updateCalendarEvent(data);
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
      data-eventid="1"
      className="relative z-50 w-full max-w-md rounded-lg"
    >
      <div className="bg-white p-5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Update Event</h2>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="update-modal-name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              required
              id="update-modal-name"
              ref={modalTitleInputRef}
              type="text"
              className="w-full rounded-md border border-gray-300 px-2 py-2 shadow-sm focus:border-slate-500"
              placeholder="Enter event name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="update-modal-startDateTime"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Start
              </label>
              <div className="relative">
                <input
                  required
                  id="update-modal-startDateTime"
                  ref={modalStartInputRef}
                  type="datetime-local"
                  min={currentDate}
                  className="w-full rounded-md border border-gray-300 px-2 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="update-modal-endDateTime"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                End
              </label>
              <div className="relative">
                <input
                  required
                  id="update-modal-endDateTime"
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
              htmlFor="update-modal-theme"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Theme
            </label>
            <select
              ref={modalThemeInputRef}
              id="update-modal-theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-1 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
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
              htmlFor="update-modal-description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              ref={modalDescriptionInputRef}
              id="update-modal-description"
              className="w-full rounded-md border border-gray-300 px-2 py-2 shadow-sm focus:border-slate-500 focus:ring-slate-500"
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
              disabled={isLoading}
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="-ml-1 mr-2 size-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateScheduleModal;
