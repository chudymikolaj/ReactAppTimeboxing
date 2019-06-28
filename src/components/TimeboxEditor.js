import React from 'react';


function TimeBoxEditor(props) {
  const {
    title,
    getTime,
    isEditable,
    onTitleChange,
    onGetTime,
    onConfirm
  } = props;

  return (
    <div class={`TimerBoxEditor ${isEditable ? "" : "inactive"} `}>
      <label>
        Co Robisz?
        <input
          disabled={!isEditable}
          type="text"
          value={title}
          onChange={onTitleChange}
        />
        <br />
      </label>
      <label>
        Przez jaki czas?
        <input
          disabled={!isEditable}
          type="number"
          value={getTime}
          onChange={onGetTime}
        />
        <br />
      </label>
      <button disabled={!isEditable} onClick={onConfirm}>
        Zatwierdz zmiany
      </button>
    </div>
  );
}

export default TimeBoxEditor;