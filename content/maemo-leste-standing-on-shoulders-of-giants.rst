Maemo Leste - Standing on the shoulders of giants
#################################################

:category: news
:tags: n900, droid4, mainline, release
:date: 2018-02-01 12:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353

We are happy to announce the immediate availability of Maemo `Leste`, a
GNU+Linux distribution in spirit of `Maemo Fremantle <http://maemo.org>`_,
originally developed by `Nokia` for their internet tablets and phones, like the
famous `Nokia N900`.

Maemo `Leste` aims to provide a similar experience to Maemo `Fremantle`, but
based on a modern and free software stack. The initially targetted device is the
`Nokia N900 <{filename}/pages/n900.rst>`_, but other (currently unsupported)
targets exist
(`Motorola Droid 4 <{filename}/pages/droid4.rst>`_,
`Generic AMD64 <{filename}/pages/amd64.rst>`_,
`Allwinner A20 LIME2 <{filename}/pages/allwinner_a20_lime2.rst>`_,
`Allwinner A33 Tablet <{filename}/pages/allwinner_a33_tablet.rst>`_)


History
=======

(Explain what base we are building on, N770, N800, N810, N900, N9, N950, and
make it very clear what we are -- based on latest stable DEVUAN/DEBIAN)



Interested?
===========

Read more below :)


What we have now
----------------

Our package repositories and some infrastructure glue is held on Github, at
https://github.com/maemo-leste

The bugtracker can be found at https://github.com/maemo-leste/bugtracker/issues.
This is where we have most of our roadmap and current bugs. besides this, there
is `#maemo-leste` on Freenode IRC.

We have successfully built and tested a microSD card image for the Nokia N900.
To use it, simply `dd` it to a microSD card and boot it on your phone using
`0xFFFF` or simbly using the `u-boot` bootloader if you have it installed on the
phone.

Maemo Leste has chosen Devuan Ascii (https://devuan.org) as a base system we
build upon on. Devuan Ascii has packages equivalent to the versions that can be
found in Debian Stretch. The init system of choice in Maemo Leste is OpenRC plus
sysvinit. This has proven to be a better and more stable choice than upstart
which was chosen in Fremantle.

Our package build infrastructure is backed by the Jenkins CI, along with some
glue scripts that can be found at
https://github.com/maemo-leste/jenkins-integration. Packages are (re)built on
demand, depending on whether new code is pushed. Package builds have a specific
workflow and versioning explained more in-depth here: <url to jenkins page>


What is coming
--------------

We are working on porting more Maemo (Fremantle) userland towards our Leste
base, in order to provide a better and more familiar interface and experience
for users and developers.

Along with that we will also try to implement a working phone stack, along with
2G/3G network.


What people should expect now
-----------------------------

Our images currently provide a working base system, which developers can use to
work on Maemo leste to port Fremantle packages, or improve existing things.

Disclaimer: In no way should you expect a production-ready system yet.

In general, what you can currently find working in the image(s) is the
following:

    * hildon-desktop
    * Audio through ALSA
    * Mainline Linux (4.14 and/or 4.15)
    * Devuan Ascii
    * OpenRC init
    * Working WiFi stack
    * 3D acceleration (PowerVR SGX)

More detailed info can be found on the respective device's pages.


What we need
------------

Developers! Developers! Developers! (insert Steve Ballmer meme here.)

We need people who can work on hardware enablement, reverse engineering, and
eventually - Linux mainlining.


Set expectations
----------------

* Modern maemo-based OS for phones and tablets
* Provide some backwards compatibility with maemo fremantle
* Use open source components where possible, but fall back to closed
  components temporarily while we bring up the OS
* Limit supported devices to a few specific ones in order to avoid
  spending a lot of time on hardware enablement / bringup
* Replacing upstream-dead projects at some point is a good thing


.. TODO:
.. * Mention http://wiki.maemo.org/Community_SSU
