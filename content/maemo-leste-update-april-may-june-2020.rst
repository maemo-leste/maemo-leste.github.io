Maemo Leste - Thirteenth Update (April) 2020
############################################

:Category: news
:tags: droid4, n900, pinephone, cellular, extras, light sensor, power
       management, ofono, openrc, keyboard layout, vibration, cellular data
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-03-25 19:00

.. TODO DATE

It's been several weeks since our `last update
<{filename}/maemo-leste-update-february-and-march-2020.rst>`_, and let's start with a few highlights:

* We have improved power management on the Droid 4, and under current ideal
  conditions, the power draw is about 60mW, with the modem turned on. That
  should last a decent battery for a few days.
* Various sensors and other hardware of the Motorola Droid 4 is now usable with
  Maemo Leste
* A lot of kernel bugs/regressions have been chased and fixed.
* Cellular support is improving, cellular data should now work
* Maemo Leste Extras should contain quite a few more packages now
* `leste-config-*` packages now exist to provide seamless configuration updates
  and changes, so there should be less of a need to "reinstall" on every new
  image release.



Software changes
================


mce
---

The Mode Control Entity has seen significant changes.

https://github.com/maemo-leste/bugtracker/issues/338


* https://github.com/maemo-leste/mce/pull/5
* https://github.com/maemo-leste/mce/pull/6
* https://github.com/maemo-leste/mce/pull/7
* https://github.com/maemo-leste/bugtracker/issues/340


https://github.com/maemo-leste/bugtracker/issues/132
https://github.com/maemo-leste/mce/pull/9


* mce with vibration (!)

* https://github.com/maemo-leste/bugtracker/issues/392

Qt 5: Progress is being made
----------------------------

* https://github.com/maemo-leste/qt-platform-maemo
* https://wizzup.org/leste-qt5-countdowntimer-0.1.png
* https://wizzup.org/leste-designer-lol.png
* https://wizzup.org/leste-qt5-designer-x11-forward.png
* https://wizzup.org/countdowntimer-qt5-kinda-fixed.png
* https://github.com/maemo-leste-extras/countdowntimer

Also cover designer, what's left to be done, vkb status



Cellular data and ofono support
-------------------------------


- lots of work on ofono, droid4 kernel side

* ofono-d4 for droid4 with Tony's work

* libicd-network-ofono https://wizzup.org/droid4-cellular-0.1.png

* https://github.com/maemo-leste/bugtracker/issues/374 - two packages, also
  mention integration

* https://github.com/maemo-leste/bugtracker/issues/372

Wireless
--------

- bugfixes with scan list being disable at first

* https://github.com/maemo-leste/connui-internet/pull/1
* https://github.com/maemo-leste/bugtracker/issues/253


Themes
------

* https://github.com/maemo-leste-extras/miku-theme
* https://github.com/maemo-leste-extras/hildon-theme-matrix


Xephyr / Nested Xorg servers
----------------------------

* Xephyr -- mention, show some use of it


Input / Focus fixes
-------------------

* focus fixes h-d and libmatchbox2


OpenRC integration in Debian fixes
----------------------------------

TODO
* openrc support in insserv, no more 'warnings' about lsb headers, getting installed into proper runlevel


More languages added to virtual keyboard layouts
------------------------------------------------

https://github.com/maemo-leste/hildon-input-method-plugins/pull/2

maemo-input-sounds
------------------

* maemo-input-sounds https://github.com/maemo-leste/bugtracker/issues/389


Steps towards calls and texts
-----------------------------

* towards proper telepathy integration https://github.com/maemo-leste/bugtracker/issues/390
* https://github.com/maemo-leste/rtcom-eventlogger-plugins
* https://github.com/maemo-leste/rtcom-eventlogger-ui

* osso-abook


Calendar backend and frontend
-----------------------------

* https://github.com/buzztiaan/calendar-backend
* https://github.com/buzztiaan/libgq
* https://github.com/buzztiaan/qalendar


hildon-home fixes
-----------------

Various ones to reduce wakeups, various plugin loading problems fixed
https://github.com/maemo-leste/bugtracker/issues/253

* https://github.com/maemo-leste/hildon-home/commit/13a8a03196a33e51396ceb61ce307d9655a4ea41
* https://github.com/maemo-leste/hildon-home/commit/a505d58a6ae87cb032ec20a606d54d69f3582fba

Device support
==============


Motorola Droid 4
----------------

Ambient Light Sensor
~~~~~~~~~~~~~~~~~~~~

* droid4 ambient light sensor https://github.com/maemo-leste/mce/pull/8/

Vibration Motor
~~~~~~~~~~~~~~~

Compass / Accelerometer
~~~~~~~~~~~~~~~~~~~~~~~


* droid4 compass/accelerometer


Power Management
~~~~~~~~~~~~~~~~

https://github.com/maemo-leste/bugtracker/issues/340


* 13:31 <Wizzup> I also want to make some photos of my lab psu setup + power graphs + battery life

Keyboard layout
~~~~~~~~~~~~~~~


* buzz created geometry file
  https://wizzup.org/droid4-keyboard.png


* droid4 keyboard (n900 layout  = https://wizzup.org/n900-leste-layout.pdf )
  create with xkbprint -color "${DISPLAY}" - |     ps2pdf - > current_keyboard_layout.pdf
  TODO: mention keyboard pkg
  https://github.com/maemo-leste/bugtracker/issues/122
  https://github.com/maemo-leste/bugtracker/issues/347
  https://github.com/maemo-leste/hildon-input-method-plugins/pull/3
  https://github.com/maemo-leste/xkb-data/commit/99343d77464299cdf1d56e461018bd7f974cee42
  https://github.com/maemo-leste/xkb-data/commit/ccebc5ea6cc9c14c7822b53317640c8f2f6372b2
  https://github.com/maemo-leste/xkb-data/commit/0bddeb2bdfcc0e44223f0e5a9667e13784028e8a


Nokia N900
----------



Community showcase
==================


* pascal, https://github.com/maemo-leste-extras/photolightmeter


* https://twitter.com/rfc1087/status/1271796014903635969


* https://imgur.com/a/SPGe9ZM -- ui screenshots by [redacted]
* https://imgur.com/a/t4yfBaI -- [redacted] proxmark3 ; notes https://paste.debian.net/plain/1149261


Interested?
===========

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

**We have several Nokia N900 and Motorola Droid 4 units available to interested
developers**, so if you are interested in helping out but have trouble acquiring
a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay up to date, ask questions and/or
help out. Another great way to get in touch is to join the `IRC channel
<https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
