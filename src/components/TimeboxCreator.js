import React from 'react';
import uuid from 'uuid';

class TimeBoxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.totalTimeInput = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();

    this.props.onCreate({
      id: uuid.v4(),
      title: this.titleInput.current.value,
      getTime: this.totalTimeInput.current.value
    });

    this.titleInput.current.value = "";
    this.totalTimeInput.current.value = "";
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="TimeboxCreator">
        <label>
          Co Robisz?
          <input type="text" ref={this.titleInput} />
          <br />
        </label>
        <label>
          Przez jaki czas?
          <input type="number" ref={this.totalTimeInput} />
          <br />
          <br />
        </label>
        <button>Dodaj Zadanie</button>
      </form>
    );
  }
}

export default TimeBoxCreator;