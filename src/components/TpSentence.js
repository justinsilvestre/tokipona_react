import React, { Component } from 'react';
import TpSubstantive from './TpSubstantive';
import { phraseRole, phraseEnd, finalParticle, roleChain } from '../grammar';
import { interpose } from 'lodash-contrib';

export default class TpSentence extends Component {
  render() {
    const substantives = this.props.substantives.map((substantive, i) => {
        return (<TpSubstantive key={i}
          phraseIndex={i}
          analysis={substantive}
          finalParticle={finalParticle(this.props.substantives, i)}
          roleChain={roleChain(this.props.substantives, i)}
          highlight={() => this.props.highlightPhrasePair(i)}
          endHighlight={() => this.props.endPhraseHighlight(i)}
          showGloss={() => this.props.showGloss(substantive.id)}
        ></TpSubstantive>);
      });

    return (
      <div className="tp-sentence">
      {interpose(substantives, ' ')}
      {this.props.emphatic && ` ${this.props.emphatic}`}
      {this.props.endPunctuation}
      </div>
    );
  }
}