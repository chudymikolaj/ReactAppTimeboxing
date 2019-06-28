import React from 'react';

function ProgressBar({ className = "", percent }) {
  return (
    <div className={`ProgressBar ${className}`}>
      <div className="Bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;