import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StatusComponent } from './status/status.component';
import { GridComponent } from './grid/grid.component';
import { UnitComponent } from './grid/unit/unit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatusComponent,
    GridComponent,
    UnitComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
