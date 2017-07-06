import PropTypes from 'prop-types';
import React from 'react';

export default class RepoTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      repo: PropTypes.string,
      project: PropTypes.string,
      owner: PropTypes.string,
      updated: PropTypes.string,
    })),
  }

  render() {
    const { data } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Repository</th>
            <th>Project</th>
            <th>Owner</th>
            <th>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td><a href="#">{item.repo}</a></td>
                <td>{item.project}</td>
                <td>{item.owner}</td>
                <td>{item.updated}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}
