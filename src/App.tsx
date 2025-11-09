import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import TripDetail from "./pages/TripDetail";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import TripsList from "./pages/TripsList";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/trips">Trips</Link>
        {user ? (
          <>
            <Link to="/add">Add Trip</Link>
            <button onClick={signOut}>Logout ({user.email})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}