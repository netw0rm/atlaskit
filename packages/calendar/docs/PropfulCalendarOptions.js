import React, { PureComponent } from 'react';
import { AkCalendar } from '@atlaskit/calendar';

export default class AkCalendarOptions extends PureComponent {
  constructor(props) {
    super(props);
    const yearMonth = new Date().toISOString().slice(0, 8);
    this.state = {
      disabled: [`${yearMonth}01`, `${yearMonth}02`],
      previouslySelected: [`${yearMonth}03`, `${yearMonth}04`],
      selected: [`${yearMonth}05`, `${yearMonth}06`],
      focused: 7,
      today: `${yearMonth}08`,
    };
  }

  render() {
    console.log('state', this.state);
    return (
      <AkCalendar
        disabled={this.state.disabled}
        previouslySelected={this.state.previouslySelected}
        selected={this.state.selected}
        focused={this.state.focused}
        today={this.state.today}
      />
    );
  }
}

// disabled
// previouslySelected
// selected
// today
// focused
