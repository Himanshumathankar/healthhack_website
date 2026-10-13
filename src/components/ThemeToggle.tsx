import { useEffect, useState, useId } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import './ThemeToggle.css';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'hh3_theme';

export function getResolvedTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return mode;
}

export function applyTheme(mode: ThemeMode) {
  const resolved = getResolvedTheme(mode);
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-mode', mode);
  root.style.colorScheme = resolved;

  // Update theme-color meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', resolved === 'dark' ? '#081420' : '#092d50');
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return 'light'; // Default to light mode as required
  });

  const labelId = useId();

  // Listen to system changes when mode === 'system'
  useEffect(() => {
    applyTheme(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}

    if (mode !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme('system');

    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [mode]);

  const handleSelect = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const modes: Array<{ id: ThemeMode; label: string; icon: typeof Sun }> = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'system', label: 'System', icon: Laptop },
    { id: 'dark', label: 'Dark', icon: Moon },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = modes.findIndex(m => m.id === mode);
    let nextIndex = -1;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % modes.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + modes.length) % modes.length;
    }

    if (nextIndex >= 0) {
      const nextMode = modes[nextIndex].id;
      setMode(nextMode);
      const button = e.currentTarget.querySelector<HTMLButtonElement>(`[data-mode="${nextMode}"]`);
      button?.focus();
    }
  };

  return (
    <div className="theme-toggle-container">
      <div
        className="theme-slider-track"
        role="radiogroup"
        aria-label="Theme mode"
        onKeyDown={handleKeyDown}
      >
        {/* Sliding active pill indicator */}
        <div className={`theme-slider-thumb theme-thumb-${mode}`} aria-hidden="true" />
        {modes.map(item => {
          const Icon = item.icon;
          const isSelected = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              data-mode={item.id}
              className={`theme-option-btn ${isSelected ? 'is-active' : ''}`}
              onClick={() => handleSelect(item.id)}
              tabIndex={isSelected ? 0 : -1}
              aria-label={`${item.label} theme`}
              title={`${item.label} theme`}
            >
              <Icon size={14} strokeWidth={2.2} className="theme-option-icon" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
