import { SHOW_GLOSS, HIDE_GLOSS } from '../actions';
import I from '../immutableHelper'

export default function glossPhrase(glossPhrase=null, tpPhrases, enPhrases, action) {
	switch (action.type) {
	case SHOW_GLOSS:
		var match = tpPhrases.find(p => p.id === action.tpPhraseId);
		return match && I(match).set('en', enPhrases.filter(p => p.tokipona_phrase_id === action.tpPhraseId));

	case HIDE_GLOSS:
		return null;

	default:
		return glossPhrase;
	}
}