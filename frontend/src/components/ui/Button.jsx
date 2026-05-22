import React from 'react';

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
    secondary: 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 focus:ring-slate-300',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
