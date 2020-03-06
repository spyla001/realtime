import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { DonutComponent } from './donut/donut.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TabledataComponent } from './tabledata/tabledata.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RealtimeComponent,
    DonutComponent,
    TextboxComponent,
    TabledataComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
