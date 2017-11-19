import React, { ReactNode } from 'react';

import { Duration } from 'luxon';

type CountdownProps = {
  duration: number;
};

type CountdownState = {
  remaining: number;
};

export class Countdown extends React.Component<CountdownProps, CountdownState> {
  private timer: number;
  private alarm: HTMLAudioElement;

  constructor(props: CountdownProps) {
    super(props);

    this.state = {
      remaining: this.props.duration,
    };
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      const remaining = Math.max(this.state.remaining - 1000, 0);
      this.setState({ remaining });
      if (remaining > 0) {
        return;
      }

      this.alarm.play();

      clearInterval(this.timer);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render(): ReactNode {
    const duration = Duration.fromMillis(this.state.remaining)
      .normalize()
      .shiftTo('days', 'hours', 'minutes', 'seconds');

    const output =
      duration.days > 0
        ? duration.toFormat('d:hh:mm:ss')
        : duration.hours > 0 ? duration.toFormat('h:mm:ss') : duration.toFormat('m:ss');

    return [
      <audio key="audio" ref={this.setAudioRef} src="/alarm.mp3" preload="auto" loop />,
      <p key="countdown" className="title">{output}</p>,
    ];
  }

  private setAudioRef = (ref: HTMLAudioElement) => (this.alarm = ref);
}
