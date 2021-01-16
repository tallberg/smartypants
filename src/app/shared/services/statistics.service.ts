import { Injectable } from '@angular/core';

export interface occurances {
  [key: string]: number
}

@Injectable({
  providedIn: 'root'
})

export class StatisticsService {
  private static _alphabet = 'abcdefghijklmnopqrstuvwxyzåäöæø';
  private static _nonAlphaRx = new RegExp(`[^a-zåäöæø]`, 'g');

  constructor() { }

  public static setAlphabet(alphabet: string): void {
    this._alphabet = alphabet;
    this._nonAlphaRx = new RegExp(`[^${this._alphabet}]`, 'g');
  }

  /**
   * Remove all non only characters defined by alphabet (default a-z). 
   * @param input 
   */
  public static getAlpha(input: string) {
    return input.replace(this._nonAlphaRx, '');
  }
  
  public static getOccurances(input: string | string[]): occurances {
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
