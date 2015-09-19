import React from 'react';
import { connect, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import translateTokiponaApp from './reducers';
import { eachWithIndex as eachHeadWithIndex } from './heads'

export default function runTokiponaApp(analysis, rootElementId) {

	for (var i = 0; i < analysis.tree.length; i++) {
		eachHeadWithIndex(analysis.tree[i], (head, phrase, headIndex) => {
			phrase.h = headIndex;
		});
	}

	const initialState = {
		tpSentences: analysis.tree,
	  tpPhrases: analysis.tokipona_phrases,
	  enPhrases: analysis.english_phrases.sort((p1, p2) => p2.uses - p1.uses)
	};

	var store = createStore(translateTokiponaApp, initialState);

	React.render(
		<Provider store={store}>
		{() => <App />}
		</Provider>,
		document.getElementById(rootElementId)
	);

}
