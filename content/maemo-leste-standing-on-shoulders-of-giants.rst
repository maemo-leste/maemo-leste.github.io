Maemo Leste - Standing on the shoulders of giants
#################################################

:category: news
:tags: n900, droid4, mainline, release
:date: 2018-02-01 12:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353

We are happy to announce the immediate availability of Maemo `Leste`
(pre-alpha), a GNU+Linux distribution in spirit of `Maemo Fremantle
<http://maemo.org>`_, originally developed by `Nokia` for their internet tablets
and phones, like the famous `Nokia N900`.

Maemo `Leste` aims to provide a similar experience to Maemo `Fremantle`, but
based on a modern and free software stack. The initially targetted device is the
`Nokia N900 <{filename}/pages/n900.rst>`_, but other (currently unsupported)
targets exist
(`Motorola Droid 4 <{filename}/pages/droid4.rst>`_,
`Generic AMD64 <{filename}/pages/amd64.rst>`_,
`Allwinner A20 LIME2 <{filename}/pages/allwinner_a20_lime2.rst>`_,
`Allwinner A33 Tablet <{filename}/pages/allwinner_a33_tablet.rst>`_)

In short, we aim to provide a free and open GNU+Linux based distribution for
tablets and phones, based on proven and existing code.


History
=======

The `Maemo <https://en.wikipedia.org/wiki/Maemo>`_ operating system was
originally developed by Nokia for it's line of internet tablets, such as the
`Nokia N770 <https://en.wikipedia.org/wiki/Nokia_770_Internet_Tablet>`_,
`Nokia N800 <https://en.wikipedia.org/wiki/Nokia_800>`_,
`Nokia N810 <https://en.wikipedia.org/wiki/Nokia_810>`_
and the `Nokia N900 phone <https://en.wikipedia.org/wiki/Nokia_N900>`_.
The `Maemo` version for the Nokia N900 was `Fremantle`.

After Nokia stopped working on `Maemo` getting ready to transition to `Meego`,
the community picked up maintainership of `Maemo`, resulting in the `Community
SSU <http://wiki.maemo.org/Community_SSU>`_ effort that, to this day, provides
updates for the Nokia N900.

Additionally, the community has been working on upstreaming most of the kernel
drivers for the Nokia, the current status can be seen on `elinux.org/N900
<https://elinux.org/N900>`_, resulting in the N900 probably being the best
supported phone by Linux mainline.

Maemo `Leste` uses a modern base (in the form of Devuan/Debian) and aims to make
most of the software from Maemo `Fremantle` available as a repository.  Maemo
`Fremantle` was also based on Debian and uses the same package manager, making
the transition a natural one.


What have we done so far?
=========================

We have set up a Jenkins instance [*]_ that is used to build any packages that we
have created, ported or imported from Fremantle and the Community SSU.
Currently, this Jenkins instance still builds for both jessie and stretch, but
we plan to turn off the jessie builds soon. All of the imported packages are
hosted on our Github project space: https://github.com/maemo-leste/

We have working [*]_ 3D acceleration on the N900 on the latest `Linux kernel
<https://github.com/maemo-leste/n9xx-linux/tree/pvr-wip>`_ (with minimal
patches) and a `forward-ported X driver
<https://github.com/maemo-leste/n9xx-xf86-video-fbdev-sgx>`_, this does still
require userspace blobs, which are packaged in the `n900` component of our
repository.

There is a meta package available called `hildon-meta` which installs most of
the packages we have ported. For the `Nokia N900` and the `Allwinner A20 LIME2
<{filename}/pages/allwinner_a20_lime2.rst>`_, we have images available that can
be copied to a SD card. These images should boot directly to Maemo
`hildon-desktop`.

If you have neither of these devices, you can also install Maemo `Leste` in
a `64 bit Intel/AMD virtual machine <{filename}/pages/amd64.rst>`_,
or try to port Maemo `Leste` to another
device. In general, any Linux supported device that has some GPU acceleration
(or software rendering with llvmpipe) should be a viable target.

We are also gradually phasing out old and unmaintained software (some of this
has already been done by the Community SSU folks). Maemo `Fremantle` uses the
now unmaintained `upstart`, which has been replaced with the actively maintained
`OpenRC`. We have also replaced `hald` with `eudev` (udev) (and related packages
such as `upower`), and adjusted the Maemo software to deal with these.


.. [*] Our package build infrastructure glue scripts can be found at
       https://github.com/maemo-leste/jenkins-integration. Packages are (re)built on
       demand, depending on whether new code is pushed. Package builds have a specific
       workflow and versioning explained more in-depth here: <url to jenkins page>
.. [*] Albeit currently somewhat slower than we'd like, but it is usable


What is in the current pre-alpha release?
=========================================

The current pre-alpha release should boot to hildon-desktop (the "main"
component of the desktop environment) on the N900. It may take a few minutes due
to an open issue in powervr that causes the startup in particular to be very
slow. Wireless should work, once `wpa_supplicant.conf` entries are set; the
keyboard should have sensible key mappings and the lock switch and other buttons
should work. The Fremantle xterm application also works, as should the status
area (with a single status applet - the 'profile' applet)

It is possible to install all the packages in devuan/debian, but do not expect
them to work smoothly; Firefox can be installed, but it is not optimised for
mobile usage, and scrolling using the touchscreen will not work either.


.. image:: /images/maemo-leste-ascii-h-d-n900-3.jpg
    :alt: Initial bringup of hildon-desktop on the Nokia N900
    :height: 324px
    :width: 576px

The Motorola Droid 4 and LIME2 images not yet ready, but here are some
screenshots showing initial bringup of the environment anyway.

.. image:: /images/droid4-h-d-2.jpg
    :alt: Initial bringup of hildon-desktop on the Motorola Droid 4
    :height: 324px
    :width: 576px

Droid 4 running `hildon-desktop`.

.. image:: /images/lime2-h-d-2.jpg
    :alt: Lime2 outputting a FullHD hildon-desktop to a monitor
    :height: 324px
    :width: 576px

LIME2 outputting `hildon-desktop` to a 1920x1080 screen.


What are the next steps?
========================

We are working on porting more Maemo (Fremantle) userland towards our Leste
base, in order to provide a better and more familiar interface and experience
for users and developers. More status applets, connectivity (wifi, 2g/3g) UI are
on their way. Most packages need some sort of porting, and others are not even
open yet, and will need to be replaced or opened up. The wiki pages `Free Maemo
<https://wiki.maemo.org/Free_Maemo>`_ and `Fremantle closed packages
<https://wiki.maemo.org/Fremantle_closed_packages>`_ lists these various
packages.

We will also try to prepare working images for the Droid 4 and
the LIME2, hopefully with some 3D acceleration.

If you're interested in specifics, or helping our, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

Once more bits are in place, we will start looking at 2g/3g connectivity and
phone calls. Power saving options might then also be something to look at.


Interested?
===========

Join us! We really need more people helping out. At this point, we specifically
need developers who can work on porting packages, help out with reverse
engineering, and debug driver issues.

We're currently on irc.libera.chat in #maemo-leste, but also hang out in
#maemo. We monitor the github issues closely, but also aim to find an
appropriate (or set up a) mailing list.
