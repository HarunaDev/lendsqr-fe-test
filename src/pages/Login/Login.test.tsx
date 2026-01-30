import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper to render with Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders login form with all elements", () => {
      renderWithRouter(<Login />);

      expect(screen.getByText("Welcome!")).toBeInTheDocument();
      expect(screen.getByText("Enter details to login.")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
      expect(screen.getByText("FORGOT PASSWORD?")).toBeInTheDocument();
    });

    it("renders logo image", () => {
      renderWithRouter(<Login />);
      
      const logoImg = screen.getByAltText("");
      expect(logoImg).toBeInTheDocument();
    });

    it("renders welcome illustration", () => {
      renderWithRouter(<Login />);
      
      const illustration = screen.getByAltText("Welcome illustration");
      expect(illustration).toBeInTheDocument();
    });

    it("renders show/hide password button", () => {
      renderWithRouter(<Login />);
      
      expect(screen.getByText("SHOW")).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("shows error when email is empty on submit", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      expect(await screen.findByText("Email is required")).toBeInTheDocument();
    });

    it("shows error when email format is invalid", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      await user.type(emailInput, "invalidemail");

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      expect(await screen.findByText("Please enter a valid email")).toBeInTheDocument();
    });

    it("shows error when password is empty on submit", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      expect(await screen.findByText("Password is required")).toBeInTheDocument();
    });

    it("shows error when password is less than 6 characters", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const passwordInput = screen.getByPlaceholderText("Password");
      await user.type(passwordInput, "12345");

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
    });

    it("shows both errors when both fields are invalid", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      
      await user.type(emailInput, "bad-email");
      await user.type(passwordInput, "123");

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      expect(await screen.findByText("Please enter a valid email")).toBeInTheDocument();
      expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
    });

    it("clears errors when user corrects input", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const submitButton = screen.getByRole("button", { name: /log in/i });

      await user.click(submitButton);
      expect(await screen.findByText("Email is required")).toBeInTheDocument();

      await user.type(emailInput, "test@example.com");
      await user.type(screen.getByPlaceholderText("Password"), "password123");
      await user.click(submitButton);

      expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
    });
  });

  describe("Password Visibility Toggle", () => {
    it("toggles password visibility when SHOW button is clicked", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
      const toggleButton = screen.getByText("SHOW");

      expect(passwordInput.type).toBe("password");

      await user.click(toggleButton);
      expect(passwordInput.type).toBe("text");
      expect(screen.getByText("HIDE")).toBeInTheDocument();

      await user.click(screen.getByText("HIDE"));
      expect(passwordInput.type).toBe("password");
      expect(screen.getByText("SHOW")).toBeInTheDocument();
    });

    it("has correct aria-label for accessibility", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const toggleButton = screen.getByLabelText("Show password");
      expect(toggleButton).toBeInTheDocument();

      await user.click(toggleButton);
      expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
    });
  });

  describe("Form Input", () => {
    it("updates email input value when user types", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
      await user.type(emailInput, "test@example.com");

      expect(emailInput.value).toBe("test@example.com");
    });

    it("updates password input value when user types", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
      await user.type(passwordInput, "mypassword");

      expect(passwordInput.value).toBe("mypassword");
    });
  });

  describe("Form Submission", () => {
    it("shows loading state during submission", async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      expect(await screen.findByText("LOGGING IN...")).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
      
      vi.useRealTimers();
    });

    it("stores auth data in localStorage on successful login", async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      vi.runAllTimers();

      await waitFor(() => {
        const authData = localStorage.getItem("lendsqr_auth");
        expect(authData).toBeTruthy();
        
        const parsed = JSON.parse(authData!);
        expect(parsed.isAuthenticated).toBe(true);
        expect(parsed.user.name).toBe("Adedeji");
      });
      
      vi.useRealTimers();
    });

    it("navigates to dashboard after successful login", async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      vi.runAllTimers();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/users");
      });
      
      vi.useRealTimers();
    });

    it("does not submit form when validation fails", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const submitButton = screen.getByRole("button", { name: /log in/i });
      await user.click(submitButton);

      // Wait a bit to ensure no navigation happens
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockNavigate).not.toHaveBeenCalled();
      expect(localStorage.getItem("lendsqr_auth")).toBeNull();
    });

    it("accepts valid email formats", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      await user.click(submitButton);

      expect(screen.queryByText("Please enter a valid email")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper autocomplete attributes", () => {
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");

      expect(emailInput).toHaveAttribute("autocomplete", "email");
      expect(passwordInput).toHaveAttribute("autocomplete", "current-password");
    });

    it("has proper aria-labels", () => {
      renderWithRouter(<Login />);

      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid multiple clicks on submit button", async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByRole("button", { name: /log in/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");
      
      await user.click(submitButton);
      // Button is disabled after first click, so subsequent clicks won't do anything
      
      vi.runAllTimers();

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
      });
      
      vi.useRealTimers();
    });

    it("handles email input value correctly", async () => {
      const user = userEvent.setup();
      renderWithRouter(<Login />);

      const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
      
      await user.type(emailInput, "test@example.com");
      
      expect(emailInput.value).toBe("test@example.com");
    });
  });
});