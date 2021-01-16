import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, LinearTickOptions } from 'chart.js';

export interface chart {
  labels?: string[];
  options?: ChartOptions;
  data?: ChartDataSets[];
}

@Component({
  selector: 'app-unigram',
  templateUrl: './unigram.component.html',
  styleUrls: ['./unigram.component.sass']
})

export class UnigramComponent implements OnInit, OnChanges {
  @Input() input: string;

  showChart = false;
  chart: chart = {};

  constructor() { }

  ngOnInit(): void {
    this.chart.options = {
      responsive: true,
      scales: { xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true, 
          precision: 0
        } as LinearTickOptions
      }] }      
    };
  }

  ngOnChanges(): void {
    this.updateChart();
  }
  
  private toPercent(n: number): number {
    return Math.round(n*10000)/100;
  }

  updateChart() {
    const az = this.input.replace(/[^\wåäö]/ig,'');
    this.showChart = false;
    if (az.length < 20) { return; }
    const azOccurances = {};
    for(let c of az) {
      azOccurances[c] = ++azOccurances[c] || 1;
    }
    if (Object.keys(azOccurances).length < 10) { return; }    
    const sum = Object.values(azOccurances).reduce((a: number, b: number) => a + b) as number;
    const keys = Object.keys(azOccurances).join('');
    
    let chars = /[0-9]/.test(keys) && '0123456789' || '';
    if (/[a-zåäö]/.test(keys)) {
      chars += 'abcdefghijklmnopqrstuvwxyz';
      chars += /[åäö]/i.test(keys) && 'åäö' || '';
    };
    if (/[A-ZÅÄÖ]/.test(keys)) {
      chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      chars += /[åäö]/i.test(keys) && 'ÅÄÖ' || '';
    };
    const labels = chars.split('')
    const data = labels.map(k => azOccurances[k] && this.toPercent(azOccurances[k]/sum) || 0);
    //const data = labels.map(k => azOccurances[k] || 0);
    this.chart.labels = labels;
    this.chart.data = [{ data: data, label: 'input' }];
    this.showChart = true;
  }

}
