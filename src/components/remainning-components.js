import React from 'react';
import uuid from 'uuid';

function ProgressBar({ className = "", percent }) {
  return (
    <div className={`ProgressBar ${className}`}>
      <div className="Bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

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
      <form onSubmit={this.handleSubmit} class="TimeboxCreator">
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
        <button>Dodajt imeBox</button>
      </form>
    );
  }
}

class TimeBoxList extends React.Component {
  state = {
    timeboxes: [
      { id: 1, title: "Uczę się list", getTime: 25 },
      { id: 2, title: "Uczę się formularzy", getTime: 10 },
      {
        id: 3,
        title: "Uczę się komponentów niekontrolowanych",
        getTime: 50
      }
    ]
  };

  addTimebox = timebox => {
    this.setState(prevState => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };

  handeCreate = createdTimebox => {
    this.addTimebox(createdTimebox);
  };

  removeTimebox = indexToRemove => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.filter(
        timebox => timebox.id != indexToRemove
      );
      return { timeboxes };
    });
  };

  updateTimeBox = (indexToUpdate, updatedTimebox) => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.map(timebox =>
        timebox.id === indexToUpdate ? updatedTimebox : timebox
      );
      return { timeboxes };
    });
  };

  render() {
    return (
      <>
        <TimeBoxCreator onCreate={this.handeCreate} />
        {this.state.timeboxes.map(timebox => (
          <TimeBox
            key={timebox.id}
            title={timebox.title}
            getTime={timebox.getTime}
            onDelete={() => this.removeTimebox(timebox.id)}
            onEdit={() =>
              this.updateTimeBox(timebox.id, {
                ...timebox,
                title: "Updated Timebox"
              })
            }
          />
        ))}
      </>
    );
  }
}

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


export { TimeBoxList };