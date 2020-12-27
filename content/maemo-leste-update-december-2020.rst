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
* Major MCE changes, including a ambient light sensor based on the IIO
  subsystem, accelerometer IIO subsystem, led-control for other devices, user
  configuration customisation, loads of clean ups and more.
* maemo-input-sounds package finished, adding vibration and sounds
* Stable powermanagement for the Droid 4 - lasting days without suspending
* Application launcher "Debian" submenu to launch any application in Debian
* Calendar support is working, including home applet and synchronisation with
  syncevolution.
* Settings applet including timezone chooser is working
* Hildon address book is nearing completion
* Motorola Bionic is a new supported device
* The GPS stack is working in userspace, and is almost finished
* Better PowerVR support upcoming, with higher clock rates and the latest driver
  version, allowing the N900 to move to the latest kernel again and gain real
  power management.


Software changes
================


maemo-input-sounds
------------------

We've (re)implemented `Maemo Input Sounds (MIS)
<https://github.com/maemo-leste/maemo-input-sounds/>`_, which was a closed
Fremantle package. When users interact with Maemo Leste devices, input events
are generated for buttons, touchscreen or any other input device. MIS is a
daemon that then listens to these events and acts accordingly by providing sound
and/or vibration feedback.

We also surfaced problems in the Xorg server regarding their XRecord extension,
`mailed the development list
<https://lists.x.org/archives/xorg-devel/2020-July/058582.html>`_, and later on `filed a bug report with patch on
freedesktop.org <https://gitlab.freedesktop.org/xorg/xserver/-/issues/1046>`_, but it looks like no maintainer is home, so we have shipped the patch with our Xorg server.

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

We are now also providing `Qalendar <https://github.com/maemo-leste/qalendar>`_
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

.. .. image:: /images/qalendar-6.png
..   :height: 324px
..   :width: 576px


Synchronisation
~~~~~~~~~~~~~~~

The calendar application can be synchronised to various calendar backends using
`syncevolution`, see also https://wiki.maemo.org/Sync

Building the latest syncevolution for Maemo Leste `revealed bugs
in calendar-backend which code only ever worked on 32 bit 
<https://github.com/maemo-leste/calendar-backend/commit/c6e9ef0db493118d44a2958f71180ac70609b071>`_.

Further details can be found `on this syncevolution email thread <https://lists.syncevolution.org/hyperkitty/list/syncevolution@syncevolution.org/thread/ELDL7L37GJHD67OTJWVENURITZ4FV6DL/>`_.

With that solved, the synchronisation now works, and you can read up on
synchronisation on the `wiki page on our Calendar <https://leste.maemo.org/Calendar>`_.

There is also a GUI available to schedule sychronisation on set times, written
custom for Maemo called `syncevolution-frontend
<https://github.com/maemo-leste-extras/syncevolution-frontend>`_

`The home widget has also been ported <https://github.com/maemo-leste-extras/cal-home-widget>`_, showing the upcoming events and current tasks:

.. image:: /images/leste-calendar-widget.png
  :height: 343px
  :width: 572px

**We could use someone's help to write a Dockerfile for syncevolution to
automatically test the Maemo backend**,
`see bug #492 <https://github.com/maemo-leste/bugtracker/issues/492>`_



applet-datetime
---------------

An applet for datetime was implemented, and parts reverse engineered.
`hildon-time-zone-chooser <https://github.com/maemo-leste/hildon-time-zone-chooser>`_
features a pannable map of the world, along with a button in its EditToolbar to
allow you to input the name of a city directly. This is used for timezone
selection in the settings menu, but can also be used separately by any other
application that needs it.

The datetime applet itself allows user to set the time, date, and timezone, and
changing the clock to be a 24 hour clock. This also lays the groundwork for
alarms and similar things.

.. image:: /images/applet-amsterdam.png
  :height: 343px
  :width: 572px

Relevant repositories:

* https://github.com/maemo-leste/applet-datetime/
* https://github.com/maemo-leste/hildon-time-zone-chooser/
* https://github.com/maemo-leste/clock/


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

# TODO
#.. video:: /images/droid4-sfeed_curses.webm


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
can talk to our location-daemon and retrieve the current location info and
provide it to applications like `maep
<https://github.com/maemo-leste-extras/maep>_`  that use liblocation as their
backend. location-daemon serves as a central point of gps information on Maemo
Leste, and it serves its info over the DBus Message API. Internally,
location-daemon talks to gpsd using its internal libgps library. With this,
programs using liblocation can simply gather info from dbus so you can integrate
this gps information into your application.

.. image:: /images/location-control.png
  :height: 296px
  :width: 479px

.. image:: /images/maep-1.jpg
  :height: 266px
  :width: 527px

.. image:: /images/maep-2.jpg
  :height: 324px
  :width: 576px

.. image:: /images/maep-leste-ams.png
  :height: 324px
  :width: 576px

Other relevant repositories:

* https://github.com/maemo-leste/liblocation
* https://github.com/maemo-leste/location-ui
* https://github.com/maemo-leste/location-status (unfinished)
* https://github.com/maemo-leste/location-daemon (work in progress)

python-location
~~~~~~~~~~~~~~~

Work on the status applet and an improved dbus interface is still under way.
`liblocation Python bindings <https://github.com/maemo-leste/python-location>`_
are now also available, here is an example:

