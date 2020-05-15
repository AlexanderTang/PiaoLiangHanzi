import {NgModule} from '@angular/core';
import {NgPiaoLiangHanziComponent} from './ng-piao-liang-hanzi.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NgPiaoLiangHanziComponent],
  imports: [
    CommonModule
  ],
  exports: [NgPiaoLiangHanziComponent],
  providers: [
    {provide: 'ENABLE_PINYIN_NUMBER_FORMAT', useValue: false},
    {provide: 'ENABLE_ALPHABET', useValue: false},
    {provide: 'ENABLE_BOTTOM_PINYIN', useValue: false}
  ]
})
export class NgPiaoLiangHanziModule {
}
