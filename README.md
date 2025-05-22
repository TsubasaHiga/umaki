# umaki

<p>
  <img alt="NPM Version" src="https://img.shields.io/npm/v/umaki">
  <img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/umaki">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dy/umaki">
</p>

![character](docs/character.jpg)

A package that allows you to import frequently used utilities for web development in one place. Primarily, it includes utilities that I often use. If you have any requests for the contents or types of utilities, please open an issue.

## Usage

```ts
import { foo } from "umaki";
```

## Configuration

### setConfig

A function to set or update global configuration options for the umaki library.

```ts
import { setConfig } from "umaki";

// Set a custom breakpoint value
setConfig({ BREAKPOINT: 1024 });

// You can also add custom configuration properties
setConfig({ customValue: "example" });
```

### getConfig

A function to retrieve the entire current configuration object.

```ts
import { getConfig } from "umaki";

const config = getConfig();
console.log(config.BREAKPOINT); // e.g. 768 (default) or custom value if set
```

### getConfigValue

A function to retrieve a specific configuration value by key.

```ts
import { getConfigValue } from "umaki";

const breakpoint = getConfigValue('BREAKPOINT');
console.log(breakpoint); // e.g. 768 (default) or custom value if set
```

## List of Utilities

- [Control](#control)
  - [bgScrollStop](#bgscrollstop)
  - [pd](#pd)
  - [scrollToHash](#scrolltohash)
  - [videoPlayControl](#videoplaycontrol)
- [Convert](#convert)
  - [changeDateStringToSpecificFormat](#changedatestringtospecificformat)
  - [jsonStringToJsonObject](#jsonstringtojsonobject)
- [EventControl](#eventcontrol)
  - [debounce](#debounce)
  - [throttle](#throttle)
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
  - [isAfterDateTime](#isafterdatetime)
  - [isBetweenDateTime](#isbetweendatetime)
  - [isExistAllElements](#isexistallelements)
  - [isIpad](#isipad)
  - [isKeyExists](#iskeyexists)
  - [isSafari](#issafari)
  - [isScrollable](#isscrollable)
  - [isTouchSupport](#istouchsupport)
  - [checkDeviceSize](#checkdevicesize)
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
- [Security](#security)
  - [sanitizeHtml](#sanitizehtml)

## Control

### bgScrollStop

A function that stops scrolling.

```ts
import { bgScrollStop } from "umaki";

bgScrollStop(); // scroll stop
bgScrollStop(false); // scroll start
```

[View file →](src/libs/control/bgScrollStop.ts)

### pd

A function that prevents the default event behavior.

```ts
import { pd } from "umaki";

document.getElementById("myElement").addEventListener("click", pd);
```

[View file →](src/libs/control/pd.ts)

### scrollToHash (Promise)

A function that scrolls to a specific hash position.

```ts
import { scrollToHash } from "umaki";
(async () => {
  await scrollToHash("#target");
  console.log("Scrolled!");

  // smooth scroll
  await scrollToHash("#target", true);

  // smooth scroll + offset
  await scrollToHash("#target", true, 100);
})();
```

[View file →](src/libs/control/scrollToHash.ts)

### videoPlayControl

A function that controls the playback of a video element.

```ts
import { videoPlayControl } from "umaki";

const videoElement = document.getElementById("myVideo");
videoPlayControl(videoElement, true); // play
videoPlayControl(videoElement, false); // pause

// set currentTime
videoPlayControl(videoElement, true, 10); // play and set currentTime to 10
```

[View file →](src/libs/control/videoPlayControl.ts)

## Convert

### changeDateStringToSpecificFormat

A function that converts a date string to a specific format.

```ts
import { changeDateStringToSpecificFormat } from "umaki";

// Basic usage
const date = "2023-10-05";
const formattedDate = changeDateStringToSpecificFormat(date, "MM/DD/YYYY");
console.log(formattedDate); // '10/05/2023'

// With timezone
const dateWithTz = "2025-04-25T00:00:00.000Z";
const formattedDateWithTz = changeDateStringToSpecificFormat(
  dateWithTz,
  "YYYY-MM-DD HH:mm:ss",
  "Asia/Tokyo"
);
console.log(formattedDateWithTz); // '2025-04-25 09:00:00'

// With different timezone
const formattedDateWithDifferentTz = changeDateStringToSpecificFormat(
  dateWithTz,
  "YYYY-MM-DD HH:mm:ss",
  "America/New_York"
);
console.log(formattedDateWithDifferentTz); // '2025-04-24 20:00:00'
```

Note: This function focuses on timezone handling rather than locale-specific formatting. When a timezone is specified, the date will be converted to that timezone before formatting.

[View file →](src/libs/convert/changeDateStringToSpecificFormat.ts)

### jsonStringToJsonObject

A function that converts a JSON string to a JSON object.

```ts
import { jsonStringToJsonObject } from "umaki";

const jsonString = '{"name": "John", "age": 30}';
const jsonObject = jsonStringToJsonObject(jsonString);
console.log(jsonObject); // { name: 'John', age: 30 }
```

[View file →](src/libs/convert/jsonStringToJsonObject.ts)

## EventControl

### debounce

A function that limits the number of times a function is called to at most one time over a specified time period.

```ts
import { debounce } from "umaki";

const debouncedFunction = debounce(() => {
  console.log("Debounced!");
}, 300);

window.addEventListener("resize", debouncedFunction);
```

[View file →](src/libs/eventControl/debounce.ts)

### throttle

A function that limits the number of times a function is called to a maximum of once in a specified period.

```ts
import { throttle } from "umaki";

const throttledFunction = throttle(() => {
  console.log("Throttled!");
}, 300);

window.addEventListener("scroll", throttledFunction);
```

[View file →](src/libs/eventControl/throttle.ts)

## Get

### getAspectRatio

A function that returns the aspect ratio of the specified width and height.

```ts
import { getAspectRatio } from "umaki";

const aspectRatio = getAspectRatio(1920, 1080);
console.log(aspectRatio); // { w: 16, h: 9 }
```

[View file →](src/libs/get/getAspectRatio.ts)

### getClassNames

A function that retrieves the class names of the specified HTML element as an array.

```ts
import { getClassNames } from "umaki";

const element = document.createElement("div");
element.className = "class1 class2 class3";
const classNames = getClassNames(element);
console.log(classNames); // ['class1', 'class2', 'class3']
```

[View file →](src/libs/get/getClassNames.ts)

### getDocumentHeight

A function that retrieves the height of the document.

```ts
import { getDocumentHeight } from "umaki";

const height = getDocumentHeight();
console.log(height);
```

[View file →](src/libs/get/getDocumentHeight.ts)

### getEventPaths

A function that retrieves the event paths.

```ts
import { getEventPaths } from "umaki";

document.addEventListener("click", (event) => {
  const paths = getEventPaths(event);
  console.log(paths);
});
```

[View file →](src/libs/get/getEventPaths.ts)

### getGcd

A function that calculates the greatest common divisor of two numbers.

```ts
import { getGcd } from "umaki";

const gcd = getGcd(48, 18);
console.log(gcd); // 6
```

[View file →](src/libs/get/getGcd.ts)

### getOrientation

A function that retrieves the current orientation of the device.

```ts
import { getOrientation } from "umaki";

const orientation = getOrientation();
console.log(orientation); // 'landscape' or 'portrait'
```

[View file →](src/libs/get/getOrientation.ts)

### getParentList

A function that recursively retrieves the parent elements of the specified HTML element.

```ts
import { getParentList } from "umaki";

const element = document.createElement("div");
const parentList = getParentList(element);
console.log(parentList);
```

[View file →](src/libs/get/getParentList.ts)

### getQueryParams

A function that retrieves the value of a specified query parameter from the URL.

```ts
import { getQueryParams } from "umaki";

// Basic usage
const param = getQueryParams("id"); // returns value from window.location.search

// With custom search string
const customParam = getQueryParams("id", { searchString: "?id=123" });

// With parse options
const paramWithOptions = getQueryParams("id", {
  parseOptions: { arrayFormat: "bracket" },
});

// With both custom search string and parse options
const customParamWithOptions = getQueryParams("id", {
  searchString: "?id=123",
  parseOptions: { arrayFormat: "bracket" },
});
```

[View file →](src/libs/get/getQueryParams.ts)

### getRem

A function that converts a pixel value to rem units.

```ts
import { getRem } from "umaki";

const remValue = getRem(16);
console.log(remValue); // '1rem'
```

[View file →](src/libs/get/getRem.ts)

### getScrollbarWidth

A function that retrieves the width of the scrollbar.

```ts
import { getScrollbarWidth } from "umaki";

const scrollbarWidth = getScrollbarWidth();
console.log(scrollbarWidth); // 15
```

[View file →](src/libs/get/getScrollbarWidth.ts)

### getSessionStorage

A function that retrieves a value from session storage.

```ts
import { getSessionStorage } from "umaki";

const value = getSessionStorage("testKey");
console.log(value); // 'testValue'
```

[View file →](src/libs/get/getSessionStorage.ts)

### getStringLength

A function that retrieves the length of a string (considering Unicode characters).

```ts
import { getStringLength } from "umaki";

const length = getStringLength("こんにちは");
console.log(length); // 5
```

[View file →](src/libs/get/getStringLength.ts)

### getStylePropertyValue

A function that retrieves the value of the specified CSS custom property.

```ts
import { getStylePropertyValue } from "umaki";

const value = getStylePropertyValue("--custom-property");
console.log(value);
```

[View file →](src/libs/get/getStylePropertyValue.ts)

### getStylePropertyValueToNumber

A function that retrieves the value of the specified CSS custom property as a number.

```ts
import { getStylePropertyValueToNumber } from "umaki";

const value = getStylePropertyValueToNumber("--custom-property");
console.log(value);
```

[View file →](src/libs/get/getStylePropertyValueToNumber.ts)

### getUaData

A function that retrieves user agent information.

```ts
import { getUaData } from "umaki";

const uaData = getUaData();
console.log(uaData);
// {
//   browserName: 'chrome',
//   browserVersion: '91.0.4472.124',
//   browserEngine: 'blink',
//   osName: 'windows',
//   type: 'desktop',
//   touchSupport: false
// }
```

[View file →](src/libs/get/getUaData.ts)

## Is

### isAfterDateTime

A function that checks if the current date is after a specified date.

```ts
import { isAfterDateTime } from "umaki";

const targetDate = "2023-10-01";
const result = isAfterDateTime(targetDate);
console.log(result); // true or false

// With custom current date
import dayjs from "dayjs";

const customCurrentDate = "2023-11-15";
const resultWithCustomDate = isAfterDateTime(targetDate, dayjs(customCurrentDate));
```

[View file →](src/libs/is/isAfterDateTime.ts)

### isBetweenDateTime

A function that checks if the current date is between two specified dates.

```ts
import { isBetweenDateTime } from "umaki";

const dateA = "2023-10-01";
const dateB = "2023-10-10";
const result = isBetweenDateTime(dateA, dateB);
console.log(result); // true or false
```

[View file →](src/libs/is/isBetweenDateTime.ts)

### isExistAllElements

A function that checks if all elements exist.

```ts
import { isExistAllElements } from "umaki";

const elements = [
  document.createElement("div"),
  document.createElement("span"),
];
const result = isExistAllElements(elements);
console.log(result); // true or false
```

[View file →](src/libs/is/isExistAllElements.ts)

### isIpad

A function that checks if the device is an iPad.

```ts
import { isIpad } from "umaki";

const result = isIpad();
console.log(result); // true or false
```

[View file →](src/libs/is/isIpad.ts)

### isKeyExists

A function that checks if a specific key exists in an object.

```ts
import { isKeyExists } from "umaki";

const obj = { a: 1, b: 2 };
const result = isKeyExists(obj, "a");
console.log(result); // true or false
```

[View file →](src/libs/is/isKeyExists.ts)

### isSafari

A function that checks if the browser is Safari.

```ts
import { isSafari } from "umaki";

const result = isSafari();
console.log(result); // true or false
```

[View file →](src/libs/is/isSafari.ts)

### isScrollable

A function that checks if an element is scrollable.

```ts
import { isScrollable } from "umaki";

const element = document.createElement("div");
element.style.overflow = "auto";
element.innerHTML = '<div style="height: 200px;"></div>';
const result = isScrollable(element);
console.log(result); // true or false
```

[View file →](src/libs/is/isScrollable.ts)

### isTouchSupport

A function that checks if the device supports touch.

```ts
import { isTouchSupport } from "umaki";

const result = isTouchSupport();
console.log(result); // true or false
```

[View file →](src/libs/is/isTouchSupport.ts)

### checkDeviceSize

A function that checks the current device size based on window width and the configured breakpoint.

```ts
import { checkDeviceSize, setConfig } from "umaki";

// Using default breakpoint (768px)
const deviceSize = checkDeviceSize();
console.log(deviceSize); // 'md' if window.innerWidth > 768, otherwise 'sm'

// Customize the breakpoint
setConfig({ BREAKPOINT: 1024 });
const newDeviceSize = checkDeviceSize();
console.log(newDeviceSize); // 'md' if window.innerWidth > 1024, otherwise 'sm'
```

[View file →](src/libs/is/checkDeviceSize.ts)

## Remove

### removeAllHtmlTags

A function that removes all HTML tags from a string.

```ts
import { removeAllHtmlTags } from "umaki";

const input = "<p>Hello <strong>World</strong>!</p>";
const output = removeAllHtmlTags(input);
console.log(output); // 'Hello World!'
```

[View file →](src/libs/remove/removeAllHtmlTags.ts)

### removeAttribute

A function that removes an attribute from the specified HTML element.

```ts
import { removeAttribute } from "umaki";

const element = document.createElement("div");
element.setAttribute("data-test", "value");
removeAttribute(element, "data-test");
console.log(element.hasAttribute("data-test")); // false
```

[View file →](src/libs/remove/removeAttribute.ts)

### removeSessionStorage

A function that removes an item with the specified key from session storage.

```ts
import { removeSessionStorage } from "umaki";

const key = "testKey";
removeSessionStorage(key);
console.log(sessionStorage.getItem(key)); // null
```

[View file →](src/libs/remove/removeSessionStorage.ts)

### removeStylePropertyValue

A function that removes the specified CSS custom property.

```ts
import { removeStylePropertyValue } from "umaki";

const key = "--custom-property";
removeStylePropertyValue(key);
console.log(getComputedStyle(document.documentElement).getPropertyValue(key)); // ''
```

[View file →](src/libs/remove/removeStylePropertyValue.ts)

## Set

### set100vh

A function that sets a CSS variable to 100vh to address viewport unit issues on mobile devices.

```ts
import { set100vh } from "umaki";

set100vh();
```

[View file →](src/libs/set/set100vh.ts)

### set100vw

A function that sets a CSS variable to 100vw minus the scrollbar width.

```ts
import { set100vw } from "umaki";

set100vw();
```

[View file →](src/libs/set/set100vw.ts)

### setAttribute

A function that sets an attribute on the specified HTML element.

```ts
import { setAttribute } from "umaki";

const element = document.createElement("div");
setAttribute(element, "data-test", "value");
console.log(element.getAttribute("data-test")); // 'value'
```

[View file →](src/libs/set/setAttribute.ts)

### setScrollPositionToCenter

A function that adjusts the horizontal scroll position of the root element to center the target element.

```ts
import { setScrollPositionToCenter } from "umaki";

const rootElement = document.getElementById("root");
const targetElement = document.getElementById("target");
setScrollPositionToCenter(rootElement, targetElement);
```

[View file →](src/libs/set/setScrollPositionToCenter.ts)

### setSessionStorage

A function that sets a value in session storage.

```ts
import { setSessionStorage } from "umaki";

const key = "testKey";
const value = "testValue";
setSessionStorage(key, value);
console.log(sessionStorage.getItem(key)); // 'testValue'
```

[View file →](src/libs/set/setSessionStorage.ts)

### setStylePropertyValue

A function that sets a CSS custom property on the root element.

```ts
import { setStylePropertyValue } from "umaki";

const key = "--custom-color";
const value = "blue";
setStylePropertyValue(key, value);
console.log(getComputedStyle(document.documentElement).getPropertyValue(key)); // 'blue'
```

[View file →](src/libs/set/setStylePropertyValue.ts)

## To

### toBoolean

A function that converts a string to a boolean value.

```ts
import { toBoolean } from "umaki";

console.log(toBoolean("true")); // true
console.log(toBoolean("false")); // false
console.log(toBoolean("random")); // false
```

[View file →](src/libs/to/toBoolean.ts)

### toPositiveNumber

A function that converts a number to a positive number. Returns the absolute value if the number is negative.

```ts
import { toPositiveNumber } from "umaki";

console.log(toPositiveNumber(5)); // 5
console.log(toPositiveNumber(-5)); // 5
console.log(toPositiveNumber(0)); // 0
console.log(toPositiveNumber(-3.14)); // 3.14
console.log(toPositiveNumber(3.14)); // 3.14
```

[View file →](src/libs/to/toPositiveNumber.ts)

## Transform

### wrapTextWithSpans

A function that wraps each character of the text content of an HTML element with individual `<span>` elements.

```ts
import { wrapTextWithSpans } from "umaki";

const element = document.createElement("div");
element.textContent = "hello";
wrapTextWithSpans(element);
console.log(element.innerHTML); // '<span>h</span><span>e</span><span>l</span><span>l</span><span>o</span>'
```

[View file →](src/libs/transform/wrapTextWithSpans.ts)

## Wait

### sleep (Promise)

A function that pauses execution for a specified amount of time.

```ts
import { sleep } from "umaki";
(async () => {
  console.log("Start");
  await sleep(1); // 1s wait
  console.log("End");
})();
```

[View file →](src/libs/wait/sleep.ts)

### waitForAllMediaLoaded (Promise)

A function that waits until all images and videos in the document are fully loaded.

```ts
import { waitForAllMediaLoaded } from "umaki";
(async () => {
  const allMediaLoaded = await waitForAllMediaLoaded();
  console.log(allMediaLoaded); // true or false

  // first view only
  const firstViewMediaLoaded = await waitForAllMediaLoaded(true);
  console.log(firstViewMediaLoaded); // true or false
})();
```

[View file →](src/libs/wait/waitForAllMediaLoaded.ts)

## Security

### sanitizeHtml

A function that sanitizes HTML strings to prevent XSS attacks.

```ts
import { sanitizeHtml } from "umaki";

// Basic usage
const sanitized = sanitizeHtml(
  '<script>alert("xss")</script><p>Hello World</p>'
);
console.log(sanitized); // '<p>Hello World</p>'

// With custom config
const config = { ALLOWED_TAGS: ["p"] };
const sanitizedWithConfig = sanitizeHtml("<p>Hello World</p>", config);
console.log(sanitizedWithConfig); // '<p>Hello World</p>'
```

This function uses `isomorphic-dompurify` and has the following features:

- Removes dangerous HTML tags and attributes by default
- Allows flexible control through custom configuration
- Can be used on both server-side and client-side

[View file →](src/libs/security/htmlSanitize.ts)

## Using for framework and tools

Specific usage for frameworks or various tools is described below.

### Astro or Vite

When using with Astro for SSR, add `umaki` to `vite.ssr.noExternal.`

```ts
// astro.config.ts
export default defineConfig(({ mode }) => {
  return {
    vite: {
      ssr: {
        noExternal: ["umaki"],
      },
    },
  };
});
```
