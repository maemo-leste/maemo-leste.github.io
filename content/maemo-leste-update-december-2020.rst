Maemo Leste - Fourteenth Update (July, August, September, October, November, December) 2020
###########################################################################################

:Category: news
:tags: droid4, bionis, n900, pinephone, pinetab, cellular, mce, accelerometer,
       qt, qt5, contacts, calculator, dorian, calendar, qalendar, clock, alarms,
       extras, light sensor, power management, ofono, openrc, keyboard layout,
       vibration, cellular data, gps, location
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-12-17 18:00

.. TODO

It's been several months since our `last update
<{filename}/maemo-leste-update-april-may-june-2020.rst>`_. We've been working
hard, and it's been quite a year. Things are shaping up amazingly well, and
we're looking forward to entering yet another year of our development efforts!

Here are a few highlights:

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
* Motorola Bionic is a new supported device
* The GPS stack is working in userspace, and is almost finished


Software changes
================

mce
---



maemo-input-sounds
------------------

We've (re)implemented `Maemo Input Sounds (MIS)
<https://github.com/maemo-leste/maemo-input-sounds/>`_, which was a closed
Fremantle package. When users interact with Maemo Leste devices, input events
are generated for buttons, touchscreen or any other input device. MIS is a
daemon that then listens to these events and acts accordingly by providing sound
and/or vibration feedback.

TODO: Mention xorg patch?

* https://github.com/maemo-leste/maemo-input-sounds/
* https://lists.x.org/archives/xorg-devel/2020-July/058582.html
* https://github.com/maemo-leste/bugtracker/issues/389 - maemo input sounds


Qt 5
----


* https://github.com/maemo-leste/qtstyleplugins/pull/1

(also pyqt5)

* Qt5 porting: QMaemo5Style and maemo .spec file is now present
  https://github.com/maemo-leste/bugtracker/issues/431

* https://wizzup.org/leste-qt5-progress-qmenu.mp4
  qt-platform-maemo

* https://github.com/maemo-leste/bugtracker/issues/432 -- qt hildon screenshot
  atom


Qalendar
--------

We are now also providing `Qalendar <https://github.com/maemo-leste/qalendar>_`
as a default Calendar application. It is a FOSS calendar interface written in Qt
for Fremantle as an effort to replace the closed source stock calendar. For
Maemo Leste, we've ported it to Qt5 and have it working well:

.. image:: /images/qalendar-1.png
  :height: 324px
  :width: 576px

.. image:: /images/qalendar-2.png
  :height: 324px
  :width: 576px

.. image:: /images/qalendar-3.png
  :height: 324px
  :width: 576px

.. image:: /images/qalendar-4.png
  :height: 324px
  :width: 576px

.. image:: /images/qalendar-5.png
  :height: 324px
  :width: 576px

.. image:: /images/qalendar-6.png
  :height: 324px
  :width: 576px


TODO: Write a bit about the stuff below.

https://wiki.maemo.org/Sync

  syncevolution-frontend

* cal-home-widget
  https://wizzup.org/leste-calendar-widget.png
  https://github.com/maemo-leste-extras/cal-home-widget

* https://github.com/maemo-leste-extras/qt-mobile-hotspot
  https://github.com/maemo-leste/bugtracker/issues/430

* https://github.com/maemo-leste/bugtracker/issues/454

* syncevolution, calendar-backend fixes
  https://lists.syncevolution.org/hyperkitty/list/syncevolution@syncevolution.org/thread/ELDL7L37GJHD67OTJWVENURITZ4FV6DL/
  https://leste.maemo.org/Calendar


applet-datetime
---------------

An applet for datetime was implemented, and parts reverse engineered.
`hildon-time-zone_chooser
<https://github.com/maemo-leste/hildon-time-zone-chooser/>_` features a
pannable map of the world, along with a button in its EditToolbar to allow you
to input the name of a city directly. This is used for timezone selection in the
settings menu, but can also be used separately by any other application that
needs it.

The datetime applet itself allows user to set the time, date, and timezone. This
also sets the ground for alarms and similar things.

TODO: Screenshots please

* Time applet, world timezone chooser, etc
  https://github.com/maemo-leste/applet-datetime/
  https://github.com/maemo-leste/hildon-time-zone-chooser/
  https://github.com/maemo-leste/clock/
  \o/


clock-ui
--------

* clock-ui / libgq-gconf
  https://github.com/maemo-leste/libgq-gconf
  https://github.com/maemo-leste/clock-ui

alarmd
------

* alarmd fix https://github.com/maemo-leste/alarmd/pull/1
* python-alarm
  https://github.com/maemo-leste/bugtracker/issues/468

Also, alarmd and clockd initscripts were ported to OpenRC, so currently there
are no more insserv/OpenRC runlevel warnings when running apt upgrade/install.


Integration of Debian packages
------------------------------

