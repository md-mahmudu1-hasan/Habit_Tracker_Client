import { createBrowserRouter } from "react-router";
import Mainmother from "../Layout/Mainmother";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import My_Habit from "../Pages/My Habit/My_Habit";
import PrivetRoute from "../Authentication/PrivetRoute/PrivetRoute";
import ForgetPassword from "../Authentication/Login/ForgetPassword";
import HabitDetails from "../Pages/Home/HabitDetails";
import BrowesPublic from "../Pages/BrowesPublic/BrowesPublic";
import AddHabit from "../Pages/AddHabit/AddHabit";
export const route = createBrowserRouter([
  {
    path: "/",
    element: <Mainmother></Mainmother>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/my-habits",
        element: (
          <PrivetRoute>
            <My_Habit></My_Habit>
          </PrivetRoute>
        ),
      },
      {
        path: "/forget-password",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "habitDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/habits/${params.id}`),
        element: (
          <PrivetRoute>
            <HabitDetails></HabitDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "/browse-public",
        element: <BrowesPublic></BrowesPublic>,
      },
      {
        path: "/add-habit",
        element: (
          <PrivetRoute>
            <AddHabit></AddHabit>
          </PrivetRoute>
        ),
      },
    ],
  },
]);
