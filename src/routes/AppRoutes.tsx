import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthProvider } from '../features/auth/AuthProvider'
import Home from '../pages/Home/Home.tsx'
import Login from '../pages/Login/Login.tsx'
import Register from '../pages/Register/Register.tsx'
import { PrivateRoute } from './PrivateRoute.tsx'
import { PublicOnlyRoute } from './PublicOnlyRoute.tsx'

export function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Dentro do Router: os guardas usam useLocation/Navigate. */}
      <AuthProvider>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