The Hildon menu, where we can see all our installed applications that have their
.desktop entries was expanded with a `submenu
<https://github.com/maemo-leste/hildon-desktop/commit/604d1167860d5750fffe097de121bd7a3e2885f7>_`
that now also shows all "non-hildonized" packages that come from upstream. These
can be found in the "Debian" submenu by touching the Debian icon.

.. image:: /images/debian-menu-1.png
  :height: 324px
  :width: 576px

.. image:: /images/debian-menu-2.png
  :height: 324px
  :width: 576px


osso-calculator
---------------

* osso-calculator
  https://wizzup.org/leste-qt-osso-calculator.png
  ALSO NEED TO BUILD/FIX osso-calculator-engine
  needs icon start to fix (maemo-launcher qt5?)

* added osso-calculator-engine
  osso-calculator-engine


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


profilesx
---------

For managing sound profiles, like ringing/vibrating on notifications and phone
calls, we have ported and packaged the open source `profilesx
<https://github.com/maemo-leste-extras/profilesx>_` application that was also
available on Fremantle. profilesx supports managing multiple (sound) profiles,
along with enabling features like autoanswer and loudspeaker.

.. image:: /images/profilesx-2.png
  :height: 324px
  :width: 576px

.. image:: /images/profilesx-2.png
  :height: 324px
  :width: 576px

.. image:: /images/profilesx-3.png
  :height: 324px
  :width: 576px


hildon-desktop
--------------

Support for terminal applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We `implemented <https://github.com/maemo-leste/hildon-desktop/pull/9>_` proper
support (and fallbacks) in hildon-desktop that allow us to start .desktop
entries that have `Terminal=true` set and are supposed to open a terminal and
run the specific command. Now programs like `htop` can be can by touching the
icon in the menu, or you could even write your own scripts and run them like
this! For example, Evil_Bob has his sfeed_curses running from desktop:

.. video:: /images/droid4-sfeed_curses.webm


Snap to desktop
~~~~~~~~~~~~~~~

* hildon-desktop improvements: changes to how long an app is 'loading', and how
  icons snap on the desktop, as well as fixes for launching of many apps

* https://github.com/maemo-leste/hildon-desktop/pull/6 -- h-d snap grid size
  changes


Orientationlock Applet
----------------------

* https://github.com/maemo-leste/bugtracker/issues/419 -  status-area-orientationlock-applet installs into /usr/lib/hildon-desktop - not in /usr/lib/<arch>/hildon-desktop #419



liblocation and location-control
--------------------------------

`liblocation <https://github.com/maemo-leste/liblocation/>_`,
`location-control <https://github.com/maemo-leste/liblocation/>_`, and a few
other pieces of software comprise the GPS/Location stack on Maemo. We have
successfully reverse-engineered these binaries from Fremantle and work is well
underway on integrating them in the Maemo Leste userspace. Using liblocation, we
can talk to gpsd and retrieve the current location info and provide it to
applications like `maep <https://github.com/maemo-leste-extras/maep>_`  that use
liblocation as their backend. This stack currently uses the DBus protocol to
communicate, but liblocation will be modernized and ported to use gpsd's
internal libgps library for more proper integration and better power management.

.. image:: /images/location-control.png
  :height: 324px
  :width: 576px

.. image:: /images/maep-1.jpg
  :height: 324px
  :width: 576px

.. image:: /images/maep-2.jpg
  :height: 324px
  :width: 576px



Major MCE improvements
----------------------

* https://github.com/maemo-leste/mce/pull/14 -- iio-als
  + https://github.com/maemo-leste/mce/pull/15

* https://github.com/maemo-leste/mce/pull/16 -- display inactivity refactor

* https://github.com/maemo-leste/mce/pull/18 -- mce.ini.d split
  + https://github.com/maemo-leste/leste-config/pull/5
  + https://github.com/maemo-leste/leste-config/pull/6

* https://github.com/maemo-leste/mce/pull/19 -- evdev vibrator fixes

* led-sw, led-dbus:
  dbus-send --system --type=method_call --dest=com.nokia.mce /com/nokia/mce/request com.nokia.mce.request.req_led_pattern_activate string:"PatternCommunicationIM"


* https://github.com/maemo-leste/bugtracker/issues/429 -- iio-sensor-proxy
  packaged


openmediaplayer
---------------

* OMP. https://github.com/maemo-leste/bugtracker/issues/25 -- progress on
  openmediaplayer
  https://wizzup.org/omp-initial-1.png
  https://wizzup.org/omp-initial-2.png



Addressbook and contacts and account libraries
----------------------------------------------


* osso-abook http://46.249.74.23/leste/VirtualBox_leste-beowulf_17_09_2020_15_06_07.png
  https://wizzup.org/osso-abook-contacts.png (this is debug mode, maybe run in
  non-debug mode)


Rotation support
----------------

* TODO: Maybe add droid video?

Orientation and rotation support is now supported natively. Using the hardware
accelerometers, mce, and iio-sensors we are able to physically rotate our
devices and have the orientation change depending on the 3D position. Obviously,
this means portrait and landscape orientation can be switched simply by
positioning the device in its respective position. As we're using native kernel
interfaces and according userspace, this is supported on all our phones which
have working accelerometers.

