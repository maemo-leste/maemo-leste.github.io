Maemo Leste - Fourteenth Update (July, August, September, October, November, December) 2020
###########################################################################################

:Category: news
:tags: droid4, bionic, n900, pinephone, pinetab, cellular, mce, accelerometer,
       qt, qt5, contacts, calculator, dorian, calendar, qalendar, clock, alarms,
       extras, light sensor, power management, ofono, openrc, keyboard layout,
       vibration, cellular data, gps, location
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-12-27 18:00

It's been several months since our `last update
<{filename}/maemo-leste-update-april-may-june-2020.rst>`_. We've been working
hard, and it's been quite a year. Things are shaping up amazingly well, and
we're looking forward to entering yet another year of our development efforts!

Here are a few highlights:

* The Maemo Qt5 port is usable now, unlocking many applications, like the
  `Dorian`_ e-book reader `Qalendar`_ Calendar, `clock-ui`_ clock and alarm, and
  `osso-calculator`_ applications;
* `Rotation support`_ is now working for several devices, based on accelerometer
  and application policies;
* Major MCE changes, including ambient light sensor support based on the IIO
  subsystem, accelerometer IIO subsystem, led-control for other devices, user
  configuration customization, loads of clean ups and more;
* maemo-input-sounds package finished, adding vibration and sounds;
* Stable power management for the Droid 4 - lasting days without suspending;
* Application launcher "Debian" submenu to launch any Debian application;
* Calendar support is working, including home applet and synchronization using
  syncevolution;
* Settings applet including timezone chooser is working;
* Hildon address book is nearing completion;
* Motorola Bionic is a new supported device;
* The GPS stack is working in userspace, and is almost finished;
* Better PowerVR support upcoming, with higher clock rates and the latest driver
  version, allowing the N900 to move to the latest kernel again, and gain proper
  power management.


Software changes
================

Packages Interface
------------------

We now have a web interface to our packages: https://maedevu.maemo.org/pkgweb/

It is regenerated every time a package is built in our Jenkins CI instance, and
the source code can be found here: https://github.com/maemo-leste/mpi

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

More information in `bug #389 <https://github.com/maemo-leste/bugtracker/issues/389>`_


dbus-scripts
------------

dbus-scripts is a daemon that can execute a command when various events occur on
D-Bus. Since most of Maemo Leste relies on D-Bus in some way, this is a
powerful tool. A non-exhaustive list of some things one can watch for: keyboard
slide changing; screen turning on/off; connecting or disconnecting from a
network; incoming sms or phone call; device rotation.

This program was a user package in Maemo Fremantle, but we have promoted it to
be a core package, since we use it for `Rotation support`_ and to work around
some power management quirks.

We also believe that customizability is an important part of
our platform, and this should help making Maemo Leste more extensible.

See the `maemo.org wiki page on dbus-scripts
<https://wiki.maemo.org/DbusScripts>`_ for more information, and `bug #405
<https://github.com/maemo-leste/bugtracker/issues/405>`_ for some background.

Here is an example dbus-scripts rule:

https://github.com/maemo-leste/hildon-desktop-rotation-support/blob/maemo/beowulf-devel/scripts/etc/dbus-scripts.d/rotate-ts

And the command that the example script invokes:

https://github.com/maemo-leste/hildon-desktop-rotation-support/blob/maemo/beowulf-devel/scripts/usr/bin/hildon-desktop-rotate-touchscreen.sh


Qt5
----

The Qt5 port is in a usable enough state that it is currently available in the
main repositories; some of the users might even already have it on their devices!

The main features:

* (Mostly) compatible theme/style with Fremantle;
* Most Maemo widgets are available;
* Maemo-style title-bar spinners to indicate progress;
* Maemo-style menus work;
* Maemo-style stacked windows work;
* Maemo-style orientation changes work

Missing features:

* Virtual keyboard integration;
* Some widgets;
* Better APIs/examples for kinetic scrolling for widgets;
* maemo-launcher caching

