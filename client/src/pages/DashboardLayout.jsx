import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import { useState, createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
// loader functionality with get current user
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};
// dark setup function first setup here and then mov to app.jsx
// why because every components should access this dark theme.

// step 2 switch up and check here and this main which moved to app.js

// const checkDefaultTheme = () => {
//   const isDarkTheme = localStorage.getItem("darkTheme") === "true";
//   document.body.classList.toggle("dark-theme", isDarkTheme);
//   return isDarkTheme;
// };

// step 5 it settled as prop in the dashboard
const DashboardContext = createContext();

const Dashboard = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData(); ///is used to load the data before the users.
  // user is getting from name property
  const navigate = useNavigate();

  // temp user const user = { name: "ethiris" };

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  // step 6 state is used here to work on the flow

  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  //step1 set up the function
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    // set show sidebar is set opposite to show sidebar
  };
  //logout User
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out!");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />{" "}
              {/* The user functionality works on main dashboard page*/}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;

// import Wrapper from "../assets/wrappers/Dashboard";
// import { BigSidebar, Navbar, SmallSidebar } from "../components";
// import { createContext, useContext, useState } from "react";

// const DashboardContext = createContext();

// const DashboardLayout = () => {
//   //temp
//   const user = { name: "John" };
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleDarkTheme = () => {
//     console.log("toggle dark theme");
//   };
//   const toggleSideBar = () => {
//     setShowSidebar(!showSidebar);
//   };
//   const logoutUser = async () => {
//     console.log("logout user");
//   };

//   return (
//     <DashboardContext.Provider
//       value={{
//         user,
//         showSidebar,
//         isDarkTheme,
//         toggleDarkTheme,
//         toggleSideBar,
//         logoutUser,
//       }}
//     >
//       <Wrapper>
//         <main className="dashboard">
//           <SmallSidebar />
//           <BigSidebar />
//         </main>
//         <div>
//           <Navbar />
//           <div className="dashboard-page">
//             <Outlet />
//           </div>
//         </div>
//       </Wrapper>
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboardContext = () => useContext(DashboardContext);
// export default DashboardLayout;

// setIsDarkTheme
