import "./index.css";

import Dashboard from "./Pages/AdminPanel/Dashboard/Dashboard";
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
import MentorExplorePage from "./Pages/mentorExplorationPage/MentorExplorePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/Register/Register";
import Insights from "./Pages/Insights/Insights";
import AddPost from "./Pages/AddPost/AddPost";
import EditProfile from "./Pages/EditProfile/EditProfile";
import RoomPage from "./Pages/Videocalling/RoomPage";
import DashboardLayout from "./layout/DashboardLayout";
import Testimonials from "./Pages/AdminPanel/Testimonials/Testimonials";
import Bookings from "./Pages/AdminPanel/Bookings/Bookings";
import Availability from "./Pages/AdminPanel/availability/Availability";
import Analytics from "./Pages/AdminPanel/Analytics/Analytics";

const queryClient = new QueryClient();

export const baseURL = "https://annoyed-mollee-sudo-rm-rf-83c225c7.koyeb.app";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2Mzk1MzE5LCJpYXQiOjE3MjYzNTIxMTksImp0aSI6IjMzYjI2Njg5NjQyNjRjZjNhN2ViZTNlMjYxN2NlOGMyIiwidXNlcl9pZCI6MX0.dGr6Q9DYtw2fLaJv1OJf1aUjR_E4bCA8h54IttBIxtI";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="user">
            <Route path="/user/chatbot" element={<Chatbot />} />
          </Route>
          <Route path="mentors">
            <Route path="/mentors/explore" element={<MentorExplorePage />} />
            <Route path="/mentors/reels" element={<Insights />} />
            <Route path="/mentors/book/:mentorId" element={<BookSlots />} />
          </Route>
        </Route>
        ,
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/home" element={<Dashboard />} />
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/edit-profile" element={<EditProfile />} />
          <Route path="/dashboard/testimonials" element={<Testimonials />} />
          <Route path="/dashboard/availability" element={<Availability />} />
          <Route path="/dashboard/calendar" element={<CalendarView />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
        </Route>
      </>,
    ),
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
