import { useEffect, useState } from "react";
import BookSlotsCalendar from "./BookSlotsCalendar";
import { useQuery } from "react-query";
import { fetchMentorDetails } from "./methods/fetchMentorDetails";
import { useParams } from "react-router-dom";

const useMentorDetails = (id: string) => {
  return useQuery({
    queryKey: ["mentorDetails"],
    queryFn: () => fetchMentorDetails(id),
  });
};

const BookSlots = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const { data, isLoading, error, isError } = useMentorDetails(mentorId ?? "1");
  const [mentorDetails, setMentorDetails] = useState({
    id: 1,
    name: "Mr. Monty",
    profession: "Masochist",
    experience: 5,
    rating: "5.0",
    price: 200,
    bio: "masochist",
  });

  useEffect(() => {
    if (data) {
      setMentorDetails(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading mentor details...</div>;
  }

  if (isError) {
    return <div>Error fetching mentor details: {(error as Error).message}</div>;
  }

  return (
    <div className="grid min-h-screen grid-cols-2 place-items-center bg-slate-100 max-md:grid-cols-1">
      <div className="grid place-items-center px-4">
        <div className="max-w-64 overflow-hidden rounded-full max-md:mt-8">
          <picture className="">
            <img
              src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
              alt="mentors image"
              className="aspect-square size-full object-cover"
            />
          </picture>
        </div>
        <div className="mt-4 max-w-lg text-center">
          <h2 className="text-lg font-medium text-slate-800">
            {mentorDetails.name}
          </h2>
          <p className="text-slate-500">{mentorDetails.profession}</p>

          <p className="mt-2 text-slate-500">
            {mentorDetails.name} is a professional {mentorDetails.profession}{" "}
            {mentorDetails.bio}
          </p>
        </div>
        <div className="mt-6 grid w-full max-w-lg gap-2">
          <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="grid size-12 place-items-center rounded-full bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Experience
                </p>
                <p className="text-lg font-semibold text-slate-700">
                  {mentorDetails.experience} Years
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid size-12 place-items-center rounded-full bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Rating</p>
                <p className="text-lg font-semibold text-slate-700">
                  5.0 (69+)
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-white px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="grid size-12 place-items-center rounded-full bg-slate-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-700">
                  ${mentorDetails.price}
                </p>
                <p className="text-sm font-medium text-slate-500">
                  Consultation fee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-xl max-md:mt-10 max-md:px-4">
        <div className="mx-auto w-full max-w-2xl">
          <h3 className="px-3 py-2 font-medium text-slate-800">
            Available Time
          </h3>
          <BookSlotsCalendar mentorId={mentorId ?? ""} />
        </div>
      </div>
    </div>
  );
};

export default BookSlots;