The Python package ``PyQt5`` should also work.

Porting packages from Qt4 to Qt5 is straightforward, and looking at the
commit history of these repositories might help those who would like to attempt
ports:

* https://github.com/maemo-leste-extras/dorian/commits/master
* https://github.com/maemo-leste/clock-ui/commits/master
* https://github.com/maemo-leste/qalendar/commits/master
* https://github.com/maemo-leste/osso-calculator/commits/master


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

Some elements might not be finger-scrollable yet, but otherwise there are no
known bugs.


Synchronisation
~~~~~~~~~~~~~~~

The calendar application can be synchronized to various calendar backends using
`syncevolution`, see also https://wiki.maemo.org/Sync.
Building the latest syncevolution for Maemo Leste `revealed bugs
in calendar-backend which code only ever worked on 32-bit architecture
<https://github.com/maemo-leste/calendar-backend/commit/c6e9ef0db493118d44a2958f71180ac70609b071>`_.
Further details can be found `on this syncevolution email thread <https://lists.syncevolution.org/hyperkitty/list/syncevolution@syncevolution.org/thread/ELDL7L37GJHD67OTJWVENURITZ4FV6DL/>`_.
With that solved, synchronization now works, and you can read about it
on `our Calendar wiki page <https://leste.maemo.org/Calendar>`_.
There is also a custom GUI written for Maemo to schedule sychronization at set times called `syncevolution-frontend
<https://github.com/maemo-leste-extras/syncevolution-frontend>`_.
`The home widget has also been ported
<https://github.com/maemo-leste-extras/cal-home-widget>`_, showing the upcoming
events and current tasks:

.. image:: /images/leste-calendar-widget.png
  :height: 343px
  :width: 572px

**We could use someone's help to write a Dockerfile for syncevolution to
automatically test the Maemo backend**,
`see bug #492 <https://github.com/maemo-leste/bugtracker/issues/492>`_.


applet-datetime
---------------

An applet for datetime was implemented, and parts reverse-engineered.
`hildon-time-zone-chooser <https://github.com/maemo-leste/hildon-time-zone-chooser>`_
features a pannable map of the world, along with a button in its EditToolbar to
allow you to input the name of a city directly. This is used for timezone
selection in the settings menu, but can also be used separately by any other
application that needs it.

The datetime applet itself allows the user to set the time, date, and timezone, and
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

An initial Qt5 port of `clock-ui <https://github.com/maemo-leste/clock-ui>`_ has
been finished: this allows changing the time, timezones and manage alarms.

For this compoment, the qt gconf library `libgq-gconf
<https://github.com/maemo-leste/libgq-gconf>`_ has also been ported.

The software is a core component and is now packaged, but some bugs remain.
We'll pick those up in the coming days and weeks.

.. image:: /images/clock-ui-1.png
  :height: 360px
  :width: 600px

.. image:: /images/clock-ui-2.png
  :height: 360px
  :width: 600px

.. image:: /images/clock-ui-3.png
  :height: 360px
  :width: 600px

.. image:: /images/clock-ui-4.png
  :height: 360px
  :width: 600px

alarmd
------

Alarmd, the alarm daemon received a `runtime fix <https://github.com/maemo-leste/alarmd/pull/1>`_
and an `initscript dependency fix
<https://github.com/maemo-leste/alarmd/commit/e7b77f2e912bb71cd879ba17a4bf0d24c13ba06f>`_.

The `python-alarm <https://github.com/maemo-leste/bugtracker/issues/468>`_
package is now also packaged, so this kind of code should work::

    >>> alarm.query_event(1501725750.729786, time.time(), 0, 0, '')
    [15, 17, 18, 19, 20]
    >>> alarm.get_event(15).appid
    'worldclock_alarmd_id'


The alarmd and clockd initscripts were ported to OpenRC, so there
are no more insserv/OpenRC runlevel warnings when running apt upgrade/install.

