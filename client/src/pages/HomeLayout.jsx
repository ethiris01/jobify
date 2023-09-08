import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <main>
      {/* <nav>Navbar</nav> */}
      <Outlet />
    </main>
  );
};
export default HomeLayout;
