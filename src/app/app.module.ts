import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';

import { ChartsModule } from 'ng2-charts';
import { UnigramComponent } from './unigram/unigram.component';
import { ConvertComponent } from './convert/convert.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    UnigramComponent,
    ConvertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
