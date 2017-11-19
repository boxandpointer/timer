import React, { ReactNode } from 'react';
import classNames from 'classnames';

import parseDuration from 'parse-duration';
import { parse as parseDate } from 'chrono-node';

type InputProps = {
  onSubmit(duration: number): void;
};

type InputState = {
  input: string;
  invalid: boolean;
};

export class Input extends React.Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    this.state = {
      input: '',
      invalid: false,
    };
  }

  render(): ReactNode {
    return [
      <form onSubmit={this.submitInput} key="form">
        <div className="field has-addons">
          <div className="control">
            <input
              autoFocus
              onChange={this.setInput}
              className={classNames('input is-large', {
                'is-danger': this.state.invalid,
              })}
              type="text"
              placeholder="1 minute"
            />
          </div>
          <div className="control">
            <input className="button is-large is-primary" type="submit" value="Start" />
          </div>
        </div>
      </form>,
      <br key="break" />,
      <p className="has-text-grey" key="examples">
        Examples: <code>4m 20s</code>, <code>5 minutes</code>, <code>7pm</code>
      </p>,
      this.state.invalid ? (
        <p className="has-text-danger" key="invalid">
          {this.state.input} is not a valid timer input.
        </p>
      ) : null,
      // TODO: a list of previous timer configs + a reset button. Previous timer configs should be saved in querystring.
    ];
  }

  private setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.currentTarget.value, invalid: false });
  };

  private submitInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const date = parseDate(this.state.input);
    const endTime = date[0];
    // Hack: `parseDate` interprets "2h 30m" as "2:30AM"
    if (date.length > 0 && this.state.input.indexOf('h') === -1) {
      // Hack: `parseDate` interprets "tomorrow" as "tomorrow 12pm"
      if (!endTime.start.isCertain('hour')) {
        endTime.start.imply('hour', 0);
      }
      this.props.onSubmit(endTime.start.date().getTime() - new Date().getTime());
      return;
    }

    const duration = parseDuration(this.state.input);
    if (duration > 0) {
      this.props.onSubmit(duration);
      return;
    }

    this.setState({ invalid: true });
  };
}
