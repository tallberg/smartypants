import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'

import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';

import { ChartsModule } from 'ng2-charts';
import { UnigramComponent } from './unigram/unigram.component';
import { ConvertComponent } from './convert/convert.component';
import { SubstitutionComponent } from './substitution/substitution.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    UnigramComponent,
    ConvertComponent,
    SubstitutionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