Integration of Debian packages
------------------------------

The Hildon menu, where we can see all installed applications that have
.desktop entries was expanded with a `submenu
<https://github.com/maemo-leste/hildon-desktop/commit/604d1167860d5750fffe097de121bd7a3e2885f7>`_
that now also shows all "non-hildonized" packages which come from upstream. These
can be found in the "Debian" submenu by touching the Debian icon.

.. image:: /images/debian-menu-1.png
  :height: 324px
  :width: 576px

.. image:: /images/debian-menu-2.png
  :height: 324px
  :width: 576px


osso-calculator
---------------

The Qt calculator `osso-calculator
<https://github.com/maemo-leste/osso-calculator>`_ has been packaged and ported
to Qt5, along with its backend, `osso-calculator-engine
<https://github.com/maemo-leste/osso-calculator-engine>`_.

.. image:: /images/osso-calculator.png
  :height: 324px
  :width: 576px


dorian
------

Dorian, an epub reader from Maemo Fremantle has also been ported, and works
quite well, including portrait mode. Scrolling is quite smooth, especially in
fullscreen mode.

.. image:: /images/dorian-1.png
  :height: 324px
  :width: 576px

.. image:: /images/dorian-2.png
  :height: 324px
  :width: 576px

.. image:: /images/dorian-3.png
  :height: 324px
  :width: 576px

Relevant repositories, issues and feature requests:

* https://github.com/maemo-leste-extras/dorian
* https://github.com/maemo-leste/bugtracker/issues/440

User ``pere`` has also been very helpful, submitting many pull requests:

* https://github.com/maemo-leste-extras/dorian/pull/4
* https://github.com/maemo-leste-extras/dorian/pull/5
* https://github.com/maemo-leste-extras/dorian/pull/6
* https://github.com/maemo-leste-extras/dorian/pull/13
* https://github.com/maemo-leste-extras/dorian/pull/14
* https://github.com/maemo-leste-extras/dorian/pull/15
* https://github.com/maemo-leste-extras/dorian/pull/16


profilesx
---------

For managing sound profiles, like ringing/vibrating on notifications and phone
calls, we have ported and packaged the open source `profilesx
<https://github.com/maemo-leste-extras/profilesx>`_ application that was also
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

We `implemented <https://github.com/maemo-leste/hildon-desktop/pull/9>`_ proper
support (and fallbacks) in hildon-desktop that allow us to start .desktop
entries that have ``Terminal=true`` set and are supposed to open a terminal and
run the specific command. Now programs like ``htop`` can be run by touching the
icon in the menu, or you could even write your own scripts and run them like
this! For example, ``Evil_Bob`` has his sfeed_curses running from desktop:

.. raw:: html

    <video controls height="324px" width="576px">
    <source src="/images/droid4-sfeed_curses.webm" type="video/webm">
    </video>


Snap to desktop
~~~~~~~~~~~~~~~

We have decreased the accuracy of 'snap to desktop' to make it easier to align
icons on the home screen; previously it would be quite tedious to get them
aligned. The time is takes to show a loading preview screen for an application
was also decreased. See `hildon-desktop PR #6
<https://github.com/maemo-leste/hildon-desktop/pull/6>`_


Orientation-lock Applet
----------------------

The orientation lock applet previously installed into the wrong path, causing it to not
show up. This has been fixed, see `issue #419 <https://github.com/maemo-leste/bugtracker/issues/419>`_.


liblocation and location-control
--------------------------------

`liblocation <https://github.com/maemo-leste/liblocation/>`_,
`location-control <https://github.com/maemo-leste/location-control/>`_,
`location-daemon <https://github.com/maemo-leste/location-daemon/>`_, and a few
other pieces of software comprise the GPS/Location stack on Maemo. We have
successfully reverse-engineered these binaries from Fremantle and work is well
underway on integrating them in the Maemo Leste userspace. Using liblocation, we
can talk to our location-daemon and retrieve the current location info and
provide it to applications like `maep <https://github.com/maemo-leste-extras/maep>`_ 
that use liblocation as their backend. location-daemon serves as a central point
of gps information on Maemo Leste, and it serves its info over the D-Bus Message
API. Internally, location-daemon talks to gpsd using its internal libgps
library. With this, programs using liblocation can simply gather info from dbus
so you can integrate this gps information into your application.

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

