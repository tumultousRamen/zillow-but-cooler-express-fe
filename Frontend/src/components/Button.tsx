import React from 'react';
import clsx from 'clsx'; // For conditional classNames (optional)

// Define Button props and variants
type ButtonVariant = 'primary' | 'secondary' | 'link' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Optional, defaults to 'primary'
  isDisabled?: boolean; // Custom prop for disabled state
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isDisabled = false,
  children,
  className,
  ...rest
}) => {
  // Define Tailwind-based or custom class names for each variant
  const baseClasses =
    'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out';
  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-primary-hover focus:ring-purple-500',
    secondary:
      'border border-1 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    link: 'text-blue-600 hover:underline focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    isDisabled && 'opacity-50 cursor-not-allowed',
    className // Allow overriding classes if needed
  );

  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...rest} // Pass other props (e.g., onClick, type)
    >
      {children}
    </button>
  );
};

export default Button;