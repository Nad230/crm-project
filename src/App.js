import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from './pages/Dashboard';
import Leads from "./pages/leads";
import Activity from "./pages/Activity";
import AddNewLead from "./pages/AddNewLead";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import AddCustomer from "./pages/AddCustomer";
import CustomerDetails from "./pages/CustomerDetails";
import Customer from "./pages/Customers";
import { Home } from "@mui/icons-material";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/activity" element={<Activity />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> {/* Fixed typo here */}
        <Route path="/leads" element={<Leads />} />
        <Route path="/add-lead" element={<AddNewLead />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
};

export default App;
