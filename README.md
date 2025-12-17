# umaki

<p>
  <img alt="NPM Version" src="https://img.shields.io/npm/v/umaki">
  <img alt="NPM Type Definitions" src="https://img.shields.io/npm/types/umaki">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dy/umaki">
</p>

<br>

<p align="center">
  <img alt="umaki chan - umaki official character" src="docs/character-2.png" width="285" height="221" />
  <br>
  <em>Umaki-chan - Official Character</em>
</p>

<br>

Umaki is your one-stop solution for web development utilities, bringing together a carefully curated collection of powerful tools in a single, easy-to-use package. Crafted from real-world development experience, these utilities solve common challenges and streamline your workflow. Have a utility in mind that would make your development easier? Feel free to open an issue—I'm actively expanding this collection!

**👨‍💻 Related Projects**

| Project                                           | Description                                   | Use Case                      |
| ------------------------------------------------- | --------------------------------------------- | ----------------------------- |
| [piiiQcy](https://github.com/TsubasaHiga/piiiqcy) | WordPress theme development boilerplate       | WordPress site development    |
| [Acty](https://github.com/TsubasaHiga/acty)       | Static site boilerplate                       | Static HTML/CSS site creation |
| [Quicint](https://github.com/TsubasaHiga/Quicint) | EJS-based static HTML5 boilerplate            | Mass-production static pages  |
| [vnl](https://github.com/TsubasaHiga/vnl)         | Vite-based npm library development boilerplate | npm package development       |
| [umaki](https://github.com/TsubasaHiga/umaki)     | Web development utility library               | Common utility functions      |

---

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

- [Callback](#callback)
  - [tap](#tap)
  - [tapAsync](#tapasync)
- [Control](#control)
  - [bgScrollStop](#bgscrollstop)
  - [copyToClipboard](#copytoclipboard)
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
  - [getGravatarUrl](#getgravatarurl)
  - [getOrientation](#getorientation)
  - [getParentList](#getparentlist)
  - [getQueryParams](#getqueryparams)
  - [getRandomInt](#getrandomint)
  - [getRelativeTime](#getrelativetime)
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
  - [isInViewport](#isinviewport)
  - [isIpad](#isipad)
  - [isKeyExists](#iskeyexists)
  - [isOnline](#isonline)
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
- [Advanced Usage](#advanced-usage)
  - [Using tap / tapAsync with umaki functions](#using-tap--tapasync-with-umaki-functions)

## Callback

### tap

A function that executes a callback with the given value and returns the original value unchanged. Useful for performing side effects (logging, caching, analytics, etc.) without modifying the value.

**Note:** This function does not accept Promise values. For async operations, use `tapAsync` instead.

```ts
import { tap, removeAllHtmlTags } from "umaki";

const input = "<p>Hello <strong>World</strong>!</p>";
const output = tap(removeAllHtmlTags(input), (result) => {
  console.log("Sanitized:", result);
});
// Logs: 'Sanitized: Hello World!'
// output = 'Hello World!'

// Caching example
const data = tap(processData(raw), (result) => {
  cache.set("processed", result);
});

// Works with higher-order functions
const debouncedFn = tap(debounce(handler, 100), () => {
  console.log("Debounced function created");
});
```

[View file →](src/libs/callback/tap.ts)

### tapAsync (Promise)

A function that awaits a Promise, executes a callback with the resolved value, and returns the original value. Useful for performing side effects on async values without modifying them.

```ts
import { tapAsync } from "umaki";

// Logging async results
const data = await tapAsync(fetchData(), (result) => {
  console.log("Fetched:", result);
});

// Caching async results
const getData = () =>
  tapAsync(fetchFromServer(), (data) => cache.set("data", data));

// Parallel execution with individual completion tracking
await Promise.all([
  tapAsync(fetchUserData(), (user) => console.log("user loaded")),
  tapAsync(fetchProductData(), (products) => console.log("products loaded")),
  tapAsync(fetchOrderData(), (orders) => console.log("orders loaded")),
]);

// Event emission on async completion
const loadUser = () =>
  tapAsync(fetchUser(), (user) => eventEmitter.emit("userLoaded", user));
```

[View file →](src/libs/callback/tap-async.ts)

## Control

### bgScrollStop

A function that stops scrolling.

```ts
import { bgScrollStop } from "umaki";

bgScrollStop(); // scroll stop
bgScrollStop(false); // scroll start
```

[View file →](src/libs/control/bg-scroll-stop.ts)

### copyToClipboard (Promise)

A function that copies text to the clipboard using the modern Clipboard API.

```ts
import { copyToClipboard } from "umaki";

// Basic usage
const success = await copyToClipboard("Hello, World!");
if (success) {
  console.log("Copied to clipboard!");
} else {
  console.log("Failed to copy");
}

// Use in click handler
button.addEventListener("click", async () => {
  const copied = await copyToClipboard(textToCopy);
  showToast(copied ? "Copied!" : "Copy failed");
});
```

[View file →](src/libs/control/copy-to-clipboard.ts)

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

[View file →](src/libs/control/scroll-to-hash.ts)

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

[View file →](src/libs/control/video-play-control.ts)

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

[View file →](src/libs/convert/change-date-string-to-specific-format.ts)

### jsonStringToJsonObject

A function that converts a JSON string to a JSON object.

```ts
import { jsonStringToJsonObject } from "umaki";

const jsonString = '{"name": "John", "age": 30}';
const jsonObject = jsonStringToJsonObject(jsonString);
console.log(jsonObject); // { name: 'John', age: 30 }
```

[View file →](src/libs/convert/json-string-to-json-object.ts)

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

[View file →](src/libs/get/get-aspect-ratio.ts)

### getClassNames

A function that retrieves the class names of the specified HTML element as an array.

```ts
import { getClassNames } from "umaki";

const element = document.createElement("div");
element.className = "class1 class2 class3";
const classNames = getClassNames(element);
console.log(classNames); // ['class1', 'class2', 'class3']
```

[View file →](src/libs/get/get-class-names.ts)

### getDocumentHeight

A function that retrieves the height of the document.

```ts
import { getDocumentHeight } from "umaki";

const height = getDocumentHeight();
console.log(height);
```

[View file →](src/libs/get/get-document-height.ts)

### getEventPaths

A function that retrieves the event paths.

```ts
import { getEventPaths } from "umaki";

document.addEventListener("click", (event) => {
  const paths = getEventPaths(event);
  console.log(paths);
});
```

[View file →](src/libs/get/get-event-paths.ts)

### getGcd

A function that calculates the greatest common divisor of two numbers.

```ts
import { getGcd } from "umaki";

const gcd = getGcd(48, 18);
console.log(gcd); // 6
```

[View file →](src/libs/get/get-gcd.ts)

### getGravatarUrl

A function that generates a Gravatar avatar image URL from an email address and size parameter.

```ts
import { getGravatarUrl } from "umaki";

const avatarUrl = getGravatarUrl('user@example.com', 80);
console.log(avatarUrl);
// 'https://www.gravatar.com/avatar/b58996c504c5638798eb6b511e6f49af?s=80&d=404'

// Different size
const largeAvatar = getGravatarUrl('user@example.com', 200);

// Email with uppercase and whitespace (automatically normalized)
const normalizedAvatar = getGravatarUrl(' USER@EXAMPLE.COM ', 80);
// Same result as above due to normalization
```

[View file →](src/libs/get/get-gravatar-url.ts)

### getOrientation

A function that retrieves the current orientation of the device.

```ts
import { getOrientation } from "umaki";

const orientation = getOrientation();
console.log(orientation); // 'landscape' or 'portrait'
```

[View file →](src/libs/get/get-orientation.ts)

### getParentList

A function that recursively retrieves the parent elements of the specified HTML element.

```ts
import { getParentList } from "umaki";

const element = document.createElement("div");
const parentList = getParentList(element);
console.log(parentList);
```

[View file →](src/libs/get/get-parent-list.ts)

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

[View file →](src/libs/get/get-query-params.ts)

### getRandomInt

A function that returns a random integer between min (inclusive) and max (inclusive).

```ts
import { getRandomInt } from "umaki";

// Basic usage
const random = getRandomInt(1, 10);
console.log(random); // Random integer from 1 to 10

// Use for array index
const items = ["apple", "banana", "orange"];
const randomItem = items[getRandomInt(0, items.length - 1)];

// Generate random delay
const delay = getRandomInt(100, 500);
await sleep(delay / 1000);
```

[View file →](src/libs/get/get-random-int.ts)

### getRelativeTime

A function that returns a human-readable relative time string (e.g., "3 minutes ago", "2 days ago") using the Intl.RelativeTimeFormat API.

```ts
import { getRelativeTime } from "umaki";

// Basic usage (Japanese locale by default)
const pastDate = new Date(Date.now() - 5 * 60 * 1000);
console.log(getRelativeTime(pastDate)); // "5 分前"

// English locale
console.log(getRelativeTime(pastDate, "en")); // "5 minutes ago"

// Future dates
const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
console.log(getRelativeTime(futureDate)); // "2 日後"

// With timestamp or ISO string
console.log(getRelativeTime(1702800000000, "en")); // relative to now
console.log(getRelativeTime("2024-01-15T12:00:00Z", "en"));
```

[View file →](src/libs/get/get-relative-time.ts)

### getRem

A function that converts a pixel value to rem units.

```ts
import { getRem } from "umaki";

const remValue = getRem(16);
console.log(remValue); // '1rem'
```

[View file →](src/libs/get/get-rem.ts)

### getScrollbarWidth

A function that retrieves the width of the scrollbar.

```ts
import { getScrollbarWidth } from "umaki";

const scrollbarWidth = getScrollbarWidth();
console.log(scrollbarWidth); // 15
```

[View file →](src/libs/get/get-scrollbar-width.ts)

### getSessionStorage

A function that retrieves a value from session storage.

```ts
import { getSessionStorage } from "umaki";

const value = getSessionStorage("testKey");
console.log(value); // 'testValue'
```

[View file →](src/libs/get/get-session-storage.ts)

### getStringLength

A function that retrieves the length of a string (considering Unicode characters).

```ts
import { getStringLength } from "umaki";

const length = getStringLength("こんにちは");
console.log(length); // 5
```

[View file →](src/libs/get/get-string-length.ts)

### getStylePropertyValue

A function that retrieves the value of the specified CSS custom property.

```ts
import { getStylePropertyValue } from "umaki";

const value = getStylePropertyValue("--custom-property");
console.log(value);
```

[View file →](src/libs/get/get-style-property-value.ts)

### getStylePropertyValueToNumber

A function that retrieves the value of the specified CSS custom property as a number.

```ts
import { getStylePropertyValueToNumber } from "umaki";

const value = getStylePropertyValueToNumber("--custom-property");
console.log(value);
```

[View file →](src/libs/get/get-style-property-value-to-number.ts)

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

[View file →](src/libs/get/get-ua-data.ts)

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

[View file →](src/libs/is/is-after-date-time.ts)

### isBetweenDateTime

A function that checks if the current date is between two specified dates.

```ts
import { isBetweenDateTime } from "umaki";

const dateA = "2023-10-01";
const dateB = "2023-10-10";
const result = isBetweenDateTime(dateA, dateB);
console.log(result); // true or false
```

[View file →](src/libs/is/is-between-date-time.ts)

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

[View file →](src/libs/is/is-exist-all-elements.ts)

### isInViewport

A function that checks if an element is currently visible within the viewport.

```ts
import { isInViewport } from "umaki";

const element = document.getElementById("target");

// Check if any part of the element is visible
const isVisible = isInViewport(element);
console.log(isVisible); // true or false

// Check if the entire element is visible
const isFullyVisible = isInViewport(element, { threshold: 1 });

// Check if at least 50% of the element is visible
const isHalfVisible = isInViewport(element, { threshold: 0.5 });

// With expanded viewport bounds (trigger 100px before element enters viewport)
const isNearViewport = isInViewport(element, { rootMargin: "100px" });
```

[View file →](src/libs/is/is-in-viewport.ts)

### isIpad

A function that checks if the device is an iPad.

```ts
import { isIpad } from "umaki";

const result = isIpad();
console.log(result); // true or false
```

[View file →](src/libs/is/is-ipad.ts)

### isKeyExists

A function that checks if a specific key exists in an object.

```ts
import { isKeyExists } from "umaki";

const obj = { a: 1, b: 2 };
const result = isKeyExists(obj, "a");
console.log(result); // true or false
```

[View file →](src/libs/is/is-key-exists.ts)

### isOnline

A function that checks if the browser is currently online using the Navigator.onLine API.

```ts
import { isOnline } from "umaki";

// Basic usage
if (isOnline()) {
  // Perform network request
  fetchData();
} else {
  // Show offline message
  showOfflineMessage();
}

// Use with event listeners for online/offline detection
window.addEventListener("online", () => {
  if (isOnline()) {
    console.log("Back online!");
  }
});
```

[View file →](src/libs/is/is-online.ts)

### isSafari

A function that checks if the browser is Safari.

```ts
import { isSafari } from "umaki";

const result = isSafari();
console.log(result); // true or false
```

[View file →](src/libs/is/is-safari.ts)

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

[View file →](src/libs/is/is-scrollable.ts)

### isTouchSupport

A function that checks if the device supports touch.

```ts
import { isTouchSupport } from "umaki";

const result = isTouchSupport();
console.log(result); // true or false
```

[View file →](src/libs/is/is-touch-support.ts)

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

[View file →](src/libs/is/check-device-size.ts)

## Remove

### removeAllHtmlTags

A function that removes all HTML tags from a string.

```ts
import { removeAllHtmlTags } from "umaki";

const input = "<p>Hello <strong>World</strong>!</p>";
const output = removeAllHtmlTags(input);
console.log(output); // 'Hello World!'
```

[View file →](src/libs/remove/remove-all-html-tags.ts)

### removeAttribute

A function that removes an attribute from the specified HTML element.

```ts
import { removeAttribute } from "umaki";

const element = document.createElement("div");
element.setAttribute("data-test", "value");
removeAttribute(element, "data-test");
console.log(element.hasAttribute("data-test")); // false
```

[View file →](src/libs/remove/remove-attribute.ts)

### removeSessionStorage

A function that removes an item with the specified key from session storage.

```ts
import { removeSessionStorage } from "umaki";

const key = "testKey";
removeSessionStorage(key);
console.log(sessionStorage.getItem(key)); // null
```

[View file →](src/libs/remove/remove-session-storage.ts)

### removeStylePropertyValue

A function that removes the specified CSS custom property.

```ts
import { removeStylePropertyValue } from "umaki";

const key = "--custom-property";
removeStylePropertyValue(key);
console.log(getComputedStyle(document.documentElement).getPropertyValue(key)); // ''
```

[View file →](src/libs/remove/remove-style-property-value.ts)

## Set

### set100vh

A function that sets a CSS variable to 100vh to address viewport unit issues on mobile devices.

```ts
import { set100vh } from "umaki";

set100vh();
```

[View file →](src/libs/set/set-100vh.ts)

### set100vw

A function that sets a CSS variable to 100vw minus the scrollbar width.

```ts
import { set100vw } from "umaki";

set100vw();
```

[View file →](src/libs/set/set-100vw.ts)

### setAttribute

A function that sets an attribute on the specified HTML element.

```ts
import { setAttribute } from "umaki";

const element = document.createElement("div");
setAttribute(element, "data-test", "value");
console.log(element.getAttribute("data-test")); // 'value'
```

[View file →](src/libs/set/set-attribute.ts)

### setScrollPositionToCenter

A function that adjusts the horizontal scroll position of the root element to center the target element.

```ts
import { setScrollPositionToCenter } from "umaki";

const rootElement = document.getElementById("root");
const targetElement = document.getElementById("target");
setScrollPositionToCenter(rootElement, targetElement);
```

[View file →](src/libs/set/set-scroll-position-to-center.ts)

### setSessionStorage

A function that sets a value in session storage.

```ts
import { setSessionStorage } from "umaki";

const key = "testKey";
const value = "testValue";
setSessionStorage(key, value);
console.log(sessionStorage.getItem(key)); // 'testValue'
```

[View file →](src/libs/set/set-session-storage.ts)

### setStylePropertyValue

A function that sets a CSS custom property on the root element.

```ts
import { setStylePropertyValue } from "umaki";

const key = "--custom-color";
const value = "blue";
setStylePropertyValue(key, value);
console.log(getComputedStyle(document.documentElement).getPropertyValue(key)); // 'blue'
```

[View file →](src/libs/set/set-style-property-value.ts)

## To

### toBoolean

A function that converts a string to a boolean value.

```ts
import { toBoolean } from "umaki";

console.log(toBoolean("true")); // true
console.log(toBoolean("false")); // false
console.log(toBoolean("random")); // false
```

[View file →](src/libs/to/to-boolean.ts)

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

[View file →](src/libs/to/to-positive-number.ts)

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

[View file →](src/libs/transform/wrap-text-with-spans.ts)

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

[View file →](src/libs/wait/wait-for-all-media-loaded.ts)

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

[View file →](src/libs/security/html-sanitize.ts)

## Advanced Usage

This section provides tips and patterns for getting the most out of umaki utilities.

### Using `tap` / `tapAsync` with umaki functions

The `tap` and `tapAsync` functions allow you to add callbacks to any umaki function without modifying its behavior. This is useful for logging, analytics, caching, and more.

#### Basic Pattern

| Function Type | Use | Example |
|---------------|-----|---------|
| Sync (returns value) | `tap` | `tap(removeAllHtmlTags(input), callback)` |
| Sync (returns void) | `tap` | `tap(set100vh(), callback)` |
| Async (returns Promise) | `tapAsync` | `tapAsync(sleep(1), callback)` |

> [!TIP]
> `tap` prevents Promise values at the type level. If you accidentally pass a Promise, TypeScript will show an error.

#### Examples with umaki functions

<details>
<summary><strong>📝 Logging & Debugging</strong></summary>

```ts
import { tap, removeAllHtmlTags, getUaData } from "umaki";

// Log sanitized HTML output
const clean = tap(removeAllHtmlTags(dirtyHtml), (result) => {
  console.log("[DEBUG] Sanitized HTML:", result);
});

// Log user agent data
const ua = tap(getUaData(), (data) => {
  console.log("[DEBUG] UA:", data.browserName, data.osName);
});
```

</details>

<details>
<summary><strong>📊 Analytics & Tracking</strong></summary>

```ts
import { tap, tapAsync, getUaData, waitForAllMediaLoaded } from "umaki";

// Track device information
const uaData = tap(getUaData(), (data) => {
  analytics.track("device_detected", {
    browser: data.browserName,
    os: data.osName,
    type: data.type,
  });
});

// Track media load completion
await tapAsync(waitForAllMediaLoaded(), (success) => {
  analytics.track("media_loaded", { success, timestamp: Date.now() });
});
```

</details>

<details>
<summary><strong>💾 Caching</strong></summary>

```ts
import { tap, tapAsync, getScrollbarWidth } from "umaki";

// Cache scrollbar width (useful for repeated access)
const scrollbarWidth = tap(getScrollbarWidth(), (width) => {
  sessionStorage.setItem("scrollbarWidth", String(width));
});

// Cache async fetch results
const getData = () =>
  tapAsync(fetchFromAPI(), (data) => {
    localStorage.setItem("cachedData", JSON.stringify(data));
  });
```

</details>

<details>
<summary><strong>🎯 Event Emission</strong></summary>

```ts
import { tap, tapAsync, checkDeviceSize, waitForAllMediaLoaded } from "umaki";

// Emit event on device size check
const deviceSize = tap(checkDeviceSize(), (size) => {
  window.dispatchEvent(new CustomEvent("deviceSizeChecked", { detail: size }));
});

// Emit event when all media is loaded
await tapAsync(waitForAllMediaLoaded(true), () => {
  window.dispatchEvent(new CustomEvent("firstViewMediaReady"));
});
```

</details>

<details>
<summary><strong>⚡ Parallel Async Operations</strong></summary>

```ts
import { tapAsync, sleep, waitForAllMediaLoaded } from "umaki";

// Track multiple async operations independently
const [_, mediaLoaded] = await Promise.all([
  tapAsync(sleep(1), () => console.log("⏱️ 1 second elapsed")),
  tapAsync(waitForAllMediaLoaded(), (ok) => console.log("🖼️ Media:", ok ? "ready" : "failed")),
]);
```

</details>

#### Working with void functions

> [!NOTE]
> When using `tap` with functions that return `void` (like `set100vh`, `bgScrollStop`), the callback receives `undefined`. This is still useful for completion notifications.

```ts
import { tap, set100vh, bgScrollStop } from "umaki";

// Notification when viewport units are set
tap(set100vh(), () => {
  console.log("✅ 100vh CSS variable has been set");
});

// Notification when scroll is stopped
tap(bgScrollStop(true), () => {
  console.log("🔒 Background scroll locked");
});
```

---

## Using for framework and tools

Specific usage for frameworks or various tools is described below.

### Subpath Exports (Selective Module Imports)

Umaki supports subpath exports, allowing you to import only the modules you need. This is particularly useful for avoiding unnecessary dependencies and reducing bundle size.

```ts
// Import only the 'get' module (does not load isomorphic-dompurify)
import { getUaData, getScrollbarWidth } from "umaki/get";

// Import only the 'is' module
import { isIpad, isSafari } from "umaki/is";

// Import only the 'security' module (loads isomorphic-dompurify)
import { sanitizeHtml } from "umaki/security";

// Traditional import (loads all modules)
import { getUaData, sanitizeHtml } from "umaki";
```

#### Available Subpath Exports

| Path | Description |
|------|-------------|
| `umaki/callback` | Callback utilities (tap, tapAsync) |
| `umaki/config` | Configuration (setConfig, getConfig) |
| `umaki/control` | Scroll control, video playback, etc. |
| `umaki/convert` | Data conversion (dates, JSON) |
| `umaki/eventControl` | debounce, throttle |
| `umaki/get` | Value retrieval (DOM, UA, etc.) |
| `umaki/is` | Boolean checks (device detection, etc.) |
| `umaki/remove` | DOM/storage removal utilities |
| `umaki/security` | HTML sanitization |
| `umaki/set` | DOM/storage setters |
| `umaki/to` | Type conversions |
| `umaki/transform` | DOM transformations |
| `umaki/wait` | Async utilities (sleep, media loading) |

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

### Next.js

When using umaki with Next.js, you may encounter ESM compatibility issues during SSR if you import from the main entry point. This is because `isomorphic-dompurify` (used by the security module) has dependencies that can cause issues in SSR environments.

**Recommended: Use subpath exports to import only the modules you need:**

```ts
// ✅ Safe for Next.js SSR (does not load isomorphic-dompurify)
import { getUaData } from "umaki/get";
import { debounce } from "umaki/eventControl";

// ⚠️ Only import security module if you need HTML sanitization
import { sanitizeHtml } from "umaki/security";
```

This approach avoids loading `isomorphic-dompurify` and its dependencies unless you specifically need the `sanitizeHtml` function.
