import _ from 'lodash';

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

Grammar.principalForm = function(word) {
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

export default Grammar;