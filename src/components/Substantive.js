import React, { Component } from 'react';
import { interpose } from 'lodash-contrib';

export default class Substantive extends Component {
  render() {
    var head = this.props.analysis.head;
    var interrogative = this.props.analysis.interrogative ? <span className="interrogative"> ala {head}</span> : null;
    var negative = this.props.analysis.negative ? <span className="negative"> ala</span> : null;

    var complements = this.props.analysis.complements ?
      <span className="complement">
        {this.props.analysis.complements[0].complements ? <span className="pi">pi </span> : null }
        {interpose(this.props.analysis.complements.map((substantive, i) => <Substantive analysis={substantive} key={i} />), ' ') }
      </span>
    : null;
    var direct_objects = this.props.analysis.direct_objects ?
      <span className="direct-object">
      <span className="e">e&nbsp;</span>
        {interpose(this.props.analysis.direct_objects.map((substantive, i) => <Substantive analysis={substantive} key={i} />), <span className="e"> e </span>)}
      </span>
    : null;
    var gerundive = this.props.analysis.gerundive ?
      <span className="gerundive">
        <Substantive analysis={this.props.analysis.gerundive} />
      </span>
    : null;
    var prepositional_object = this.props.analysis.prepositional_object ?
      <span className="prepositional-object">
        <Substantive analysis={this.props.analysis.prepositional_object} />
      </span>
    : null;

    var components = [head, interrogative, negative, complements, direct_objects, gerundive, prepositional_object].filter(x => x);

    return (<span>{interpose(components, ' ')}</span>)
  }
}