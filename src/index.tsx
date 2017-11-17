import ReactDOM from 'react-dom';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { TimerInput } from './TimerInput';

type TimerState = {
  mode: 'INPUT' | 'COUNTDOWN';
};

class Timer extends React.Component<{}, TimerState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      mode: 'INPUT',
    };
  }

  render(): ReactNode {
    return (
      <div className="container text-center">
        <h1 className="title">Timer</h1>
        {this.state.mode === 'INPUT' ? <TimerInput onSubmit={interval => console.log(interval)} /> : 'COUNTDOWN MODE'}
      </div>
    );
  }
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
