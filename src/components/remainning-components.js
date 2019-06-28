import React from 'react';
import uuid from 'uuid';
import Clock from './Clock';

function ProgressBar({ className = "", percent }) {
  return (
    <div className={`ProgressBar ${className}`}>
      <div className="Bar" style={{ width: `${percent}%` }} />
    </div>
  );
}

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

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isPaused: false,
      stopCount: 0,
      getTimeInSeconds: 0
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  handleStart() {
    this.setState({
      isRunning: true,
      getTimeInSeconds: 0
    });

    this.startTimer();
  }

  handleStop() {
    this.setState({
      isRunning: false,
      isPaused: false,
      stopCount: 0,
      getTimeInSeconds: 0
    });

    this.stopTimer();
  }

  togglePause() {
    this.setState(prevState => {
      const isPaused = !prevState.isPaused;

      isPaused ? this.stopTimer() : this.startTimer();

      return {
        isPaused,
        stopCount: isPaused ? prevState.stopCount + 1 : prevState.stopCount
      };
    });
  }

  startTimer() {
    const elapsedTime = new Date().getSeconds();

    this.intervalId = window.setInterval(() => {
      this.setState(prevState => ({
        getTimeInSeconds: prevState.getTimeInSeconds + elapsedTime
      }));
    }, elapsedTime);
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
  }

  render() {
    const { isRunning, isPaused, stopCount, getTimeInSeconds } = this.state;

    const { title, getTime, isEditable, onEdit } = this.props;

    const totalTimeInSeconds = getTime * 1000;
    const timeLeftInSeconds = totalTimeInSeconds - getTimeInSeconds;
    const progressBarInSeconds =
      (timeLeftInSeconds / totalTimeInSeconds) * 100.0;

    return (
      <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
        <h1>{title}</h1>
        <Clock
          className={isPaused ? "inactive" : ""}
          time={timeLeftInSeconds}
        />
        <ProgressBar
          percent={progressBarInSeconds}
          className={isPaused ? "inactive" : ""}
        />
        <button onClick={onEdit} disabled={isEditable}>
          Edytuj
        </button>
        <button onClick={this.handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={this.handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={this.togglePause} disabled={!isRunning}>
          {isPaused ? "Wznów" : "Pauza"}
        </button>
        <br />
        <br />
        Liczba przerw: {stopCount}
      </div>
    );
  }
}


export { TimeBoxList };