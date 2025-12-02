import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "font-bold py-3 px-6 rounded-2xl transition-all active:translate-y-1 transform duration-150 uppercase tracking-wide text-sm sm:text-base";
  
  const variants = {
    primary: "bg-primary text-white border-b-4 border-primary-dark hover:bg-[#61E002] active:border-b-0",
    secondary: "bg-secondary text-white border-b-4 border-secondary-dark hover:brightness-110 active:border-b-0",
    outline: "bg-transparent text-gray-700 border-2 border-gray-200 hover:bg-gray-50",
    danger: "bg-brand-red text-white border-b-4 border-brand-red-dark hover:bg-red-500 active:border-b-0",
    ghost: "bg-transparent text-brand-blue hover:bg-blue-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};