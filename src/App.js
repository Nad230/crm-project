import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider and Auth hook
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
import Login from "./pages/LoginPage";
import HomePage from "./pages/Homepage";
import Home from "./pages/Home";
import Register from './pages/Register';


import AddCustomer from "./pages/AddCustomer";
import CustomerDetails from "./pages/CustomerDetails";
import Customer from "./pages/Customers";
import UpdateCustomer from "./pages/UpdateCustomer";
import UpdateLead from "./pages/UpdateLead";
import ProtectedRoute from "./ProtectedRoute";
import LeadDetailsPage from "./pages/LeadDetailsPage";


// Header Component Wrapper (only shows Header after login)
const AppContent = () => {
  const { isLoggedIn } = useAuth();  // Get login status from AuthContext

  return (
    <>
     
      {isLoggedIn && <Header />} {/* Only show Header if logged in */}
      
    


      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-lead" element={<AddNewLead />} />



        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teammember"
          element={
            <ProtectedRoute>
              <TeamMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teammanagement"
          element={
            <ProtectedRoute>
              <TeamManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-team-member/:id"
          element={
            <ProtectedRoute>
              <UpdateTeamMember />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lead/:id"
          element={
            <ProtectedRoute>
              <LeadDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-activity"
          element={
            <ProtectedRoute>
              <AddActivity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateLead/:id"
          element={
            <ProtectedRoute>
              <UpdateLead />
            </ProtectedRoute>
          }
        />
          

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-customer"
          element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-details"
          element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateCustomer/:id"
          element={
            <ProtectedRoute>
              <UpdateCustomer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
