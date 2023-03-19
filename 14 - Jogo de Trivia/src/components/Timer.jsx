import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    const interval = setInterval(() => {
      this.setState((prevstate) => ({ seconds: prevstate.seconds - 1 }));
      const { seconds } = this.state;
      const { handleTimer } = this.props;
      handleTimer(seconds);
      if (seconds === 1) {
        clearInterval(interval);
      }
    }, oneSecond);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h1>{ seconds }</h1>
    );
  }
}

Timer.propTypes = {
  handleTimer: PropTypes.func,
}.isRequired;
