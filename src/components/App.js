import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TranslateTokiponaActions from '../actions';

import TpSentence from './TpSentence';
import EnSentence from './EnSentence';
import PhrasePicker from './PhrasePicker';

class App extends Component {
  handleClick(e) {
    if (this.props.editingPhrase && (e.target.className !== 'phrasepicker')) {
      this.props.dispatch(TranslateTokiponaActions.hidePhrasePicker());
    }
  }

  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TranslateTokiponaActions, dispatch)
    function phraseHighlighters(i) {
      return {
        highlightPhrasePair: phraseIndex => actions.highlightPhrasePair(i, phraseIndex),
        endPhraseHighlight: phraseIndex => actions.endPhraseHighlight(i, phraseIndex)
      };
    }

    return (
      <div className="translation syntax-highlight" onClick={this.handleClick.bind(this)}>
      {this.props.editingPhrase &&
        <PhrasePicker data={this.props.editingPhrase}
          pickPhrase={actions.pickPhrase} ></PhrasePicker>}
      {this.props.tpSentences.map((s, i) => 
        <div key={i}>
          <TpSentence substantives={s.substantives}
            endPunctuation={s.end_punctuation}
            emphatic={s.emphatic}
            question_tag={s.question_tag}
            taso={s.taso}
            {...phraseHighlighters(i)}></TpSentence>
          <EnSentence phrases={this.props.enSentences[i]}
            counterpart={s}
            showPhrasePicker={(phraseIndex, tpId) => actions.showPhrasePicker(i, phraseIndex, tpId)}
            {...phraseHighlighters(i)} ></EnSentence>
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