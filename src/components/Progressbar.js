import React from 'react';

function ProgressBar({ className = "", percent, big = false, color = null }) {
  let progressClassName = 'progress ' + className;

  if(big) {
    progressClassName += ' progress--big'
  }

  if(color === "green") {
    progressClassName += ' progress--color-green'
  }

  return (
    <div className={progressClassName}>
      <div className="progress__bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;

