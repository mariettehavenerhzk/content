import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function Navbar({ isDarkMode, onThemeToggle }: NavbarProps) {
  return (
    <nav className="p-4 border-b border-yellow-200 dark:border-yellow-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
          AI Content Generator
        </h1>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
      </div>
    </nav>
  );
}