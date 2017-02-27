// Simple component which wraps stories and creates a styled list out of it
import * as React from 'react';
import {Component} from 'react';

const styles = {
  statesWrapper: {
    listStyle: 'none',
    display: 'inline-block',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '3px'
  },
  stateItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stateTitle: {
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    padding: '1px',
    marginBottom: '7px'
  }
};


export default class StoryList extends Component<{}, {}> {
  render() {
    const listContent = this.props.children.map(c => {
      return <li style={styles.stateItem}>
        <div style={styles.stateTitle}>{c.title}</div>
        {c.content}
      </li>;
    });

    return <ul style={styles.statesWrapper}>{listContent}</ul>;
  }
}
