import {
	PICK_ENGLISH_PHRASE,
	HIGHLIGHT_PHRASE_PAIR,
	END_PHRASE_HIGHLIGHT,
} from '../actions';
import I from '../immutableHelper';
import { principalForm } from '../grammar';

function initialEnSentences(tpSentences, tpPhrases, enPhrases) {
	return tpSentences.map(sen => {
		return sen.substantives.map(s => {
			var tpPhrase = tpPhrases.find(phrase => phrase.words === principalForm(s.word));
			return enPhrases.find(phrase => phrase.tokipona_phrase_id === (tpPhrase && tpPhrase.id)) || {};
		})
	});
}

export default function enSentences(state={}, action) {
	const sentenceIndex = action.sentenceIndex;
	const phraseIndex = action.phraseIndex;
	var newPhraseObj;

	const { tpSentences, tpPhrases, enPhrases } = state;
	const sentences = state.enSentences ? state.enSentences : initialEnSentences(tpSentences, tpPhrases, enPhrases);

	switch(action.type) {
	case PICK_ENGLISH_PHRASE:
		return I(sentences).set(sentenceIndex, I(sentences[sentenceIndex]).set(phraseIndex, action.phraseData));

	case HIGHLIGHT_PHRASE_PAIR:
		newPhraseObj = I(sentences[sentenceIndex][phraseIndex]).set({ highlighted: true })
		return I(sentences).set(sentenceIndex, I(sentences[sentenceIndex]).set(phraseIndex, newPhraseObj));

	case END_PHRASE_HIGHLIGHT:
		newPhraseObj = I(sentences[sentenceIndex][phraseIndex]).set({ highlighted: false })
		return I(sentences).set(sentenceIndex, I(sentences[sentenceIndex]).set(phraseIndex, newPhraseObj));

	default:
		return sentences;
	}
}