Maemo Leste - Fifteenth Update: January 2021
############################################

:Category: news
:tags: todo
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2021-10-28 00:00

The long overdue update is finally here, it's been a while since our `last
update
<{filename}/maemo-leste-update-december-2020.rst>`_.

Here are a few highlights:

* `sphone`_ call interface;
* `modest`_ (mail client);
* `GPS interfaces`_;
* support for `Tor, Wireguard and OpenVPN`_;
* many `mce`_ improvements;
* `Funding update`_;
* `Motorola Droid 3 (XT862)`_ port;
* `Audio support`_ progress;
* `addressbook`_ progress;
* our plan for sms and `conversations`_;


Funding update
==============

Since our `NGI funding announcement <{filename}/ngi-funding-april-2021.rst>`_
we've been working hard on finishing the milestones as proposed. The `Tor,
Wireguard and OpenVPN`_ integration is finished and available in the extras
repositories.

Following the successful completion of this milestone, the
`DAPSI <https://dapsi.ngi.eu>`_ project has let us know that Maemo Leste has
successfully moved into the second phase of the funding!

This is great news, and means that we will hopefully be able to deliver on the
next milestones of the funding soon, including:

* "Conversations" UI, using Telepathy to support various protocols (SMS, IRC,
  XMPP, Matrix, GNU Jami aka ring, Signal)
* Implementation of some of the above protocols in Telepathy
* Improve the Maemo sharing libraries


Core Software additions and changes
===================================

TODO


modest
------

modest, the Maemo mail client has be
<https://github.com/maemo-leste/bugtracker/issues/207>`_.
It relies on `tinymail <https://github.com/maemo-leste/tinymail>`_ and `gtkhtml3
<https://github.com/maemo-leste/gtkhtml3>`_.


We will later on port modest to a
newer HTML rendering framework.

.. image:: /images/modest-1.jpg
  :height: 324px
  :width: 576px

.. image:: /images/modest-2.jpg
  :height: 324px
  :width: 576px




GPS interfaces
--------------

We've been continuing our work on the GPS stack and liblocation, packaging
various GPS interfaces and fixings bugs as we find them.

Currently, there are at least four interfaces in our repositories, they've also
gotten their own pages on the wiki:

* https://leste.maemo.org/Extras/modrana (more info: https://wiki.maemo.org/ModRana)
* https://leste.maemo.org/Extras/maep
* https://leste.maemo.org/Extras/cloudgps
* https://leste.maemo.org/Extras/gpsrecorder

Exporting the GPS logs from gpsrecorder or maep also works fine, as we have
shared in `this cycling tweet
<https://twitter.com/maemoleste/status/1389277775664721923>`_.

Tor, Wireguard and OpenVPN
--------------------------

Tor
~~~

* https://leste.maemo.org/Tor
* https://github.com/maemo-leste/libicd-tor

.. image:: /images/tor-check.png
  :height: 324px
  :width: 576px


Wireguard
~~~~~~~~~

* https://leste.maemo.org/Wireguard
* https://github.com/maemo-leste/libicd-wireguard

.. image:: /images/wg-show.png
  :height: 324px
  :width: 576px


OpenVPN
~~~~~~~

* https://github.com/maemo-leste/libicd-openvpn

TODO

connui providers
~~~~~~~~~~~~~~~~

Maemo Fremantle supported a feature that wasn't really used much, which were the
`ICD2 service providers
<http://maemo.org/api_refs/5.0/5.0-final/icd2/group__icd__srv__provider.html>`_,
which are a way to add connection "plugins" to specific connections. The example
provided was a plugin to disable network logon pages and (automatically) deal
with those. We have extended this ICD2 implementation to support Tor, Wireguard
and OpenVPN.

Since there wasn't too much documentation how this integrated with the rest of
the system, we developed `libicd-provider-dummy
<https://github.com/maemo-leste/libicd-provider-dummy/>`_ to explore how the
rest of the system interacts with service providers. For example, service
providers can change the icon of the network in the status area, they can add
additional icons in the connection dialogs and network status, and also provide
customisation of the network names.

Below is an example of an IAP being configured to use Wireguard service
provider - this means it will always connect to Wireguard when connecting to the
IAP, and if connecting to Wireguard fails, the network connection will be
severed.

.. image:: /images/wireguard-provider.png
  :height: 324px
  :width: 576px


resolvconf
~~~~~~~~~~

