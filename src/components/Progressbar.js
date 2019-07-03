import React from 'react';

function ProgressBar({ className = "", percent }) {
  return (
    <div className={`progress progress--big progress--color-green ${className}`}>
      <div className="progress__bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;