import React from 'react';

function Clock({ className = "", time }) {
  const printZero = (val, placesCount) => {
    var output = String(val);

    while (output.length < placesCount) {
      output = `${"0" + output}`;
    }

    return output;
  };

  const blockLimitTime = time => {
    const maxTime = 24 * 60 * 60 * 1000 - 1;

    return Math.min(Math.max(time, 0), maxTime);
  };

  const formatLimitMiliSeconds = runTime =>
    printZero(Math.floor(runTime % 1000), 3);

  const formatLimitSeconds = runTime =>
    printZero(Math.floor(runTime / 1000) % 60, 2);

  const formatLimitMinuts = runTime =>
    printZero(Math.floor(runTime / (60 * 1000)) % 60, 2);

  const formatLimitHours = runTime =>
    printZero(Math.floor((runTime / (60 * 60 * 1000)) % 24), 2);

  const runTime = blockLimitTime(time);
  const miliSeconds = formatLimitMiliSeconds(runTime);
  const seconds = formatLimitSeconds(runTime);
  const minutes = formatLimitMinuts(runTime);
  const hours = formatLimitHours(runTime);

  return (
    <h2 className={`clock ${className}`} dangerouslySetInnerHTML={{__html: `Pozostało <span class="clock--color-green">${hours}</span>:<span class="clock--color-greenyellow">${minutes}</span>:<span class="clock--color-grey">${seconds}</span>:<span class="clock--color-grey">${miliSeconds}</span>`}}></h2>
  );
}

export default Clock;