import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import UploadCertificate from "./pages/UploadCertificate";
import Users from "./pages/Users";
import Employer from "./pages/Employer";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>
        } />
        <Route path="/certificates" element={
          <PrivateRoute><MainLayout><Certificates /></MainLayout></PrivateRoute>
        } />
        <Route path="/upload" element={
          <PrivateRoute><MainLayout><UploadCertificate /></MainLayout></PrivateRoute>
        } />
        <Route path="/users" element={
          <PrivateRoute><MainLayout><Users /></MainLayout></PrivateRoute>
        } />
        <Route path="/employer" element={
          <PrivateRoute><MainLayout><Employer /></MainLayout></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><MainLayout><Profile /></MainLayout></PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
