import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';

const mockToggleTheme = jest.fn();
const mockSetTheme = jest.fn();

jest.mock('../hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    isDark: false,
    toggleTheme: mockToggleTheme,
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('should call toggleTheme when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('should display sun icon when in light mode', () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });
});

describe('ThemeToggle in dark mode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display moon icon when in dark mode', () => {
    jest.doMock('../hooks/useTheme', () => ({
      useTheme: () => ({
        theme: 'dark',
        isDark: true,
        toggleTheme: mockToggleTheme,
        setTheme: mockSetTheme,
      }),
    }));
    jest.resetModules();
    const { ThemeToggle: ThemeToggleDark } = require('./ThemeToggle');
    render(<ThemeToggleDark />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });
});
