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
* support for `Tor and Wireguard`_;
* many `mce`_ improvements;
* `Funding update`_;
* `Motorola Droid 3 (XT862)`_ port;
* `Audio support`_ progress;
* `addressbook`_ progress;
* our plan for sms and `conversations`_;


Core Software additions and changes
===================================


modest
------


GPS interfaces
--------------

* modrana in extras
  https://wiki.maemo.org/ModRana
* https://leste.maemo.org/Extras/maep

Tor and Wireguard
-----------------


connui
------


* Providers

* https://github.com/maemo-leste/bugtracker/issues/539

mce
---

* less memory usage (significant) through lto, --dynamic-list and build system rewrite

* https://github.com/maemo-leste/mce/pull/45
* https://github.com/maemo-leste/mce/pull/17
* https://github.com/maemo-leste/mce/pull/48
* https://github.com/maemo-leste/mce/pull/45
* tklock
* https://github.com/maemo-leste/mce/pull/17
* iio proximity
* https://github.com/maemo-leste/mce/pull/48

- 09c786135279508fe4f92b34f0cd6dbedace3c08
- rtconf (transparent gconf/gsettings/etc. backend)
   - gconf and plain ini is ready gsettings is wip

- e1cf63dbef9687ee316cbd7f409321dabeed34dc
- battery guard

- Load alarm mce module: https://github.com/maemo-leste/mce/pull/46

* less memory usage (significant) through build system rewrite (dynamic linking of modules):

 - about 400K for perspective
 - lto still causes issues with upower/tklock module so its not in leste

- mce power generic

- https://github.com/maemo-leste/bugtracker/issues/410 (mce: switch from dpms to drm blanking)


new mce interfaces

* https://github.com/maemo-leste/profiled/pull/2
* https://github.com/maemo-leste/osso-applet-display/pull/1
* https://github.com/maemo-leste-extras/simple-brightness-applet/pull/2

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

* open links
* volume up/down change terminal size

https://github.com/maemo-leste/bugtracker/issues/385


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
	- gpxsee
	- qshot
	- modrana
	- cloudgps
	- maep
	- gpsrecorder
	- braek



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


https://github.com/maemo-leste/bugtracker/issues/355 (Droid 4: USB OTG Works only with a Powered Y-cable, and crashes when


Nokia N900
----------

 Unlock n900 device with lock code:

 * https://github.com/maemo-leste/bugtracker/issues/343
 * https://github.com/maemo-leste/bugtracker/issues/495


Pinephone
---------

## pinephone (maybe pinetab)
- hildon keyboard via shortcuts (vol up) (missing on n900)




## f1
- the port
- we need someone with this device to maintain it!



Funding update
==============



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
