import { useQuery } from "react-query";
import { baseURL } from "../../../App";

export type MentorDetails = {
  id: number;
  name: string;
  profession: string;
  experience: number;
  rating: string;
  price: number;
  bio: string;
};

async function fetchMentorDetails(id: string): Promise<MentorDetails> {
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

export const useMentorDetails = (id: string) => {
  return useQuery({
    queryKey: ["mentorDetails"],
    queryFn: () => fetchMentorDetails(id),
    refetchOnWindowFocus: false,
  });
};
