import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = '/login' }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};