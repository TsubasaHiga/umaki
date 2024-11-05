# umaki

![character](docs/character.jpg)

Web制作で多用するユーティリティーをこれ1つでインポート出来るようにしたパッケージです。
基本的には私がよく使っているものを中心に追加していきます。
パッケージの中身や種類のリクエストがあれば、Issueを立ててください。

## 使い方

``` ts
import { foo } from 'umaki'
```

## ユーティリティー一覧

- [Control](#control)
  - [bgScrollStop](#bgscrollstop)
  - [pd](#pd)
  - [scrollToHash](#scrolltohash)
  - [videoPlayControl](#videoplaycontrol)
- [Convert](#convert)
  - [changeDateStringToSpecificFormat](#changedatestringtospecificformat)
  - [jsonStringToJsonObject](#jsonstringtojsonobject)
- [Get](#get)
  - [getAspectRatio](#getaspectratio)
  - [getClassNames](#getclassnames)
  - [getDocumentHeight](#getdocumentheight)
  - [getEventPaths](#geteventpaths)
  - [getGcd](#getgcd)
  - [getOrientation](#getorientation)
  - [getParentList](#getparentlist)
  - [getQueryParams](#getqueryparams)
  - [getRem](#getrem)
  - [getScrollbarWidth](#getscrollbarwidth)
  - [getSessionStorage](#getsessionstorage)
  - [getStringLength](#getstringlength)
  - [getStylePropertyValue](#getstylepropertyvalue)
  - [getStylePropertyValueToNumber](#getstylepropertyvaluetonumber)
  - [getUaData](#getuadata)
- [Is](#is)
  - [isBetweenDateTime](#isbetweendatetime)
  - [isExistAllElements](#isexistallelements)
  - [isIpad](#isipad)
  - [isKeyExists](#iskeyexists)
  - [isSafari](#issafari)
  - [isScrollable](#isscrollable)
  - [isTouchSupport](#istouchsupport)
- [Remove](#remove)
  - [removeAllHtmlTags](#removeallhtmltags)
  - [removeAttribute](#removeattribute)
  - [removeSessionStorage](#removesessionstorage)
  - [removeStylePropertyValue](#removestylepropertyvalue)
- [Set](#set)
  - [set100vh](#set100vh)
  - [set100vw](#set100vw)
  - [setAttribute](#setattribute)
  - [setScrollPositionToCenter](#setscrollpositiontocenter)
  - [setSessionStorage](#setsessionstorage)
  - [setStylePropertyValue](#setstylepropertyvalue)
- [To](#to)
  - [toBoolean](#toboolean)
  - [toPositiveNumber](#topositivenumber)
- [Transform](#transform)
  - [wrapTextWithSpans](#wraptextwithspans)
- [Wait](#wait)
  - [sleep](#sleep)
  - [waitForAllMediaLoaded](#waitforallmedialoaded)

## Control

### bgScrollStop

スクロールを止める関数です。

``` ts
import { bgScrollStop } from 'umaki'

bgScrollStop()
```

### pd

デフォルトのイベント動作を防ぐ関数です。

``` ts
import { pd } from 'umaki'

document.getElementById('myElement').addEventListener('click', pd)
```

### scrollToHash

特定のハッシュ位置にスクロールする関数です。

``` ts
import { scrollToHash } from 'umaki'

;(async(() => {
  await scrollToHash('#target')
  console.log('スクロール完了')
}))()
```

### videoPlayControl

ビデオ要素の再生を制御する関数です。

``` ts
import { videoPlayControl } from 'umaki'

const videoElement = document.getElementById('myVideo')
videoPlayControl(videoElement, true) // 再生
videoPlayControl(videoElement, false) // 一時停止
```

## Convert

### changeDateStringToSpecificFormat

日付文字列を特定のフォーマットに変換する関数です。

```ts
import { changeDateStringToSpecificFormat } from 'umaki'

const date = '2023-10-05'
const formattedDate = changeDateStringToSpecificFormat(date, 'MM/DD/YYYY')
console.log(formattedDate) // '10/05/2023'
```

### jsonStringToJsonObject

JSON文字列をJSONオブジェクトに変換する関数です。

```ts
import { jsonStringToJsonObject } from 'umaki'

const jsonString = '{"name": "John", "age": 30}'
const jsonObject = jsonStringToJsonObject(jsonString)
console.log(jsonObject) // { name: 'John', age: 30 }
```

## Get

### getAspectRatio

指定された幅と高さのアスペクト比を返す関数です。

```ts
import { getAspectRatio } from 'umaki'

const aspectRatio = getAspectRatio(1920, 1080)
console.log(aspectRatio) // { w: 16, h: 9 }
```

### getClassNames

指定されたHTML要素のクラス名を配列として取得する関数です。

```ts
import { getClassNames } from 'umaki'

const element = document.createElement('div')
element.className = 'class1 class2 class3'
const classNames = getClassNames(element)
console.log(classNames) // ['class1', 'class2', 'class3']
```

### getDocumentHeight

ドキュメントの高さを取得する関数です。

```ts
import { getDocumentHeight } from 'umaki'

const height = getDocumentHeight()
console.log(height) // ドキュメントの高さを表示
```

### getEventPaths

イベントのパスを取得する関数です。

```ts
import { getEventPaths } from 'umaki'

document.addEventListener('click', (event) => {
  const paths = getEventPaths(event)
  console.log(paths) // イベントパスを表示
})
```

### getGcd

2つの数値の最大公約数を計算する関数です。

```ts
import { getGcd } from 'umaki'

const gcd = getGcd(48, 18)
console.log(gcd) // 6
```

### getOrientation

デバイスの現在の向きを取得する関数です。

```ts
import { getOrientation } from 'umaki'

const orientation = getOrientation()
console.log(orientation) // 'landscape' または 'portrait'
```

### getParentList

指定されたHTML要素の親要素を再帰的に取得する関数です。

```ts
import { getParentList } from 'umaki'

const element = document.createElement('div')
const parentList = getParentList(element)
console.log(parentList) // 親要素のリストを表示
```

### getQueryParams

URLのクエリパラメータを取得する関数です。

```ts
import { getQueryParams } from 'umaki'

const params = getQueryParams('test')
console.log(params) // クエリパラメータの値を表示
```

### getRem

ピクセル値をrem単位に変換する関数です。

```ts
import { getRem } from 'umaki'

const remValue = getRem(16)
console.log(remValue) // '1rem'
```

### getScrollbarWidth

スクロールバーの幅を取得する関数です。

```ts
import { getScrollbarWidth } from 'umaki'

const scrollbarWidth = getScrollbarWidth()
console.log(scrollbarWidth) // スクロールバーの幅を表示
```

### getSessionStorage

セッションストレージから値を取得する関数です。

```ts
import { getSessionStorage } from 'umaki'

const value = getSessionStorage('testKey')
console.log(value) // セッションストレージの値を表示
```

### getStringLength

文字列の長さを取得する関数です（Unicode文字を考慮）。

```ts
import { getStringLength } from 'umaki'

const length = getStringLength('こんにちは')
console.log(length) // 5
```

### getStylePropertyValue

指定されたCSSカスタムプロパティの値を取得する関数です。

```ts
import { getStylePropertyValue } from 'umaki'

const value = getStylePropertyValue('--custom-property')
console.log(value) // カスタムプロパティの値を表示
```

### getStylePropertyValueToNumber

指定されたCSSカスタムプロパティの値を数値として取得する関数です。

```ts
import { getStylePropertyValueToNumber } from 'umaki'

const value = getStylePropertyValueToNumber('--custom-property')
console.log(value) // カスタムプロパティの数値を表示
```

### getUaData

ユーザーエージェント情報を取得する関数です。

```ts
import { getUaData } from 'umaki'

const uaData = getUaData()
console.log(uaData) // ユーザーエージェント情報を表示
```

## Is

### isBetweenDateTime

現在の日付が指定された2つの日付の間にあるかどうかをチェックする関数です。

```ts
import { isBetweenDateTime } from 'umaki'

const dateA = '2023-10-01'
const dateB = '2023-10-10'
const result = isBetweenDateTime(dateA, dateB)
console.log(result) // true または false
```

### isExistAllElements

すべての要素が存在するかどうかをチェックする関数です。

```ts
import { isExistAllElements } from 'umaki'

const elements = [document.createElement('div'), document.createElement('span')]
const result = isExistAllElements(elements)
console.log(result) // true または false
```

### isIpad

デバイスがiPadかどうかをチェックする関数です。

```ts
import { isIpad } from 'umaki'

const result = isIpad()
console.log(result) // true または false
```

### isKeyExists

オブジェクトに特定のキーが存在するかどうかをチェックする関数です。

```ts
import { isKeyExists } from 'umaki'

const obj = { a: 1, b: 2 }
const result = isKeyExists(obj, 'a')
console.log(result) // true または false
```

### isSafari

ブラウザがSafariかどうかをチェックする関数です。

```ts
import { isSafari } from 'umaki'

const result = isSafari()
console.log(result) // true または false
```

### isScrollable

要素がスクロール可能かどうかをチェックする関数です。

```ts
import { isScrollable } from 'umaki'

const element = document.createElement('div')
element.style.overflow = 'auto'
element.innerHTML = '<div style="height: 200px;"></div>'
const result = isScrollable(element)
console.log(result) // true または false
```

### isTouchSupport

デバイスがタッチサポートを持っているかどうかをチェックする関数です。

```ts
import { isTouchSupport } from 'umaki'

const result = isTouchSupport()
console.log(result) // true または false
```

## Remove

### removeAllHtmlTags

文字列からすべてのHTMLタグを削除する関数です。

```ts
import { removeAllHtmlTags } from 'umaki'

const input = '<p>Hello <strong>World</strong>!</p>'
const output = removeAllHtmlTags(input)
console.log(output) // 'Hello World!'
```

### removeAttribute

指定されたHTML要素から属性を削除する関数です。

```ts
import { removeAttribute } from 'umaki'

const element = document.createElement('div')
element.setAttribute('data-test', 'value')
removeAttribute(element, 'data-test')
console.log(element.hasAttribute('data-test')) // false
```

### removeSessionStorage

セッションストレージから指定されたキーのアイテムを削除する関数です。

```ts
import { removeSessionStorage } from 'umaki'

const key = 'testKey'
removeSessionStorage(key)
console.log(sessionStorage.getItem(key)) // null
```

### removeStylePropertyValue

指定されたCSSカスタムプロパティを削除する関数です。

```ts
import { removeStylePropertyValue } from 'umaki'

const key = '--custom-property'
removeStylePropertyValue(key)
console.log(getComputedStyle(document.documentElement).getPropertyValue(key)) // ''
```

## Set

### set100vh

モバイルデバイスでのビューポート単位の問題を解決するために、CSS変数を100vhに設定する関数です。

```ts
import { set100vh } from 'umaki'

set100vh()
```

### set100vw

スクロールバーの幅を除いた100vwの値をCSS変数に設定する関数です。

```ts
import { set100vw } from 'umaki'

set100vw()
```

### setAttribute

指定されたHTML要素に属性を設定する関数です。

```ts
import { setAttribute } from 'umaki'

const element = document.createElement('div')
setAttribute(element, 'data-test', 'value')
console.log(element.getAttribute('data-test')) // 'value'
```

### setScrollPositionToCenter

ルート要素の水平スクロール位置を調整して、ターゲット要素を中央に配置する関数です。

```ts
import { setScrollPositionToCenter } from 'umaki'

const rootElement = document.getElementById('root')
const targetElement = document.getElementById('target')
setScrollPositionToCenter(rootElement, targetElement)
```

### setSessionStorage

セッションストレージに値を設定する関数です。

```ts
import { setSessionStorage } from 'umaki'

const key = 'testKey'
const value = 'testValue'
setSessionStorage(key, value)
console.log(sessionStorage.getItem(key)) // 'testValue'
```

### setStylePropertyValue

ルート要素にCSSカスタムプロパティを設定する関数です。

```ts
import { setStylePropertyValue } from 'umaki'

const key = '--custom-color'
const value = 'blue'
setStylePropertyValue(key, value)
console.log(getComputedStyle(document.documentElement).getPropertyValue(key)) // 'blue'
```

## To

### toBoolean

文字列をブール値に変換する関数です。

```ts
import { toBoolean } from 'umaki'

console.log(toBoolean('true')) // true
console.log(toBoolean('false')) // false
console.log(toBoolean('random')) // false
```

### toPositiveNumber

数値を正の数に変換する関数です。負の数の場合は絶対値を返します。

```ts
import { toPositiveNumber } from 'umaki'

console.log(toPositiveNumber(5)) // 5
console.log(toPositiveNumber(-5)) // 5
console.log(toPositiveNumber(0)) // 0
console.log(toPositiveNumber(-3.14)) // 3.14
console.log(toPositiveNumber(3.14)) // 3.14
```

## Transform

### wrapTextWithSpans

HTML要素のテキストコンテンツの各文字を個別の<span>要素でラップする関数です。

```ts
import { wrapTextWithSpans } from 'umaki'

const element = document.createElement('div')
element.textContent = 'hello'
wrapTextWithSpans(element)
console.log(element.innerHTML) // '<span>h</span><span>e</span><span>l</span><span>l</span><span>o</span>'
```

## Wait

### sleep

指定した時間だけ処理を一時停止する関数です。

```ts
import { sleep } from 'umaki'

;(async () => {
  console.log('Start')
  await sleep(1) // 1秒間待機
  console.log('End')
})()
```

### waitForAllMediaLoaded

ドキュメント内のすべての画像とビデオが完全に読み込まれるのを待つ関数です。

```ts
import { waitForAllMediaLoaded } from 'umaki'

;(async () => {
  const allMediaLoaded = await waitForAllMediaLoaded()
  console.log(allMediaLoaded) // true または false
})()
```

## Using for framework and tools

フレームワークまたは各種ツール特有の使い方を以下に記載します。

### Astro or Vite

AstroにてSSRする箇所で利用する場合は`vite.ssr.noExternal`に`umaki`を追加してください。

``` ts
// astro.config.ts
export default defineConfig(({ mode }) => {
  return {
    vite: {
      ssr: {
        noExternal: ['umaki']
      }
    }
  }
})
```
