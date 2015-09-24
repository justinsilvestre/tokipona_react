import React, { Component } from 'react';
import _ from 'lodash';

export default class TpSubstantive extends Component {
	render() {
		const word = this.props.analysis.word
		const initialParticle = (this.props.analysis.particle && this.props.analysis.particle + ' ') ||
			{ drob: 'e ', comp: (this.props.analysis.complements ? 'pi ' : null) }[this.props.analysis.role]
		const finalParticle = this.props.finalParticle && ' ' + this.props.finalParticle;
		const particleEl = particleText => particleText ? <span className="particle">{particleText}</span> : null;

		const classes = this.props.roleChain.join(' ');
		return(
			<span className={classes}
				onMouseEnter={this.props.highlight}
				onMouseLeave={this.props.endHighlight}
				onClick={this.props.showGloss}
			>
				{particleEl(initialParticle)}
				{this.props.analysis.highlighted}
				<span className={this.props.analysis.highlighted && 'highlighted'}>
					{word}
					{this.props.analysis.negative && ' ala'}
					{this.props.analysis.interrogative && ` ${word}`}
				</span>
				{particleEl(finalParticle)}
			</span>
		);
	}	
}