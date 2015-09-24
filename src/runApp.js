import React from 'react';
import { connect, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import translateTokiponaApp from './reducers/index.js';
import _ from 'lodash';
import { principalForm } from './grammar'

var Tokipona = {};

function getInitialState(analysis) {
	const by_uses = (p1, p2) => p2.uses - p1.uses;
	return {
	  tpPhrases: analysis.tokipona_phrases,
	  enPhrases: analysis.english_phrases.sort(by_uses),
	  tpSentences: analysis.tokipona_sentences.map(sen => {
	  	return Object.assign({}, sen, { substantives:
		  	sen.substantives.map(s => {
		  		const tp = analysis.tokipona_phrases.find((p) => _.isEqual([p.words, p.role], [principalForm(s.word), s.pos]));
		  		return Object.assign({}, s, { id: (tp && tp.id) })
		  	})
		  })
	  }),
	  enSentences: analysis.english_sentences && analysis.english_sentences.map(s => {
	  	return s.map(phraseId => analysis.english_phrases.sort(by_uses).find(p => (p.id === phraseId)) || {});
	  })
	};
}

Tokipona.Document = class {
	constructor(analysis) {
		const initialState = getInitialState(analysis);
		this.store = createStore(translateTokiponaApp, initialState);
		this.settings = {};
	}

	mount(rootElement) {
		this.provider = React.render(
			<Provider store={this.store}>
			{() => <App {...this.settings} />}
			</Provider>,
			rootElement
		);
	}
}

Tokipona.Translation = class extends Tokipona.Document {
	constructor(analysis) {
		super(analysis)
		this.settings = { translate: true }
	}

	package() {
		const state = this.provider.store.getState();
		return `[${state.enSentences.map(sentence => {
			return `[${sentence.map(phrase => phrase.id || 'null')}]`;
		})}]`;
	}
}

export default Tokipona;
