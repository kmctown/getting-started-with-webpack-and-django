import $ from 'jquery';
import React from 'react';
import uuid from 'uuid';
import ShortUrlRow from './short-urls-table-row';

export default class ShortUrlsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { urls: props.urls || [] };
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNewClick() {
    var urls = this.state.urls.slice();
    urls.push({ key: uuid.v4(), url: '', clicks: 0 });
    this.setState({ urls: urls });
  }

  handleChange(id, value) {
    console.log("Looking up " + id);

    var targetIndex = this.state.urls.findIndex(
      url => url.short_id === id || url.key === id
    );

    if (targetIndex >= 0) {
      var urls = this.state.urls.slice();
      urls[targetIndex].url = value;
      this.setState({ urls: urls });
    }

    console.log("New state", this.state.urls);
  }

  handleSave() {
    console.log("Saving...", this.state.urls);
    $.ajax({
      url: '/save',
      type: 'POST',
      data: JSON.stringify(this.state.urls)
    }).done(
      data => this.setState({ urls: data })
    );
  }

  render() {
    var urlRows = this.state.urls.map(url => {
      return (
        <ShortUrlRow
          key = {url.short_id || url.key}
          id = {url.short_id || url.key}
          short_id={url.short_id}
          url={url.url}
          clicks={url.clicks}
          created_at={url.created_at}
          onChanged={this.handleChange}
        />
      );
    });

    return (
      <div>
        <button
          className="btn btn-primary pull-right"
          onClick={this.handleNewClick}
        >
          Add a URL
        </button>
        <h2 style={ {marginTop: 0} }>My Short URLs</h2>
        <table id="short-urls-table" className="table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Real URL</th>
              <th className="text-center">Clicks</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {urlRows}
          </tbody>
        </table>
        <button
          className="btn btn-success pull-right"
          onClick={this.handleSave}
        >
          Save
        </button>
      </div>
    );
  }
}
