import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./helpers/Theme";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import AllFoods from "./pages/AllFoods";
import Customers from "./components/Customers";
import TotalRevenue from "./components/TotalRevenue";
const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/:adminID"
            element={
              <RequireAuth>
                <RootLayout />
              </RequireAuth>
            }
          >
            <Route path="" element={<Dashboard />} />
            <Route path="allFoods" element={<AllFoods />} />
            <Route path="customers" element={<Customers />} />
            <Route path="totalRevenue" element={<TotalRevenue />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