Due to the way `wg-quick` from the Wireguard tools worked, we also had to
overhaul our DNS scripts. We initially imported them from Maemo Leste, but
recently upgraded them to use `resolvconf
<https://github.com/maemo-leste/libicd-network-ipv4/pull/3>`_ (issue `#583
<https://github.com/maemo-leste/bugtracker/issues/583>`_).


connui
------

Previously, the connection dialogs on Maemo Leste would malfunction if they
invoked programmatically (`#539
<https://github.com/maemo-leste/bugtracker/issues/539>`_), this problem has been
solved now.

mce
---

**uvos** has been consistently working on improving `mce` and a lot has changed:

* mce uses (about 400kB) less memory by using link time optimisations (LTO),
  `--dynamic-list` and a build system rewrite (`from plain Makefile to cmake
  <https://github.com/maemo-leste/mce/pull/50>`_).
  LTO is not in use on Leste yet, as it still causes some problems with upower
  and tklock.
* Proximity sensor module based on the `iio system <https://github.com/maemo-leste/mce/pull/17>`_
* Legacy display module is `dropped
  <https://github.com/maemo-leste/mce/pull/48>`_
* The `alarm` module is now loaded (`PR #46 <https://github.com/maemo-leste/mce/pull/46>`_)
* `rtconf <https://github.com/maemo-leste/mce/pull/49>`_ support has been added,
  allowing for using different backends, to make it easier to drop gconf
  support. Alternative backend types are `ini` files and `gsettings`.
* `battery-guard <https://github.com/maemo-leste/mce/pull/43>`_ module was added
* `power-generic <https://github.com/maemo-leste/mce/pull/47>`_ module that
  allows mce to operate in adsence of dsme.


Additionally, mce now supports some more dbus interfaces for changing various
settings, which were previously changed through gconf directly, which made for
some awkward architecture:

* https://github.com/maemo-leste/profiled/pull/2
* https://github.com/maemo-leste/osso-applet-display/pull/1
* https://github.com/maemo-leste-extras/simple-brightness-applet/pull/2

Profiles control panel applet
-----------------------------


Some fixes, renamed
https://github.com/maemo-leste/bugtracker/issues/569

Wireless
--------

`Hidden access points are now supported <https://github.com/maemo-leste/bugtracker/issues/489>`_ in what turned out to be long and painful process of debugging problems in `connui-internet <https://github.com/maemo-leste/connui-internet/commit/181b42acf295ca32812ad6330e36c556d90cb3cb>`_, `wpasupplicant <https://github.com/maemo-leste/bugtracker/issues/489#issuecomment-881039662>`_ itself and the `N900 linux kernel <https://github.com/maemo-leste/n9xx-linux/commit/a242bd68f75cf9d68935aaa6f32fa05f3e4d62e9>`_.


The network scanning dialog would sometimes render scanning results with a
(long) delay, this is now fixed (issue `#342 <https://github.com/maemo-leste/bugtracker/issues/342>`_).


hildon-input-method
-------------------

- him improvments can type into plain x11 windows but only english chars
  - demonstration video on bionic http://uvos.xyz/maserati/videos/IMGP0534.m4v

- plans for at-spi

hildon-desktop
--------------

 - hildon desktop has propper support for roating input devices
   - replaces mostly mapphone specific hack we had before
   - leste-config droid4/bionic no longer messes up touch screen rotation


* XDG env vars https://github.com/maemo-leste/bugtracker/issues/426#event-4195845653

https://github.com/maemo-leste/bugtracker/issues/435 (Hildon desktop not starting after battery depletion on Droid 4)


Audio support
-------------

One of the many tricky parts of a mobile operating system is the audio routing.
For example, when one receives an incoming phone call, any music that is playing
should stop, and the ringtone sound should be heard. When a headphone is plugged
in during a call, one would expect the audio to switch from earpiece to
headphone, but, when a mediaplayer is playing music, unplugged the headphones
should perhaps not necessarily lead to music being played on the speakers, as
one might disturb others - so different outputs need their own volume control,
which needs to be saved somewhere, and so forth.



- of course had some audio working, but this is about policies and better
  integration
- built on sailfish/mer

* pulseaudio setup van nemo, n900 call modules, audio policies (tbd)

* https://github.com/maemo-leste/ohm
* https://github.com/maemo-leste/libdres-ohm
* https://github.com/maemo-leste/libtrace-ohm
* https://github.com/maemo-leste/ohm-plugins-misc
* https://github.com/maemo-leste/pulse-core
* https://github.com/maemo-leste/pulseaudio-policy-enforcement
* https://github.com/maemo-leste/pulseaudio-modules-nemo
* https://github.com/maemo-leste/pulseaudio-module-cmtspeech-n9xx


