import React, { Component } from 'react';
import TpSubstantive from './TpSubstantive';
import { phraseRole, phraseEnd, finalParticle, roleChain } from '../grammar';

export default class TpSentence extends Component {
  render() {
    const substantives = this.props.substantives.map((substantive, i) => {
        return (<TpSubstantive key={i}
          phraseIndex={i}
          analysis={substantive}
          finalParticle={finalParticle(this.props.substantives, i)}
          roleChain={roleChain(this.props.substantives, i)}
          highlight={() => this.props.highlightPhrasePair(i)}
          endHighlight={() => this.props.endPhraseHighlight(i)}>
        </TpSubstantive>);
      });

    return (
      <div className="sentence">
      {substantives}
      {this.props.emphatic && ' ' + this.props.emphatic}
      {this.props.endPunctuation}
      </div>
    );
  }
}
      // {vocative ? <Vocative analysis={vocative} precedesClause={predicate} /> : null}
      // {taso}
      // {context ? <Clause subject={contextSubject} predicate={contextPredicate} isContext={true}/> : null}
      // <Clause subject={subject} predicate={predicate} mood={mood} />
      // {question_tag}
      // {this.props.analysis.end_punctuation || '.'}
      // <br />
      // {voc ? <}