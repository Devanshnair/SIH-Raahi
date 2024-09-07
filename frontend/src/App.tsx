import "./index.css";

import Dashboard from "./Pages/MentorDashboard/Dashboard";
import Chatbot from "./Pages/Chatbot";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import LandingPage from "./Pages/LandingPage/LandingPage";
import SetAvailability from "./features/availability/SetAvailability";
import CalendarView from "./features/calendar/CalendarView";
import BookSlots from "./features/bookslots/BookSlots";
import { QueryClient, QueryClientProvider } from "react-query";
import MentorExPg from "./Pages/mentorExploratnPg/MentorExPg";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/Register/Register";
import Insights from "./Pages/Insights/Insights";
import AddPost from "./Pages/AddPost/AddPost";
import EditProfile from "./Pages/EditProfile.tsx/EditProfile";
import RoomPage from "./Pages/Videocalling/Room";

const queryClient = new QueryClient();

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzI2ODQ3LCJpYXQiOjE3MjUzMjMyNDcsImp0aSI6ImM3NjVhNGNmZTI4ODQ5MTY5ZDRkYTg4MGE0YTlhZjIxIiwidXNlcl9pZCI6MX0.cnKGCMfV-xM6NkvHpgzgDh-2fzEZA1kgMFNrko7H9XE";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="user">
          <Route path="/user/my-calendar" element={<CalendarView />} />
          <Route path="/user/my-availability" element={<SetAvailability />} />
          <Route path="/user/chatbot" element={<Chatbot />} />
          <Route path="user/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="mentors">
          <Route path="/mentors/explore" element={<MentorExPg />} />
          <Route path="/mentors/reels" element={<Insights />} />
          <Route path="/mentors/book/:mentorId" element={<BookSlots />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
