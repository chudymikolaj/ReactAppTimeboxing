import React from 'react';
import classNames from 'classnames';

function ProgressBar({ className = "", percent, big = false, color = null }) {
  let progressClassName = classNames(
    'progress',
    className,
    {
      'progress--big': big,
      'progress--color-green': color === 'green'
    }
  )

  return (
    <div className={progressClassName}>
      <div className="progress__bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;