Work on the status applet and an improved D-Bus interface is still under way.
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

There have been a lot of MCE changes, ``uvos`` has done tremendous work and we
will try our best to list all the changes here.

New modules:

* ``iio-als``: This module allows for dynamically adjusting the screen
  brightness and keyboard led brightness based on the ambient light (and the
  brightness profile); see `MCE PR #14.
  <https://github.com/maemo-leste/mce/pull/14>`_ and `MCE PR #15
  <https://github.com/maemo-leste/mce/pull/15>`_.

* ``led-sw`` + ``led-dbus``: This module supports simple LED patterns for devices that do not (yet) have support for programming LEDs through a dedicated chip. This way we can show notification patterns even if a dedicated chip is not available. Currently in use on the Droid 4 and PinePhone. See `MCE PR #22 <https://github.com/maemo-leste/mce/pull/22>`_.

* ``x11-ctrl``: Some of the X11 specific code moved to its own module. See `MCE
  PR #21 <https://github.com/maemo-leste/mce/pull/21>`_.

Refactoring and fixes:

* ``mce.ini.d`` support. This splits up the MCE configuration into a core
  configuration, device specific configuration, and user (customisable)
  configuration. See `MCE PR #18 <https://github.com/maemo-leste/mce/pull/18>`_,
  `MCE PR #42 <https://github.com/maemo-leste/mce/pull/42>`_, `leste-config PR
  #5 <https://github.com/maemo-leste/leste-config/pull/5>`_ and `leste-config PR
  #6 <https://github.com/maemo-leste/leste-config/pull/6>`_.
* Display inactivity refactoring, see `MCE PR #16 <https://github.com/maemo-leste/mce/pull/16>`_.
* Some evdev vibration fixes, see `MCE PR #19 <https://github.com/maemo-leste/mce/pull/19>`_.

* Removal of ``mce-hal``, see `PR #20 <https://github.com/maemo-leste/mce/pull/20>`_.

Additionally, `iio-sensor-proxy is now packaged
<https://github.com/maemo-leste/bugtracker/issues/429>`_ since MCE relies on it.


openmediaplayer
---------------

Open Media Player is a clone of the Maemo Fremantle media player, and with the
Qt 5 port we've been making progress on bringing it to Maemo Leste `in issue #25
<https://github.com/maemo-leste/bugtracker/issues/25>`_.

Currently the application builds with Qt5 and shows the main window and
settings, but playlists do not yet render.

**If anyone feels like helping out, it would be much appreciated!**

.. image:: /images/omp-initial-1.png
  :height: 385px
  :width: 716px

.. image:: /images/omp-initial-2.png
  :height: 385px
  :width: 716px


Address book, contacts and account libraries
----------------------------------------------

Particularly exciting is the fact that ``freemangordon`` has been working on
bringing the Hildon address book framework (libraries and user interfaces) to
Maemo Leste. This will allow telepathy and evolution to see and modify the
contact lists.

The work is still not finished, but it's quite close.
The current work is packaged, but not yet in the repositories.

.. image:: /images/VirtualBox_leste-beowulf_17_09_2020_15_06_07.png
  :height: 358px
  :width: 645px


Rotation support
----------------

Orientation and rotation support is now supported natively. Using the hardware
accelerometers, mce, and iio-sensors we are able to physically rotate our
devices and have the orientation change depending on the 3D position. Obviously,
this means portrait and landscape orientation can be switched simply by
positioning the device in its respective position. As we're using native kernel
interfaces and according userspace, this is supported on all our phones which
have working accelerometers.

