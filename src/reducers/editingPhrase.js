import { SHOW_PHRASE_PICKER, HIDE_PHRASE_PICKER } from '../actions'

export default function editingPhrase(editingPhrase=null, enPhrases, tpPhrases, action) {
	switch(action.type) {
	case SHOW_PHRASE_PICKER:
		return {
			sentenceIndex: action.sentenceIndex,
			phraseIndex: action.phraseIndex,
			tpPhraseId: action.tpPhraseId,
			tpPhraseWords: tpPhrases.find(p=>p.id===action.tpPhraseId).words,
			choices: enPhrases.filter((phrase) => phrase.tokipona_phrase_id === action.tpPhraseId)
		};

	case HIDE_PHRASE_PICKER:
		return null;

	default:
		return editingPhrase;
	}
}