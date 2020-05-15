import {SpectatorHost, createHostFactory} from '@ngneat/spectator/jest';
import {NgPiaoLiangHanziComponent} from './ng-piao-liang-hanzi.component';

describe('NgPiaoLiangHanziComponent', () => {
  let spectator: SpectatorHost<NgPiaoLiangHanziComponent>;
  const createComponent = createHostFactory({
    component: NgPiaoLiangHanziComponent,
    providers: [
      {provide: 'ENABLE_PINYIN_NUMBER_FORMAT', useValue: false},
      {provide: 'ENABLE_ALPHABET', useValue: false},
      {provide: 'ENABLE_BOTTOM_PINYIN', useValue: false}
    ]
  });

  describe('Basic pinyin functionality', () => {
    it('Pinyin missing - pinyin generated automatically', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray.length).toEqual(2);
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('shǐ');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('yòng');
    });

    it('Custom pinyin - can be any text', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [pinyin]="'this works'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('this works');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'this'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'works'});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('this');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('works');
    });

    it('Too few pinyin causes characters without pinyin', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [pinyin]="'this'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('this');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'this'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': ''});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('this');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('');
    });

    it('Too many pinyin will ignore excess pinyin', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [pinyin]="'this has too many pinyin'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('this has too many pinyin');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'this'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'has'});
    });

    it('Non chinese characters get ignored - automatic pinyin', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'AbC使,用?'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('AbC使,用?');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'A', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'b', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'C', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': ',', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '?', 'pinyin': ''});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('A');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('b');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(3) > rb')).toHaveText('C');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(3) > rt')).toHaveText('');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(4) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(4) > rt')).toHaveText('shǐ');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(5) > rb')).toHaveText(',');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(5) > rt')).toHaveText('');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(6) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(6) > rt')).toHaveText('yòng');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(7) > rb')).toHaveText('?');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(7) > rt')).toHaveText('');
    });

    it('Non chinese characters get ignored - custom pinyin', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使,用?'" [pinyin]="'this works'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使,用?');
      expect(spectator.component.pinyin).toEqual('this works');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'this'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'works'});
    });

    it('Deal with spaces', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'Ab  C 使,用?'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'A', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'b', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': ' ', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'C', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': ',', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '?', 'pinyin': ''});
    });
  });

  describe('Additional features', () => {
    it('Use pinyin number format - input variable (and overrides module parameter)', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [pinyinWithNumber]="true"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shi3 yong4');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shi3'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yong4'});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('shi3');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('yong4');
    });

    it('Use pinyin number format - module parameter', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'"></ng-piao-liang-hanzi>`,
        {providers: [{provide: 'ENABLE_PINYIN_NUMBER_FORMAT', useValue: true}]});

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shi3 yong4');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shi3'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yong4'});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('shi3');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('yong4');
    });

    it('Do not use pinyin number format - module parameter true - input variable overrides to false', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [pinyinWithNumber]="false"></ng-piao-liang-hanzi>`,
        {providers: [{provide: 'ENABLE_PINYIN_NUMBER_FORMAT', useValue: true}]});

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rb')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) > rt')).toHaveText('shǐ');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rb')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) > rt')).toHaveText('yòng');
    });

    it('Include alphabet - input variable (and overrides module parameter)', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'Ab使,用?'" [includeAlphabet]="true" [pinyin]="'a b c d e'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('Ab使,用?');
      expect(spectator.component.pinyin).toEqual('a b c d e');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'A', 'pinyin': 'a'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'b', 'pinyin': 'b'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'c'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'd'});
    });

    it('Include alphabet - module parameter', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'Ab使,用?'" [pinyin]="'a b c d e'"></ng-piao-liang-hanzi>`,
        {providers: [{provide: 'ENABLE_ALPHABET', useValue: true}]});

      expect(spectator.component.chineseCharacters).toEqual('Ab使,用?');
      expect(spectator.component.pinyin).toEqual('a b c d e');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'A', 'pinyin': 'a'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'b', 'pinyin': 'b'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'c'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'd'});
    });

    it('Include alphabet - module parameter true - input variable overrides to false', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'Ab使,用?'" [includeAlphabet]="false" [pinyin]="'a b c d e'"></ng-piao-liang-hanzi>`,
        {providers: [{provide: 'ENABLE_ALPHABET', useValue: true}]});

      expect(spectator.component.chineseCharacters).toEqual('Ab使,用?');
      expect(spectator.component.pinyin).toEqual('a b c d e');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'A', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': 'b', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'a'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'b'});
    });

    it('Display pinyin below characters - input variable (and overrides module parameter)', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [bottomPinyin]="true" [pinyin]="'shǐ yòng'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.component.isPinyinOnBottom()).toBeTruthy();
    });

    it('Display pinyin below characters - module parameter', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [pinyin]="'shǐ yòng'"></ng-piao-liang-hanzi>`,
        {providers: [{provide: 'ENABLE_BOTTOM_PINYIN', useValue: true}]});

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.component.isPinyinOnBottom()).toBeTruthy();
    });

    it('Display pinyin below characters - module parameter true - input variable overrides to false', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'" [bottomPinyin]="false" [pinyin]="'shǐ yòng'"></ng-piao-liang-hanzi>`,
        {providers: [{provide: 'ENABLE_BOTTOM_PINYIN', useValue: true}]});

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '使', 'pinyin': 'shǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '用', 'pinyin': 'yòng'});
      expect(spectator.component.isPinyinOnBottom()).toBeFalsy();
    });

    it('Skip placeholder _ for pinyin', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'这是你的书'" [pinyin]="'Zhè _ nǐ de shū'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('这是你的书');
      expect(spectator.component.pinyin).toEqual('Zhè _ nǐ de shū');
      expect(spectator.component.charPinyinArray.length).toEqual(5);
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '这', 'pinyin': 'Zhè'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '是', 'pinyin': ''});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '你', 'pinyin': 'nǐ'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '的', 'pinyin': 'de'});
      expect(spectator.component.charPinyinArray).toContainEqual({'char': '书', 'pinyin': 'shū'});
    });

    it('Css class available', () => {
      spectator = createComponent(`<ng-piao-liang-hanzi [chineseCharacters]="'使用'"></ng-piao-liang-hanzi>`);

      expect(spectator.component.chineseCharacters).toEqual('使用');
      expect(spectator.component.pinyin).toEqual('shǐ yòng');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) .ng-piao-liang-hanzi-char')).toHaveText('使');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(1) .ng-piao-liang-hanzi-pinyin')).toHaveText('shǐ');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) .ng-piao-liang-hanzi-char')).toHaveText('用');
      expect(spectator.query('ng-piao-liang-hanzi > ruby:nth-child(2) .ng-piao-liang-hanzi-pinyin')).toHaveText('yòng');
    });
  });
});
