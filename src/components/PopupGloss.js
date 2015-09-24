import React, { Component } from 'react'
import { posNames } from '../grammar'
import _ from 'lodash';

export default class PopupGloss extends Component {
	render() {

		return (
			<div className="popup-gloss popup">
				<h3>{this.props.phrase && this.props.phrase.words}</h3>
				<small>{this.props.role}</small>
				<ul>
					{_.uniq(this.props.phrase.en.map(ep => ep.base_form)).map(bf => <li>{bf}</li>)}
				</ul>
			</div>
		);
	}
}