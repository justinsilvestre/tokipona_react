import React, { Component } from 'react';
import _ from 'lodash';

export default class PhrasePicker extends React.Component {
	render() {
		var enRoles = _.uniq(this.props.data.choices.map(choice => choice.role));
		var senI = this.props.data.sentenceIndex;
		var phrI = this.props.data.phraseIndex;

		return (
			<div className='phrasepicker'>
			<h3>{this.props.data.tpPhraseWords}</h3>
				{enRoles.map(role => {
					return [
						<b className="phrasepicker-role">{role}</b>,
						this.props.data.choices.filter(c => c.role === role).map(c => {
							return (<span className="phrasepicker-choice" onClick={(e) => this.props.pickPhrase(senI, phrI, c)}>{c.base_form} </span>);
						})
					]
				})}
			</div>
		);
	}
}