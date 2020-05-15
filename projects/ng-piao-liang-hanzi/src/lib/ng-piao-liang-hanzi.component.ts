import {Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CharPinyin} from './interfaces';

const pinyin = require("chinese-to-pinyin");
const IS_CHINESE_CHAR_REGEX: RegExp = /(\p{Script=Hani})+/gu;
const ALPHABET_CHINESE_REGEX: RegExp = /([A-zÀ-ú]|\p{Script=Hani})+/gu;

@Component({
  selector: 'ng-piao-liang-hanzi',
  templateUrl: './ng-piao-liang-hanzi.component.html',
  styleUrls: ['./ng-piao-liang-hanzi.component.scss']
})
export class NgPiaoLiangHanziComponent implements OnInit {

  @Input() chineseCharacters: string = '';
  @Input() pinyin: string;
  @Input() pinyinWithNumber: boolean;
  @Input() includeAlphabet: boolean;
  @Input() bottomPinyin: boolean;

  charPinyinArray: CharPinyin[] = [];

  constructor(@Inject('ENABLE_PINYIN_NUMBER_FORMAT') private pinyinWithNumberGlobal: boolean,
              @Inject('ENABLE_ALPHABET') private includeAlphabetGlobal: boolean,
              @Inject('ENABLE_BOTTOM_PINYIN') private bottomPinyinGlobal: boolean) {
  }

  ngOnInit() {
    this.mapPinyin();
  }

  isPinyinOnBottom(): boolean {
    return this.enableFlag(this.bottomPinyin, this.bottomPinyinGlobal);
  }

  private mapPinyin(): void {
    this.generatePinyin();
    const pinyinArray = this.pinyin.split(' ');
    let charPinyin: CharPinyin;
    let pinyinIndex = 0;
    for (let charIndex = 0; charIndex < this.chineseCharacters.length; charIndex++) {
      let chineseCharacter = this.chineseCharacters[charIndex];
      if (this.matchesValidCharacter(chineseCharacter) && pinyinIndex < pinyinArray.length) {
        charPinyin = {char: chineseCharacter, pinyin: this.getPinyinOrEmpty(pinyinArray[pinyinIndex])};
        pinyinIndex += 1;
      } else {
        charPinyin = {char: chineseCharacter, pinyin: ''};
      }
      this.charPinyinArray.push(charPinyin);
    }
  }

  private matchesValidCharacter(chineseCharacter: string): boolean {
    let includeAlphabet: boolean = this.enableFlag(this.includeAlphabet, this.includeAlphabetGlobal);
    return chineseCharacter.match(includeAlphabet ? ALPHABET_CHINESE_REGEX : IS_CHINESE_CHAR_REGEX) != null;
  }

  // replace pinyin by empty string if matches placeholder _
  private getPinyinOrEmpty(currentPinyin: string): string {
    if (currentPinyin === '_') {
      return '';
    } else {
      return currentPinyin;
    }
  }

  private generatePinyin() {
    if (this.pinyin == null) {
      this.pinyin = pinyin(this.chineseCharacters, {toneToNumber: this.enableFlag(this.pinyinWithNumber, this.pinyinWithNumberGlobal)});
    }
  }

  // local variable overrides global parameter
  private enableFlag(local: boolean, global: boolean): boolean {
    if (global === true) {
      return local !== false;
    } else {
      return local === true;
    }
  }
}
