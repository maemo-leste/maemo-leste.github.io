Maemo Leste - Fourteenth Update (July, August, September, October) 2020
#######################################################################

:Category: news
:tags: droid4, n900, pinephone, cellular, mce, accelerometer, qt, qt5,
       contacts, calculator, dorian, calendar, qalendar, clock, alarms,

       extras, light sensor, power
       management, ofono, openrc, keyboard layout, vibration, cellular data
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-06-24 18:00

.. TODO

It's been several months since our `last update
<{filename}/maemo-leste-update-april-may-june-2020.rst>`_, so let's start
with a few highlights:

* The Maemo Qt5 port is usable now, unlocking many applications like the
  `Dorian`_ ereader `Qalendar`_ Calendar, `clock-ui` clock and alarm and
  `osso-calculator` applications.
* `Rotation support`_ is now working for several devices, based on accelerometer
  and application policies.
* maemo-input-sounds package finished, adding vibration and sounds
* Stable powermanagement for the Droid 4 - lasting days without suspending
* Application launcher "Debian" submenu to launch any application in Debian
* Calendar support is working, including home applet and synchronisation with
  syncevolution.
* Settings applet including timezone chooser is working
* Hildon address book is nearing completion


Software changes
================

mce
---



maemo-input-sounds
------------------


Qt 5
----


* https://github.com/maemo-leste/qtstyleplugins/pull/1

(also pyqt5)


Qalendar
--------

clock-ui
--------

osso-calculator
---------------

(QT)

dorian
------

not finished yet: https://github.com/maemo-leste-extras/dorian/issues/1

https://github.com/maemo-leste-extras/dorian/pull/4
https://github.com/maemo-leste-extras/dorian/pull/5
https://github.com/maemo-leste-extras/dorian/pull/6

video of dorian being smooth?

* dorian
  https://wizzup.org/dorian-qt5.png
  https://wizzup.org/leste-dorian-almost-there.png
  https://github.com/maemo-leste-extras/dorian
  https://github.com/maemo-leste/bugtracker/issues/440
  https://wizzup.org/dorian-fullscreen.png

Hardware & Drivers
==================

Rotation support
----------------

SORTME
======

* clockd init script

* alarmd init script

* touchscreen rotation, droid4, etc
  hildon-desktop-rotation-support

* led-sw, led-dbus:
  dbus-send --system --type=method_call --dest=com.nokia.mce /com/nokia/mce/request com.nokia.mce.request.req_led_pattern_activate string:"PatternCommunicationIM"

* https://github.com/maemo-leste/bugtracker/issues/405

* https://github.com/maemo-leste/bugtracker/issues/465

* https://wizzup.org/update-notification-1.png
  https://wizzup.org/update-notification-2.png
  https://wizzup.org/update-notification-3.png
  https://wizzup.org/update-notification-4.png
  https://wizzup.org/update-notification-5.png
  https://wizzup.org/update-notification-6.png
  https://wizzup.org/update-notification-7.png

* https://github.com/maemo-leste-extras/profilesx

* Droid RTC fixed: ``[PATCH] rtc: cpcap: fix range``

* droid4 pm wrt SCRN=0 ; https://github.com/maemo-leste/dbus-scripts

* https://github.com/maemo-leste/maemo-input-sounds/

* https://lists.x.org/archives/xorg-devel/2020-July/058582.html

* 23:26 < uvos> tmlind: i just tryed the 100MHz sdcard hack with a UHS-3 sdcard
  23:27 < uvos> tmlind: it works :) whats more i now have 41.4MB/s sd card write speed

* https://github.com/maemo-leste/bugtracker/issues/41 - screen calib applet

* https://github.com/maemo-leste/bugtracker/issues/82 +
  https://github.com/maemo-leste/bugtracker/issues/360 - debian submenu

* hildon-desktop improvements for terminal-only applications:
  https://github.com/maemo-leste/bugtracker/issues/415
  https://github.com/maemo-leste/hildon-desktop/pull/9


* https://github.com/maemo-leste/bugtracker/issues/402
  https://github.com/maemo-leste/maemo-audio

* mpd with GMPC works nice (make some screenshots), also fullscreen mode is cool

* https://github.com/maemo-leste/bugtracker/issues/389 - maemo input sounds

* https://github.com/maemo-leste/bugtracker/issues/419 -  status-area-orientationlock-applet installs into /usr/lib/hildon-desktop - not in /usr/lib/<arch>/hildon-desktop #419

* https://github.com/maemo-leste/bugtracker/issues/421 -  upower: keep history data for more than 7 days #421

* https://github.com/maemo-leste/bugtracker/issues/390#issuecomment-657268449 -
  progress on call ui libs

* https://wizzup.org/droid4-powerapplet.png + https://wizzup.org/droid4-upower-graph.png
  https://github.com/maemo-leste/bugtracker/issues/421 + -avg

* https://github.com/maemo-leste/hildon-desktop/pull/6 -- h-d snap grid size
  changes

* "Re: [maemo-leste] WIFI tethering"

* OMP. https://github.com/maemo-leste/bugtracker/issues/25 -- progress on
  openmediaplayer
  https://wizzup.org/omp-initial-1.png
  https://wizzup.org/omp-initial-2.png

* https://github.com/maemo-leste/bugtracker/issues/429 -- iio-sensor-proxy
  packaged

* https://wizzup.org/leste-qt5-progress-qmenu.mp4
  qt-platform-maemo


* osso-calculator
  https://wizzup.org/leste-qt-osso-calculator.png
  ALSO NEED TO BUILD/FIX osso-calculator-engine
  needs icon start to fix (maemo-launcher qt5?)

* added osso-calculator-engine
  osso-calculator-engine

* hildon-desktop improvements: changes to how long an app is 'loading', and how
  icons snap on the desktop, as well as fixes for launching of many apps

* clock-ui / libgq-gconf
  https://github.com/maemo-leste/libgq-gconf
  https://github.com/maemo-leste/clock-ui

* alarmd fix https://github.com/maemo-leste/alarmd/pull/1

* https://github.com/maemo-leste/mce/pull/14 -- iio-als
  + https://github.com/maemo-leste/mce/pull/15

* https://github.com/maemo-leste/mce/pull/16 -- display inactivity refactor

* https://github.com/maemo-leste/mce/pull/18 -- mce.ini.d split
  + https://github.com/maemo-leste/leste-config/pull/5
  + https://github.com/maemo-leste/leste-config/pull/6

* https://github.com/maemo-leste/mce/pull/19 -- evdev vibrator fixes

* Qt5 porting: QMaemo5Style and maemo .spec file is now present
  https://github.com/maemo-leste/bugtracker/issues/431

* osso-abook http://46.249.74.23/leste/VirtualBox_leste-beowulf_17_09_2020_15_06_07.png
  https://wizzup.org/osso-abook-contacts.png (this is debug mode, maybe run in
  non-debug mode)

* https://github.com/maemo-leste/bugtracker/issues/432 -- qt hildon screenshot
  atom

* https://github.com/maemo-leste/osso-systemui-tklock/pull/2

* Qalendar
  https://wizzup.org/qalendar-1.png
  https://wizzup.org/qalendar-2.png
  https://wizzup.org/qalendar-3.png
  https://wizzup.org/qalendar-4.png
  https://wizzup.org/qalendar-5.png
  https://wizzup.org/qalendar-6.png

  https://wiki.maemo.org/Sync

  syncevolution-frontend

* python-alarm
  https://github.com/maemo-leste/bugtracker/issues/468

* cal-home-widget
  https://wizzup.org/leste-calendar-widget.png
  https://github.com/maemo-leste-extras/cal-home-widget

* https://github.com/maemo-leste-extras/qt-mobile-hotspot
  https://github.com/maemo-leste/bugtracker/issues/430

* https://github.com/maemo-leste/bugtracker/issues/454

* syncevolution, calendar-backend fixes
  https://lists.syncevolution.org/hyperkitty/list/syncevolution@syncevolution.org/thread/ELDL7L37GJHD67OTJWVENURITZ4FV6DL/
  https://leste.maemo.org/Calendar

* Time applet, world timezone chooser, etc
  https://github.com/maemo-leste/applet-datetime/
  https://github.com/maemo-leste/hildon-time-zone-chooser/
  https://github.com/maemo-leste/clock/
  \o/

* Droid 4 rotation works: https://github.com/maemo-leste/hildon-desktop/pull/11


* ncurses rss reader 15:08 < Evil_Bob> https://codemadness.org/paste/droid4-sfeed_curses.avi higher fps, lower quality feel free to use it

* https://github.com/IMbackK/bionic-clown-boot

* location-control https://parazyd.org/pub/tmp/screenshots/screenshot00178.png

* 17:44 <parazyd> https://github.com/maemo-leste/bugtracker/issues/54

* 17:44 <parazyd> https://github.com/maemo-leste/bugtracker/issues/447 -> "no more apt warnings about runlevels"

* u-boot mainline working again

* Link to all clorts stuff: https://talk.maemo.org/showthread.php?t=101089&page=5

Interested?
===========

If you have questions, are interested in specifics, or helping out, or wish to have a specific
package ported, please see our bugtracker.

**We have several Nokia N900 and Motorola Droid 4 units available to interested
developers**, so if you are interested in helping out but have trouble acquiring
a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
