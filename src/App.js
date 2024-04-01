import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth, selectUserData } from "./redux/slices/auth";
import { fetchAddresses } from "./redux/slices/address.js";
import { fetchApplications } from "./redux/slices/application.js";

import { Header, Footer, Drawer, DrawerMob } from "./components";
import {
  Home,
  Applications,
  Registration,
  Address,
  Alice,
  Login,
  AddApplication,
} from "./pages";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const UserData = useSelector(selectUserData);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchAddresses());
    dispatch(fetchApplications());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    console.log(isMobile);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [drawerOpened, setDrawerOpened] = React.useState(false);
  const [profileOpened, setProfileOpened] = React.useState(false);

  const location = useLocation();
  const hideForRoutes = ["/login", "/register"];

  return !isMobile ? (
    <>
      {!hideForRoutes.includes(location.pathname) && (
        <Header
          onClickProfile={() => setProfileOpened}
          isMobile={isMobile}
        ></Header>
      )}

      {profileOpened && isAuth && (
        <Drawer
          onClose={() => setProfileOpened()}
          onExit={() => setProfileOpened()}
          data={UserData}
        ></Drawer>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/address" element={<Address />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/alice" element={<Alice />} />
          <Route path="/add-application" element={<AddApplication />} />
        </Routes>
      </main>
      {!hideForRoutes.includes(location.pathname) && <Footer></Footer>}
    </>
  ) : (
    <>
      {!hideForRoutes.includes(location.pathname) && (
        <Header
          onClickDrawer={() => setDrawerOpened}
          drawerOpened={drawerOpened}
          isMobile={isMobile}
        ></Header>
      )}

      <main>
        {!drawerOpened ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/address" element={<Address />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/alice" element={<Alice />} />
            <Route path="/add-application" element={<AddApplication />} />
          </Routes>
        ) : (
          <DrawerMob></DrawerMob>
        )}
      </main>
    </>
  );
}

export default App;
