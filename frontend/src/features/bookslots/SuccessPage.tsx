import React, { useEffect } from "react";
import { Check, Calendar, Download, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const CustomAlert = ({ icon: Icon, title, description }) => (
  <div className="flex items-start space-x-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
    <div className="flex-shrink-0">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-medium text-blue-800">{title}</h3>
      <p className="mt-1 text-sm text-blue-600">{description}</p>
    </div>
  </div>
);

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`rounded-md px-4 py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

const SuccessPage = () => {
  const [copied, setCopied] = React.useState(false);

  const transactionDetails = {
    mentorName: "Vinayak Mohanty",
    date: "October 15, 2024",
    time: "2:00 PM - 3:00 PM",
    topic: "Career Advancement in Tech",
    transactionId: "BOOK-123456789",
  };

  useEffect(() => {
    const duration = 200;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const makeConfetti = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(makeConfetti);
      }
    };

    makeConfetti();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(transactionDetails, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    alert("PDF download functionality is not implemented in this demo.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Booking Confirmed!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get ready for an amazing session with your mentor.
          </p>
        </div>

        <CustomAlert
          icon={Calendar}
          title="Mark Your Calendar"
          description={`Your meeting is scheduled for ${transactionDetails.date} at ${transactionDetails.time}.`}
        />

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Transaction Details
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Mentor</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transactionDetails.mentorName}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transactionDetails.date}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transactionDetails.time}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Topic</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transactionDetails.topic}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Transaction ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transactionDetails.transactionId}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleCopy}
            className="flex-1 bg-slate-900 hover:bg-slate-900 focus:ring-slate-700"
          >
            <Link to={"/"}>
            <div className="flex items-center justify-center gap-2">
              {/* {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Details"} */} 
              <p>Back to Home</p>
              <BiRightArrowAlt className="text-white h-7 w-7 pt-1"/>
            </div></Link>
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-slate-900 hover:bg-slate-900 focus:ring-slate-700"
          >
            <div className="flex items-center justify-center">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