.. code:: python

    import location
    import gobject

    def on_error(control, error, data):
        print "location error: %d... quitting" % error
        data.quit()

    def on_changed(device, data):
        if not device:
            return
        if device.fix:
            if device.fix[1] & location.GPS_DEVICE_LATLONG_SET:
                print("lat = %f, long = %f" % device.fix[4:6])

    def on_stop(control, data):
        data.quit()

    def start_location(data):
        data.start()
        return False

    loop = gobject.MainLoop()
    control = location.GPSDControl.get_default()
    device = location.GPSDevice()
    control.set_properties(preferred_method=location.METHOD_USER_SELECTED,
                           preferred_interval=location.INTERVAL_DEFAULT)

    control.connect("error-verbose", on_error, loop)
    device.connect("changed", on_changed, control)
    control.connect("gpsd-stopped", on_stop, loop)

    gobject.idle_add(start_location, control)

    loop.run()

Documentation on the Python APIs can be found here:

* http://wiki.maemo.org/PyMaemo/Using_Location_API
* http://pymaemo.garage.maemo.org/python_location_manual/location.html


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


* document new mce features, setup
  https://github.com/maemo-leste/mce/pull/20
  https://github.com/maemo-leste/mce/pull/36
  https://github.com/maemo-leste/mce/pull/37
  https://github.com/maemo-leste/mce/pull/38
  https://github.com/maemo-leste/mce/pull/42

* led-sw new patterns: screenshots from https://github.com/maemo-leste/bugtracker/issues/491


openmediaplayer
---------------

Open Media Player is a clone of the Maemo Fremantle media player, and with the
Qt 5 port we've been making progress on bringing it to Maemo Leste `in issue #25 <https://github.com/maemo-leste/bugtracker/issues/25>`_.

Currently the application builds with Qt5 and shows the main window and
settings, but any playlists do not yet render.

**If anyone feels like helping out, that would be much appreciated!**

.. image:: /images/omp-initial-1.png
  :height: 385px
  :width: 716px

.. image:: /images/omp-initial-2.png
  :height: 385px
  :width: 716px


Addressbook and contacts and account libraries
----------------------------------------------


* osso-abook http://46.249.74.23/leste/VirtualBox_leste-beowulf_17_09_2020_15_06_07.png
  https://wizzup.org/osso-abook-contacts.png (this is debug mode, maybe run in
  non-debug mode)

https://github.com/maemo-leste/bugtracker/issues/454

Almost in -devel repo

Rotation support
----------------

* XXX: TODO: add droid video of rotation

Orientation and rotation support is now supported natively. Using the hardware
accelerometers, mce, and iio-sensors we are able to physically rotate our
devices and have the orientation change depending on the 3D position. Obviously,
this means portrait and landscape orientation can be switched simply by
positioning the device in its respective position. As we're using native kernel
interfaces and according userspace, this is supported on all our phones which
have working accelerometers.

The package `hildon-desktop-rotation-support
<https://github.com/maemo-leste/hildon-desktop-rotation-support>`_ implements
this feature using `dbus-scripts` and the `xrandr` and `xinput` utilities.

On the Nokia N900 this is not yet enabled, due to the rotation crashing the
display server still.


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

With the UCM files in place, `pavucontrol-qt` will show the proper controls and
outputs - for multimedia (Hi Fi) and phone.

.. image:: /images/pavucontrol-qt.png
  :height: 324px
  :width: 576px

.. image:: /images/pavucontrol-qt2.png
  :height: 324px
  :width: 576px

Huge thanks for `uvos` for creating the UCM2 files for the Droid 4!


Hardware & Drivers
==================


Motorola Droid Bionic
---------------------

* https://leste.maemo.org/Motorola_Droid_Bionic
* https://github.com/IMbackK/bionic-clown-boot


Droid4 and uptime
-----------------

* Note on random reset fixes (looks like it's fixed?!)
* Droid RTC fixed: ``[PATCH] rtc: cpcap: fix range``
* droid4 pm wrt SCRN=0 ; https://github.com/maemo-leste/dbus-scripts




Nokia N900
----------

u-boot and serial
~~~~~~~~~~~~~~~~~

Pali has been doing a lot of work on mainline u-boot on the Nokia N900 again,
and it has paid off. Now u-boot boots again (yes, it wasn't booting anymore!)
and usbtty (serial communication over usb) now works. This might allow
for scripted booting of the Nokia N900.

The new u-boot binary can be found here:

    https://maedevu.maemo.org/images/n900/tools/

with filename `u-boot-2020.12-pali.bin`.

If you flash this to your device with 0xFFFF and boot with the keyboard open and
USB cable connected, you should see something similar to this in `dmesg`::

    usb 3-1.1.3: new full-speed USB device number 95 using xhci_hcd
    usb 3-1.1.3: New USB device found, idVendor=0421, idProduct=01c8, bcdDevice= 0.00
    usb 3-1.1.3: New USB device strings: Mfr=1, Product=2, SerialNumber=3
    usb 3-1.1.3: Product: N900 (U-Boot)
    usb 3-1.1.3: Manufacturer: Nokia
    usb 3-1.1.3: SerialNumber: 0000000
    cdc_acm 3-1.1.3:1.0: ttyACM0: USB ACM device

And to top it off, here is a video of the physical serial on the right, and the
usb serial on the left. You can see they are in sync:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/tGGXvguyXWk"
    ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>


PowerVR: DDK 1.17, Xorg Glamor and clock fixes
----------------------------------------------

gtk4 bug report with lima?

dri3 met modesetting, egl


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

* https://github.com/maemo-leste-extras/hildon-theme-maemo-org
* https://github.com/maemo-leste/leste-config/pull/13

* https://github.com/maemo-leste/bugtracker/issues/186#issuecomment-748610883


* https://github.com/maemo-leste-extras/qt-mobile-hotspot
  https://github.com/maemo-leste/bugtracker/issues/430
* https://github.com/maemo-leste/bugtracker/issues/454




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
