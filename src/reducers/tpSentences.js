import {
	HIGHLIGHT_PHRASE_PAIR,
	END_PHRASE_HIGHLIGHT,
} from '../actions';
import I from '../immutableHelper';

export default function tpSentences(tpSentences=[], action) {
	var newPhraseObj;
	const sentenceIndex = action.sentenceIndex;
	const phraseIndex = action.phraseIndex;

	switch(action.type) {
	case (HIGHLIGHT_PHRASE_PAIR):
	newPhraseObj = I(tpSentences[sentenceIndex].substantives[phraseIndex]).set({ highlighted: true })
		return I(tpSentences).set(sentenceIndex, 
			I(tpSentences[sentenceIndex]).set({
				substantives:
				I(tpSentences[sentenceIndex].substantives).set(phraseIndex, newPhraseObj)
			})
		);

	case END_PHRASE_HIGHLIGHT:
	newPhraseObj = I(tpSentences[sentenceIndex].substantives[phraseIndex]).set({ highlighted: false })
		return I(tpSentences).set(sentenceIndex, 
			I(tpSentences[sentenceIndex]).set({
				substantives:
				I(tpSentences[sentenceIndex].substantives).set(phraseIndex, newPhraseObj)
			})
		);

	default:
		return tpSentences;
	}
}