import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./helpers/Theme";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLayout from "./layout/RootLayout";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import SampFoods from "./components/SampFoods";
import AllCategoryFoods from "./components/AllCategoryFoods";
import AllFoods from "./components/AllFoods";
import Orders from "./components/Orders";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
         
          <Route path="register" element={<Register />} />
          <Route
            path="/dashboard/:clientID"
            element={
              <RequireAuth>
                <RootLayout />
              </RequireAuth>
            }
          >
             <Route path="" element={<Dashboard />} >
             <Route index element={<SampFoods />} />
              <Route path=":categoryID" element={<AllCategoryFoods />} />
              <Route path="all" element={<AllFoods />} /></Route>
          </Route>
          <Route path="orders" element={<Orders />} />
         
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
