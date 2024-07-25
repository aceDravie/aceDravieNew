import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Button,
  Menu,
  MenuItem,
 
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { collection, onSnapshot, query, doc, getDoc } from "firebase/firestore";
import { db } from "../helpers/firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const Customers = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportExcel = () => {
    console.log("excel printing");
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(
      orders.map((order) => ({
        "OrderTime": order.orderTime,
        "Order Type": order.orderType,
        "Total Price": order.totalPrice,
        "Customer Name": customers[order.clientId] || "Unknown",
        "DeliveryGuy Name": order.deliveryGuy?.name || "N/A",
      }))
    );

    XLSX.utils.book_append_sheet(workBook, workSheet, "Students Houses");
    XLSX.writeFile(workBook, "student-houseItems.xlsx");
  };

  const handleExportPDF = () => {
    console.log("pdf printing");

    const doc = new jsPDF();
    doc.text("All Orders", 20, 10);
    doc.autoTable({
      head: [["Time", "Type", "Price", "Customer Name", "DeliveryGuy Name"]],
      body: orders.map((order) => [
        order.orderTime,
        order.orderType,
        order.totalPrice,
        customers[order.clientId] || "Unknown",
        order.deliveryGuy?.name || "N/A",
      ]),
    });
    doc.save("Orders.pdf");
  };

  useEffect(() => {
    const ordersCollection = collection(db, "customers");
    const q = query(ordersCollection);

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const customersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCustomers(customersList);
      console.log(customers);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const showPrints = () => {};

  return (
    <>
      <div>
        <Button
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          sx={{ mb: 2, mt: -4 }}
        >
          PRINT ORDERS
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleExportPDF}>
            <Button
              sx={{
                "&:hover": {
                  background: "#1565C0",
                  color: "white",
                },
              }}
            >
              PDF
            </Button>
          </MenuItem>
          <MenuItem onClick={handleExportExcel}>
            <Button
              sx={{
                "&:hover": {
                  background: "#1565C0",
                  color: "white",
                },
              }}
            >
              Excel
            </Button>
          </MenuItem>
        </Menu>
      </div>

      <TableContainer component={Paper}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  {customer.nickName} {customer.lastName}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.contact}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>
                  GH₵ {parseFloat(customer.totalAmount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
    </>
  );
};

export default Customers;