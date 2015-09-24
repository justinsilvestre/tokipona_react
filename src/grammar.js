import _ from 'lodash';

const T = 't';
const PREP = 'prep';
const PREV = 'prev';
const PRO = 'pro';
const I = 'i';

const Grammar = {};

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

export const posNames = {
	i: 'noun/adjective/intransitive verb',
	t: 'transitive verb',
	pro: 'proper noun',
	prev: 'preverb',
	prep: 'preposition'
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

const particleTails = { voc: 'o ', cpre: 'la '};

export function finalParticle(substantives, i) {
	return i === phraseEnd(substantives, i) ?
		(particleTails[phraseRole(substantives, i)] || null)
		: null;
}

export default Grammar;