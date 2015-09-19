import React, { Component } from 'react';
import { interpose } from 'lodash-contrib';
import Substantive from './Substantive';

export default class Subject extends Component {
  render() {
    return (
      <span className="subject">
        &nbsp;
        {interpose(this.props.analysis.map((component, i) => <Substantive analysis={component} key={i} />), ' en ')}
      </span>
    );
  }
}