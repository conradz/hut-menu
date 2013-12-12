# hut-menu

[![Build Status](https://drone.io/github.com/conradz/hut-menu/status.png)](https://drone.io/github.com/conradz/hut-menu/latest)
[![Dependency Status](https://david-dm.org/conradz/hut-menu.png)](https://david-dm.org/conradz/hut-menu)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/hut-menu.svg)](https://saucelabs.com/u/hut-menu)

## intro

A simple HTML menu module that creates interactive dropdown menus. It contains
a minimum amount of styling so that you can customize it to your needs. See the
[example](http://conradz.github.io/hut-menu/) to see it in action.

## usage

 1. Install using [npm](https://npmjs.org) - `npm install --save hut-modal`
 2. Import styling using [rework-npm](https://github.com/conradz/rework-npm) -
    `@import "hut-menu";`
 3. Load JS using [browserify](https://github.com/substack/node-browserify) -
    `var menu = require('hut-menu');`


## code

```html
<ul class="hut-tabs" id="menu">
    <li><a href="#home">Home</a></li>
    <li>
        <a href="#">Docs</a>
        <ul id="docs-menu">
            <li><a href="#intro">Introduction</a></li>
            <li><a href="#reference">Reference</a></li>
        </ul>
    </li>
</ul>
```

```js
var menu = require('hut-menu');

var el = document.querySelector('#menu'),
    m = menu(el);

// Open a submenu
m.open(document.querySelector('#docs-menu'));

// Close the currently open submenu
m.close();
```

## reference

### `menu(element)`

Creates a new menu component and attaches the event handlers. It will return a
new `Menu` object.

### `#current`

The currently open submenu (the nested `ul` element), or `null` if no submenu
is open.

### `#open(submenu)`

Opens a submenu. `submenu` must be the nested `ul` element to open. It will
also close any currently open submenu.

### `#close()`

Closes any currenly open submenu.