The package `hildon-desktop-rotation-support
<https://github.com/maemo-leste/hildon-desktop-rotation-support>`_ implements
this feature using `dbus-scripts`_ and the ``xrandr`` and ``xinput`` utilities.

On the Nokia N900 this is not yet enabled, due to the rotation crashing the
display server still. This will likely be resolved in an upcoming update to the
latest PowerVR driver.


UPower history
--------------

Our devices now keep UPower history for more than 7 days, which was a hardcoded
limit in UPower. We have changed this to 30 days now, to allow for power usage
analytics going back further in time. See `issue #421 <https://github.com/maemo-leste/bugtracker/issues/421>`_

.. * https://wizzup.org/droid4-powerapplet.png + https://wizzup.org/droid4-upower-graph.png
..   + -avg

Pulseaudio
----------

The audio stack uses `Pulseaudio
<https://github.com/maemo-leste/bugtracker/issues/402>`_, as this will be
necessary for further work on phone calls due to UCM and profiles. Pulseaudio
seamlessly integrates and is configured for all our targets. The base
configurations reside in our `maemo-audio
<https://github.com/maemo-leste/maemo-audio>`_ package and they're pulled in by
our main metapackages, so a simple upgrade will configure everything as
necessary.

For `Droid4, Bionic <https://github.com/maemo-leste/leste-config/pull/13/>`_,
and `Pinephone
<https://github.com/maemo-leste/leste-config/commit/9693ab7dfff0b7068e2bbaa187a7f9af0ec229f6>`_,
we already have UCM2 files in place and we will be utilizing these with our
further efforts related to audio and phone calls.

With the UCM files in place, ``pavucontrol-qt`` will show the proper controls and
outputs - for multimedia (Hi Fi) and phone.

.. image:: /images/pavucontrol-qt.png
  :height: 324px
  :width: 576px

.. image:: /images/pavucontrol-qt2.png
  :height: 324px
  :width: 576px

Huge thanks for ``uvos`` for creating the UCM2 files for the Droid 4!


Hardware & Drivers
==================

Motorola Droid Bionic
---------------------

Maemo Leste now supports another device - the `Motorola Droid Bionic
<https://leste.maemo.org/Motorola_Droid_Bionic>`_!

``uvos`` contributed this post and also created `bionic-clown-boot
<https://github.com/IMbackK/bionic-clown-boot>`_ to allow booting non-Android
kernels. Kernel patches are already being upstreamed.

The Bionic was one of the `best selling smartphones in 2011
<https://en.wikipedia.org/wiki/List_of_best-selling_mobile_phones#2011>`_,
selling 13 million units that year. That is great news, because that means they
should be relatively easy to source.

The Bionic is pretty similar to the Droid 4 in hardware but does not have a
physical keyboard.

Motorola Droid 4
----------------

On mainline
~~~~~~~~~~~

We have been following upstream kernels very closely with the Droid 4 (and now
also Bionic), usually jumping to the newest kernel on the day of its release, at
least in our ``beowulf-devel`` repository. This is great, because we find bugs
early, but it also means we deal with bugs every few weeks. Linux 5.9 had been
particularly painful with random resets, which we ultimately seem to have fixed
(big thanks to ``tmlind`` and ``uvos``), but then 5.10 introduced similar
problems, which as of yesterday also seem to be fixed. But it serves as a
reminder that having mainline support for a device is not something you do once:
it requires active maintenance.

Additionally, the `Droid 4 RTC has seen some fixes
<https://lkml.org/lkml/2020/6/29/1404>`_ and more work is pending to be
mainlined. Some of that work can be seen here:
https://github.com/tmlind/linux/commits/droid4-pending-v5.10

Modem power management
~~~~~~~~~~~~~~~~~~~~~~

