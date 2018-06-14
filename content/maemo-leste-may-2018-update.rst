Maemo Leste - Third update (May + June) 2018
############################################

:Category: news
:tags: kernel, networking, connectivity, raspberry pi, icd, n900, droid4, nexus5
:date: 2018-05-15 00:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been a while since our `second update
<{filename}/maemo-leste-april-2018-update.rst>`_
and there's quite some stuff to talk about!

On the software side
--------------------

Networking
~~~~~~~~~~

This month was focussed on connectivity. A lot of progress has been made in
this area. Internet Connectivity Daemon (`icd`) is now quite functional and
works together nicely with the new `libicd-network-wpasupplicant` plugin which
adds wireless connectivity using `wpa_supplicant` as a backend. The `connui`
(which provide network settings and network UI) packages are also mostly ready,
which means that we have a network daemon with wireless plugin, and working UI.

At this point, open wireless networks, WEP networks, WPA and RSN (WPA2) PSK and
EAP networks should work. Not all EAP protocols are implemented yet, but it's
enough to be able to connect to well known networks like `eduroam` or
`spacenet`:

.. image:: /images/n900-libicd-wpasupplicant-spacenet.png
    :height: 324px
    :width: 576px

Further required improvements are listed here, in this milestone:

  https://github.com/maemo-leste/bugtracker/milestone/7

Here is a set of 13 screenshots showing off some of the current functionality on
the Nokia N900...

.. image:: /images/n900-net-1.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-2.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-3.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-4.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-5.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-6.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-7.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-8.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-9.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-10.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-11.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-12.png
    :height: 324px
    :width: 576px

.. image:: /images/n900-net-13.png
    :height: 324px
    :width: 576px


As of today, it is also possible to connect to a network directly from the
normal network scanning dialog.

**IPv6** is not yet implemented by us in `icd2`, but there is a milestone that
details what should be done: https://github.com/maemo-leste/bugtracker/milestone/8

In the previous April update, we have mentioned packaging `wl1251-cal` which
should make wireless on the n900 more bearable - it does, but it somehow makes
it impossible (currently) to bring up the network interface upon startup, we're
still trying to figure out why this is happening.


Accessibility
~~~~~~~~~~~~~

There is quite a bit of progress on accessibility! Currently Maemo Leste is
really only usable if the device has a keyboard, or a working USB OTG port to
attach a USB keyboard; but this will change, since we hope to have an integrated
virtual keyboard soon. Localisation of the virtual keyboard layout should also
work for the initial release.

.. image:: /images/virtual-keyboard-vmware.png
    :height: 500px
    :width: 670px


Devices
~~~~~~~

**There are no new images to go along with this update, but we hope to release
new ones in a few weeks from now, with the connectivity and virtual keyboard
working.**

On the **Nokia N900** side, not a lot of extra hardware enablement has been
committed, but in an attempt to save some power, the kernel not supports
disabling the touchscreen entirely, instead of always keeping it powered, see
`#118 <https://github.com/maemo-leste/bugtracker/issues/118>`_


On the **Motorola Droid 4** side:

* The Motorola Droid 4 now properly locks/unlocks using the power key, this was
  fixed in mce in `#71 <https://github.com/maemo-leste/bugtracker/issues/71>`_.

* The Motorola Droid 4 battery applet no longer complains about an empty battery
  constantly: `#90 <https://github.com/maemo-leste/bugtracker/issues/90>`_

The Motorola Droid 4 does not yet have any GPU acceleration, but we're hoping to
change that in the coming months, at least get support similar to the Nokia N900
acceleration. We're hoping to leverage previous drivers for the Pandaboard (same
gpu, same OMAP soc) in combination with this DRI3 driver: https://github.com/TexasInstruments/dri3wsegl
There is some documentation on the wiki: https://leste.maemo.org/Motorola_Droid_4/PowerVR

The Motorola Droid 4 will also likely be used to do our first phone call (and
other modem) tests, since support for phone calls on the droid seems to be
furthest along.

**Support for a tablet** our device list has long mentioned an Allwinner A33
tablet, but nothing else was published/known, that changes now with this device
page on our wiki: https://leste.maemo.org/A33-TurboX-Twister

There are no tablet images available yet, and for the different Allwinner tablets we
might need to make different images (or more complicated images that support
multiple devices), but it's nice to see the software work on a tablet as well!

.. image:: /images/a33-twister-prealpha.jpg
    :height: 243px
    :width: 430px

* libcomapp


Documentation/Community
-----------------------

* device pages on the wiki, still need to port over our maemo-leste.github.io
  pages; volunteers?



What is next?
-------------

TODO: large section on what to document, what is already documented, what we
want documented, what we have now, how people can help.

good progress on n900 alpha release: https://github.com/maemo-leste/bugtracker/milestone/4

next:

* stability wifi (eap, general testing, wl1251-cal)
* finish virtual keyboard
* usb (slave/otg) support (usbnet, otg, ke-revc)
  >There is a wish to have usbnet enabled on otg-capable devices by default. We haven't finished this yet, it might in part depend on hildon-usb-status-bar work, but we hope to have finished this next month. https://github.com/maemo-leste/bugtracker/issues/107
* PHONE CALLS
* droid4 kernel (audio, drm fixes, working modem, working calls?)
* nexus5 support


https://leste.maemo.org/Category:Device


Interested?
-----------

**FIXME**

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.


Join us! We really need more people helping out. At this point, we specifically
need developers who can work on porting packages, help out with reverse
engineering, and debug driver issues.

We're currently on irc.freenode.net in #maemo-leste, but also hang out in
#maemo. We also monitor the github issues closely.
