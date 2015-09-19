import React, { Component } from 'react';
import Sentence from './Sentence';
import EnglishSentence from './EnglishSentence';

export default class SentencePairing extends React.Component {
	render() {
		var tokipona = this.props.tokipona;
		var english = this.props.english;
		
		return (
			<div>
				<Sentence analysis={tokipona} />
				<EnglishSentence analysis={english} />
			</div>
		);
	}
}