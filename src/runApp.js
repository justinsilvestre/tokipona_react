import React from 'react';
import { connect, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import translateTokiponaApp from './reducers';
import _ from 'lodash';

export default function runTokiponaApp(analysis, rootElementId) {
	const initialState = {
	  tpPhrases: analysis.tokipona_phrases,
	  enPhrases: analysis.english_phrases.sort((p1, p2) => p2.uses - p1.uses),
	  tpSentences: analysis.tokipona_sentences.map(sen => {
	  	return Object.assign({}, sen, { substantives:
		  	sen.substantives.map(s => {
		  		const tp = analysis.tokipona_phrases.find((p) => _.isEqual([p.words, p.role], [s.word, s.pos]));
		  		return Object.assign({}, s, { id: (tp && tp.id) })
		  	})
		  })
	  })
	};
	const store = createStore(translateTokiponaApp, initialState);

	React.render(
		<Provider store={store}>
		{() => <App />}
		</Provider>,
		document.getElementById(rootElementId)
	);

}
