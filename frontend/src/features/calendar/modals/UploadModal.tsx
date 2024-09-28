import { useRef, useState } from "react";
import { baseURL, TOKEN } from "../../../App";
import { useMutation, useQueryClient } from "react-query";

async function uploadEvents(fileData: FormData) {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "ngrok-skip-browser-warning": "true",
  };

  const response = await fetch(`${baseURL}/api/upload-ics/`, {
    method: "POST",
    body: fileData,
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

const UploadModal = ({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
}) => {
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const queryClient = useQueryClient();

  const { mutate: updateCalendarEvents, isLoading } = useMutation({
    mutationFn: (fileData: FormData) => uploadEvents(fileData),
    onSuccess: () => {
      queryClient.invalidateQueries("calendarEvents");
    },
  });

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

    dialogRef.current?.close();
    const fileData = new FormData();
    fileData.append("file", file);
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
            onClick={() => dialogRef.current?.close()}
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
                    strokeWidth="4"
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

      {/* Separator */}
      <div className="mt-4 flex justify-center">
        <span className="flex items-center">
          <div>-</div>or<div>-</div>
        </span>
      </div>

      {/* Integrate with Calendly Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="mx-auto my-4 flex items-center rounded-xl border border-gray-300 px-4 py-1 text-sm font-medium text-slate-800 shadow-sm transition duration-150 ease-in-out hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="katman_1"
            x="0px"
            y="0px"
            viewBox="0 0 841.89 595.28"
            className="size-11"
          >
            <path
              fill="#3664AE"
              d="M505.27,365.28c-14.79,12.86-33.19,28.86-66.71,28.86h-20.01c-24.22,0-46.25-8.62-62.01-24.28  c-15.39-15.3-23.89-36.22-23.89-58.94v-26.87c0-22.72,8.48-43.66,23.89-58.94c15.77-15.66,37.79-24.28,62.01-24.28h20.01  c33.51,0,51.92,16,66.71,28.86c15.34,13.34,28.59,24.86,63.89,24.86c5.48,0,10.86-0.43,16.09-1.26c-0.04-0.11-0.08-0.2-0.12-0.3  c-2.1-5.1-4.57-10.12-7.42-14.96l-23.6-40.1c-21.65-36.8-61.68-59.46-104.98-59.46h-47.21c-43.3,0-83.33,22.67-104.98,59.46  l-23.6,40.1c-21.65,36.8-21.65,82.12,0,118.91l23.6,40.1c21.65,36.8,61.68,59.45,104.98,59.45h47.21  c43.3,0,83.33-22.67,104.98-59.45l23.6-40.1c2.85-4.85,5.32-9.85,7.42-14.95c0.04-0.11,0.08-0.2,0.12-0.3  c-5.23-0.83-10.59-1.26-16.09-1.26C533.87,340.42,520.61,351.94,505.27,365.28z"
            />
            <path
              fill="#3664AE"
              d="M438.57,225.16h-20.01c-36.86,0-61.09,25.83-61.09,58.89v26.87c0,33.06,24.22,58.89,61.09,58.89h20.01  c53.71,0,49.49-53.72,130.59-53.72c7.77,0,15.45,0.7,22.92,2.06c2.46-13.66,2.46-27.64,0-41.31c-7.48,1.36-15.15,2.06-22.92,2.06  C488.06,278.89,492.28,225.16,438.57,225.16z"
            />
            <path
              fill="#3664AE"
              d="M638.66,337.76c-13.85-10.02-29.74-16.56-46.59-19.64c-0.03,0.13-0.04,0.26-0.07,0.39  c-1.44,7.87-3.69,15.62-6.77,23.14c14.22,2.26,27.32,7.5,38.52,15.55c-0.04,0.12-0.07,0.24-0.11,0.37  c-6.46,20.57-16.2,39.96-28.93,57.6c-12.58,17.42-27.79,32.76-45.22,45.57c-36.18,26.62-79.27,40.68-124.63,40.68  c-28.08,0-55.31-5.39-80.94-16.02c-24.75-10.27-46.99-24.98-66.11-43.73c-19.11-18.75-34.1-40.56-44.57-64.85  c-10.83-25.14-16.33-51.85-16.33-79.4c0-27.55,5.5-54.26,16.33-79.4c10.47-24.28,25.46-46.1,44.57-64.85  c19.11-18.75,41.35-33.45,66.11-43.73c25.62-10.63,52.85-16.02,80.94-16.02c45.36,0,88.45,14.06,124.63,40.68  c17.43,12.82,32.63,28.15,45.22,45.57c12.73,17.65,22.47,37.04,28.93,57.6c0.04,0.13,0.08,0.25,0.11,0.37  c-11.19,8.04-24.3,13.3-38.52,15.55c3.08,7.53,5.34,15.3,6.77,23.17c0.03,0.13,0.04,0.25,0.07,0.38  c16.85-3.08,32.73-9.62,46.59-19.64c13.28-9.64,10.71-20.53,8.69-26.99C618.08,136.9,529.55,69.12,424.87,69.12  c-128.55,0-232.75,102.22-232.75,228.32c0,126.1,104.21,228.32,232.75,228.32c104.68,0,193.21-67.79,222.48-161.05  C649.38,358.29,651.96,347.41,638.66,337.76z"
            />
            <path
              fill="#5FC2D6"
              d="M585.25,253.26c-5.23,0.83-10.59,1.26-16.09,1.26c-35.29,0-48.55-11.52-63.89-24.86  c-14.79-12.86-33.19-28.86-66.71-28.86h-20.01c-24.22,0-46.25,8.62-62.01,24.28c-15.39,15.3-23.89,36.22-23.89,58.94v26.87  c0,22.72,8.48,43.66,23.89,58.94c15.77,15.66,37.79,24.28,62.01,24.28h20.01c33.51,0,51.92-16.01,66.71-28.86  c15.34-13.34,28.59-24.86,63.89-24.86c5.48,0,10.86,0.43,16.09,1.26c3.08-7.52,5.32-15.28,6.77-23.14c0.03-0.13,0.04-0.26,0.07-0.39  c-7.48-1.36-15.15-2.06-22.92-2.06c-81.1,0-76.88,53.72-130.59,53.72h-20.01c-36.86,0-61.09-25.83-61.09-58.89v-26.87  c0-33.06,24.22-58.89,61.09-58.89h20.01c53.71,0,49.5,53.72,130.59,53.72c7.77,0,15.45-0.7,22.92-2.06  c-0.03-0.13-0.04-0.25-0.07-0.38C590.59,268.56,588.33,260.8,585.25,253.26z"
            />
            <path
              fill="#5FC2D6"
              d="M585.25,253.26c-5.23,0.83-10.59,1.26-16.09,1.26c-35.29,0-48.55-11.52-63.89-24.86  c-14.79-12.86-33.19-28.86-66.71-28.86h-20.01c-24.22,0-46.25,8.62-62.01,24.28c-15.39,15.3-23.89,36.22-23.89,58.94v26.87  c0,22.72,8.48,43.66,23.89,58.94c15.77,15.66,37.79,24.28,62.01,24.28h20.01c33.51,0,51.92-16.01,66.71-28.86  c15.34-13.34,28.59-24.86,63.89-24.86c5.48,0,10.86,0.43,16.09,1.26c3.08-7.52,5.32-15.28,6.77-23.14c0.03-0.13,0.04-0.26,0.07-0.39  c-7.48-1.36-15.15-2.06-22.92-2.06c-81.1,0-76.88,53.72-130.59,53.72h-20.01c-36.86,0-61.09-25.83-61.09-58.89v-26.87  c0-33.06,24.22-58.89,61.09-58.89h20.01c53.71,0,49.5,53.72,130.59,53.72c7.77,0,15.45-0.7,22.92-2.06  c-0.03-0.13-0.04-0.25-0.07-0.38C590.59,268.56,588.33,260.8,585.25,253.26z"
            />
          </svg>{" "}
          Integrate with Calendly
        </button>
      </div>
    </dialog>
  );
};

export default UploadModal;
