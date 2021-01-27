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
    ('Wiki', 'https://leste.maemo.org'),
    ('Download', 'https://maedevu.maemo.org/images/'),
    ('Screenshots', '/pages/screenshots.html'),
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
LINKS = (
    ('Maemo Leste Bugtracker', 'https://github.com/maemo-leste/bugtracker/issues'),
    ('Maemo Leste Wiki', 'https://leste.maemo.org'),
    ('Maemo Leste Packages', 'https://maedevu.maemo.org/pkgweb/'),
)

# Social widget
SOCIAL = (
    ('Twitter', 'https://twitter.com/maemoleste'),
    ('Github', 'https://github.com/maemo-leste'),
    ('Atom Feed', 'https://maemo-leste.github.io/feeds/all.atom.xml'),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
