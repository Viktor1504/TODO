import { Path } from "common/router/router"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={Path.Login} />
}
