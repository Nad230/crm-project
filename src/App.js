import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from './pages/Dashboard';
import Leads from "./pages/leads";
import Activity from "./pages/Activity";
import AddActivity from "./pages/AddActivity";
import AddNewLead from "./pages/AddNewLead";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import TeamMember from "./pages/TeamMember";
import TeamManagement from "./pages/TeamManagement";
import UpdateTeamMember from "./pages/UpdateTeamMember";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import AddCustomer from "./pages/AddCustomer";
import CustomerDetails from "./pages/CustomerDetails";
import Customer from "./pages/Customers";
import UpdateCustomer from "./pages/UpdateCustomer";
import UpdateLead from "./pages/UpdateLead";

import { Home } from "@mui/icons-material";
import LeadDetailsPage from "./pages/LeadDetailsPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teammember" element={<TeamMember />} />
      <Route path="/teammanagement" element={<TeamManagement />} />
      <Route path="/update-team-member/:id" element={<UpdateTeamMember />} />

      <Route path="/lead/:id" element={<LeadDetailsPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/activity" element={<Activity />} /> 
      <Route path="/add-activity" element={<AddActivity />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> {/* Fixed typo here */}
        <Route path="/leads" element={<Leads />} />
        <Route path="/updateLead/:id" element={<UpdateLead />} />
        <Route path="/add-lead" element={<AddNewLead />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/customer-details" element={<CustomerDetails />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/updateCustomer/:id" element={<UpdateCustomer />} />
      </Routes>
    </Router>
  );
};

export default App;
