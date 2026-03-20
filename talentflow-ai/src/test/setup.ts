import "@testing-library/jest-dom";
import { vi } from "vitest";

global.fetch = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = (): IntersectionObserverEntry[] => [];
  unobserve = vi.fn();
}

window.IntersectionObserver = MockIntersectionObserver;

beforeEach(() => {
  vi.clearAllMocks();
});