This week we will also merge a power management improvement for the Droid 4 with
the modem on, to disable signal strength notifications when the screen is off.
These notifications cause a lot of wake ups, so we don't want to receive them
when we don't need them. We can fix this with `dbus-scripts`_::

    # cat /etc/dbus-scripts.d/idle-modem
    /root/test.sh * * com.nokia.mce.signal display_status_ind
    # cat /root/test.sh
    #!/bin/sh

    if [ "$5" = "on" ]
    then
        printf 'U1234AT+SCRN=1\r' > /dev/gsmtty1
    else
        printf 'U1234AT+SCRN=0\r' > /dev/gsmtty1
    fi

SD card speed
~~~~~~~~~~~~~

``uvos`` tried to use a much higher clocking frequency (100Mhz) than standard
with a UHS-3 sd card and managed to get a `41.4MB/s` sd card write speed. We'll
have to investigate if this work is something we can use in our kernels.


Nokia N900
----------

u-boot and serial
~~~~~~~~~~~~~~~~~

``Pali`` has been doing a lot of work on mainline u-boot on the Nokia N900 again,
and it has paid off. Now u-boot boots again (yes, it wasn't booting anymore!)
and usbtty (serial communication over usb) now works. This might allow
for scripted booting of the Nokia N900.

The new u-boot binary can be found here:

    https://maedevu.maemo.org/images/n900/tools/

with filename ``u-boot-2020.12-pali.bin``.

If you flash this to your device with 0xFFFF and boot with the keyboard open and
USB cable connected, you should see something similar to this in ``dmesg``::

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

One of the more exciting things is that ``freemangordon``, ``uvos`` and
``tmlind`` have been able to get the latest PowerVR DDK 1.17 to run on both
the Nokia N900 and the Motorola Droid 4. The work entails not just the kernel
side and kernel display driver side, but also the Xorg side: having to bang
X11 ``Glamor`` and ``xf86-video-modesetting`` into shape to conform more closely
to the OpenGL(ES) specifications, and fix various bugs. ``freemangordon`` is
also working on a shim library to expose graphics drivers that support GBM
platform display to X11, even if the drivers lack the specific X11 windowing
system, which could potentially benefit other drivers that are no longer
providing drivers for X11. The shim requires the DRI3 and PRESENT support from
X11.

One of the problems here is that it looks like X11 is left without maintainers:
there are many pending pull requests that contain fixes, and they're mostly just
being ignored. Unfortunately, that includes some pull requests we have sent in, so
we have had no choice but to fork X11 for now and package our own versions.

That said, this driver work would also bring the Nokia N900 back to Linux 5.10
or 5.11, which is great news, as that would likely also benefit the long-awaited
``OFF`` mode for the phone (debugging issues on older kernels is no fun),
bringing much better power management.


Corruption
~~~~~~~~~~

``uvos`` also found that the PowerVR SGX driver on the Motorola Droid 4 ran at a
much lower clock frequency than it should, which sometimes causes the result
to be rendered too late to the display, resulting in the artifacts that we have
gotten used to. With the GPU at the right frequency, the rendering artifacts are
gone, and the 3D is smoother than ever before.

Pinephone and Pinetab
---------------------

The Pinephone and Pinetab devices are moving forward as well. Along with the
already mentioned working things, most things you'd expect work on the Pine64
devices. We have also implemented the `crust firmware
<https://github.com/crust-firmware/crust>`_ in our images so power usage is
minimal when the devices are suspended!

As Maemo Leste is envisioned as an operating system to mainly be used on devices
with a hardware keyboard, you can imagine our excitement when Pine64 announced
they are looking into a hardware keyboard `addon
<https://www.pine64.org/2020/07/29/invitation-to-play-along/>`_ for the
Pinephone. We'll be following this development, and hope for it to continue
successfully :)


Continuous Integration for device images
----------------------------------------

On our Jenkins infrastructure, we have been successfully running `weekly builds
<https://phoenix.maemo.org/view/Images/>`_ for all our device targets. This is a
great advantage as we don't have to manually build images whenever we find the
free time to do it, but rather have fresh images be built every week so everyone
can always download latest images with the most up to date packages installed.

