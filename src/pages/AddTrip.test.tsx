import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AddTrip from "./AddTrip";

/* =====================
   MOCK ROUTER
===================== */
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* =====================
   MOCK CONTEXT
===================== */
const mockAddTrip = vi.fn();

vi.mock("../context/TripsContext", () => ({
  useTrips: () => ({
    addTrip: mockAddTrip,
    loading: false,
  }),
}));

/* =====================
   MOCK TOAST
===================== */
const mockToast = vi.fn();

vi.mock("../components/toast/useToast", () => ({
  useToast: () => ({
    success: mockToast,
    error: mockToast,
  }),
}));

describe("AddTrip", () => {
  it("renders form heading", () => {
    render(<AddTrip />);

    expect(
      screen.getByText(/přidat nový výlet/i)
    ).toBeInTheDocument();
  });
});
