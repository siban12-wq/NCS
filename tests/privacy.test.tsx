import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Mood } from '@/sections/Mood';
import { LetGo } from '@/sections/LetGo';

// JSDOM mock for window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// JSDOM mock for IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
} as unknown as typeof IntersectionObserver;

describe('Privacy Verification: Mood & LetGo Zero-Data-Leakage Tests', () => {
  let container: HTMLDivElement;
  let root: Root;
  let fetchSpy: ReturnType<typeof vi.fn>;
  let localStorageSpy: ReturnType<typeof vi.spyOn>;
  let sessionStorageSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    // Spy on network requests
    fetchSpy = vi.fn();
    window.fetch = fetchSpy as unknown as typeof fetch;

    // Spy on storage writes
    localStorageSpy = vi.spyOn(Storage.prototype, 'setItem');
    sessionStorageSpy = vi.spyOn(sessionStorage, 'setItem');
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    vi.restoreAllMocks();
  });

  it('Mood check-in makes ZERO network requests and ZERO storage writes', async () => {
    await act(async () => {
      root.render(<Mood />);
    });

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    // Simulate clicking through mood buttons
    for (const btn of Array.from(buttons)) {
      await act(async () => {
        btn.click();
      });
    }

    // Verify absolutely no fetch/network activity
    expect(fetchSpy).toHaveBeenCalledTimes(0);

    // Verify absolutely no storage persistence
    expect(localStorageSpy).toHaveBeenCalledTimes(0);
    expect(sessionStorageSpy).toHaveBeenCalledTimes(0);
  });

  it('LetGo worry release makes ZERO network requests and ZERO storage writes', async () => {
    await act(async () => {
      root.render(<LetGo />);
    });

    const textarea = container.querySelector('textarea');
    const form = container.querySelector('form');
    expect(textarea).not.toBeNull();
    expect(form).not.toBeNull();

    // Student types a confidential worry
    if (textarea) {
      await act(async () => {
        textarea.value = 'I am worried about my grades and feeling behind on assignments';
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      });
    }

    // Student releases worry to the stream
    if (form) {
      await act(async () => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      });
    }

    // Verify zero network transmission
    expect(fetchSpy).toHaveBeenCalledTimes(0);

    // Verify zero storage writes
    expect(localStorageSpy).toHaveBeenCalledTimes(0);
    expect(sessionStorageSpy).toHaveBeenCalledTimes(0);
  });
});
