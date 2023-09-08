import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DashBoardLayout,
  HomeLayout,
  Login,
  Register,
  Error,
  Landing,
  AddJob,
  AllJobs,
  Stats,
  Profile,
  Admin,
  EditJob,
} from "./pages";
// import as registerAction and called up below in the register router.
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
// loader
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobsLoader } from "./pages/AllJobs";
// jobs actions
import { action as addJobAction } from "./pages/AddJob";
// edit jobs action and loader.
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
// delete job action
import { action as deleteJobAction } from "./pages/DeleteJob";
// admin page loader.
import { loader as adminLoader } from "./pages/Admin";
// profile page action
import { action as profileAction } from "./pages/Profile";
// stats loader
import { loader as statsLoader } from "./pages/Stats";

// step 3 the default theme settled up here and called below  -- dark theme video
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

//step 4 called this function
const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    // This home route for this page , below pages are children
    // the routes are nested here inside. and used Outlet from react router dom to show up the navbar
    children: [
      {
        index: true,
        element: <Landing />,
      },
      // the landing is setup as front page of our site.
      // so, we included the landing pages here

      //  These are the components u can setup as component as either an element in top
      {
        path: "register",
        element: <Register />,
        action: registerAction, // registerAction is coming from axios by imported above.
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        // step 5 isDarkTheme enabled is used here
        element: <DashBoardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          { path: "stats", element: <Stats />, loader: statsLoader },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id", // "route":"params" to access for id to editJob
            element: <EditJob />,
            action: editJobAction, // get data loaded to server.
            loader: editJobLoader, // the action to submit the with request.
          },
          { path: "delete-job/:id", action: deleteJobAction },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout />,
//     errorElement: <Error />,
//     // This home route for this page , below pages are children
//     // the routes are nested here inside. and used Outlet from react router dom to show up the navbar
//     children: [
//       {
//         index: true,
//         element: <Landing />,
//       },
//       // the landing is setup as front page of our site.
//       // so, we included the landing pages here

//       //  These are the components u can setup as component as either an element in top
//       {
//         path: "register",
//         element: <Register />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "dashboard",
//         element: <DashBoardLayout />,
//       },
//     ],
//   },
// ]);