(TODO: state of N900? ^)


UPower history
--------------

* https://github.com/maemo-leste/bugtracker/issues/421 -  upower: keep history data for more than 7 days #421


* https://wizzup.org/droid4-powerapplet.png + https://wizzup.org/droid4-upower-graph.png
  https://github.com/maemo-leste/bugtracker/issues/421 + -avg


Pulseaudio
----------

The audio stack was ported to `Pulseaudio
<https://github.com/maemo-leste/bugtracker/issues/402>_`, as this will be
necessary for further work on phone calls due to UCM and profiles. Pulseaudio
seamlessly integrates and is configured for all our targets. The base
configurations reside in our `maemo-audio
<https://github.com/maemo-leste/maemo-audio>_` package and they're pulled in by
our main metapackages, so a simple upgrade will configure everything as
necessary.

For `Droid4, Bionic <https://github.com/maemo-leste/leste-config/pull/13/>_`,
and `Pinephone
<https://github.com/maemo-leste/leste-config/commit/9693ab7dfff0b7068e2bbaa187a7f9af0ec229f6>_`,
we already have UCM2 files in place and we will be utilizing these with our
further efforts related to audio and phone calls.


Hardware & Drivers
==================


Motorola Droid Bionic
---------------------

* https://leste.maemo.org/Motorola_Droid_Bionic
* https://github.com/IMbackK/bionic-clown-boot

* Droid RTC fixed: ``[PATCH] rtc: cpcap: fix range``
* droid4 pm wrt SCRN=0 ; https://github.com/maemo-leste/dbus-scripts


Droid4 and uptime
-----------------

* Note on random reset fixes (looks like it's fixed?!)



Nokia N900
----------

* u-boot mainline working again


Pinephone and Pinetab
---------------------

The Pinephone and Pinetab devices are moving forward as well. Along with the
already mentioned working things, most things you'd expect work on the Pine64
devices. We have also implemented the `crust firmware
<https://github.com/crust-firmware/crust>` in our images so power usage is
minimal when the devices are suspended!

As Maemo Leste is envisioned as an operating system to mainly be used on devices
with a hardware keyboard, you can imagine our excitement when Pine64 announced
they are looking into a hardware keyboard `addon
<https://www.pine64.org/2020/07/29/invitation-to-play-along/>_` for the
Pinephone. We'll be following this development, and hope for it to continue
successfully :)


Continuous Integration for device images
----------------------------------------

On our Jenkins infrastructure, we have been successfully running `weekly builds
<https://phoenix.maemo.org/view/Images/>_` for all our device targets. This is a
great advantage as we don't have to manually build images whenever we find the
free time to do it, but rather have fresh images be built every week so everyone
can always download latest images with the most up to date packages installed.

This has also encouraged us to improve our image building `software
<https://github.com/parazyd/libdevuansdk>`_, clean it up, and make it more
efficient and generally just better.

At some point in the future, we also plan to look into automated testing of
these images, because a successful build doesn't necessarily mean a perfectly
working image. More later ;)


SORTME
======


* https://github.com/maemo-leste/bugtracker/issues/405

* https://github.com/maemo-leste/bugtracker/issues/465

* https://wizzup.org/update-notification-1.png
  https://wizzup.org/update-notification-2.png
  https://wizzup.org/update-notification-3.png
  https://wizzup.org/update-notification-4.png
  https://wizzup.org/update-notification-5.png
  https://wizzup.org/update-notification-6.png
  https://wizzup.org/update-notification-7.png

* 23:26 < uvos> tmlind: i just tryed the 100MHz sdcard hack with a UHS-3 sdcard
  23:27 < uvos> tmlind: it works :) whats more i now have 41.4MB/s sd card write speed

* https://github.com/maemo-leste/bugtracker/issues/41 - screen calib applet


* mpd with GMPC works nice (make some screenshots), also fullscreen mode is cool


* https://github.com/maemo-leste/bugtracker/issues/390#issuecomment-657268449 -
  progress on call ui libs

* "Re: [maemo-leste] WIFI tethering"

* https://github.com/maemo-leste/osso-systemui-tklock/pull/2

* ncurses rss reader 15:08 < Evil_Bob> https://codemadness.org/paste/droid4-sfeed_curses.avi higher fps, lower quality feel free to use it

* 17:44 <parazyd> https://github.com/maemo-leste/bugtracker/issues/54

* 17:44 <parazyd> https://github.com/maemo-leste/bugtracker/issues/447 -> "no more apt warnings about runlevels"

* Link to this stuff: https://talk.maemo.org/showthread.php?t=101089&page=5


Interested?
===========

If you have questions, are interested in specifics, or helping out, or wish to have a specific
package ported, please see our bugtracker.

**We have several Nokia N900 and Motorola Droid 4 and Bionic units available to
interested developers**, so if you are interested in helping out but have
trouble acquiring a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
