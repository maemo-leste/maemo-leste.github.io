Maemo Leste - First update (April 2018)
#######################################

:category: news
:tags: kernel, networking, battery, ofono, n900, droid4
:date: 2018-04-25 00:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been over a month since our `first update
<{filename}/maemo-leste.github.io/content/maemo-leste-april-2018-update.rst>`_
and there's quite some stuff to talk about!

On the software side
--------------------

* We now also have a `Wiki <https://leste.maemo.org>`_ - which is not
  particularly impressive yet, but the device pages will be moved over shortly.


* We have added images for a new device with decent mainline support - the
  `Raspberry Pi 3 <{filename}/pages/raspi3.rst>`_ (Original and Raspi2 might
  work, but is not yet tested). On the Raspberry Pi 3 the 3D acceleration works
  nicely and hildon-desktop can run on a full HD screen. This makes for a nice
  native development platform.
  The image is armhf, not yet `aarch64` (or, `arm64`, if you wish). But since
  the Raspberry Pi 3 supports `aarch64`, it will make for a nice testing ground
  when we decide to work on `aarch64` support.

  http://maedevu.maemo.org/images/raspi2/

* The N950 port that `wicket64` is working now has an initial image out. There
  is also an image for the N9, but this image is as of yet untested, see also
  issue `#121 <https://github.com/maemo-leste/bugtracker/issues/121>`_.

  The images can be found here: http://maedevu.maemo.org/images/n950/
  The initial announcement of the ports is on `this talk.maemo.org thread
  <https://talk.maemo.org/showpost.php?p=1543077&postcount=67>`_

  .. image:: /images/n950-initial-port.jpg

* The N900 wireless should be improved with the latest packages, as we have
  packaged `wl1251-cal`. This will divert the `ti-connectivity` firmware and
  instead use the firmware in `cal` on the N900. It also makes it possible to
  use the mac address saved in cal. Left to implement would be using ofono to
  get the right regulatory settings for the region.
  https://github.com/maemo-leste/bugtracker/issues/102

* `maemo-security-certman` (required for connectivity) has been ported to
  OpenSSL 1.1.0, and `maemo-security-certman-applet` seems to work now.
  Currently the certificate store used by `maemo-security-certman` is not the
  (devuan) system one, but this will follow in due time, see
  `#116 <https://github.com/maemo-leste/bugtracker/issues/116>`_ and
  `#117 <https://github.com/maemo-leste/bugtracker/issues/117>`_

  .. image:: /images/certman-applet.png
    :height: 324px
    :width: 576px


* Our dd-able images shipped with new `ext4` features that were not backwards
  compatible, causing issues mounting these filesystems from Maemo Fremantle,
  Safestrap and just plain Linux desktops. We have now reverted these
  incompatible features, so new images should be compatible with relatively old
  kernels/systems.

* The musb problems mentioned in our `first update`_ have both been merged to
  Linux, in Linux 4.16. We are not yet shipping Linux 4.16 for all devices
  as we will have to rebase some of our other patches.
  The fixes have additionally been backported to the Linux 4.9 and Linux 4.14
  stable trees.

* `hildon-usb-status-bar` has not been finished up yet, the status is the same
  as in the March update, we hope to wrap this up in the next update.

* There are experimental SDL patches that have applied remaining maemo patches
  on top of the libsdl in devuan: https://github.com/maemo-leste/bugtracker/issues/18

* There is a wish to have usbnet enabled on otg-capable devices by default. We
  haven't finished this yet, it might in part depend on `hildon-usb-status-bar`
  work, but we hope to have finished this next month.
  https://github.com/maemo-leste/bugtracker/issues/107

* Audio patches for the `Motorola Droid 4 <{filename}/pages/droid4.rst>`_ were
  posted to the `linux-omap` mailing list and several people have been trying
  them out, including for basic phone calls!

* On the OMAP mailing list there are also several people making good progress on
  making phone calls with the modem in the `Motorola Droid 4`_, which is super
  exciting!

* Mouse cursor should now be visible if a non-touch input is used; this is
  useful on devices that do not (typically) have a touch screen such as the
  LIME2 or the Raspberry Pi 3, see
  `#50 <https://github.com/maemo-leste/bugtracker/issues/50>`_

* The reverse engineering process for ICd2 and connui is nearing completion,
  with most of the important bits now fully functional. Most importantly,
  `icd2`, `connui-common` and `connui-internet` are all packaged now.

  There's ongoing work to finish the
  `libicd-network-wpasupplicant module
  <https://github.com/maemo-leste/libicd-network-wpasupplicant>`_ for icd2,
  which is taking slightly longer than expected, but when finished the wifi
  connectivity will work properly through the hildon UI.

  Additionally, the `libicd-network-dummy` and `libicd-network-usb` modules are
  also available now.

  Meanwhile, enjoy a screenshot of an empty network dialog on the Raspberry pi:

  .. image:: /images/raspi-conndlg.png
    :height: 324px
    :width: 576px


* Our Jenkins instance is now world-viewable - https://phoenix.maemo.org/

* NotKit has done some work on making maemo-leste run on de Gemini PDA with
  Android kernel and libhybris, and he got it to work! The result can be seen
  here:

  .. image:: /images/gemini-pda.jpg
    :height: 320px
    :width: 426px

* This `DRI3WSEGL <https://github.com/TexasInstruments/dri3wsegl>`_ repository
  recently surfaced, which might make it possible to have OpenGLES accelerated
  2D and 3D on `omapdrmfb` using the `modesetting` driver - this would be a
  great step forward, although at least on the N900, we would still require the
  binary PowerVR userspace driver. Nevertheless, this might also make possible
  PowerVR acceleration on the Droid 4 easier.



What is next?
-------------

Connectivity is not wrapped up, so that still remains a big goal. Once that is
done, the reverse engineering efforts will likely focus on a virtual keyboard,
which is another big missing piece.

There's a good chance we'll soon patch together a newer Droid 4 kernel to test
all the recent development, including phone calls.
Phone calls are a big deal, and it would be great if we can soon start playing
with that on the Droid 4, and later on also the N900.

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
