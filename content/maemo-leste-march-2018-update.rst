Maemo Leste - First update (March 2018)
#######################################

:category: news
:tags: kernel, networking, battery, ofono, n900, droid4
:date: 2018-03-02 12:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been a month since our `first post
<{filename}/maemo-leste-standing-on-shoulders-of-giants.rst>`_ and there's a
lot of stuff to talk about!

First of all, someone added us to `Wikipedia
<https://en.wikipedia.org/wiki/Maemo#Maemo-Leste>`_, cool!

Devuan, the distrobution that Maemo Leste is based on, has releases a beta
version of "Devuan ASCII" (Devuan 2.0): https://files.devuan.org/devuan_ascii_beta/README.txt
Maemo Leste uses Devuan Ascii, so we're happy to see ASCII being close to
a release.

On the software side
--------------------

We have imported various new packages, added new device images, and have been
working on fixing and enhancing existing packages.

* We have ported the community-ssu battery applet from `hal` to `UPower`, and it
  is now available as update (via apt) and installed by default in the new
  images.  (See `#36 <https://github.com/maemo-leste/bugtracker/issues/36>`_)
  There are still some open issues (
  `#90 <https://github.com/maemo-leste/bugtracker/issues/90>`_,
  `#67 <https://github.com/maemo-leste/bugtracker/issues/67>`_,
  `#68 <https://github.com/maemo-leste/bugtracker/issues/68>`_,
  `#70 <https://github.com/maemo-leste/bugtracker/issues/70>`_)
* The battery applet work also uncovered some kernel bugs, the first one related
  to the status of the battery not being correct. This bug was fixed shortly
  after the bug was reported, with patches in this thread: `N900 battery status
  fixes <https://marc.info/?l=linux-pm&m=151933105213158&w=2>`_.
  Another issue was uncovered when the battery applet seemed to get charging
  events with a very long delay (60s+), the patch is currently on the mailing
  list, but will hopefully make its way into the kernel after it has gotten some
  review: `[RFC PATCH] power: supply: bq27xxx: Call power_supply_changed on
  status change <https://marc.info/?l=linux-kernel&m=151994358415447&w=2>`_.

* The usb status bar has received some initial porting work from `hal` to
  `udev`, and now the UI will pop up when the N900 (only supported device right
  now) is connected to a PC.  Actually changing the USB gadgets does not yet
  work, since we intend to switch to `configfs` and `libusbgx` instead of the
  deprecated gadget modes, so that we can also provide more complex gadgets in
  the near future.
  `#39 <https://github.com/maemo-leste/bugtracker/issues/39>`_
  While porting the applet, a few kernel bugs were uncovered. The first problem
  was that reading the `vbus` status from sysfs caused kernel OOPSes, this
  should be fixed with this patch: `[PATCH v2 1/1] usb: musb: call
  pm_runtime_{get,put}_sync before reading vbus registers
  <https://marc.info/?l=linux-omap&m=151977053826963&w=2>`_.
  The second issue is that sometimes the `mode` file in the `musb-hdrc`
  controller will return `(null)` rather than a sensible mode (e.g. `b_idle`,
  `b_peripheral`, etc), this was been reported here: `usb: musb: "(null)" in
  sysfs mode file after disabling a gadget (and at other times, system hangs)
  <https://marc.info/?l=linux-kernel&m=151994805016878&w=2>`_. As the title
  suggests, at other times the device would simply reboot when switching to
  another gadget. So there's more work to be done in this area.

* To be able to quickly get some of these kernel fixes to Maemo Leste, we have
  git repositories with some device specific kernel patches. Now, at least for
  the N900, we also have a package: `linux-image-n900 - Linux kernel package for
  Nokia N900 (4.15)`. It currently already carries all of the fixes mentioned
  above.

- The orientation lock applet is also ported, but has yet to see any reasonable
  testing.
  `#37 <https://github.com/maemo-leste/bugtracker/issues/37>`_

* The `Mode Control Entity` (mce) can now control the backlight on the Droid4,
  and likely on almost every other Linux mainline support out there.
  `#65 <https://github.com/maemo-leste/bugtracker/issues/65>`_

* `mce` can now read the battery status using `UPower`, profiting from earlier
  work done on the battery applet.
  `#87 <https://github.com/maemo-leste/bugtracker/issues/87>`_

* `ofono` no longer crashes, as reported in
  `#61 <https://github.com/maemo-leste/bugtracker/issues/61>`_. We have also
  imported the latest ofono release, since the required version was not yet
  present in Debian sid (nor in Devuan).

* With some work, `ofono` can be used to set up a `2g/3g` data connection, as
  described in `#61`_. It is also possible to send a text and start a phone
  call, using dbus. The phone call is without audio. At present, there is no
  integration or UI available in Maemo Leste for any of this.

* `Motorola Droid4 images are now available
  <http://maedevu.maemo.org/images/droid4/>`_, be mindful that you already need
  to have rooted the device and need to have installed safestrap.
  `#26 <https://github.com/maemo-leste/bugtracker/issues/26>`_
  We hope that someone will volunteer to extend our current device pages with
  installation instructions, or at least pointers to said instructions (see
  `#75 <https://github.com/maemo-leste/bugtracker/issues/75>`_).

