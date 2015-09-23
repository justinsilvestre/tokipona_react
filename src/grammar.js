import _ from 'lodash';
import { interpose } from 'lodash-contrib';

const T = 't';
const PREP = 'prep';
const PREV = 'prev';
const PRO = 'pro';
const I = 'i';

const Grammar = {};

Grammar.roles = {

};

Grammar.headRole = function(headParent) {
	if (_.has(headParent, 'direct_objects')) {
		return 't';
	} else if (_.has(headParent, 'prepositional_object')) {
		return 'prep';
	} else if (_.has(headParent, 'gerundive')) {
		return 'prev';
	} else if (headParent.head.match(/^[A-Z]/)) {
		return 'pro';
	} else {
		return 'i';
	}
};

export function principalForm(word) {
	switch (word) {
		case 'ali':
			return 'ale';
		case 'oko':
			return 'lukin';
		case 'namako':
			return 'sinpin';
		case 'kin':
			return 'a';
		default:
			return word;
	}
}

export function phraseStart(sentence, wordIndex) {
	var word = sentence[wordIndex];
	return hasParent(word) ? phraseStart(sentence, word.parent) : wordIndex;
}

export function phraseRole(sentence, wordIndex) {
	return sentence[phraseStart(sentence, wordIndex)].role;
};

export function hasParent(word) {
	return _.isNumber(word.parent);
}

export function children(sentence, wordIndex) {
	var _childIndices = childIndices(sentence, wordIndex)
	return _childIndices ? _childIndices.map(ci => sentence[ci]) : null;
}

export function phraseEnd(sentence, wordIndex) {
	return lastDescendant(sentence, phraseStart(sentence, wordIndex));
}

export function childIndices(sentence, wordIndex) {
	switch (sentence[wordIndex].pos) {
	case PREP:
	case PREV:
		return [wordIndex + 1];
	case I:
	case PRO:
		return (sentence[wordIndex].complements ? sentence[wordIndex].complements : null);
	case T:
		return (sentence[wordIndex].complements || []).concat(sentence[wordIndex].objects || []);
	// error default
	}
}

export function lastSiblingIndex(sentence, wordIndex) {
	var word = sentence[wordIndex];
	return hasParent(word) ? _.last(sentence[word.parent].childIndices) : wordIndex;
}

export function isLastSibling(sentence, wordIndex) {
	return lastSiblingIndex(sentence, wordIndex) === wordIndex;
}

export function lastDescendant(sentence, wordIndex) {
	var _childIndices = childIndices(sentence, wordIndex);
	return _childIndices ? lastDescendant(sentence, _.last(_childIndices)) : wordIndex;
}

export function roleChain(sentence, wordIndex) {
	var parentRoles = hasParent(sentence[wordIndex]) ? roleChain(sentence, sentence[wordIndex].parent) : [];
	return parentRoles.concat([ sentence[wordIndex].role ]);
}

export function finalParticle(substantives, i) {
	return i === phraseEnd(substantives, i) ?
		({ voc: 'o ', cpre: 'la '}[phraseRole(substantives, i)] || null)
		: null;
}

export default Grammar;