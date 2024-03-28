import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Applications } from "./pages/Applications";
import { Registration } from "./pages/Registration";
import { Address } from "./pages/Address";
import { Alice } from "./pages/Alice";
import { Login } from "./pages/Login";
import { AddApplication } from "./pages/AddApplication";

import { Drawer } from "./components/Drawer";

import "./App.scss";
import { DrawerMob } from "./components/DrawerMob.jsx";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const UserData = useSelector((state) => state.auth.data);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
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
