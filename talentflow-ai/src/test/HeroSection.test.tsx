import { render, screen } from "@testing-library/react";
import HeroSection from "../app/components/HeroSection";

describe("HeroSection", () => {
  it("renders the hero section with correct content", () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Streamline Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Hiring Process/i)).toBeInTheDocument();
    expect(screen.getByText(/Revolutionizing Tech Hiring with AI/i)).toBeInTheDocument();
  });

  it("displays navigation links", () => {
    render(<HeroSection />);
    
    const navLinks = screen.getAllByRole("link", { name: /Features/i });
    expect(navLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/How it Works/i).length).toBeGreaterThan(0);
  });

  it("displays call-to-action buttons", () => {
    render(<HeroSection />);
    
    expect(screen.getAllByRole("button", { name: /Request Demo/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Sign In/i }).length).toBeGreaterThan(0);
  });

  it("displays statistics", () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/95%/i)).toBeInTheDocument();
    expect(screen.getByText(/Time Saved/i)).toBeInTheDocument();
    expect(screen.getByText(/4.8\/5/i)).toBeInTheDocument();
    expect(screen.getByText(/User Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/500\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Companies/i)).toBeInTheDocument();
  });

  it("displays the logo", () => {
    render(<HeroSection />);
    
    const logo = screen.getByAltText(/TalentsFlow.ai Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it("has correct description text", () => {
    render(<HeroSection />);
    
    expect(screen.getByText(/Empower your HR team with AI-driven interviews/i)).toBeInTheDocument();
  });
});
