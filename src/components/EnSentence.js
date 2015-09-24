import React, { Component } from 'react';
import EnPhrase from './EnPhrase';
import { interpose } from 'lodash-contrib'

export default class EnSentence extends Component {
  render() {
  	var phrases = this.props.phrases.map((p, i) =>
			<EnPhrase analysis={p}
				counterpart={this.props.counterpart.substantives[i]}
				highlight={() => this.props.highlightPhrasePair(i)}
        endHighlight={() => this.props.endPhraseHighlight(i)}
        showPhrasePicker={() => this.props.showPhrasePicker(i, this.props.counterpart.substantives[i].id)}
        >
      </EnPhrase>
    )

  	return (
  		<div className="en-sentence">
  		{interpose(phrases, ' ')}{this.props.counterpart.end_punctuation}
  		</div>
  	);
  }
}