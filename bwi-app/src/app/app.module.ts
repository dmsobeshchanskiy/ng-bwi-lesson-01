import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './gui/app.component';
import { HistoryComponent } from './gui/history/history.component';
import { InputComponent } from './gui/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
