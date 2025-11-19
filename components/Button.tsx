import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  isLoading = false,
  ...props 
}) => {
  const baseStyles = "font-bold font-mono uppercase transition-all duration-100 border-4 border-neo-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-neo-lg";
  
  const variants = {
    primary: "bg-neo-yellow text-neo-black shadow-neo",
    secondary: "bg-neo-pink text-white shadow-neo",
    outline: "bg-transparent text-neo-black shadow-neo bg-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'ЗАГРУЗКА...' : children}
    </button>
  );
};

export default Button;