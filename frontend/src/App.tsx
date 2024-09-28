import "./index.css";
import { LoginProvider } from "./context/LoginContext";

import Dashboard from "./Pages/AdminPanel/Home/Home";
import Chatbot from "./Pages/Chatbot";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import MainLayout from "./layout/MainLayout";
import LandingPage from "./Pages/LandingPage/LandingPage";
import CalendarView from "./features/calendar/CalendarView";
import BookSlots from "./features/bookslots/BookSlots";
import MentorExplorePage, {
  MentorDetails,
} from "./Pages/mentorExplorationPage/MentorExplorePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/Register/Register";
import AddPost from "./Pages/AddPost/AddPost";
import RoomPage from "./Pages/Videocalling/RoomPage";
import DashboardLayout from "./layout/DashboardLayout";
import Testimonials from "./Pages/AdminPanel/Testimonials/Testimonials";
import Bookings from "./Pages/AdminPanel/Bookings/Bookings";
import Availability from "./Pages/AdminPanel/availability/Availability";
import Analytics from "./Pages/AdminPanel/Analytics/Analytics";
import Forum from "./features/forums/Forums";
import ThreadPage from "./features/forums/ThreadPage";
import { useState } from "react";
import SuccessPage from "./features/bookslots/SuccessPage";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Snippets from "./Pages/Snippets/Snippets";

const queryClient = new QueryClient();

export const baseURL = "https://sudormrf.pythonanywhere.com";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3NTQ0MTk0LCJpYXQiOjE3Mjc1NDA1OTQsImp0aSI6ImExZWZjZGM1OTc5ZjQ4NzI4ZDYyMGRkYWJlOTkxNTVkIiwidXNlcl9pZCI6MSwiZW1haWwiOiJ2aW5heWFrOTc2OTZAZ21haWwuY29tIiwibmFtZSI6IkpvaG4gRG9lIn0.DJFX02cdm5Lxyckbht76JOWdcYuPqoPF-MdwimbKsOs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/chatbot" element={<Chatbot />} />

          <Route path="forum">
            <Route index element={<Forum />} />
            <Route path="/forum/thread/:threadId" element={<ThreadPage />} />
          </Route>

          <Route path="mentors">
            <Route
              loader={MentorDetails}
              path="/mentors/explore"
              element={<MentorExplorePage />}
            />
            <Route path="/mentors/reels" element={<Snippets />} />
            <Route path="/mentors/book/:mentorId" element={<BookSlots />} />
            <Route path="/mentors/success" element={<SuccessPage />} />
          </Route>
        </Route>
        ,
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/home" element={<Dashboard />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/testimonials" element={<Testimonials />} />
          <Route path="/dashboard/availability" element={<Availability />} />
          <Route path="/dashboard/calendar" element={<CalendarView />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/edit-profile" element={<EditProfile />} />
        </Route>
      </>,
    ),
  );

  return (
    <>
      <LoginProvider value={{ isLoggedIn, setIsLoggedIn }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </LoginProvider>
    </>
  );
}

export default App;
