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
  
  private toPercant(n: number): number {
    return Math.round(n*10000)/100;
  }

  updateChart() {
    const az = this.input.toUpperCase().replace(/\W/g,'');
    this.showChart = false;
    if (az.length < 20) { return; }
    const azOccurances = {};
    for(let c of az) {
      azOccurances[c] = ++azOccurances[c] || 1;
    }
    if (Object.keys(azOccurances).length < 10) { return; }
    const sum = Object.values(azOccurances).reduce((a: number, b: number) => a + b) as number;
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');    
    const data = keys.map(k => azOccurances[k] && this.toPercant(azOccurances[k]/sum) || 0);
    this.chart.labels = keys;
    this.chart.data = [{ data: data, label: 'input' }];
    this.showChart = true;
  }

}
