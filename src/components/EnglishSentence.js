import React, { Component } from 'react';
import EnglishPhrase from './EnglishPhrase';
import { interpose } from 'lodash-contrib';
import { eachWithIndex as eachHeadWithIndex } from '../heads.js'

export default class EnglishSentence extends React.Component {
	render() {
		var phrases = this.props.analysis;

		return (
			<div className="english-sentence">
			{interpose(phrases.map((phrase, i) => {
				var counterpart;
				// this will break when phrases and heads are not orthogonal
				eachHeadWithIndex(this.props.counterpart, (head, tpPhrase, j) => {
					if (i===j) {
						counterpart = tpPhrase;
					}
				});
				return (
					<EnglishPhrase 
						key={i}
						sentenceIndex={this.props.sentenceIndex}
						phraseIndex={i}
						phraseData={phrase}
						counterpart={counterpart}
						{...this.props.actions} />
				);
			}), ' ')}
			</div>
		);
	}

	showOptions() {
		window.console.log('woop');
	}
}