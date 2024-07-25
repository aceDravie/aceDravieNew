import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Widget from "../components/Widget";

const RootLayout = () => {
  return (
    <Box>
      <Navbar />
      <Container sx={{ marginTop: "5rem" }}>
        <div className="widgets" style={{ display: "flex", gap: "1rem" }}>
          <Widget title="CUSTOMERS" collectionName="customers" />
          <Widget title="TOTAL REVENUE" collectionName="orders" />
          <Widget title="ORDERS" collectionName="orders" />
        </div>
      </Container>

      <Container maxWidth="xl" sx={{my: 2}}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default RootLayout;
