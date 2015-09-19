import React, { Component } from 'react';
import Clause from './Clause';
import Vocative from './Vocative';

export default class Sentence extends Component {
  render() {
    var taso = this.props.analysis.taso;
    var vocative = this.props.analysis.vocative;
    var context = this.props.analysis.context;
    var contextSubject = context ?  (context.subject ? context.subject.components : null ) : null;
    var contextPredicate = context ? context.predicate : null;
    var subject = this.props.analysis.subject ? this.props.analysis.subject.components : null;
    var predicate =   this.props.analysis.predicate;
    var mood = this.props.analysis.mood;
    var question_tag = this.props.analysis.question_tag ? ' ' + this.props.analysis.question_tag : null;

    return (
      <div className="sentence">
      {vocative ? <Vocative analysis={vocative} precedesClause={predicate} /> : null}
      {taso}
      {context ? <Clause subject={contextSubject} predicate={contextPredicate} isContext={true}/> : null}
      <Clause subject={subject} predicate={predicate} mood={mood} />
      {question_tag}
      {this.props.analysis.end_punctuation || '.'}
      </div>
    );
  }
}