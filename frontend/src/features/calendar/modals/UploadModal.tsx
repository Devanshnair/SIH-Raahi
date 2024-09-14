import { useEffect, useRef, useState } from "react";
import { TOKEN } from "../../../App";
import { useMutation, useQueryClient } from "react-query";

function uploadEvents(fileData: FormData) {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "ngrok-skip-browser-warning": "true",
  };

  fetch("https://live-merely-drum.ngrok-free.app/api/upload-ics/", {
    method: "POST",
    body: fileData,
    headers: headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });
}

const UploadModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync: updateCalendarEvents, isLoading } = useMutation({
    mutationFn: async (fileData: FormData) => uploadEvents(fileData),
    onSuccess: () => {
      queryClient.invalidateQueries("calendarEvents");
    },
  });

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = modalFileInputRef.current?.files?.[0] || null;

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("File size should be less than 1MB");
      return;
    }

    setIsOpen(false);
    const fileData = new FormData();
    fileData.append("file", file);
    // console.log([...fileData.entries()]);

    updateCalendarEvents(fileData);

    setFileName("");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setError("");
    } else {
      setFileName("");
    }
  }

  return (
    <dialog ref={dialogRef} className="w-96 rounded-lg p-4 shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Upload ICS File</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">ICS file (MAX. 1MB)</p>
            </div>
            <input
              ref={modalFileInputRef}
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".ics"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {fileName && (
          <p className="text-sm text-gray-600">Selected file: {fileName}</p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none"
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
                Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default UploadModal;
