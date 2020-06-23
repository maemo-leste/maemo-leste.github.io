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
  conditions, the power draw is about ``60mW``, with the modem turned on. That
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
descriptors of any touchscreen devices and tell X11 to disable the touchscreens
to let the touchscreen driver idle properly. For more details, see `issue #340
<https://github.com/maemo-leste/bugtracker/issues/340>`_, `MCE PR 6
<https://github.com/maemo-leste/mce/pull/6>`_ and `MCE PR 7
<https://github.com/maemo-leste/mce/pull/7>`_.

Furthermore, we've made a change to the default ``/etc/mce/mce.ini`` configuration
file, to prevent accidental shutdowns on the Droid 4. We've `increased the time
one has to press the power key to shutdown the device (issue #392)
<https://github.com/maemo-leste/bugtracker/issues/392>`_.

ALS (Ambient Light Sensor) support has been extended, now also works on the
`Motorola Droid 4`_, see `MCE PR 8
<https://github.com/maemo-leste/mce/pull/8/>`_.

A module contributed by ``uvos``, to support vibration on MCE, is also expected to
land in the next few days. See `issue #132
<https://github.com/maemo-leste/bugtracker/issues/132>`_ and `MCE PR 9
<https://github.com/maemo-leste/mce/pull/9>`_.

Something else to look forward to is the execution of mode-change shell scripts,
to allow certain programs or scripts to be executed when a device is locked,
unlocked, or enters some other mce (sub)modes.

Input and Focus fixes
---------------------

libmatchbox2 and hildon-desktop (the Maemo window manager) have had `long standing
bugs with regards to input focus
<https://bugs.maemo.org/show_bug.cgi?id=5987>`_, which was also making it
`impossible to send keyboard events to vanilla Qt 5 applications
<https://github.com/maemo-leste/bugtracker/issues/346>`_.

``freemangordon`` and ``uvos`` have been trying to get to the bottom of the problem.
The result of that effort is that all known problematic input and focus issues
are now fixed. xev happily receives events, es2gears responds to keyboard input
events now, and Qt 5 applications take input the way they are supposed to, now.

Relevant pull requests:

* `libmatchbox PR 3 <https://github.com/maemo-leste/libmatchbox2/pull/3>`_
* `libmatchbox PR 4 <https://github.com/maemo-leste/libmatchbox2/pull/4>`_
* `hildon-desktop PR 4 <https://github.com/maemo-leste/hildon-desktop/pull/4>`_


Qt 5: Progress is being made
----------------------------

The Maemo Qt 5 port is not finished yet, but has seen various improvements.
Merlijn has been doing work porting the "Hildon Input Method" virtual keyboard
patches to Qt 5. Due to the more clear architecture of Qt 5, and our
unwillingness to fork Qt 5 as a whole, and the fact that we're also porting from
old ``Xlib`` code to ``xcb``, the work is taking a little bit more
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

In the next month, we hope to mostly finish the Qt 5 port. Keep in mind that many
Qt 5 applications are already usable on Maemo as is, also documented in
`Community showcase`_!


Xephyr (Nested Xorg server) on Maemo
------------------------------------

Xephyr is a nested X server, which can run in a window on Maemo Leste, allowing
to run any ordinary desktop application on Maemo Leste, in a window.

It's especially useful for devices with physica keyboards.

Installing it is as simple as::

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

The ``beowulf-devel`` repository of Maemo Leste now has the
``libicd-network-ofono`` plugin for ``icd2`` to allow making GPRS/UMTS/LTE data
connections:

.. image:: /images/droid4-libicd-network-ofono.png
  :height: 324px
  :width: 576px

.. image:: /images/droid4-libicd-network-ofono-2.png
  :height: 324px
  :width: 576px

This should work on all of the supported devices, as long as their ofono version
(and SIM) supports data connections.

Additionally, there were some problems on Beowulf where user ``user`` had no
access to the ofono dbus interface, but this has been fixed in `issue #372
<https://github.com/maemo-leste/bugtracker/issues/372>`_.

Finally, once this work has seen a bit more testing, we will create a meta
package to automatically install all the cellular packages, and all the devices
will automatically get the cellular support when they ``apt update && apt
upgrade``.


Wireless
--------

Wireless is mostly just working, although the UI still has some rough edges. In
particular, sometimes connecting to a network fails if entering the password
takes too long.

One other bug was fixed: a problem where the networks could appear in the
network dialog, but would not be selectable until the next scan returned, which
was really annoying. See `issue #253
<https://github.com/maemo-leste/bugtracker/issues/253>`_ and `connui-internet PR
<https://github.com/maemo-leste/connui-internet/pull/1>`_.


* https://github.com/maemo-leste/bugtracker/issues/374 - two packages, also
  mention integration


Themes
------

The retro `Okuda theme
<https://github.com/maemo-leste-extras/hildon-theme-okuda>`_ is now available:

.. image:: /images/leste-okuda-desktop.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-okuda-vkb.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-okuda-xterm.png
  :height: 324px
  :width: 576px

`Miku theme <https://github.com/maemo-leste-extras/miku-theme>`_:

.. image:: /images/leste-miku-settings.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-miku-desktop.png
  :height: 324px
  :width: 576px


`Matrix theme <https://github.com/maemo-leste-extras/hildon-theme-matrix>`_:

.. image:: /images/leste-matrix-desktop.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-matrix-lock.png
  :height: 324px
  :width: 576px


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

If you found that some init scripts ended up in ``/etc/runlevels`` instead of
``/etc/runlevels/default``, try reinstalling the affected packages; they should
install fine now.


More languages added to virtual keyboard layouts
------------------------------------------------

Many more virtual keyboard layouts have been added. If you were ever in need of
a Belarusian or Bulgarian keyboard layout, now is your time to ``apt update &&
apt upgrade``.

See `hildon-input-method-plugins PR 2
<https://github.com/maemo-leste/hildon-input-method-plugins/pull/2>`_.


Steps towards calls and texts
-----------------------------

With `Cellular data and ofono support`_ improving and other projects getting
close to finished, it is soon time to turn out attention to usable calls and
texts on Maemo. We will use many of the same components that Maemo Fremantle
uses, just in their updated forms, like the Mer project does.

`Issue #390 <https://github.com/maemo-leste/bugtracker/issues/390>`_ documents
some of the steps will be taking. It will look something like:

1. Perform further analysis on how this works on Fremantle
2. Import all the FOSS components (there are quite some)
3. Figure out audio (routing and) policies.
4. Reimplement the non-FOSS ones: call and sms UI are the big ones.
5. Use ``osso-abook`` in the alternative call and sms UIs.

* towards proper telepathy integration https://github.com/maemo-leste/bugtracker/issues/390
* https://github.com/maemo-leste/rtcom-eventlogger-plugins
* https://github.com/maemo-leste/rtcom-eventlogger-ui

The addressbook interface is also underway and is being RE'd from the Fremantle
binaries: https://github.com/maemo-leste/osso-abook/


maemo-input-sounds
------------------

To test the MCE vibration driver, work has been started on `maemo-input-sounds
<https://github.com/maemo-leste/maemo-input-sounds/tree/wip>`_, which uses the
`X11 Record` extension to monitor for touchscreen presses and key presses in
reaction to those either vibrate the device, or play a sound, or even both.

The status can be tracked in `issue #389
<https://github.com/maemo-leste/bugtracker/issues/389>`_. A fully functioning
``maemo-input-sounds`` probably depends on getting the audio set up completely
(see `Next up: Audio routing/Pulseaudio, Contacts, Calls/SMS, Qt 5`_).


Calendar backend and frontend
-----------------------------

Some more work is being done to get the calendar software up and running.
The backend, ``calendar-backend`` is already building fine, but the frontend
(``qalendar``) is still blocking on the Qt 5 port:

* https://github.com/buzztiaan/calendar-backend
* https://github.com/buzztiaan/libgq
* https://github.com/buzztiaan/qalendar

We expect this to fold in rather quickly once ``osso-abook`` is mostly ready.


hildon-home fixes
-----------------

``hildon-home`` would frequently try to monitor non existing directories for
changes, but because the directories did not exist, kept retrying the monitor
calls. This resulted in significantly higher power usage. This has been fixed
now, see `issue #264 <https://github.com/maemo-leste/bugtracker/issues/264>`_
for more details.

Additionally, since our move to Beowulf, two plugins for ``hildon-home`` would
no longer load (due to ``hildon-home`` loading them from a non existing path),
but this too has been fixed now:

* https://github.com/maemo-leste/hildon-home/commit/13a8a03196a33e51396ceb61ce307d9655a4ea41
* https://github.com/maemo-leste/hildon-home/commit/a505d58a6ae87cb032ec20a606d54d69f3582fba


Device support
==============


Motorola Droid 4
----------------

The Motorola Droid 4 has seen a bit set of improvements:

* The `Ambient Light Sensor`_ is now used;
* The `Vibration Motor`_ is now used;
* A driver for the `Accelerometer`_ is available;
* Advanced `keyboard layout`_
* Basic `modem integration`_ in `beowulf-devel` branches;
* Much improved battery life through better `Power Management`_;

Ambient Light Sensor
~~~~~~~~~~~~~~~~~~~~

Just like the Nokia N900, the Droid has an ambient light sensor, used to measure
exactly that: ambient light levels. This can be used to adjust the screen
brightness to the ambient light levels, based on the brightness profile
selected. For observant users, this already worked on the Nokia N900, but now
this also works on the Droid 4.

This should make your device more pleasant to use in darker rooms, but also
outside - in direct sunlight.

Additionally, if the light level is low, the device is unlocked, and the
keyboard is exposed, the keyboard backlight LEDs will be turned on, to allow for
optimal typing in the dark. :-)

