import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

const THEME_STORAGE_KEY = 'theme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
  });

  it('should return light theme as default when no localStorage value', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('should return dark theme when localStorage has dark value', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('should toggle theme from light to dark', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
  });

  it('should toggle theme from dark to light', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
  });

  it('should persist theme to localStorage when toggling', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    act(() => {
      result.current.toggleTheme();
    });
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('should add dark class to document when theme is dark', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should remove dark class from document when theme is light', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should allow setting theme directly', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.setTheme('dark');
    });
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('should return isDark helper correctly', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.isDark).toBe(true);
  });
});
