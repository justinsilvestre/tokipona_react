export const SHOW_PHRASE_PICKER = 'SHOW_PHRASE_PICKER';
export const HIDE_PHRASE_PICKER = 'HIDE_PHRASE_PICKER';
export const PICK_ENGLISH_PHRASE = 'PICK_ENGLISH_PHRASE';
export const HIGHLIGHT_PHRASE_PAIR = 'HIGHLIGHT_PHRASE_PAIR';
export const END_PHRASE_HIGHLIGHT = 'END_PHRASE_HIGHLIGHT';

export function showPhrasePicker(sentenceIndex, phraseIndex, tpPhraseId) {
	return {
		type: SHOW_PHRASE_PICKER,
		sentenceIndex,
		phraseIndex,
		tpPhraseId
	};
}

export function hidePhrasePicker () {
	return {
		type: HIDE_PHRASE_PICKER
	};
}

export function pickPhrase(sentenceIndex, phraseIndex, phraseData) {
	return {
		type: PICK_ENGLISH_PHRASE,
		sentenceIndex,
		phraseIndex,
		phraseData
	};
}

export function highlightPhrasePair(sentenceIndex, phraseIndex) {
	return {
		type: HIGHLIGHT_PHRASE_PAIR,
		sentenceIndex,
		phraseIndex
	};
}

export function endPhraseHighlight(sentenceIndex, phraseIndex) {
	return {
		type: END_PHRASE_HIGHLIGHT,
		sentenceIndex,
		phraseIndex
	}
}