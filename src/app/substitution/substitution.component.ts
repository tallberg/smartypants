import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { solution, SubstitutionService } from './substitution.service';

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

}