See `MCE PR 8`_.

Vibration Motor
~~~~~~~~~~~~~~~

Pending merging `MCE PR 9`_, the Motorola Droid 4 (and actually also the Nokia
N900, and other device that supports the Linux `FF
<https://www.kernel.org/doc/html/latest/input/ff.html>`_ interface).
This allows for vibration of the device to provide feedback to the user when the
touchscreen is touched, but also when (in the near future) a SMS is received, or
the device is being called.

See also these notes on Maemo.org `on how to start and stop vibrations
<https://wiki.maemo.org/Phone_control#Start_Vibrating_Incoming_Call>`_. Since we
are compatible at least on the DBUS level, the original Maemo instructions just
apply. It is also possible to add more patterns by editing ``/etc/mce/mce.ini``.


Accelerometer
~~~~~~~~~~~~~

The accelerometer driver is now turned on, meaning that things like the
`droidsaber <https://github.com/buzztiaan/droidsaber>`_ are now possible:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/DeCtO8WwaTc"
     ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>

This will also be useful in automatically changing the screen orientation, based
on the device orientation. The powervr driver might need a bit more work before
that will be working smoothly and well, though.


Power Management
~~~~~~~~~~~~~~~~

The power management on the Droid 4 should be in much better shape now. Under
ideal cirsumstances, with the modem online, the device should idle at about
``60mW``. This is made possible by incredible Linux kernel support, `droid4-pm
<https://github.com/maemo-leste/droid4-pm>`_, our various `mce`_ improvements,
and in general OMAP being well designed when it comes to power management. This
should last most batteries for several days. Things might improve a little more
if OMAP ``OFF`` mode ever starts to work on OMAP 4.

