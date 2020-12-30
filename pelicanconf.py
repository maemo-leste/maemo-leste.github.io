#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Maemo Leste Developers'
SITENAME = 'Maemo Leste'
SITEURL = ''

PATH = 'content'

THEME = 'themes/nest'
NEST_HEADER_LOGO = '/images/logo_small_w.png'
MENUITEMS = [
        ('News', '/categories.html'),
        ('Packages', 'https://maedevu.maemo.org/pkgweb/'),
        ('Images', 'https://maedevu.maemo.org/images/'),
        ('Wiki', 'https://leste.maemo.org'),
        ]
STATIC_PATHS = ['images',]
EXTRA_PATH_METADATA = {
    'images/favicon.ico': {'path': 'favicon.ico'}
}

TIMEZONE = 'Europe/Amsterdam'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('Maemo Leste Github', 'https://github.com/maemo-leste'),
         ('Maemo Leste Bugtracker', 'https://github.com/maemo-leste/bugtracker/issues'),
         ('Maemo Leste Wiki', 'https://leste.maemo.org'),
         ('Maemo Leste Packages Interface', 'https://maedevu.maemo.org/pkgweb/'),
        )
         #('Pelican', 'http://getpelican.com/'),
         #('Python.org', 'http://python.org/'),
         #('Jinja2', 'http://jinja.pocoo.org/'),
         #('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = ()
#('You can add links in your config file', '#'),
# ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
