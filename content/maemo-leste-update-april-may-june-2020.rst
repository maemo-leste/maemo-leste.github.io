Maemo Leste - Thirteenth Update (April) 2020
############################################

:Category: news
:tags: droid4, n900, pinephone, cellular, extras, light sensor, power
       management, ofono, openrc, keyboard layout, vibration, cellular data
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-03-25 19:00

.. TODO DATE

It's been several weeks since our `last update
<{filename}/maemo-leste-update-february-and-march-2020.rst>`_, and let's start
with a few highlights:

* We have improved power management on the Droid 4, and under current ideal
  conditions, the power draw is about 60mW, with the modem turned on. That
  should last a few days on a decent battery.
* Various sensors and other hardware of the Motorola Droid 4 is now usable with
  Maemo Leste
* A lot of kernel bugs/regressions have been chased and fixed.
* Cellular support is improving, cellular data should now work
* Maemo Leste Extras should contain quite a few more packages now
* ``leste-config-*`` packages now exist to provide seamless configuration updates
  and changes, so there should be less of a need to "reinstall" on every new
  image release.



Software changes
================


mce
---

The Mode Control Entity has seen significant changes.

MCE will now properly blank the screen, allowing the SoC to idle properly which
in turns allows for for significant power saving (`see issue #338 <https://github.com/maemo-leste/bugtracker/issues/338>`_, `MCE PR 5 <https://github.com/maemo-leste/mce/pull/5>`_).

With the newer versions, the touchscreen will also be properly disabled when the
device is locked, this will prevent 'accidental' input events being sent to the
applications while the device is locked. MCE will also close the file
descriptors of any touchscreen devices to let the touchscreen driver idle
properly. For more details, see `issue #340 <https://github.com/maemo-leste/bugtracker/issues/340>`_, `MCE PR 6 <https://github.com/maemo-leste/mce/pull/6>`_ and `MCE PR 7 <https://github.com/maemo-leste/mce/pull/7>`_.

