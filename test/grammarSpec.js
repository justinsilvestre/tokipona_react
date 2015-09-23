import expect from 'expect';
import { tokipona_sentences as tpSentences } from '../src/analysis'
import { phraseStart, phraseEnd, children, lastDescendant } from '../src/grammar';

describe('Grammar helper', ()=> {
	var ma_ali = tpSentences[0].substantives;
		// ma ali li jo e toki wan sama
	var lawa_pi = tpSentences[9].substantives;
		// lawa pi tomo palisa li lon sewi kon 
	var mi_wile_tawa = tpSentences[18].substantives;
		// mi wile tawa anpa 
	var mi_mute_o_pali = tpSentences[8].substantives;
		// mi mute o pali e ma tomo e tomo palisa suli 
	var o_kama = tpSentences[4].substantives;

	describe('phraseStart', ()=> {
		it('returns own index for phrase head', ()=> {
			expect(phraseStart(ma_ali, 0)).toEqual(0);
		});

		it('returns parent index for 2nd-level substantives', ()=> {
			expect(phraseStart(ma_ali, 1)).toEqual(0);
		});

		it('returns grandparent index for 3rd-level substantives', ()=> {
			expect(phraseStart(lawa_pi, 2)).toEqual(0);
		});
	});

	describe('phraseEnd', ()=> {
		it('returns own index for simple phrase head', ()=> {
			expect(phraseEnd(o_kama, 0)).toEqual(0);
		});

		it('returns last child index for parent in two-tier phrase', ()=> {
			expect(phraseEnd(ma_ali, 0)).toEqual(1);
		});

		it('returns last grandchild index for grandparent in three-tier phrase', ()=> {
			expect(phraseEnd(ma_ali, 2)).toEqual(5);
		})

		it('returns last sibling index for child in two-tier phrase', ()=> {
			expect(phraseEnd(lawa_pi, 1)).toEqual(2);
		});

		it('returns last sibling\'s last child index for child in three-tier phrase', ()=> {
			expect(phraseEnd(mi_mute_o_pali, 3)).toEqual(7);
		})
	});

	describe('children', ()=> {
		it('returns null for simple substantive', ()=> {
			expect(children(ma_ali, 1)).toBe(null);
		});

		it ('returns only own complements for modified substantive', ()=> {
			expect(children(lawa_pi, 0).map(s => s.word)).toEqual(['tomo'])
		});

		it ('returns all own complements for modified substantive', ()=> {
			expect(children(ma_ali, 3).map(s => s.word)).toEqual(['wan', 'sama'])
		});

		it ('returns object of preposition', ()=> {
			expect(children(lawa_pi, 3).map(s => s.word)).toEqual(['sewi']);
		});

		it ('returns gerundive of preverb', ()=> {
			expect(children(mi_wile_tawa, 1).map(s => s.word)).toEqual(['tawa']);
		});

		it ('returns direct objects of transitive verb', ()=> {
			expect(children(mi_mute_o_pali, 2).map(s => s.word)).toEqual(['ma', 'tomo']);
		});
	});



});