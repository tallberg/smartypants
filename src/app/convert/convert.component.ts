import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, OnChanges, Input, ɵSWITCH_COMPILE_DIRECTIVE__POST_R3__ } from '@angular/core';

export interface convertion {
  from: string;
  to: string;
  value: any;
}

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.sass']
})

export class ConvertComponent implements OnInit, OnChanges {
  @Input() input: string;
  public conversions: convertion[];
  tmpConversions: convertion[];
  rxInt = /^[0-9\s]+$/;
  rxHex = /^[a-f0-9\s]+|[A-F0-9\s]]$/;
  rxBin = /^[01\s]+$/i;

  constructor() { }

  ngOnInit(): void {
  }

  /** 
   * Make a fair confirmation that a string is b64 encoded
   * A base 64 string includes at least one lowercase and uppercase character, a number 
   * and includes a special char + / or ends with = 
   * @param b64
   * */ 
  isB64(b64: string): boolean {
    return /^[a-zA-Z0-9\+\/]+=?=?$/.test(b64) 
      && /[a-z]/.test(b64) 
      && /[A-Z]/.test(b64) 
      && /[0-9]/.test(b64) 
      && (/[\+\/]/.test(b64) || /=$/.test(b64));
  }

  ngOnChanges(): void {
    if (!this.input) { 
      this.conversions = null;
      return;
    };
    this.tmpConversions = [];
    if (this.isB64(this.input)) {
      this.fromB64(this.input);      
    } else {
      this.fromBin(this.input);
      this.fromInt(this.input);
      this.fromHex(this.input);
      this.fromText(this.input);  
    }
    this.conversions = this.tmpConversions;
  }

  fromInt(int: string): void {     
    if (!this.rxInt.test(int)) {
      return;
    }
    int = int.trim().replace(/\s+/g, ' ');
    const ints = int.split(' ').map(i => +i);
    const hex = ints.map(i => this.dec2hex(i)).join(' ');
    this.tmpConversions.push({from: 'Integer', to: 'Hex', value: hex});
    const nl = 10;
    const cr = 13;
    const tab = 9;
    
    if (ints.every(i => i < 256)) {
        const bin = ints.map(i => this.dec2bin(i)).join(' ');
        this.tmpConversions.push({from: 'Integer', to: 'Binary', value: bin});

        if(ints.every(i => i >= 32 || i === nl || i === cr || i === tab)) {
          const txt = ints.map(i => String.fromCharCode(i)).join('');
          this.tmpConversions.push({from: 'Integer', to: 'Text', value: txt});  
        }
    }
}

fromBin(bin: string): void {
    if (this.rxBin.test(bin)) {
        console.log('value is binary');             
    } else {
        return;
    }

    bin = bin.replace(/\s/g, '');
    if (bin.length < 54) {
        const dec = parseInt(bin, 2);
        this.tmpConversions.push({from: 'Binary', to: 'Decimal', value: dec});
        const hex = this.dec2hex(dec);
        this.tmpConversions.push({from: 'Binary', to: 'Hex', value: hex});        
    }

    const bytes = this.split(bin, 8);

    // Decimal (bytes)
    const dec2 = bytes.map(b => this.bin2dec(b));
    this.tmpConversions.push({from: 'Binary', to: 'Decimal (bytes)', value: dec2.join(' ')});

    // Hex (bytes)
    const hex = dec2.map(p => this.dec2hex(p).padStart(2, '0')).join(' ');
    this.tmpConversions.push({from: 'Binary', to: 'Hex (bytes)', value: hex});

    // Text
    const txt = dec2.map(a => String.fromCharCode(a)).join('');
    this.tmpConversions.push({from: 'Binary', to: 'Text', value: txt});
}

