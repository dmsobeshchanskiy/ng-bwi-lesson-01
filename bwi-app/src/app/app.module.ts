import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './gui/app.component';
import { HistoryComponent } from './gui/history/history.component';
import { InputComponent } from './gui/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeightAnalyzerService } from './weight-analyzer/weight-analyzer.service';
import { HistoryService } from './history-service/history.service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [WeightAnalyzerService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