``Merlijn`` recently acquired a few lab power supplies (`and after actually making it
work with sigrok, working around insanely stupid firmware bugs
<https://sourceforge.net/p/sigrok/mailman/message/37014835/>`_), was able to
generate the following graph of power usage from a clean power-on, showing the
~3 minutes it takes to fully boot and enter the promised ``60mW`` idle power
usage:

.. image:: /images/droid4-boot.png
  :height: 350px
  :width: 700px


Here's what using the vibration motor does to the power draw:

.. image:: /images/droid4-rumble.png
  :height: 324px
  :width: 576px

And the same for receiving an SMS (exposing a problem where the modem doesn't
properly idle after sms receive - it stays around ``180mW`` as opposed to the
``60mW`` - this is still being investigated, but it looks like the USB doesn't
idle afterwards, requiring manually being kicked into idle mode):

.. image:: /images/droid4-modem-power-recv-sms.png
  :height: 324px
  :width: 576px


NTPD and power management
~~~~~~~~~~~~~~~~~~~~~~~~~


The ``ntp`` daemon currently causes a lot of wake ups, and negatively impacts
battery life. The current stop-gap is to stop it manually, after starting, by
issuing the following as root::

    /etc/init.d/ntp stop


Cellular and power management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While the modem itself should idle pretty well, the modem reports on the signal
strength very frequently, waking up the device even when the signal strength
should not be shown, the signal strength can be temporarily disabled like so::

    printf 'U1234AT+SCRN=0\r' > /dev/gsmtty1


