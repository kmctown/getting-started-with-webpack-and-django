import React from 'react';

export default class ShortUrlsTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("Got Change", e.target.value);
    this.props.onChanged(this.props.id, e.target.value);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.short_id}
        </td>
        <td>
          <input
            id={this.props.id}
            type="text"
            className="form-control"
            value={this.props.url}
            onChange={this.handleChange}
          />
        </td>
        <td className="text-center">
          {this.props.clicks}
        </td>
        <td>
          {this.props.created_at}
        </td>
      </tr>
    );
  }
}
