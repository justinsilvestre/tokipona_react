import tpSentences from './tpSentences';
import tpPhrases from './tpPhrases';
import enPhrases from './enPhrases';
import enSentences from './enSentences';
import editingPhrase from './editingPhrase';
import glossPhrase from './glossPhrase';

export default function translateTokiponaApp(state, action) {
	console.log(action)
	return {
		tpSentences: tpSentences(state.tpSentences, action),
		tpPhrases: tpPhrases(state.tpPhrases, action),
		enPhrases: enPhrases(state.enPhrases, action),
		enSentences: enSentences(state, action),
		editingPhrase: editingPhrase(state.editingPhrase, state.enPhrases, state.tpPhrases, action),
		glossPhrase: glossPhrase(state.glossPhrase, state.tpPhrases, state.enPhrases, action)
	}
}
