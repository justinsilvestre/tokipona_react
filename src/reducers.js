require('babel-core/polyfill');

import { combineReducers } from 'redux';
import { SHOW_PHRASE_PICKER, HIDE_PHRASE_PICKER, PICK_ENGLISH_PHRASE, HIGHLIGHT_PHRASE_PAIR, END_PHRASE_HIGHLIGHT } from './actions';

import { headRole, principalForm } from './grammar';

Array.prototype.iSet = function(index, newValue) {
	return [...this.slice(0, index), newValue, ...this.slice(index + 1)]
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
	return tpSentences.map(sen => {
		return sen.substantives.map(s => {
			var tpPhrase = tpPhrases.find(phrase => phrase.words === principalForm(s.word));
			return enPhrases.find(phrase => phrase.tokipona_phrase_id === (tpPhrase && tpPhrase.id)) || {};
		})
	});
}


function enSentences(state={}, action) {
	const sentenceIndex = action.sentenceIndex;
	const phraseIndex = action.phraseIndex;
	var newPhraseObj;

	const { tpSentences, tpPhrases, enPhrases } = state;
	const sentences = state.enSentences ? state.enSentences : initialEnSentences(tpSentences, tpPhrases, enPhrases);

	switch(action.type) {
	case PICK_ENGLISH_PHRASE:
		return sentences.iSet(sentenceIndex, sentences[sentenceIndex].iSet(phraseIndex, action.phraseData));
		return [...sentences.slice(0, action.sentenceIndex),

			[
				...sentences[action.sentenceIndex].slice(0, action.phraseIndex),
				action.phraseData,
				...sentences[action.sentenceIndex].slice(action.phraseIndex +1)
			],

			...sentences.slice(action.sentenceIndex + 1)
		];
	case HIGHLIGHT_PHRASE_PAIR:
		newPhraseObj = Object.assign({}, sentences[sentenceIndex][phraseIndex], { highlighted: true })
		return sentences.iSet(sentenceIndex, sentences[sentenceIndex].iSet(phraseIndex, newPhraseObj));
	case END_PHRASE_HIGHLIGHT:
		newPhraseObj = Object.assign({}, sentences[sentenceIndex][phraseIndex], { highlighted: false })
		return sentences.iSet(sentenceIndex, sentences[sentenceIndex].iSet(phraseIndex, newPhraseObj));
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

function tpSentences(tpSentences=[], action) {
	var newPhraseObj;
	const sentenceIndex = action.sentenceIndex;
	const phraseIndex = action.phraseIndex;

	switch(action.type) {
	case (HIGHLIGHT_PHRASE_PAIR):
	newPhraseObj = Object.assign({}, tpSentences[sentenceIndex].substantives[phraseIndex], { highlighted: true })
		return tpSentences.iSet(sentenceIndex, 
			Object.assign({}, tpSentences[sentenceIndex], {
				substantives:
				tpSentences[sentenceIndex].substantives.iSet(phraseIndex, newPhraseObj)
			})
		);
	case END_PHRASE_HIGHLIGHT:
	newPhraseObj = Object.assign({}, tpSentences[sentenceIndex].substantives[phraseIndex], { highlighted: false })
		return tpSentences.iSet(sentenceIndex, 
			Object.assign({}, tpSentences[sentenceIndex], {
				substantives:
				tpSentences[sentenceIndex].substantives.iSet(phraseIndex, newPhraseObj)
			})
		);
	default:
		return tpSentences;
	}
}

function translateTokiponaApp(state, action) {
	console.log(action)
	return {
		tpSentences: tpSentences(state.tpSentences, action),
		tpPhrases: tpPhrases(state.tpPhrases, action),
		enPhrases: enPhrases(state.enPhrases, action),
		enSentences: enSentences(state, action),
		editingPhrase: editingPhrase(state.editingPhrase, state.enPhrases, action)
	}
}

export default translateTokiponaApp;