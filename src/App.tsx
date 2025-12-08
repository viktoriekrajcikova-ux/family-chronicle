import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import TripsList from "./pages/TripsList";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import RequestReset from "./pages/RequestReset";
import ResetConfirm from "./pages/ResetConfirm";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import { Container } from "./components";

export default function App() {

  return (
    <Container>
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={
          <ProtectedRoute>
            <TripsList />
          </ProtectedRoute>         
          } />
        <Route path="/trips/:id" element={
          <ProtectedRoute>
            <TripDetail />
          </ProtectedRoute>
          } />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditTrip />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<RequestReset />} />
        <Route path="/auth/reset-confirm" element={<ResetConfirm />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Container>
  );
}