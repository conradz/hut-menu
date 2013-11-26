# hut-menu

[![NPM](https://nodei.co/npm/hut-menu.png?compact=true)](https://nodei.co/npm/hut-menu/)

[![Build Status](https://drone.io/github.com/conradz/hut-menu/status.png)](https://drone.io/github.com/conradz/hut-menu/latest)
[![Dependency Status](https://gemnasium.com/conradz/hut-menu.png)](https://gemnasium.com/conradz/hut-menu)

HTML UI Toolkit menu component - Create interactive menus

Check out the [example](http://conradz.github.io/hut-menu/)!

## Example

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

## JS Reference

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

## Styling

To change the styling, change the variables defined in the `variables.css`
file, or override the styles with your own.

