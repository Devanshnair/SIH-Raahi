import { baseURL } from "../../../App";

export async function fetchMentorDetails(id: string) {
  console.log(id);
  const URL = `${baseURL}/api/mentor/${id}/`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
