import React from 'react';

export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-[1.25rem] bg-white p-6 shadow-md ring-1 ring-slate-200/80 ${className}`} {...props}>
      {children}
    </div>
  );
}
