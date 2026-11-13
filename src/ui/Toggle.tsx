import React from 'react';
import clsx from 'clsx';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  iconOn,
  iconOff,
  className,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-royal/50',
        checked ? 'bg-royal' : 'bg-white/20',
        className
      )}
    >
      <span
        className={clsx(
          'inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-paper text-indigo-900 shadow-md transition-transform duration-300 ease-soft',
          checked ? 'translate-x-7' : 'translate-x-1'
        )}
      >
        {checked ? iconOn : iconOff}
      </span>
    </button>
  );
};
