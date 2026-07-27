import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login/Login.tsx'
import Register from '../pages/Register/Register.tsx'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
