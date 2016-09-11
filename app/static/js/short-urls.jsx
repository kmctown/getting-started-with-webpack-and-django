import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ShortUrlsTable from './short-urls-table';
import ajaxSetup from './ajax-setup';

$(function() {
  require('./ajax-setup.js');

  ReactDOM.render((
    <ShortUrlsTable urls={ [] } />
  ), document.getElementById('short-urls-app'));

  if (typeof window !== 'undefined') {
      window.React = React;
  }
});
