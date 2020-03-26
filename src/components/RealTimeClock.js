import React, { Component } from 'react'

export default class RealTimeClock extends Component {
  constructor() {
    super();

    this.state = {
      interval: null
    }
  }

  getCurrentTime() {
    const elapsedTime = new Date().getSeconds();

    const self = this;
    self.interval = window.setInterval(() => {

      this.setState({
        interval: new Date().toLocaleString()
      })
    }, elapsedTime);
  }

  componentDidMount() {
    this.getCurrentTime();
  }

  componentWillUnmount() {
    this.stopCurrentTime();
  }

  render() {
    return (
      <div>
        {this.state.interval}
      </div>
    )
  }

  stopCurrentTime() {
    window.clearInterval(this.interval);
  }
}
