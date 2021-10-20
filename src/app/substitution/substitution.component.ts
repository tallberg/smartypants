import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { solution, SubstitutionService } from './substitution.service';
import { DictionaryService  } from '../shared/services/dictionary.service';
import { StatisticsService } from '../shared/services/statistics.service';

@Component({
  selector: 'app-substitution',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.sass']
})

export class SubstitutionComponent implements OnInit, OnChanges {
  @Input() input: string;
  showSubstitution = false;

  fibonacci = '';
  atbash = '';
  caesar: solution = { key: '', result: '' };

  // Manual labour
  alphabet = [];
  crypto = [];
  substitution = [];
  alphaShift = [];
  numberShift = [];
  plaintext = [];
  sugestions = {};

  constructor() { }

  ngOnInit(): void {
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.substitution = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    this.showSubstitution = this.input.length >= 8 && (this.input.match(/ /g) || []).length >= 2; // at least 8 chars including 2 spaces
    // this.fibonacci = SubstitutionService.fibonacci(this.input);
    console.log(this.input.length, this.input.match(/ /g) , (this.input.match(/ /g) || []).length, this.showSubstitution.toString());

    this.atbash = SubstitutionService.atbash(this.input);
    this.caesar = SubstitutionService.caesar(this.input);
    SubstitutionService.testVigenere();
    this.crypto = this.input.split('');
    this.onSubstitutionChange();
    // SubstitutionService.testDelimit();
  }

  onSubstitutionChange() {
    console.log('substitution change');
    this.plaintext = this.crypto.map(x => {
      let i = this.substitution.indexOf(x);
      if (this.substitution[i] === this.alphabet[i]) {
        i = this.substitution.lastIndexOf(x);
      }
      return (i === -1) ? x : this.alphabet[i];
    });
  }

  substitutionReplacemen = 0;
  onPlaintextKeyUp(event: KeyboardEvent, index: number) {
    event.stopPropagation();
    const plainKey = event.key.toLocaleUpperCase();
    const alphaIndex = this.alphabet.indexOf(plainKey);
    if (alphaIndex === -1) {
      return;
    }
    const cryptoKey = this.crypto[index];
    this.substitution[alphaIndex] = cryptoKey;
    this.onSubstitutionChange();    
  }

  reset(){
    this.substitution = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.onSubstitutionChange();
  }

  public keepOriginalOrder = (a: any, _: any) => a.key

  getCharFilter(cryptoWords, plaintextWords) {
    let allIdentifiedChars = plaintextWords
      .map((w: string, i: number) => 
        w.split('').map((c:string, j:number) => 
          c === cryptoWords[i].charAt(j) ? '' : c))
      .flat().join('').toLowerCase();
    let uniqueIdentifiedChars = [...(new Set(allIdentifiedChars))].join('');
    
    return uniqueIdentifiedChars ? `[^${uniqueIdentifiedChars}]` : '.';
  }

  getSugestions() {
    // TODO: split without cleaning up and classify by word, hyphenated, start and end o sentance, words after comma ect. 
    // Add all that fancy frequency analysis stuff. 
    let cryptoWords = this.crypto.join('')
      .replace(/[^A-Z']/g, ' ')
      .replace(/\s\s/g, ' ')
      .split(' ');
    
    let plaintextWords = this.plaintext.join('')
      .replace(/[^A-Z']/g, ' ')
      .replace(/\s\s/g, ' ')
      .split(' '); 

    if (cryptoWords.length !== plaintextWords.length) {
      console.error('crypto length and plaintext length does not match');
      return;
    }
    const filter = this.getCharFilter(cryptoWords, plaintextWords);
    const unigram = StatisticsService.getUnigram(plaintextWords.join().toLowerCase());
    this.sugestions = {};
    for (let i = 0; i < cryptoWords.length; i++) {
      if (!this.sugestions[cryptoWords[i]]) {
        this.sugestions[cryptoWords[i]] = DictionaryService.getSugestions(cryptoWords[i], plaintextWords[i], 20, filter, unigram, StatisticsService.unigrams['en']);
      }
    }

  }

  useSugestion(crypto, sugestion) {
    crypto = crypto.toUpperCase();
    sugestion = sugestion.toUpperCase();
    if(crypto.length !== sugestion.length) {
      console.error('Crypto and sugestion are not of same length.');
      return;
    }
    for (let i in sugestion) {
      let idx = this.alphabet.indexOf(sugestion[i]);
      if (idx !== -1) {
        this.substitution[idx] = crypto[i];
      }
    }
    this.onSubstitutionChange();
    this.getSugestions();
  }

}

