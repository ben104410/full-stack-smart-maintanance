import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="mb-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#002147] transition hover:text-[#f37021]"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default Auth;