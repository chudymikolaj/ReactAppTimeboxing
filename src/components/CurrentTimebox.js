import React from  'react';
import Clock from './Clock';
import ProgressBar from './Progressbar';

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
          color="green"
          big
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

export default CurrentTimebox;