Graphing power logs from the device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The GNOME Power Manager can plot upower data, and it runs on Leste:

.. image:: /images/leste-droid4-gnome-power-manager.png
  :height: 324px
  :width: 576px

But the upower data is located in ``/var/lib/upower`` and not at all hard to plot
yourself, which might actually be more insightful (although this graph is very
basic):

.. image:: /images/capacity_over_time_from_upower.png
  :height: 324px
  :width: 576px

We're still figuring out how to properly plot all this data, but more
information (including the source to generate the above graph) can be found in
`issue #396 <https://github.com/maemo-leste/bugtracker/issues/396>`_.

Maybe we can take `one of these maemo.org applications <http://maemo.org/downloads/search/application.html?org_openpsa_products_search%5B1%5D%5Bproperty%5D=title&org_openpsa_products_search%5B1%5D%5Bconstraint%5D=LIKE&org_openpsa_products_search%5B1%5D%5Bvalue%5D=battery&org_openpsa_products_search%5B2%5D%5Bproperty%5D=os&org_openpsa_products_search%5B2%5D%5Bconstraint%5D=LIKE&org_openpsa_products_search%5B2%5D%5Bvalue%5D=Maemo5&fetch=Search>`_ and port them.


Battery calibration
~~~~~~~~~~~~~~~~~~~

``uvos`` has written an init script and tool to store the battery capacity when
known, and restore it, using ``spinal84``'s experimental kernel patches, see
`issue #374 <https://github.com/maemo-leste/bugtracker/issues/374>`_.

It will be added to the Droid 4 meta package imminently, and then eventually
everyone should have a calibrated battery, hopefully.

Also see `upower PR 4 <https://github.com/maemo-leste/upower/pull/4>`_ for the
UPower fix that was required for this to work properly.


Keyboard layout
~~~~~~~~~~~~~~~

For a long time, it was not possible to `summon the special keys virtual keyboard
on the Droid 4 <https://github.com/maemo-leste/bugtracker/issues/347>`_, which
was particularly annoying since some `important keys were not available
<https://github.com/maemo-leste/bugtracker/issues/122>`_.

By digging through the N900 keyboard files and learning a bunch about xkb, both
of these issues have now been resolved by ``Merlijn``. ``buZz`` provided a nice
`geometry file
<https://github.com/maemo-leste/xkb-data/commit/99343d77464299cdf1d56e461018bd7f974cee42>`_, which allows us to visualise the keys on various keyboard levels:

.. image:: /images/droid4-keyboard.png
  :height: 224px
  :width: 576px

(Yes, the shift button on the Droid 4 is mapped to control, and the caps lock
key is mapped to shift)

Compare that to the N900 layout:

.. image:: /images/n900-keyboard.png
  :height: 224px
  :width: 576px