osso-xterm
----------

osso-xterm now opens links in the default browser, and the volume keys should
`change the font size on the Droid 4 and similar devices <https://github.com/maemo-leste/bugtracker/issues/385>`_.


sphone
------


addressbook
-----------


conversations
-------------



fbkeyboard and charge-mode
--------------------------

- fbkeyboard

   - only implemented for bionic rn (because we have multiple boot entrys on on mapphones atm)
   - image: http://uvos.xyz/maserati/screenshots/bionickeyboard.jpg


* charge-mode
  - not installed by default rn, works on mapphones, n900 (at least)

recovery boot option
--------------------

https://github.com/maemo-leste/image-builder/pull/8
https://github.com/maemo-leste/bugtracker/issues/505

osso-systemui-devlock
---------------------

* osso-systemui-devlock in beowulf-devel, allows devices with lock code set to
  boot:
  https://github.com/maemo-leste/bugtracker/issues/495
  https://github.com/maemo-leste/bugtracker/issues/343


Additional Software changes
===========================

libsdl input
------------

* libsdl-1.2 input problems and window placement problems finally fixed:
  https://github.com/maemo-leste/bugtracker/issues/413


Python bindings
---------------

* https://github.com/maemo-leste/python-conic



ScummVM
-------

- scummvm fixed https://github.com/maemo-leste/bugtracker/issues/353

New Extras packages
-------------------

- new extras:
	- wifi-switcher
	- qshot
	- modrana https://leste.maemo.org/Extras/modrana
	- cloudgps https://leste.maemo.org/Extras/cloudgps
	- maep https://leste.maemo.org/Extras/maep
	- gpsrecorder: https://leste.maemo.org/Extras/gpsrecorder
	- braek https://leste.maemo.org/Extras/braek



Community updates
=================

Wiki updates
------------

* Extras pages, package infobox

* Device infobox

* wiki updates, Package infobox, https://leste.maemo.org/Extras/ScummVM
  https://leste.maemo.org/index.php?title=Template:Infobox_Package&action=edit

Languages and Translations
--------------------------

* Extra languages: arabic, turkish, slovak, hungarian
* TODO: translation service that we use

- translations (weblate, imported all mr0 cssu translations)
  https://hosted.weblate.org/projects/maemo-leste/#information


Leste on Android via chroot
---------------------------

- android chroot
  https://github.com/diejuse/chroot_Maemo-leste_on_Android
  https://www.youtube.com/watch?v=OqFHivcPIRM
  https://www.youtube.com/watch?v=kipuT0VXzC4


Hardware & Drivers
==================


Motorola Droid 3 (XT862)
------------------------

TODO: new device port

https://leste.maemo.org/Motorola_Droid_3

- the port, status
- photos

Does not work:



* Brightness control (screen is always max brightness)
* Keyboard backlight
* Modem interrupts, it is visible on USB but other communication with it doesn't work
* pstore (needs figuring out what the reserved memory is on Android)
* See if we can use 512MB ram instead of 509MB (see dts)
* 3d shows some frame lag / misdrawing, so probably powervr clock needs adjusting
* touchscreen buttons do not work yet
* keyboard layout in Leste is not faithful to the icons on the keyboard, but rather mostly mimic droid 4


Motorola Droid 4
----------------

- mapphone has fuse now? https://github.com/maemo-leste/bugtracker/issues/463 (not newsworthy?)
- better power managment (significant) due to mce f25e8f20562a358d3df37c14e5d7b8639ec869c8
- hildon keyboard via shortcuts (search) (missing on n900? by design!)
- hildon-desktop shortcuts for d4: https://github.com/maemo-leste/leste-config/pull/15#event-4194966432
- hildon-desktop shortcuts for mapphones/pp: https://github.com/maemo-leste/leste-config/pull/15#event-4194966432
   - video: http://uvos.xyz/maserati/videos/ts-buttons-demonstration.mp4

* headphone plug detection

https://github.com/maemo-leste/bugtracker/issues/355 (Droid 4: USB OTG Works only with a Powered Y-cable, and crashes when


Nokia N900
----------

 Unlock n900 device with lock code:

 * https://github.com/maemo-leste/bugtracker/issues/343
 * https://github.com/maemo-leste/bugtracker/issues/495

* fixes for non-wext wireless


Pinephone
---------

## pinephone (maybe pinetab)
- hildon keyboard via shortcuts (vol up) (missing on n900)




## f1
- the port
- we need someone with this device to maintain it!



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
