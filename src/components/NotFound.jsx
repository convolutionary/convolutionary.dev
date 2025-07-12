import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
    <div
      style={{
        background: 'rgba(30,30,30,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '1.5rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#fff',
        maxWidth: 600,
        width: '100%',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div className="text-6xl md:text-7xl font-bold mb-4 select-none" style={{letterSpacing: '0.05em', color: '#fff'}}>404</div>
      <div className="text-2xl font-semibold mb-2" style={{color: '#fff'}}>Page Not Found</div>
      <div className="mb-8" style={{color: '#fff'}}>Sorry, the page you’re looking for doesn’t exist or has been moved.</div>
      <div className="text-5xl mb-6 select-none" aria-label="ghost" style={{color: '#fff'}}>👻</div>
      <Link to="/" className="btn btn-primary px-6 py-3 rounded-lg font-semibold text-white mt-2">
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound; 