Bringing up the special keys virtual keyboard is done by pressing the "OK"
(``ISO_Level3_Shift``) key and the Control (``Shift``) key.

Additional extra keys are also available when using the ``ISO_Level3_Shift``
key, `see the actual xkb file for more details
<https://github.com/maemo-leste/xkb-data/commit/ccebc5ea6cc9c14c7822b53317640c8f2f6372b2#diff-5b7bd0a2cb0498ff38e4e466546d5fdcR36>`_.

And finally, the virtual keyboard didn't look quite good on the Droid 4, since
it has a larger resolution, but as of `hildon-input-method-plugins PR 3
<https://github.com/maemo-leste/hildon-input-method-plugins/pull/3>`_, the
keyboard will render properly regardless of the screen dimensions:

.. image:: /images/droid4-special-vkb.png
  :height: 324px
  :width: 576px

Modem integration
~~~~~~~~~~~~~~~~~

``tmlind`` and ``Pavel Machek`` have been doing a lot of work on improving ofono
on the Droid 4. The result of most of that work is currently packaged in the
``droid4`` component, so any droid 4 will automatically get the latest/best
ofono version. Additionally, the technology is now also being reported
properly:

.. image:: /images/droid4-tech.png
  :height: 324px
  :width: 576px


.. image:: /images/droid4-tech-2g.png
  :height: 324px
  :width: 576px


More work remains, including upstreaming ofono and dealing with some power
management regressions, but it's starting to look quite good indeed.

Current work can be found here:
https://github.com/maemo-leste/ofono-d4/tree/motmdm-serdev-ngsm


increasing font size in osso-xterm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On the Nokia N900, the font size in osso-xterm can be changed using the volume
buttons, but this doesn not work yet on the Droid 4. The reason is that
osso-xterm expects specific (hardcoded) keys to be used to change the font, and
the Droid 4 has different keys mapped to it's volume buttons, see `issue #385
<https://github.com/maemo-leste/bugtracker/issues/385>`_


Nokia N900
----------

Powermanagement update
~~~~~~~~~~~~~~~~~~~~~~

A while ago we tweeted out a photo of a Nokia N900 using very little power,
while in ``OMAP OFF`` mode. We haven't yet brought this to our latest images,
but it's still planned (it might be relatively simple, but also might be a lot
of work). In addition, we will likely provide a ``n900-pm`` script, similar to
the ``droid4-pm`` script.


Pinephone
---------

Thanks to the packaging work from people in postmarketOS, we now also support
the modem in the Pinephone. While we've mostly been working with cellular things
on the Droid4, lots of that work can simply be reused on the Pinephone, and we
plan to do so in the coming time. A package called ``pinephone-modem-config``
can be installed, and along with updating the kernel (latest available version
is 5.6), it will bring in modem support. This is already automatically enabled
in the latest images.


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


PS 1 emulator
-------------

PCSX-ReARMed runs quite nicely on the Droid 4:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/BmIAQby4ccM"
     ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>

Unfortunately, the community hasn't yet packaged the program for Maemo Leste
Extras, but we're confident someone will, at some point.


Photo Light meter
~~~~~~~~~~~~~~~~~

Written in Free Pascal, photolightmeter can be used calculate aperture and
shutter values.


Telegram
~~~~~~~~

If you're a fan of Telegram, the desktop client just works on Maemo Leste:

* https://twitter.com/rfc1087/status/1271796014903635969


Proxmark3
~~~~~~~~~

If you like toying with RFID cards, then you can (for example) use the bluetooth
module on the Droid 4 to connect a capable reader and run proxmark3 on the Droid
itself:

.. image:: /images/proxmark3-1.png
  :height: 324px
  :width: 576px


.. image:: /images/proxmark3-2.png
  :height: 324px
  :width: 576px


Quicknote
~~~~~~~~~

A simple notes application written in Python is also available:
https://github.com/maemo-leste-extras/quicknote


mihphoto
~~~~~~~~

