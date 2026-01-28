import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
// import { DashboardLayout } from "./components/Layout/Dashboard/Dashboardlayout";
// import Users from "./pages/Users/Users";
import NotFound from "./pages/NotFound";
import "./styles/main.scss";
import UsersPage from "./pages/Users/UsersPage";
import DashboardLayout from "./components/Layout/Dashboard/DashboardLayout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard/users" replace />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:userId" element={<UsersPage />} />
        {/* Placeholder routes for other sidebar items */}
        <Route path="*" element={<div style={{ padding: '20px', color: '#545F7D' }}>This page is under construction.</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
