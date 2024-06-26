import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth, selectUserData } from "./redux/slices/auth";
import { fetchAddresses } from "./redux/slices/address";
import { fetchApplications, fetchOptions } from "./redux/slices/application";
import { fetchAppeals } from "./redux/slices/appeal";

import { Header, Footer, Drawer, DrawerMob, CustomDrawer } from "./components";
import {
  Home,
  Applications,
  Registration,
  Address,
  Alice,
  Login,
  AddApplication,
  Appeals,
  AddAppeal,
} from "./pages";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const UserData = useSelector(selectUserData);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchAddresses());
      dispatch(fetchApplications());
      dispatch(fetchAppeals());
      dispatch(fetchOptions());
    }
  }, [isAuth, dispatch]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 600);
  };

  React.useEffect(() => {
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
          <Route path="/appeals" element={<Appeals />} />
          <Route path="/add-appeal" element={<AddAppeal />} />
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