A Qt 5 photo viewer is available, and optionally supports multitouch, when
supplied as startup argument:
https://github.com/maemo-leste-extras/mihphoto


personal-ip-address
~~~~~~~~~~~~~~~~~~~

The good old personal-ip-address has returned, this time to Leste:
https://github.com/maemo-leste-extras/personal-ip-address


Maemo Leste Extras
==================

More community packages are being maintained in the ``extras`` repository and
we're very glad and excited about it. If you're interested in maintaing your own
community package for Maemo Leste, there are instructions for you to do so on
the `bugtracker <https://github.com/maemo-leste-extras/bugtracker>`_ .


Next up: Audio routing/Pulseaudio, Contacts, Calls/SMS, Qt 5
============================================================

So what can you expect next from future updates?

The big things on our radar are still:

* Audio: Currently most devices do not even ship with ``pulseaudio``, but we'll probably want to start using it, and create ALSA UCM files for our soundcards, provide proper pulseaudio sink names, for call routing, and so on. This is also a prerequisite for the `volume applet <https://github.com/maemo-leste/maemo-statusmenu-volume>`_.
* Contacts (``osso-abook``), this will provide all of the Hildon contacts APIs
  with the evolution database as backend, definitely required for proper SMS and
  Call UI.
* Qt 5 updates: hopefully we will soon have the virtual keyboard integration
  ready, with the hildon menus and stacked windows following right after. That
  should be enough to make most applications work, and from there on we'll
  probably port things on an as-needed basis: like APIs for home and status
  widgets.
* Nokia's ``rtcom`` packages and telepathy. https://github.com/maemo-leste/bugtracker/issues/390
  Some of this is covered in `Steps towards calls and texts`_, but to reiterate:
  the plan is to use `telepathy-ring` as an interface to `ofono`, and use
  `rtcom-eventlogger` and other libraries to read from and log to the same
  database format as used on Fremantle.
  This approach is particularly exciting because it allows loading many other
  telepathy plugins. There also exists a `telepathy-haze
  <https://github.com/dylex/slack-libpurple/commits/master>`_ plugin to load
  (any) Pidgin (``libpurple``) plugin, allowing for potentially loading (for
  example) the `slack-libpurple <https://github.com/dylex/slack-libpurple>`_
  slack plugin into telepathy, and being able to directly
  interface with Slack using the native hildon UI, potentially even with
  contacts, too. And of course, there are also SIP plugins for telepathy,
  allowing for VOIP calls from the same (native) UI.
* Speaking of UIs, once the backend (rtcom) is mostly there, the last thing
  we'll have to do is to bring up the call and text UIs. The Fremantle SMS UI
  relied on a html rendering engine, `allow for cool customisations
  <https://wiki.maemo.org/Conversation_Mods>`_ like these:

  .. image:: /images/fun-conversations-mod.png
    :height: 256px
    :width: 432px


Web interface for packages
==========================

We're considering creating a web interface to browse the core maemo packages,
the development packages and also the extras packages, see `issue #395 <https://github.com/maemo-leste/bugtracker/issues/395>`_ for more details. And if you have suggestions, want to see specific features, or want to help out, please do let us know on the issue.

Sneak peak of an alpha version of the interface:

.. image:: /images/pkg.png


More frequent updates?
======================

We often get the question if we can provide update posts more frequently. Often,
we delay update posts because we want to **complete just one more package...** -
and then another, and another... So if you'd like to free more frequent update
posts, please volunteer to write them for us. If you hang out in the IRC
channel, maybe follow the frequent updates and write about them, and we'll be
able to post it here, on our website.

That said, we're considering doing detailed write-ups of various core components
of Maemo Leste every few weeks or so, so if that's your thing, you might be able
to peek at to those, soon.


Interested?
===========

If you have questions, are interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker`_

**We have several Nokia N900 and Motorola Droid 4 units available to interested
developers**, so if you are interested in helping out but have trouble acquiring
a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
