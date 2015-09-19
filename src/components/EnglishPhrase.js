import React, { Component } from 'react';
import PhrasePicker from './PhrasePicker';

export default class EnglishPhrase extends React.Component {
	constructor(props, context) {
    super(props, context);
    this.state = {
      optionsVisible: false
    };
  }

	render() {
		var senI = this.props.sentenceIndex;
		var phrI = this.props.phraseIndex;

		var phraseData = this.props.phraseData;
		var words = phraseData ? phraseData.base_form : '?';

		return (
			<span onDoubleClick={(e) => this.props.showPhrasePicker(senI, phrI, phraseData.tokipona_phrase_id)}
				className="english-phrase"
			>
			{words}
			{this.props.counterpart.negative ? ' (negative)' : null}
			{this.props.counterpart.interrogative ? ' (interrogative)' : null}
			</span>
		);
	}
}