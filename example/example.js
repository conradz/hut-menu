'use strict';

var menu = require('../'),
    document = window.document,
    events = require('chi-events'),
    create = require('chi-create');

var el = document.querySelector('.hut-menu'),
    m = menu(el);

events(document.getElementById('open-features'))
    .on('click', function() {
        m.open(document.getElementById('features-menu'));
    });

events(document.getElementById('close'))
    .on('click', function() {
        m.close();
    });

var counter = 1;
events(document.getElementById('add-menu'))
    .on('click', function() {
        var header = create('a', { href: '#' }, 'Menu ' + counter),
            subheader = create('a',
                { href: '#submenu' + counter },
                'Submenu ' + counter),
            submenu = create('ul', create('li', subheader)),
            item = create('li', header, submenu);

        el.appendChild(item);
        counter++;
    });
