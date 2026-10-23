import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Audio API for tests
class AudioContextMock {
  state = 'running';
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn()
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn()
    };
  }
  destination = {};
  currentTime = 0;
  resume = vi.fn();
}

(window as any).AudioContext = AudioContextMock;
(window as any).webkitAudioContext = AudioContextMock;
