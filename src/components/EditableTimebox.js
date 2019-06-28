import React from 'react';
import TimeBoxEditor from './TimeboxEditor';

class EditableTimeBox extends React.Component {
  state = {
    title: "Uczę się wyciągać stan w górę!",
    getTime: 20,
    isEditable: true
  };

  handleTitleText = event => {
    this.setState({ title: event.target.value });
  };
  handleTime = event => {
    this.setState({ getTime: event.target.value });
  };
  handleConfirm = event => {
    this.setState({ isEditable: false });
  };
  handleEdit = event => {
    this.setState({ isEditable: true });
  };

  render() {
    const { title, getTime, isEditable } = this.state;

    return (
      <>
        <TimeBoxEditor
          title={title}
          getTime={getTime}
          isEditable={isEditable}
          onConfirm={this.handleConfirm}
          onTitleChange={this.handleTitleText}
          onGetTime={this.handleTime}
        />
        <CurrentTimebox
          title={title}
          getTime={getTime}
          isEditable={isEditable}
          onEdit={this.handleEdit}
        />
      </>
    );
  }
}

export default EditableTimeBox;