This has also encouraged us to improve our image building `software
<https://github.com/parazyd/libdevuansdk>`_, clean it up, and make it more
efficient and generally just better.

At some point in the future, we also plan to look into automated testing of
these images, because a successful build doesn't necessarily mean a perfectly
working image. More later ;)


Closing words
=============

It's been a pretty good year for our project. A lot more core pieces are falling
into place, we are attracting more contributors and things are becoming more
stable and featureful. The project has received some funding which we have been
using to ship devices to folks who want to help out.

It's been almost three years since the announcement of our project, and well over three
years since we started working on Maemo Leste. And we have come far, and we will
keep pushing until we have the secure, open, extendable and customizable mobile
operating system that we envision. Built by the community, for the community.


Ecosystem & Community
---------------------

Our community keeps growing, our ecosystem expanding, but there is a lot to wish
for too: more regular updates, a better structure for our wiki and an easier way
for users to contribute.

Readers not familiar with this `Maemo Leste Playground thread
<https://talk.maemo.org/showthread.php?t=101089&page=5>`_ might like to take a
peek at some of the work our community has been doing to make various programs
and games run on Maemo Leste.

The `Fremantle Maemo.org theme
<http://maemo.org/downloads/product/Maemo5/maemo-org/>`_ is now `also available
in Maemo Leste <https://github.com/maemo-leste-extras/hildon-theme-maemo-org>`_,
and we might switch to using that (community developed) theme by default.

.. We would have thought that our settings applications would contain so many
.. applets?
.. 
.. .. image:: /images/control-panel-filling-up.png
..   :height: 576px
..   :width: 324px
.. 
.. Or that multi tasking on the Droid 4 would work so well?
.. 
.. .. image:: /images/leste-multi-tasking.png
..   :height: 576px
..   :width: 324px


Phone aspect
------------

The OS might look barebones now, but there is a lot to look forward to
when we land some of the final missing pieces: contacts, text communications
and phone calls.

Lacking phone calls might seem ridiculous to some, **but there are many aspects
that matter about a mobile operating system**, and working phone calls without
any sense of power management or audio policy modules to automatically switch
from/to headset and speakers also make a device hardly usable. We are now at the
point where the Motorola Droid 4 lasts for several days on a battery while it
is connected to the mobile network, performs quite well, almost all the hardware
components work the way they should, and we have a strong (and expanding, to
other devices) base to build our phone OS upon.

Contacts, phone calls and text-conversations will be the main focus for us going
into 2021. We will aim to mimic Fremantle where it makes sense: providing a
unified conversations experience, regardless of the instant messaging protocol
(leveraging telepathy and libpurple), combined with a featureful phone
application.


.. SORTME
.. ======

.. * https://wizzup.org/update-notification-1.png
..   https://wizzup.org/update-notification-2.png
..   https://wizzup.org/update-notification-3.png
..   https://wizzup.org/update-notification-4.png
..   https://wizzup.org/update-notification-5.png
..   https://wizzup.org/update-notification-6.png
..   https://wizzup.org/update-notification-7.png

.. * https://github.com/maemo-leste/bugtracker/issues/41 - screen calib applet
.. * mpd with GMPC works nice (make some screenshots), also fullscreen mode is cool


.. * https://github.com/maemo-leste/bugtracker/issues/390#issuecomment-657268449 -
..   progress on call ui libs

.. * "Re: [maemo-leste] WIFI tethering"

.. * https://github.com/maemo-leste/osso-systemui-tklock/pull/2

.. * 17:44 <parazyd> https://github.com/maemo-leste/bugtracker/issues/447 -> "no more apt warnings about runlevels"



Interested?
===========

If you have questions, are interested in specifics, or helping out, or wish to
have a specific package ported, please see our bugtracker.

**We have several Nokia N900 and Motorola Droid 4 and Bionic units available to
interested developers**, so if you are interested in helping out but have
trouble acquiring a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
