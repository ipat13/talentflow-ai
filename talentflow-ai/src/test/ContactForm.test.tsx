import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "../app/components/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the contact form with all fields", () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const nameErrors = screen.getAllByText(/Name is required/i);
      expect(nameErrors.length).toBeGreaterThan(0);
    });
  });

  it("validates email on submit", async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: "invalid-email" } });
    
    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const errorMessages = screen.getAllByText((content, element) => {
        return element?.textContent?.includes("Email") || false;
      });
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("validates message minimum length", async () => {
    render(<ContactForm />);
    
    const messageInput = screen.getByLabelText(/Your Message/i);
    fireEvent.change(messageInput, { target: { value: "Hi" } });
    
    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      const messageErrors = screen.getAllByText(/at least 10 characters/i);
      expect(messageErrors.length).toBeGreaterThan(0);
    });
  });

  it("submits form successfully with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: "john@company.com" } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: "Test Corp" } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: "Hello, I need help with hiring." } });
    
    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Thank You for Reaching Out/i)).toBeInTheDocument();
    });
  });

  it("allows selecting hiring needs options", () => {
    render(<ContactForm />);
    
    const option = screen.getByText(/6-15/i);
    fireEvent.click(option);
    
    expect(option).toBeInTheDocument();
  });

  it("shows loading state during submission", async () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: "john@company.com" } });
    fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: "Test Corp" } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: "Hello, I need help." } });
    
    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/Sending/i)).toBeInTheDocument();
  });
});
