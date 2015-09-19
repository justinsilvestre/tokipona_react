import React, { Component } from 'react';
import Subject from './Subject';
import Predicate from './Predicate';
import _ from 'lodash';

export default class Clause extends Component {
  render() {
    var subject = this.props.subject;
    var predicate = this.props.predicate;
    
    var mood = this.props.mood || 'indicative';
    var modalParticle = mood === 'indicative' ? 'li' : 'o';

    var hasMicroSubject = subject && _.includes(['mi', 'sina'], subject[0].head)
      && subject.length === 1 && !subject[0].complements;
    var hasInitialParticle = modalParticle === 'o' || (subject && !hasMicroSubject);

    var className = this.props.isContext ? 'context' : null;

    return (
      <span className={className}>
        {subject ? <Subject analysis={subject} /> : null}
        {predicate ? <Predicate analysis={predicate} hasInitialParticle={hasInitialParticle} modalParticle={modalParticle} /> : null}
        {this.props.isContext ? <span className="la"> la</span> : null}
      </span>
    );
  }
}