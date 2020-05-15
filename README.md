[![npm version](https://img.shields.io/npm/v/ng-piao-liang-hanzi)](https://www.npmjs.com/package/ng-piao-liang-hanzi)
[![license](https://img.shields.io/npm/l/ng-piao-liang-hanzi)](https://github.com/AlexanderTang/PiaoLiangHanzi/blob/master/LICENSE)

# PiaoLiangHanzi

> Builder project for NgPiaoLiangHanzi

## NgPiaoLiangHanzi

Angular module to format Hanzi and Pinyin as coherent blocks.

- [Quickstart](#quickstart)
- [Features](#features)

  - [Automatic pinyin](#Automatic-pinyin)
  - [Custom pinyin text](#Custom-pinyin-text)
  - [Pinyin with numbers](#Pinyin-with-numbers)
  - [Skip pinyin for some characters](#Skip-pinyin-for-some-characters)
  - [Enable alphabet for pinyin](#Enable-alphabet-for-pinyin)
  - [Display pinyin below characters](#Set-pinyin-below-characters)
  - [CSS styling](#CSS-styling)

## Quickstart

1. Install via npm

```javascript
npm install ng-piao-liang-hanzi
```

2. Import 'NgPiaoLiangHanziModule'

```javascript
import { NgPiaoLiangHanziModule } from 'ng-piao-liang-hanzi';
@NgModule({
  imports: [NgPiaoLiangHanziModule]
})
export class AppModule { }
```

3. Use 'ng-piao-liang-hanzi' to display your Chinese characters and pinyin:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'你好。'"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/nihao_example.png)

## Features

### Automatic pinyin

Pinyin is generated automatically by default:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'Hello, 我是 Alexander。'"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/hello_example.png)


### Custom pinyin text

Custom text can override the pinyin:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'你好。'" [pinyin]="'Anylength isok'"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/custom_pinyin.png)

### Pinyin with numbers

By default the automatic pinyin will generate with tone symbols. To generate with pinyin numbering format, set `[pinyinWithNumber]="true"`:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'你好。'" [pinyinWithNumber]="true"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/pinyin_number_format.png)

To enable pinyin with numbering format globally in your project, use the global flag `ENABLE_PINYIN_NUMBER_FORMAT`:

```javascript
import { NgPiaoLiangHanziModule } from 'ng-piao-liang-hanzi';
@NgModule({
  imports: [NgPiaoLiangHanziModule],
  providers: [{provide: 'ENABLE_PINYIN_NUMBER_FORMAT', useValue: true}]
})
export class AppModule { }
```

`[pinyinWithNumber]="true"` is then no longer needed. It is also possible to disable the number format in specific
cases by setting `[pinyinWithNumber]="false"`.

### Skip pinyin for some characters

The pinyin is divided by single spaces. If the pinyin should not be entered for a character, just perform an extra space:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'这是你的书。'" [pinyin]="'a   b'"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/pinyin_empty_spaces.png)

For clarity purposes, you can also use `_` as a placeholder for empty pinyin:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'这是你的书。'" [pinyin]="'a _ _ b'"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/pinyin_empty_spaces.png)

### Enable alphabet for pinyin

Non-Chinese characters are skipped for pinyin by default, including alphabetical characters. To enable alphabetical characters,
set `[includeAlphabet]="true"`:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'是OK，马？'" [pinyin]="'shì O K shì'" [includeAlphabet]="true"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/eng_pinyin.png)

The alphabet can be enabled for pinyin globally with the `ENABLE_ALPHABET` flag:

```javascript
import { NgPiaoLiangHanziModule } from 'ng-piao-liang-hanzi';
@NgModule({
  imports: [NgPiaoLiangHanziModule],
  providers: [{provide: 'ENABLE_ALPHABET', useValue: true}]
})
export class AppModule { }
```

`[includeAlphabet]="true"` is then no longer needed. It is also possible to disable the alphabet in specific
cases by setting `[includeAlphabet]="false"`.

### Set pinyin below characters

Pinyin are displayed on top of the hanzi characters by default. To display them on the bottom,
set `[bottomPinyin]="true"`:

```html
<ng-piao-liang-hanzi [chineseCharacters]="'你好。'" [pinyin]="'nĭ hăo'" [bottomPinyin]="true"></ng-piao-liang-hanzi>
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/eng_pinyin.png)

This feature can be enabled globally with the `ENABLE_BOTTOM_PINYIN` flag:

```javascript
import { NgPiaoLiangHanziModule } from 'ng-piao-liang-hanzi';
@NgModule({
  imports: [NgPiaoLiangHanziModule],
  providers: [{provide: 'ENABLE_BOTTOM_PINYIN', useValue: true}]
})
export class AppModule { }
```

It is still possible to override the global flag locally with `[bottomPinyin]="false"`.

### CSS styling

The Chinese characters and pinyin can have custom css styling with classes 
`ng-piao-liang-hanzi-char` and `ng-piao-liang-hanzi-pinyin` respectively:

```sass
.ng-piao-liang-hanzi-char {
  color: olivedrab
}

.ng-piao-liang-hanzi-pinyin {
  color: brown
}
```

  ![image](https://raw.githubusercontent.com/AlexanderTang/PiaoLiangHanzi/master/assets/images/styling.png)

:warning: **The css styling will only work in global styles.css!**

[For example: https://github.com/AlexanderTang/PiaoLiangHanzi/blob/master/src/styles.scss](https://github.com/AlexanderTang/PiaoLiangHanzi/blob/master/src/styles.scss)
