import ReactDOM from 'react-dom';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { Input } from './Input';
import { Countdown } from './Countdown';

type TimerState = {
  duration: number | null;
};

class Timer extends React.Component<{}, TimerState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      duration: null,
    };
  }

  render(): ReactNode {
    return (
      <div className="container text-center">
        <h1 className="title">Timer</h1>
        {this.state.duration === null ? (
          <Input onSubmit={this.setDuration} />
        ) : (
          <Countdown duration={this.state.duration} />
        )}
      </div>
    );
  }

  private setDuration = (duration: number) => this.setState({ duration });
}

const Container: React.SFC = props => (
  <div style={{ marginTop: '33vh' }}>
    <div>{props.children}</div>
  </div>
);

ReactDOM.render(
  <Container>
    <Timer />
  </Container>,
  document.getElementById('app'),
);
