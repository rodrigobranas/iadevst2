import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
    >
      {isDark ? (
        <Moon data-testid="moon-icon" className="h-5 w-5 text-foreground" />
      ) : (
        <Sun data-testid="sun-icon" className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}
