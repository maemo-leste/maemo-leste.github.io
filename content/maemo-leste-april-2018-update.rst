Maemo Leste - First update (April 2018)
#######################################

:category: news
:tags: kernel, networking, battery, ofono, n900, droid4
:date: 2018-04-04 00:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been a month since our `first update
<{filename}/maemo-leste.github.io/content/maemo-leste-april-2018-update.rst>`_
and there's quite some stuff to talk about!

We now also have a `Wiki <https://leste.maemo.org>`_ - TODO

TODO: Mention Nexus 5 phone calls?

TODO: Picture of maemo-leste on the android thing (ask notkit for picture)
https://i.imgur.com/mdg9RxJ.jpg

On the software side
--------------------

* We have added images for a new device with decent mainline support - the
  `Raspberry Pi 3 <{filename}/pages/raspi3.rst>`_ (Original and Raspi2 might
  work, but is not yet tested). On the Raspberry Pi 3 the 3D acceleration works
  nicely and hildon-desktop can run on a full hd screen. The main thing lacking
  right now is that the mouse cursor is currently always hidden.
  The image is armhf, not yet `aarch64` (or, `arm64`, if you wish). But since
  the Raspberry Pi 3 supports `aarch64`, it will make for a nice testing ground
  when we decide to work on `aarch64` support.

* The N950 port that `wicket64` is working on
  is making significant progress: https://talk.maemo.org/showpost.php?p=1543077&postcount=67

* The N900 wireless should be improved with the latest packages, as we have
  packaged `wl1251-cal`. This will divert the `ti-connectivity` firmware and
  instead use the firmware in `cal` on the N900. It also makes it possible to
  use the mac address saved in cal. Left to implement would be using ofono to
  get the right regulatory settings for the region.
  TODO: Link to bug report

* `maemo-security-certman` (required for connectivity) has been ported to
  OpenSSL 1.1.0, and `maemo-security-certman-applet` seems to work now.
  Currently the certificate store used by `maemo-security-certman` is not the
  (devuan) system one, but this will follow in due time.
  https://github.com/maemo-leste/maemo-security-certman
  https://github.com/maemo-leste/maemo-security-certman-applet
  TODO: Link to issues
  TODO: Link to isse to have `maemo-security-certman` use system store

* Our dd-able images shipped with new `ext4` features that were not backwards
  compatible, causing issues mounting these filesystems from Maemo Fremantle,
  Safestrap and just plain Linux desktops. We have now reverted these
  incompatible features, so new images should be compatible with relatively old
  kernels/systems.

* The musb problems mentioned in our `first update`_ have both been merged to
  Linux, in Linux 4.16. We are not yet shipping Linux 4.16 for all devices
  as we will have to rebase some of our other patches.

* TODO: hildon-usb-status-bar

* TODO: usbnet connectivity

* Audio patches for the `Motorola Droid 4 <{filename}/pages/droid4.rst>`_ were
  posted to the `linux-omap` mailing list and several people have been trying
  them out, including for basic phone calls!

* On the OMAP mailing list there are also several people making good progress on
  making phone calls with the modem in the `Motorola Droid 4`_, which is super
  exciting!

* Mouse cursor should now be visible if a non-touch input is used; this is
  useful on devices that do not (typically) have a touch screen such as the
  LIME2 or the Raspberry Pi 3.
  https://github.com/maemo-leste/bugtracker/issues/50

* icd2/connui (TODO: screenshots)

* More on connui

* TODO: sdl patches

* TODO: icd2 - Just start it on boot? But there was a specific way to start it
  IIRC?
* connui (REd) - status
* icd2 usb
* icd2 dummy
* icd2 wpa_supplicant?
* raspi2/3 image (armhf, not aarch64/arm64) - with opengles accel
* droid4 audio, modem patches
* droid4 mainline calls progress
* usb patches merged
* N9 and N950 images/ports ?
  https://talk.maemo.org/showpost.php?p=1543077&postcount=67
* Talk about N900 phone path?

TODO: go through other tickets, keyboard/keymap related, etc


What is next?
-------------

After more connectivity, virtual keyboard is next



New Droid4 kernel, perhaps nicer boot mechanism



Connectivity section



Phone calls section



Boot scripts fixup (mce vs dbus user session)

Interested?
-----------

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.


Join us! We really need more people helping out. At this point, we specifically
need developers who can work on porting packages, help out with reverse
engineering, and debug driver issues.

We're currently on irc.freenode.net in #maemo-leste, but also hang out in
#maemo. We also monitor the github issues closely.
