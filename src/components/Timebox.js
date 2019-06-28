import React from 'react';

function TimeBox({ title, getTime, onDelete, onEdit }) {
  return (
    <div className="Timebox">
      <h3>
        {title} - {getTime} minut
      </h3>
      <button onClick={onDelete}>Usuń</button>
      <button onClick={onEdit}>Zmień</button>
    </div>
  );
}

export default TimeBox;