Furthermore, we've made a change to the default `/etc/mce/mce.ini` configuration
file, to prevent accidental shutdowns on the Droid 4. We've `increased the time
one has to press the power key to shutdown the device (issue #392)
<https://github.com/maemo-leste/bugtracker/issues/392>`_.

A module contributed by `uvos`, to support vibration on MCE, is also expected to
land in the next few days. See `issue #132
<https://github.com/maemo-leste/bugtracker/issues/132>`_ and `MCE PR 9
<https://github.com/maemo-leste/mce/pull/9>`_.

Something else to look forward to is the execution of mode-change shell scripts,
to allow certain programs or scripts to be executed when a device is locked,
unlocked, or enters some other mce (sub)modes.

Input and Focus fixes
---------------------

libmatchbox2 and hildon-desktop (the Maemo window manager) has had `long standing
bugs with regards to input focus
<https://bugs.maemo.org/show_bug.cgi?id=5987>`_, which was also making it
`impossible to send keyboard events to vanilla Qt 5 applications
<https://github.com/maemo-leste/bugtracker/issues/346>`_.

`freemangordon` and `uvos` have been trying to get to the bottom of the problem.
The result of that effort is that all known problematic input and focus issues
are now fixed. xev happily receives events, es2gears responds to keyboard input
events now, and Qt5 applications take input they way they are supposed to, now.

Relevant pull requests:

* `libmatchbox PR 3 <https://github.com/maemo-leste/libmatchbox2/pull/3>`_
* `libmatchbox PR4 <https://github.com/maemo-leste/libmatchbox2/pull/4>`_
* `hildon-desktop PR 4 <https://github.com/maemo-leste/hildon-desktop/pull/4>`_


Qt 5: Progress is being made
----------------------------

The Maemo Qt 5 port is not finished yet, but has seen various improvements.
`Wizzup` has been doing work porting the "Hildon Input Method" virtual keyboard
patches to Qt 5. Due to the more clear architecture of Qt 5, and our
unwillingness to fork Qt 5 as a whole, and the fact that we're also porting from
old `Xlib` code to `xcb`, the work is taking a little bit more
time, but on the upside, all the Maemo Qt 5 bits will hopefully available via a
`Qt 5 loadable platform module <https://doc.qt.io/qt-5/qpa.html>`_.

Apart from the virtual keyboard, there are at least two important pieces
missing:

* QMenu support, to allow hildon-style menu items to show when the application
  title is touched/pressed.
* Hildon-style stacked windows.


We've also ported over a sample application, `countdowntimer
<https://github.com/maemo-leste-extras/countdowntimer>`_:

.. image:: /images/countdowntimer.png
  :height: 324px
  :width: 576px

To make it usable, we had to have the application respect desktop sizes other
than the `800x480` that the Nokia N900 screen supports, to prevent it from
looking like this:

.. image:: /images/leste-qt5-countdowntimer-0.1.png
  :height: 324px
  :width: 576px


Countdowntimer itself also makes use of the specialised QMenu and Hildon
stackable windows, but is already quite usable even without those modifications.

Developing can be done directly on the VM, using X11 forwarding:

.. image:: /images/leste-qt5-designer-x11-forward.png
  :height: 324px
  :width: 576px

You can also use Qt Designer with the native Maemo theme, but, well...:

.. image:: /images/leste-designer-lol.png
  :height: 324px
  :width: 576px

If you plan to use Qt designer on your device, you might want to look at `Xephyr
(Nested Xorg server) on Maemo`_ instead.

In the next month, we hope to mostly finish the Qt5 port. Keep in mind that many
Qt 5 applications are already usable on Maemo as is, also documented in
`Community showcase`_!



Xephyr (Nested Xorg server) on Maemo
------------------------------------

Xephyr is a nested X server, which can run in a window on Maemo Leste, allowing
to run any ordinary desktop application on Maemo Leste, in a window. Installing
it is as simple as::

    sudo apt install xephyr

And then start it as follows::

    Xephyr :1 &

And launch applications inside that server like so::

    DISPLAY=:1 dwm &
    DISPLAY=:1 xterm

.. image:: /images/xephyr-droid4.png
  :height: 324px
  :width: 576px


Enjoy!


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

Wireless is mostly just working, although the UI still has some rough edges. In
particular, sometimes connection to a network fails if entering the password
takes too long.

One other bug was fixed: a problem where the networks could appear in the
network dialog, but would not be selectable until the next scan returned, which
was really annoying. See `issue #253
<https://github.com/maemo-leste/bugtracker/issues/253>`_ and `connui-internet PR
<https://github.com/maemo-leste/connui-internet/pull/1>`_.


Themes
------

More beautiful user interface themes are available in our ``extras`` repository:

* https://github.com/maemo-leste-extras/miku-theme
* https://github.com/maemo-leste-extras/hildon-theme-matrix

https://parazyd.org/pub/tmp/screenshots/screenshot00140.png
https://parazyd.org/pub/tmp/screenshots/screenshot00141.png
https://parazyd.org/pub/tmp/screenshots/screenshot00142.png
https://parazyd.org/pub/tmp/screenshots/screenshot00143.png
https://parazyd.org/pub/tmp/screenshots/screenshot00144.png




OpenRC integration in Debian fixes
----------------------------------

We've successfully submitted a patch to SysVinit upstream which brings in better
support for OpenRC and its internals on both Debian and Devuan. It has not yet
propagated to Debian, but it is expected to happen, of course. In Maemo Leste we
already provide the patched version and maintain it ourselves until it is
available in Devuan. The patch itself brings in proper OpenRC support in the
insserv tool, which means that LSB headers aren't necessary for OpenRC
initscripts and they now get installed in the default runlevel without the need
for manual interference.

The patch was merged in ``6a65f4412a2d24d78741f49e64e1128993341e65``, and can be
seen here:

* http://git.savannah.nongnu.org/cgit/sysvinit/insserv.git/commit/?h=1.22.0&id=6a65f4412a2d24d78741f49e64e1128993341e65


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

The addressbook interface is also underway and is being RE'd from the Fremantle
binaries: https://github.com/maemo-leste/osso-abook/


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


Pinephone
---------

Thanks to work from people in postmarketOS, we now also support the modem in the
Pinephone. While we've mostly been working with cellular things on the Droid4,
lots of can simply be reused on the Pinephone, and we plan to do so in the
coming time. A package called ``pinephone-modem-config`` can be installed, and
along with updating the kernel (latest available version is 5.6), it will bring
in modem support. This is already automatically enabled in the latest images.


Weekly builds
=============

From July, we will also implement and enable weekly image builds on our CI
infrastructure. This means we won't be building images on demand anymore.
Instead they shall be built each week, containg all the latest packages and
goodies. Obviously, this will require more storage space, so we will be
distributing device images up to five weeks of age.

Hopefully this will also help us polish up our build frameworks and alert us
about possible bugs that arise during development. It is also a very important
step towards reproducible builds - which is one of our milestones we wish to
fulfill.


Community showcase
==================


* pascal, https://github.com/maemo-leste-extras/photolightmeter


* https://twitter.com/rfc1087/status/1271796014903635969


* https://imgur.com/a/SPGe9ZM -- ui screenshots by [redacted]
* https://imgur.com/a/t4yfBaI -- [redacted] proxmark3 ; notes https://paste.debian.net/plain/1149261


Maemo Leste Extras
==================

More community packages are being maintained in the ``extras`` repository and
we're very glad and excited about it. If you're interested in maintaing your own
community package for Maemo Leste, there are instructions for you to do so on
the `bugtracker <https://github.com/maemo-leste-extras/bugtracker>`_ .


Next up: Audio routing/Pulseaudio, Contacts, Calls/SMS, Qt5
===========================================================






Interested?
===========

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker`_

**We have several Nokia N900 and Motorola Droid 4 units available to interested
developers**, so if you are interested in helping out but have trouble acquiring
a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
