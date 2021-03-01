import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { solution, SubstitutionService } from './substitution.service';
import { DictionaryService  } from '../shared/services/dictionary.service';
import { LeadingComment } from '@angular/compiler';

@Component({
  selector: 'app-substitution',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.sass']
})

export class SubstitutionComponent implements OnInit, OnChanges {
  @Input() input: string;

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
    // this.fibonacci = SubstitutionService.fibonacci(this.input);
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

    console.log(cryptoWords, plaintextWords);
    this.sugestions = {};
    for (let i = 0; i < cryptoWords.length; i++) {
      if (!this.sugestions[cryptoWords[i]]) {
        this.sugestions[cryptoWords[i]] = DictionaryService.getSugestions(cryptoWords[i], plaintextWords[i]).join();
      }
    }

  }

}

