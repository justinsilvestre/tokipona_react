import React, { Component } from 'react';
import { interpose } from 'lodash-contrib';
import Substantive from './Substantive';

export default class Predicate extends Component {
  render() {
    var modalParticle = <span className="modal-particle">{this.props.modalParticle}</span>;
    var hasInitialParticle = this.props.hasInitialParticle;
      
    return (
      <span className="predicate">
        &nbsp;
        {hasInitialParticle ? [modalParticle, ' '] : null}
        {interpose(this.props.analysis.map((component, i) => <Substantive analysis={component} key={i} />), [' ', modalParticle, ' '])}
      </span>
    );
  }
}