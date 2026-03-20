import { render, screen } from "@testing-library/react";
import FeaturesSection from "../app/components/FeaturesSection";

describe("FeaturesSection", () => {
  beforeEach(() => {
    window.IntersectionObserver = class {
      observe = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn();
      unobserve = vi.fn();
      constructor() {
        setTimeout(() => {
          const callback = this.callback;
          if (callback) {
            callback([{ isIntersecting: true }]);
          }
        }, 0);
      }
      observe = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn();
      unobserve = vi.fn();
    } as any;
  });

  it("renders the features section with correct title", () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/Why HR Teams Choose/i)).toBeInTheDocument();
    expect(screen.getByText(/TalentsFlow.ai/i)).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/AI-Powered Interviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive Evaluation/i)).toBeInTheDocument();
    expect(screen.getByText(/Time-Saving Efficiency/i)).toBeInTheDocument();
    expect(screen.getByText(/Data-Driven Insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Customizable Assessments/i)).toBeInTheDocument();
    expect(screen.getByText(/Collaborative Hiring/i)).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<FeaturesSection />);
    
    expect(screen.getByText(/Conduct consistent and unbiased technical interviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Reduce screening time and schedule interviews 24\/7/i)).toBeInTheDocument();
  });

  it("has correct section id for navigation", () => {
    render(<FeaturesSection />);
    
    const section = document.getElementById("features");
    expect(section).toBeInTheDocument();
  });
});
