import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgPiaoLiangHanziModule } from 'ng-piao-liang-hanzi';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgPiaoLiangHanziModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
