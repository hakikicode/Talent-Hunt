import { createBrowserRouter } from "react-router-dom";

import Main from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllContests from "../pages/AllContests";
import ContestDetails from "../pages/ContestDetails";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import MyRegisteredContest from "../pages/user/MyRegisteredContest";
import MyWinningContest from "../pages/user/MyWinningContest";
import MyProfile from "../pages/user/MyProfile";
import AddContest from "../pages/creator/AddContest";
import ManageUser from "../pages/admin/ManageUser";
import ManageContest from "../pages/admin/ManageContest";
import MyCreatedContest from "../pages/creator/MyCreatedContest";
import UpdateContest from "../pages/creator/UpdateContest";
import ContestRegistration from "../pages/ContestRegistration";
import ContestSubmission from "../pages/creator/ContestSubmission";
import TaskSubmission from "../pages/user/TaskSubmission";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import LeaderBoard from "../pages/LeaderBoard";
import BuyCredits from "../pages/BuyCredits";
import AdminDashboard from "../pages/admin/AdminDashboard";

import Voting from "../pages/Voting"; // path to vote
import Payment from "../pages/Payment";
import Admin from "../pages/Admin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contests",
        element: <AllContests />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoard />,
      },
      {
        path: "/credits/buy",
        element: (
          <CreatorRoute>
            <BuyCredits />
          </CreatorRoute>
        ),
      },
      {
        path: "/contests/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/contests/:contestId/register",
        element: (
          <PrivateRoute>
            <ContestRegistration />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user routes
      {
        path: "registered-contests",
        element: <MyRegisteredContest />,
      },
      {
        path: "task/:contestId",
        element: <TaskSubmission />,
      },
      {
        path: "winning-contests",
        element: <MyWinningContest />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
      // creator routes
      {
        path: "contests/new",
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "contests/:id/update",
        element: <UpdateContest />,
      },
      {
        path: "creator/contests",
        element: <MyCreatedContest />,
      },
      {
        path: "contests/:id/submissions",
        element: <ContestSubmission />,
      },
      // admin routes
      {
        path: "admin-stats",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "contests",
        element: (
          <AdminRoute>
            <ManageContest />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Registration />
      </PublicRoute>
    ),
  },
  {
    path: "/vote",
    element: <Voting />, // Public access now
  },
  {
    path: "/payment",
  element: <Payment />,
  },   
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Registration />
      </PublicRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PublicRoute>
        <Admin />
      </PublicRoute>
    ),
  },
]);

export default router;
