import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TranslateTokiponaActions from '../actions';

import Sentence from './Sentence';
import EnglishSentence from './EnglishSentence';
import PhrasePicker from './PhrasePicker';

require('!style!css!sass!../styles.scss');

class App extends Component {
  handleClick(e) {
    if (e.target.className !== 'phrasepicker') {
      this.props.dispatch(TranslateTokiponaActions.hidePhrasePicker());
    }
  }

  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TranslateTokiponaActions, dispatch)
    
    return (
      <div className="translation syntax-highlight" onClick={this.handleClick.bind(this)}>
        {this.props.editingPhrase ? <PhrasePicker data={this.props.editingPhrase} pickPhrase={actions.pickPhrase}/> : null}

        {this.props.tpSentences.map((sentence, i) =>
          <div key={i}>
            <Sentence analysis={sentence} counterpart={this.props.enSentences[i]} />
            <EnglishSentence sentenceIndex={i} analysis={this.props.enSentences[i]} counterpart={sentence} actions={actions} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tpSentences, enSentences, tpPhrases, enPhrases, editingPhrase } = state;
  return {
    tpSentences,
    enSentences,
    tpPhrases,
    enPhrases,
    editingPhrase
  }
}

export default connect(mapStateToProps)(App);