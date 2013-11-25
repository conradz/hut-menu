'use strict';

var events = require('chi-events'),
    classes = require('chi-classes'),
    Emitter = require('emitter-component'),
    inheritPrototype = require('mout/lang/inheritPrototype');

module.exports = function(el) {
    return new Menu(el);
};

function Menu(el) {
    Emitter.call(this);

    var self = this;

    this.el = el;
    this.current = null;

    if (!el.getAttribute('tabindex')) {
        el.setAttribute('tabindex', '-1');
    }

    events(el)
        .children('a')
        .on('click', function(e) {
            var li = this.parentNode,
                menu = li.parentNode;

            if (menu !== el) {
                self.close();
                return;
            }

            var subMenu = this.nextElementSibling;
            if (subMenu) {
                e.preventDefault();
                self.toggle(subMenu);
            } else {
                self.close();
            }
        });

    events(el)
        .on('blur', function() {
            self.close();
        });
}

inheritPrototype(Menu, Emitter);

Menu.prototype.toggle = function(list) {
    if (this.current === list) {
        this.close();
    } else {
        this.open(list);
    }
};

Menu.prototype.open = function(list) {
    if (this.current) {
        this.close();
    }

    this.current = list;
    classes(list).add('active');
    this.el.focus();

    this.emit('open', list);
};

Menu.prototype.close = function() {
    var list = this.current;
    if (!list) {
        return;
    }

    this.current = null;
    classes(list).remove('active');

    this.emit('close', list);
};
