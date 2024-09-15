import { format } from "date-fns";

const testimonials = [
  {
    rating: 5,
    text: "The mentorship session was incredibly insightful and helpful. I learned a lot and feel more confident in my skills.  I would highly recommend this mentor to anyone looking to improve their skills.",
    author: "John Doe",
    date: "2023-10-01",
  },
  {
    rating: 5,
    text: "Fantastic experience! Highly recommend.",
    author: "Charlie Davis",
    date: "2023-10-05",
  },
  {
    rating: 4,
    text: "I learned a lot and feel more confident. The mentor was very knowledgeable. The mentor was very knowledgeable.",
    author: "Jane Smith",
    date: "2023-10-02",
  },
  {
    rating: 5,
    text: "Excellent session! I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills.",
    author: "Alice Johnson",
    date: "2023-10-03",
  },
  {
    rating: 5,
    text: "Excellent session! The mentor was very knowledgeable. I learned a lot and feel more confident in my skills. I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills.",
    author: "Alice Johnson",
    date: "2023-10-03",
  },
  {
    rating: 3,
    text: "It was good, but I wish there was more time for questions. I learned a lot and feel more confident in my skills I learned a lot and feel more confident in my skills.",
    author: "Bob Brown",
    date: "2023-10-04",
  },

  {
    rating: 4,
    text: "Great session. I learned a lot and feel more confident in my skills. I learned a lot and feel more confident in my skill.",
    author: "Jane Smith",
    date: "2023-10-02",
  },
];

const data = {
  overAllRating: (
    testimonials.reduce((acc, testimonial) => (acc += testimonial.rating), 0) /
    testimonials.length
  ).toFixed(1),
  testimonialsCount: testimonials.length,
  testimonials: testimonials,
};

const Testimonials = () => {
  console.log(data);
  return (
    <div className="my-2 mr-2 min-h-[calc(100vh-1rem)] rounded-lg bg-white pb-4 shadow-sm">
      <h3 className="border-b p-6 px-8 text-3xl font-semibold text-slate-800">
        Testimonials
      </h3>

      <div className="px-8">
        <div className="mb-2 mt-6 flex gap-4">
          <div className="rounded-xl bg-slate-100 p-6 pb-2 text-center">
            <p className="text-4xl font-semibold text-slate-800">
              {data.overAllRating}/5
            </p>
            <p className="my-2.5 font-medium text-slate-500">Over All Rating</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-6 pb-2 text-center">
            <p className="text-4xl font-semibold text-slate-800">
              {data.testimonialsCount}
            </p>
            <p className="my-2.5 font-medium text-slate-500">Testimonials</p>
          </div>
        </div>
        <div className="columns-xs">
          {data.testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

type Testimonial = {
  rating: number;
  text: string;
  author: string;
  date: string;
};

type TestimonialCardProps = {
  testimonial: Testimonial;
};

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { rating, author, date, text } = testimonial;
  return (
    <div className="mt-4 inline-block w-full rounded-xl bg-slate-100 p-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
        <span className="-mt-[2px]">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 576 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
          </svg>
        </span>{" "}
        {rating}/5
      </div>
      <p className="mt-2 text-slate-500">{text}</p>
      <div className="mt-4 grid">
        <p className="font-medium">{author}</p>
        <time
          dateTime={format(date, "dd mmm yyyy")}
          className="text-sm text-slate-500"
        >
          {format(date, "do MMM, yyyy")}
        </time>
      </div>
    </div>
  );
}

export default Testimonials;
