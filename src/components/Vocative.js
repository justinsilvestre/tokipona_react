import React, { Component } from 'react';
import Substantive from './Substantive';

export default class Vocative extends Component {
	render() {
		var punctuation = this.props.precedesClause ? ',' : null;

		return(
			<span className="vocative">
				<Substantive analysis={this.props.analysis} /> o{punctuation}
			</span>
		);
	}
}