fromText(text: string) {
    if (text.length > 10 && !/[a-z]/i.test(text)) { return; }
    const ascii = text.split('').map(c => c.charCodeAt(0));    
    if(text.length < 100) {
      const bin = ascii.map(a => this.dec2bin(a)).join(' ');
      this.tmpConversions.push({from: 'Text', to: 'Binary', value: bin});  
    }
    const hex = ascii.map(a =>  this.dec2hex(a).padStart(2, '0')).join(' ');
    this.tmpConversions.push({from: 'Text', to: 'Hex', value: hex});
    const b64 = btoa(text);
    this.tmpConversions.push({from: 'Text', to: 'Base64', value: b64});
}

fromB64(b64: string)  {
  if (b64.length < 5 && /^[a-zA-Z0-1\+\/]+=?=?$/.test(b64) === false) { return; } 
  const printableRx = /^[\t\r\n\u0020-\u007e\u00a0-\u00ff]*$/;
  console.log(b64);
  const text = btoa(b64);
  console.log(text);
  if (printableRx.test(text)) {
    this.tmpConversions.push({from: 'Base64', to: 'Text', value: text});
  }
  const ascii = text.split('').map(c => c.charCodeAt(0));
  const hex = ascii.map(a =>  this.dec2hex(a).padStart(2, '0')).join(' ');
  this.tmpConversions.push({from: 'Base64', to: 'Hex', value: hex});
}

fromHex(hex: string) {        
    if (!this.rxHex.test(hex)) { return; }
    hex = hex.trim().replace(/\s+/g, ' ');

    // Decimal
    if (hex.length < 20 && /^[a-f0-9]+$/i.test(hex)) {
        const dec = parseInt(hex, 16)
        this.tmpConversions.push({from: 'Hex', to: 'Decimal', value: dec});
    }

    // Split
    let bytes = [];
    if (hex.indexOf(' ') >= 0) { 
       bytes = hex.split(' ');
       if (bytes.some(byte => byte.length !== 2)) { 
        return; 
       }
    } else if (hex.length % 2 === 0) {
      bytes = this.split(hex, 2);
    } else {
      return;
    }

    // Decimal (bytes)
    const dec2 = bytes.map(p => this.hex2dec(p));
    this.tmpConversions.push({from: 'Hex (bytes)', to: 'Decimal', value: dec2.join(' ')});

    // Binary
    const bin = dec2.map(p => this.dec2bin(p)).join(' ');
    this.tmpConversions.push({from: 'Hex (bytes)', to: 'Binary', value: bin});

    // Text
    if(dec2.every(i => (i < 256 && i > 32) || i === 10 || i === 13 || i === 9)) {
      const txt = dec2.map(a => String.fromCharCode(a)).join('');
      this.tmpConversions.push({from: 'Hex (bytes)', to: 'Text', value: txt});        
    }
}

/**
 * Split a string in specified sized chunks
 * split('03FB3E402B', 2) => [03,FB,3E,40,2B]
 * @param str 
 * @param size 
 */
split(str: string, size: number): string[] {
    const rx = new RegExp(`(.{${size}})`, 'g');
    return str.replace(rx, '$1\t').trim().split('\t');
}

hex2dec(hex: string): number {
    return parseInt(hex, 16);
}

dec2hex(dec: number): string {
    return dec.toString(16);
}

dec2bin(dec: number): string {
    return dec.toString(2).padStart(8, '0');
}

bin2dec(bin: string): number {
    return parseInt(bin, 2);
}


// dec2baseN(dec, base, chars) {
//     if (base <= 36 && !chars) { return dec.toString(base) };
//     chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWWXYZ-_';
//     if (chars.length < base) { 
//         console.error('base > 65 needs specified characters');
//         return undefined 
//     }
//     result = '';
//     const start = Math.floor(Math.log(dec) / Math.log(base));
//     for (let pow = start; pow >= 0; pow--) {
//         let p = Math.floor(Math.log(dec) / Math.log(base));
//         if (p < pow) {
//             result += chars[0];
//         } else if (p === 0) {
//             result += chars[dec];
//         } else {
//             const res = Math.pow(base, p);
//             const pos =  Math.floor(dec / res)
//             result += chars[pos];
//             dec -= pos * res;
//         }
//     }        
//     return result;
// }


}
