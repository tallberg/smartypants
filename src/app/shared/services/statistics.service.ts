import { Injectable } from '@angular/core';

export interface Occurances {
  [key: string]: number
}

export interface Unigram {
  [key: string]: number
}

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {
  private static _alphabet = 'abcdefghijklmnopqrstuvwxyzåäöæø';
  private static _nonAlphaRx = new RegExp(`[^a-zåäöæø]`, 'g');
  public static unigrams: any = {
    'en': {'a':8.12,'b':1.49,'c':2.71,'d':4.32,'e':12.02,'f':2.30,'g':2.03,'h':5.92,'i':7.31,'j':0.10,'k':0.69,'l':3.98,'m':2.61,'n':6.95,'o':7.68,'p':1.82,'q':0.11,'r':6.02,'s':6.28,'t':9.10,'u':2.88,'v':1.11,'w':2.09,'x':0.17,'y':2.11,'z':0.07}
  }

  constructor() { }

  public static setAlphabet(alphabet: string): void {
    this._alphabet = alphabet;
    this._nonAlphaRx = new RegExp(`[^${this._alphabet}]`, 'g');
  }

  /**
   * Remove all characters not defined by alphabet (default a-z). 
   * @param input 
   */
  public static getAlpha(input: string, nonAlphaRx: RegExp = this._nonAlphaRx) {
    return input.replace(nonAlphaRx, '');
  }
  
  /**
   * Return unigram object!
   * Ex. unigram = getUnigram(getAlpha('Hello this is a test'.toLowerCase())
   * @param input 
   * @returns 
   */
  public static getUnigram(input: string, alpha: string = this._alphabet): Unigram {    
    const occurances = this.getOccurances(input);
    const unigram = {};
    for (let char of alpha) {
      unigram[char] = occurances[char] ? 100*occurances[char] / input.length : 0.0;
    }
    return unigram;
  }

  public static getOccurances(input: string | string[]): Occurances {
    const result = {}
    for(let w of input) {
      result[w] = ++result[w] || 1;
    }
    return result;
  }

  public static getWords(input: string): string[] {
    const rx = /\s/.test(this._alphabet) 
      ? new RegExp(`[^${this._alphabet}]`, 'gi')
      : new RegExp(`[^${this._alphabet}\\s]`, 'gi');
    input = input.replace(rx, '');
    input = input.replace(/\s+/g, ' ');
    return input.split(' ');
  }

  /**
   * Returns an objects keys sorted by their value
   * @param obj 
   * @param desc
   */
  public static sortKeysByValue(obj: object, desc = true): string[] {
    const result = [];
    const sortFn = desc 
      ? (a: string, b: string) => obj[b] - obj[a]
      : (a: string, b: string) => obj[a] - obj[b];
    return Object.keys(obj).sort(sortFn);    
  }

  
}
