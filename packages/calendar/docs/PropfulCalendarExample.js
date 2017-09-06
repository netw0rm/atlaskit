import React, { PureComponent } from 'react';
import { CalendarStateless } from '@atlaskit/calendar';

export default class CalendarStatelessExample extends PureComponent {
  state = {
    selected: [],
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }

  selectData(iso) {
    this.setState({ selected: [iso] });
  }

  changeInfo({ day, month, year }) {
    this.setState({ day, month, year });
  }

  render() {
    return (
      <CalendarStateless
        selected={this.state.selected}
        day={this.state.day}
        month={this.state.month}
        year={this.state.year}
        onSelect={({ iso }) => this.selectData(iso)}
        onChange={date => this.changeInfo(date)}
      />
    );
  }
}
