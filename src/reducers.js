require('babel-core/polyfill');

import { combineReducers } from 'redux';
import { SHOW_PHRASE_PICKER, HIDE_PHRASE_PICKER, PICK_ENGLISH_PHRASE, HIGHLIGHT_PHRASE_PAIR } from './actions';

import { each as eachHead } from './heads';
import { headRole, principalForm } from './grammar';

function tpSentences(sentences=[], action) {
	switch(action.type) {
	default:
		return sentences;
	}
}

function tpPhrases(phrases=[], action) {
	switch(action.type) {
	default:
		return phrases;
	}
}

function enPhrases(phrases=[], action) {
	switch(action.type) {
	default:
		return phrases;
	}
}

function initialEnSentences(tpSentences, tpPhrases, enPhrases) {
	return tpSentences.map(tpSentence => {
    var sentence = [];
    eachHead(tpSentence, (head, parent) => {
      var tpPhrase = tpPhrases.find(phrase => phrase.words === principalForm(head));
      var enPhrase = tpPhrase ? enPhrases.find(phrase => phrase.tokipona_phrase_id === tpPhrase.id) : null;
      sentence.push(enPhrase);
    });
    return sentence;
  });
}

function enSentences(state={}, action) {
	const { tpSentences, tpPhrases, enPhrases } = state;
	const sentences = state.enSentences ? state.enSentences : initialEnSentences(tpSentences, tpPhrases, enPhrases);

	switch(action.type) {
	case PICK_ENGLISH_PHRASE:
		return [...sentences.slice(0, action.sentenceIndex),

			[
				...sentences[action.sentenceIndex].slice(0, action.phraseIndex),
				action.phraseData,
				...sentences[action.sentenceIndex].slice(action.phraseIndex +1)
			],

			...sentences.slice(action.sentenceIndex + 1)
		];
	default:
		return sentences;
	}
}

function editingPhrase(editingPhrase=null, enPhrases, action) {
	switch(action.type) {
	case SHOW_PHRASE_PICKER:
		return {
			sentenceIndex: action.sentenceIndex,
			phraseIndex: action.phraseIndex,
			tpPhraseId: action.tpPhraseId,
			choices: enPhrases.filter((phrase) => phrase.tokipona_phrase_id === action.tpPhraseId)
		};
	case HIDE_PHRASE_PICKER:
		return null;
	default:
		return editingPhrase;
	}
}

function translateTokiponaApp(state, action) {
	return {
		tpSentences: tpSentences(state.tpSentences, action),
		tpPhrases: tpPhrases(state.tpPhrases, action),
		enPhrases: enPhrases(state.enPhrases, action),
		enSentences: enSentences(state, action),
		editingPhrase: editingPhrase(state.editingPhrase, state.enPhrases, action)
	}
}

export default translateTokiponaApp;