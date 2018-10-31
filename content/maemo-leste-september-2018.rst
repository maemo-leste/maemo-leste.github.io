Maemo Leste - fifth update (September + October) 2018
#####################################################

:Category: news
:tags: n900, xterm, nexus 5, alpha, qt, usb
:date: 2018-08-31 23:39
:authors: Merlijn Wajer

TODO: fix/update date of post

TODO: update tags

.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been a while since our `fourth update
<{filename}/maemo-leste-july-2018-update.rst>`_
and there's quite some stuff to talk about!


Don't forget that we have a mailing list - `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_. Be sure
to subscribe for updates, questions and development. The mailing list archives
are now also functional: https://lists.dyne.org/lurker/mindex/maemo-leste@19700101.000000.00000000.en.html


done:

- ke-recv: ported to udev, uses hildon-usb-gadgets, slide monitoring: https://github.com/maemo-leste/ke-recv
  * always loads network gadget on start - provide ip here

- README/docs

- a33 tablet and lime2:
  - new kernel, battery applet support
  - fix backlight
  - lima tests; not ok enough yet: https://wizzup.org/lima-lime2.jpg
  - virtual keyboard https://wizzup.org/lime2-vkb.png https://wizzup.org/lime2-vkb2.png https://wizzup.org/lime2-wifi.png https://wizzup.org/lime2-home.png



- provide update on alpha

- openfest
- fosdem

wip:

- beginning with qt5 support: https://github.com/maemo-leste/qtstyleplugins
- n900 led patterns

todo before post:

- **NEW IMAGES: n900, a33 tablet, lime2, virtual machine, nexus 5, raspi3**
- droid4 ke-recv
- slide monitoring
- update page, info, photo(s) for nexus 5: https://leste.maemo.org/Nexus_5
- (DONE) fix build of latest hildon-status-bar-usb (it failed somewhere, some missing dep)
      https://phoenix.maemo.org/job/hildon-status-bar-usb-binaries

todo:

- hulda keyboard monitoring should not just happen once

Software additions
------------------

`issue #83 <https://github.com/maemo-leste/bugtracker/issues/83>`_ is now fixed and
the lock screen now works properly on boot, without requiring parallel boot to
be enabled (in fact, parallel boot is still buggy, so don't enable it).

Spinal84 `fixed scrolling in osso-xterm <https://github.com/maemo-leste/osso-xterm/pull/1>`_,
which is a really welcome addition.


USB Gadget/Host/OTG mode
~~~~~~~~~~~~~~~~~~~~~~~~

Maemo Leste uses the Linux `gadget configfs <https://www.kernel.org/doc/Documentation/usb/gadget_configfs.txt>`_
to configure USB gadgets. The userspace library used to interface
with the kernel configfs is `libusbgx <https://github.com/maemo-leste/libusbgx>`_.

The new `hildon-usb-gadgets <https://github.com/maemo-leste/hildon-usb-gadgets>`_
package uses libusbgx to implement two simple gadgets: a network gadget and a
mass storage gadget. The mass storage gadget needs significantly more work, so
it's mostly a stub right now.

This is complemented by the initial udev-enabled (previous versions relied on
the now deprecated hal) version of `ke-recv <https://github.com/maemo-leste/ke-recv>`_,
which received kernel events regarding usb cable plugging and managed the gadget
mode of the phone. The branch "nextgen-usbhack" contains the udev work and
hildon-usb-gadgets integration.

The same udev code was used to bring up `hildon-status-bar-usb
<https://github.com/maemo-leste/hildon-status-bar-usb>`_, the lengthy path to
getting this to work is documented in
`issue #39 <https://github.com/maemo-leste/bugtracker/issues/39>`_

The result of this work can be seen here:

.. image:: /images/n900-usb-pcsuite-1.png
  :height: 324px
  :width: 576px

.. image:: /images/n900-usb-pcsuite-2.png
  :height: 324px
  :width: 576px

By default, ke-recv will always enter "PC Suite" mode for now, which really
just means that any device that is capable of usb peripherals will have usb
networking set up to ease debugging. The device will assign itself the static IP
`192.168.42.2`, so something like this on the host device should bring up
communication: `ifconfig usb0 up 192.168.42.1`.

**todo: something about always needing a gadget loaded**
**todo: significant cleanups still required to ke-recv, hildon-status-bar-usb
and hildon-usb-gadgets**

Porting Maemo Extras packages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the advantages of being really close to Maemo Fremantle is that a lot of
the existing Maemo applications require minimal work to run on Maemo Leste. Out
of curiousity, we imported the wifi signal applet (`issue #185 <https://github.com/maemo-leste/bugtracker/issues/185>`_). The maemo.org extras page for the package is here: http://maemo.org/packages/view/wifi-signal-applet/

With minimal changes (https://github.com/maemo-leste/wifi-signal-applet) compiled and just works:

.. image:: /images/n900-wifi-applet.png
  :height: 324px
  :width: 576px

**todo: something on how we will deal with maemo.org extras-like repository, how
to set it up, with jenkins, how to allow others to contribute, etc**


Qt5 and gstreamer
~~~~~~~~~~~~~~~~~

- mafw (gst 1.0, ported): https://github.com/maemo-leste/?utf8=%E2%9C%93&q=mafw&type=&language=
- qt work
- mafw work, gst work


Images
------



Open issues
~~~~~~~~~~~

* For virtual keyboard to work, you have to reboot once after booting the
  fresh/new image. Then the virtual keyboard can be enabled from the settings
  `Text Input` applet.



Documentation/Community
-----------------------


What is next?
-------------

**todo: alpha status**

.. The last two months were focussed mostly on wrapping on some projects and
.. integration, we hope to close the `N900 Alpha release milestone
.. <https://github.com/maemo-leste/bugtracker/milestone/4>`_ soon.


Interested?
-----------

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

Please also join our `mailing list`_ to stay up to date, ask questions and/or
help out.

If you like our work and want to see happen and continue, join us!

We're currently on irc.freenode.net in #maemo-leste, but also hang out in
#maemo. We also monitor the mailing list and github issues closely.
