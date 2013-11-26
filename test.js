'use strict';

var tape = require('tape'),
    create = require('chi-create'),
    events = require('chi-events'),
    menu = require('./'),
    body = window.document.body;

function test(name, callback) {
    tape(name, function(t) {
        var el = createStructure();
        body.appendChild(el);
        t.on('end', function() {
            body.removeChild(el);
        });

        callback(t, el);
    });
}

function createStructure() {
    return create('ul', { 'class': 'hut-menu' },
        create('li',
            create('a', { 'href': '#' }, 'Home')),
        create('li',
            create('a', { 'class': 'submenu-link-1', 'href': '#' }, 'Menu'),
            create('ul', { 'class': 'submenu-1' },
                create('li',
                    create('a', { href: '#' }, 'Child Link')),
                create('li',
                    create('a', { href: '#' }, 'Second Link'))
            )
        ),
        create('li',
            create('a', { href: '#' }, 'Second'),
            create('ul', { 'class': 'submenu-2' },
                create('li',
                    create('a', { 'href': '#' }, 'Link'))
            )
        )
    );
}

test('create new menu', function(t, el) {
    var m = menu(el);
    t.equal(m.current, null);
    t.end();
});

test('open submenu', function(t, el) {
    var m = menu(el),
        sub = el.querySelector('.submenu-1'),
        triggered = false;

    m.once('open', function(item) {
        t.equal(item, sub);
        triggered = true;
    });

    m.open(sub);

    t.equal(m.current, sub);
    t.ok(triggered, 'triggered open event');
    t.end();
});

test('close submenu', function(t, el) {
    var m = menu(el),
        sub = el.querySelector('.submenu-2'),
        triggered = false;
    m.open(sub);

    m.once('close', function(item) {
        t.equal(item, sub);
        triggered = true;
    });

    m.close();

    t.equal(m.current, null);
    t.ok(triggered, 'triggered close event');
    t.end();
});

test('close existing menu when other menu is opened', function(t, el) {
    var m = menu(el),
        first = el.querySelector('.submenu-1'),
        second = el.querySelector('.submenu-2'),
        closed = false;

    m.once('close', function(item) {
        t.equal(item, first);
        closed = true;
    });

    m.open(first);
    t.notOk(closed, 'did not close menu');

    m.open(second);
    t.equal(m.current, second);
    t.ok(closed, 'closed first menu');
    t.end();
});

test('toggle submenu', function(t, el) {
    var m = menu(el),
        sub = el.querySelector('.submenu-2'),
        opened = false,
        closed = false;

    m.once('open', function(item) {
        t.equal(item, sub);
        opened = true;
    });

    m.once('close', function(item) {
        t.equal(item, sub);
        closed = true;
    });

    m.toggle(sub);
    t.equal(m.current, sub);
    t.ok(opened, 'opened menu');
    t.notOk(closed, 'did not close');

    m.toggle(sub);
    t.equal(m.current, null);
    t.ok(closed, 'closed menu');

    t.end();
});

test('toggle menu when link is clicked', function(t, el) {
    var m = menu(el),
        sub = el.querySelector('.submenu-1'),
        link = el.querySelector('.submenu-link-1');

    events(link).trigger('click');
    t.equal(m.current, sub);

    events(link).trigger('click');
    t.equal(m.current, null);

    t.end();
});
