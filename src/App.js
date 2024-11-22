import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";


const Dashboard = () => <div>Dashboard Page</div>;
const Leads = () => <div>Leads Page</div>;
const Reports = () => <div>Reports Page</div>;
const Settings = () => <div>Settings Page</div>;
const Login = () => <div>Login Page</div>;
const AddCustomer = () => <div>Add Customer Page</div>;
const CustomerDetails = () => <div>Customer Details Page</div>;
const Customer = () => <div>Customer Page</div>;

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
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
