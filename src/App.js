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

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const UserData = useSelector((state) => state.auth.data);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const [drawerOpened, setDrawerOpened] = React.useState(false);

  const location = useLocation();
  const hideForRoutes = ["/login", "/register"];

  return (
    <>
      {!hideForRoutes.includes(location.pathname) && (
        <Header onClickCart={() => setDrawerOpened}></Header>
      )}

      {drawerOpened && isAuth && (
        <Drawer
          onClose={() => setDrawerOpened()}
          onExit={() => setDrawerOpened()}
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
  );
}

export default App;
