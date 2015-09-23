import React, { Component } from 'react';
import PhrasePicker from './PhrasePicker';

export default class EnPhrase extends Component {
  render() {
  	const mainDisplay = this.props.analysis.base_form || '(proper noun)'
  	const display = [mainDisplay,
  		this.props.counterpart.negative && ' (negative)',
  		this.props.counterpart.interrogative && ' (interrogative)']
  	const classes = this.props.analysis.highlighted && 'highlighted';

  	return (
  		<span className={classes}
        onMouseEnter={this.props.highlight}
        onMouseLeave={this.props.endHighlight} 
        onClick={this.props.showPhrasePicker}>
  		{display}
  		</span>
  	);
	}
}