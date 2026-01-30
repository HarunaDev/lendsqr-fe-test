import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import "./styles/main.scss";
import UsersPage from "./pages/Users/UsersPage";
import DashboardLayout from "./components/Layout/Dashboard/DashboardLayout";
import UserDetails from "./pages/UserDetails/UserDetails";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserDetails />} />
        {/* Placeholder routes for other sidebar items */}
        <Route path="*" element={<div style={{ padding: '20px', color: '#545F7D' }}>This page is under construction.</div>} />
      </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
