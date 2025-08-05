import { Container, useTheme } from "@mui/material";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Crm from "./pages/Crm";
import CallbackAuth from "./CallbackAuth";
import Users from "./pages/Settings/Users";
import Departments from "./pages/Settings/Departments";
import Positions from "./pages/Settings/Positions";
import Provinces from "./pages/Settings/Provinces";
import Wards from "./pages/Settings/Wards";
import Streets from "./pages/Settings/Streets";
import RequireAuth from "./pages/RequireAuth";
import AccessDeny from "./pages/AccessDeny";
import { useEffect } from "react";
import Customers from "./pages/Customers/Customers";
import Contracts from "./pages/Contracts/Contracts";
import CableLines from "./pages/CableLines/CableLines";
import Incidents from "./pages/Incidents/Incidents";

function App() {
  const theme = useTheme();
  useEffect(() => {
    const themeColor = theme.palette.mode === "dark" ? "#273240" : "#ffffff";
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }
  }, [theme]);

  return (
    <>
      <BrowserRouter basename="/">
        <Container
          disableGutters
          maxWidth="false"
          sx={{ height: "100vh", overflow: "hidden" }}
        >
          <Routes>
            <Route
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route path="/" element={<Crm />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/cable-lines" element={<CableLines />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/settings/users" element={<Users />} />
              <Route path="/settings/departments" element={<Departments />} />
              <Route path="/settings/positions" element={<Positions />} />
              <Route path="/settings/provinces" element={<Provinces />} />
              <Route path="/settings/wards" element={<Wards />} />
              <Route path="/settings/streets" element={<Streets />} />
            </Route>
            <Route path="/callback" element={<CallbackAuth />} />
            <Route path="/access-deny" element={<AccessDeny />} />
            {/*<Route path="*" element={<AccessDeny />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
