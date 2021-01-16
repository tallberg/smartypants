import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SubstitutionService } from './substitution.service';

@Component({
  selector: 'app-substitution',
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.sass']
})

export class SubstitutionComponent implements OnInit, OnChanges {
  @Input() input: string;

  fibonacci = '';
  atbash = '';
  caesar = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // this.fibonacci = SubstitutionService.fibonacci(this.input);
    this.atbash = SubstitutionService.atbash(this.input);
    this.caesar = SubstitutionService.caesar(this.input);
    // SubstitutionService.testDelimit();
  }

}