* There are also `LIME2 images available
  <http://maedevu.maemo.org/images/olimex-lime2/>`_. Like the Droid4 image, they
  do not yet contain any hardware acceleration. At present, the LIME2 images
  also require that a HDMI monitor is hooked up at boot time. (If someone tries
  out the images, please document your experience and consider adding to our
  devices pages). There is an open issue that contains the current state of the
  images: `#43 <https://github.com/maemo-leste/bugtracker/issues/43>`_.

* There are now also `armel` images available for the N900, but **they do not
  yet work**, so please stick to `armhf` images for now.
  See `#92 <https://github.com/maemo-leste/bugtracker/issues/92>`_.

* Our repositories were missing source packages for many packages, so `apt-get
  build-dep` and `apt-get source` often did not work. This is now resolved.
  `#84 <https://github.com/maemo-leste/bugtracker/issues/84>`_

  Several people have inquired about a "Scratchbox" like tool. Currently,
  development is done on the device (or virtual machines) themselves. You can
  simply use the standard debian development tools for all development and
  packaging, so at this point there does not seem to be a reason to develop a
  "Scratchbox" like environment.

* A **lot** of work has gone into readying `connui` and `icd2` (the connectivity
  UI, API, daemon and plugins) for Maemo Leste. Unfortunately, it is not in a
  completed state yet, but it's getting quite close. More on that later on in
  this post.

More work has been done behind the scenes, so if you're excited, please do
follow our github issue tracker and/or the IRC channel. We also have logs of the
channel history now: http://maedevu.maemo.org/irc.txt


What is next?
-------------

We have started to use the Github 'Milestones' feature to sort tickets by order
of importance and feasibility, and you can see the ticket that we deem necessary
for an Alpha releases here: `Alpha release milestone
<https://github.com/maemo-leste/bugtracker/milestone/4>`_.

A lot of major things are still missing, a few obvious ones are phone calls, UI
and daemons for conversations, integration for wifi connectivity, integration
for 3g data, 3d acceleration for various supported platforms, support for Qt
applications and some sort of Android application support. We will try to cover
what we're going to work on for the next month, to give you an indication on
where we are, where we are going, and where you can help.

Connectivity
~~~~~~~~~~~~

The first big thing that we want to attempt to get into a working state is
`connui`, `icd2` and `wpa_supplicant` integration for `icd2`. In layman terms:
we want wifi to work with the Maemo Fremantle UIs, we need to finish reverse
engineering the last bits of `connui`, and then we need to write a plugin for
`icd2` that communicates with `wpa_supplicant`, the de-facto wifi daemon. (See
`#73 <https://github.com/maemo-leste/bugtracker/issues/73>`_ and `#42
<https://github.com/maemo-leste/bugtracker/issues/42>`_)
We will need someone to finish the `icd2` documentation in doxygen format: `#28
<https://github.com/maemo-leste/bugtracker/issues/28>`_

Similarly, we would also need someone to take a look at what the best way would
be to integrate ofono into our networking stack. One method to do that would be
to integrate it into icd2, but perhaps there are also alternatives, by using
`NetworkManager` or `connui`, and somehow hooking those up to `icd2`.

Another thing we want to wrap up soon is importing the Maemo Qt patches (
`#53 <https://github.com/maemo-leste/bugtracker/issues/53>`_), since that will
allow us (and hopefully, others) to import many more packages from Maemo
Fremantle. Examples of such packages are clockui (`#55
<https://github.com/maemo-leste/bugtracker/issues/55>`_), osso-calculator (`#54
<https://github.com/maemo-leste/bugtracker/issues/54>`_) and open media player
(`#25 <https://github.com/maemo-leste/bugtracker/issues/25>`_).

Having working phone calls with audio (even with perhaps not too great audio
quality) would be a huge win and might not be too far out, we're hoping someone
will pick this up, see `#27
<https://github.com/maemo-leste/bugtracker/issues/27>`_.

Android in a box
~~~~~~~~~~~~~~~~

The best way to run Android applications on GNU/Linux seems to be `Anbox
<https://anbox.io/>`_, which is in the process in being packaged for Debian (and
Devuan): https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=884797
We have a ticket for anbox support, `#9
<https://github.com/maemo-leste/bugtracker/issues/9>`_.

We do not yet know how much RAM anbox would use and if it is feasible for all
our supported devices, but devices such as the LIME2 and the Motorola Droid 4
might have enough RAM to spare to run Android applications using Anbox.

Drivers
~~~~~~~

Having 3D acceleration work on the LIME2 devices would be quite nice, since they
can output to high resolution screens, in which case 3D acceleration is really a
must-have `#43 <https://github.com/maemo-leste/bugtracker/issues/43>`_.

The Droid 4 also currently has no 3D acceleration. We hope that a more
lightweight version of `hildon-desktop` can provide some solace here `#51
<https://github.com/maemo-leste/bugtracker/issues/51>`_.

Finishing the USB gadget code is definitely a short term goal, but that depends
on how fast we can get the kernel bugs resolved.

Packaging `pulseaudio` is also somewhere on the road map, which might be
required for better call quality on the N900 and also to protect the N900
speakers from being irrepairably damaged `#62
<https://github.com/maemo-leste/bugtracker/issues/62>`_.

Platform support
~~~~~~~~~~~~~~~~

We might look at supporting `arm64` in the near future, if we have a (virtual)
device that we can test our builds on.



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
