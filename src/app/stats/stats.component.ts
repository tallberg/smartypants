import { Component, OnInit, Input, OnChanges, } from '@angular/core';
import { Occurances, StatisticsService } from '../shared/services/statistics.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})

export class StatsComponent implements OnInit, OnChanges {
  @Input() input: string;
  characterStatistics = "";
  charUnigram = "";
  wordUnigram = "";
  private _significantNumber = 20;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.updateCharacterStatistics();
    this.updateCharUnigram();
    this.updateWordUnigram();
  }

  updateCharacterStatistics() {
    const value = this.input;
    const lowercase = value.toLocaleLowerCase();
    const words = value.length > 1 ? lowercase.replace(/\s+/g, ' ').split(' ') : [];    
    const chars = value.length;
    const charsExclWhitespace = value.replace(/\s/g,'').length;
    const alphanumChars = value.replace(/[^A-Za-z0-9]/g,'').length;
    const characterOccurrences = StatisticsService.getOccurances(value);
    const occurancesIgnoreCase = StatisticsService.getOccurances(lowercase);
    const uniqueChars = Object.keys(characterOccurrences).length;
    const uniqueCharsIgnoreCase = Object.keys(occurancesIgnoreCase).length;
    this.characterStatistics = `${words.length} words, ${chars} characters, ${charsExclWhitespace} excl. whitespace, ${alphanumChars} alphanumeric, ${uniqueChars} unique,  ${uniqueCharsIgnoreCase} unique ignoring case`
  }

  updateCharUnigram() {
    if (this.input.length > this._significantNumber) {
      const occurances = StatisticsService.getOccurances(this.input);
      const sortedChars = StatisticsService.sortKeysByValue(occurances);
      let commonChars = [];
      for (let i = 0; i < sortedChars.length && i < 11; i++) {
         commonChars.push(`'${sortedChars[i]}'(${occurances[sortedChars[i]]})`);
      }
      this.charUnigram = commonChars.join(', ');
    } else {
      this.charUnigram = '';
    }
  }

  updateWordUnigram() {
    const words = StatisticsService.getWords(this.input.toLowerCase());
    if (words.length < this._significantNumber) { 
      this.wordUnigram = '';  
      return; 
    }
    const wordOccurances = StatisticsService.getOccurances(words);
    const sortedWords = StatisticsService.sortKeysByValue(wordOccurances);
    let commonWords = [];
    for (let i = 0; i < sortedWords.length && i < 11; i++) {
      const occurances = wordOccurances[sortedWords[i]];
      if (occurances < 2) { break; }
      commonWords.push(`${sortedWords[i]}(${occurances})`);
    }
    this.wordUnigram = commonWords.join(', ');
  }

}
