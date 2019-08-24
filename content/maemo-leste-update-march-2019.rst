Maemo Leste - Ninth Update (March + till + August) 2019
#######################################################

:Category: news
:tags: pinephone, pinetab, n900, droid4, powervr, lima, cellular, calls, sms, games
:authors: Merlijn Wajer
:date: 2019-08-24 15:00

It's been way too long since our `eight update
<{filename}/maemo-leste-update-january-2019.rst>`_. A lot of things happened
and we're still making steady progress.


General direction & Alpha status
--------------------------------

The last couple of months has been dominated by work on cellular support and the
upcoming PinePhone and PineTablet devices. The Pine64 project plans to start
shipping the PinePhone a couple months from now, and we hope to have a
usable-enough image so that the PinePhone can ship the option of having Maemo
Leste installed. This might also explain the focus on the modem/cellular work,
which this article will discuss in greater detail later on.

The `N900 Alpha milestone
<https://github.com/maemo-leste/bugtracker/milestone/4>`_ status is looking
quite good, with a couple of (relatively minor) changes remaining, the most
prominent being `completion of the virtual keyboard package
<https://github.com/maemo-leste/bugtracker/issues/17>`_, we need to add
monitoring of the keyboard slide status. This should be a day of work at most.
The other meaningful (non bug fix) addition will be welcome application, `as
pioneered by Pavel <https://github.com/maemo-leste/bugtracker/issues/229>`_.

We've seen more and more people join the IRC channel, get a device to develop
on, and slowly help porting / adding new applications, so that's exciting!

.. cellular
.. 'basic os'
.. qt support libs
.. support multiple devices
.. pinephone aims
.. -> then (or: already!) port new stuff

Software additions & Connectivity
---------------------------------

In the connectivity domain there's been a couple of things going on,
connui-cellular was ready to be ported to ofono, the daemon that interfaces with
the modem. Freemangordon started working on `libicd-network-ofono`, the `icd2`
plugin that will allow for setting up GPRS/UMTS/LTE data connections, and
Freemangordon and Wizzup have been working on porting `connui-common` and
`connui-cellular` to ofono. While porting, effort is been made to support
multiple modems and dual sim setups. Maemo supported neither, so it will require
some architectural changes down the line.

The tracking issue for 3G data support can be found seen here: https://github.com/maemo-leste/bugtracker/issues/76

connui-cellular
~~~~~~~~~~~~~~~

connui-cellular is a big package that contains a lot:

0. Shared code (library) to interface with the various cellular daemons
1. Control panel (Settings) applet to:
    * Set up call forwarding
    * Set up / change what radio technologies should be used (2G, 3G, etc)
    * Set up roaming options
    * Change, set or reset pin code for the sim card

2. Hildon-home applet to show the operator name on the desktop
3. Hildon status bar applet to show the signal strength, radio access
   technology, sim card status and more.
4. Dialogs to enter pin codes for a sim card
5. Roaming related dialogs.

So this is a very important package to have (fully) working. Porting it to ofono
requires replacing a ton of functions, mostly in the shared code. An effort is
being made on the `ofono-port branch
<https://github.com/maemo-leste/connui-cellular/compare/ofono-port>`_.

There are two tickets open to track this progress in (they should probably be
merged):

* https://github.com/maemo-leste/bugtracker/issues/195
* https://github.com/maemo-leste/bugtracker/issues/256

While it's still work in progress, the operator name widget and the status bar
applet is already mostly functional, as can be seen on this Nokia N900, being
connected to the Dutch operator `KPN`, over 3G.

.. image:: /images/leste-n900-cellular-v0.1.png
  :height: 324px
  :width: 576px

Maemo did not support 4G/LTE at all, so we also added that, as can be seen in
this virtual machine using a modem via usb-passthrough:

.. image:: /images/leste-cellular-operator-name-home.png
  :height: 300px
  :width: 608px

(Thanks to `sicelo` for creating the logo - and before you ask, yes, we're going
to switch from `4G` to `LTE` as a logo text)

The following pages on the wiki contain some more information (although some of
it may surely be outdated):

1. https://leste.maemo.org/Status/Mobile_Data
2. https://leste.maemo.org/Status/Mobile_Data/Dev

libicd-network-ofono
~~~~~~~~~~~~~~~~~~~~

As mentioned, work has started on libicd-network-ofono, the `icd2` plugin that
will allow setting up a data connection. Currently the plugin will find modems,
and provision them. The connection will then show up in the usual connection
dialog:


.. image:: /images/leste-libicd-network-ofono-0.1.png
  :height: 324px
  :width: 576px

And if you select it, it will power up the modem, but not yet connect you to a
data network:

.. image:: /images/leste-libicd-network-ofono-0.1-2.png
  :height: 324px
  :width: 576px

There's more work to be done in this area - and help is appreciated:

https://github.com/maemo-leste/libicd-network-ofono

connui-common
~~~~~~~~~~~~~

connui-common contains (as the name suggests) common code shared within the
connui stack. It has also seen porting to libgofono.

Recently in an effort to migrate all our packages to the upcoming
Devuan release, we upgraded the build system, but as a result, dialogs were
being installed into an architecture specific path, which is the way it's
supposed to be, but this resulted in certain dialog plugins not being loaded at
all. Ultimately, it meant that you could no longer get any wireless connection
dialog when you updated your system. The bug had apparently existed for a while,
but it has now been fixed, for more details see `bug #251
<https://github.com/maemo-leste/bugtracker/issues/251>`_.

.. hildon application manager
.. ~~~~~~~~~~~~~~~~~~~~~~~~~~
.. 
.. Being worked on by minicom TODO links

mode control entity
~~~~~~~~~~~~~~~~~~~

For a few months, changing the brightness no longer worked from the settings
applet, this was due to the fact that `there were several user dbus-daemon
instances <https://github.com/maemo-leste/bugtracker/issues/232>`_ running, and
applications were not able to chat with each other. This has now been fixed.

welcome application
~~~~~~~~~~~~~~~~~~~

We'll soon have a welcome application of some sorts, `as documented in issue
#229 <https://github.com/maemo-leste/bugtracker/issues/229>`_, to allow resizing
of the rootfs, changing default passwords, and so on. And ... unlike most of the
core Maemo software, this is written in Python, using pygtk.


alarmd
~~~~~~

Maemo has a package called `alarmd`, which is used to set and manage alarms. The
phone can wake itself even when it's completely powered off to alarm the user.
`alarmd` and `alarmclient` are already built and can be installed to Maemo
Leste, and a sample alarm run will look like this::

    alarmclient      -b label=Snooze,flags=TYPE_SNOOZE+WHEN_RESPONDED    \
    -b label=Stop,flags=WHEN_RESPONDED,    \
    -n title='Two Button Alarm',message='Hello there',     alarm_time=5


.. image:: /images/leste-alarm-client.png
  :height: 324px
  :width: 576px


Audio
~~~~~

Currently, audio mostly just works on the devices that we support (Nokia N900,
Motorola Droid 4, Pinephone devkit, Allwinner tablets...). However, for a phone
to be particular usable we'll need to deal with audio policies sooner or later.
That is: if you plug in a headphone, you expect the output of programs to go to
the headphone jack. And if you don't have a headphone jack plugged in, you
expect audio to go over the speakers. Unless you're being called, in which case
you probably initially want the audio to go over the earpiece.
Maemo's audio policies and routing were relatively complex and involved multiple
pieces of software, some which are not open source.

That said, we do currently have opened up one of these packages, thanks to the
hard work done by `spinal84`: https://github.com/spinal84/alsa-policy-enforcement

Games
~~~~~

Maemo Fremantle has lots of fun games packaged, lots of emulators too.
Now that graphics acceleration on the Nokia N900 works quite well, and
acceleration on most Mali devices will work quite well, we're starting to
package some of the Maemo game frameworks and games.

Keep in mind that a lot of games are already available from the Debian
repositories, and many of them will just work.

If there's a specific game/app you'd like to see ported, feel free to add it to
this list on the wiki: https://leste.maemo.org/Status/Games

The relevant issues are
`#18 <https://github.com/maemo-leste/bugtracker/issues/18>`_ and
`#238 <https://github.com/maemo-leste/bugtracker/issues/238>`_.

Here are some screenshots showing off the work done so far for Mahjong and
Marbles:

.. image:: /images/mahjong-start-screen.png
  :height: 300px
  :width: 400px

.. image:: /images/mahjong-score-screen.png
  :height: 300px
  :width: 400px

.. image:: /images/mahjong-game-over-screen.png
  :height: 300px
  :width: 400px

.. image:: /images/marbles-start-screen.png
  :height: 300px
  :width: 400px



.. Games & Emulation
.. ^^^^^^^^^^^^^^^^^
.. 
.. - pvr showoff
..   -> prboom / freedoom1
..   -> pokemon blue


SMS & Calls
~~~~~~~~~~~

As part of the `connui` work, we also tried to make `telepathy <https://developer.gnome.org/platform-overview/unstable/tech-telepathy.html.en>`_
(the GNOME messaging backend/daemon) work with ofono. After installing
`telepathy-ring`, which was already packaged in Debian (!) and adding a `tel`
account through Empathy `per these instructions
<https://blogs.gnome.org/wjjt/2010/07/15/sending-smses-with-empathy-and-telepathy-ring/>`_
, we were able to send and receive SMS texts. It was
surprisingly easy. This should work on the Nokia N900, Motorola Droid 4 and
Pinephone too. The UI is not particularly usable yet (it won't show you a new
window if you get a text from a new/unknown number, and it uses gtk3, we need to
add our gtk3 port), but it's a great start!

One caveat is that the Debian version also trails upstream quite a bit:
https://git.merproject.org/mer-core/telepathy-ring - so we'll probably have to
package our own version eventually.

This should theoretically also work for calls, but the SIM card that was used in
this test doesn't allow for calls.

Here's a screenshot of the UI in action, sending a SMS to a Maemo Fremantle
device from Maemo Leste, and the receiving a response from the Maemo Fremantle
device:

.. image:: /images/leste-sms-telepathy-ring-1.png
  :height: 276px
  :width: 596px


Python support
~~~~~~~~~~~~~~

Maemo had `pretty decent python support <http://wiki.maemo.org/PyMaemo>`_ and
we're also planning to bring some of that over pretty soon too, so that we can
port and import more packages from Maemo Fremantle. Maemo Fremantle uses Python
2.5, so there's likely some porting work involved. Most of the Fremantle PyMaemo
work is stored in this repository: https://vcs.maemo.org/svn/pymaemo/ (of which
we also at least locally have a git-svn version).

We're looking for someone to help us with this, see `issue #260 for more details
<https://github.com/maemo-leste/bugtracker/issues/260>`_.


Device support & Kernel work
----------------------------

There's been exciting progress on the PowerVR (GPU for Nokia N900, Motorola
Droid 4 and other devices) and Mali-400 (GPU for the PinePhone, PineTab, etc)
drivers. Lima (the Mali-400 driver) has been merged to mainline Linux (so it's
included in the kernel by default) and mesa (the open source 3d library) also
merged the lima backend.

PowerVR
~~~~~~~

Nikolaus was able to get a binary/reference implementation to run on  Linux
5.3-rc4, with some patches and glue code, and basic demos work:

    https://marc.info/?l=linux-kernel&m=156577301216115&w=2

After that, others picked up some of the work and as a result it should now be
easier to test/load PowerVR glue code.

Given that basic demos seem to work, we should attempt to load the powervr
module with a matching binary/reference implementation for the Droid 4, and hope
that it loads. Getting acceleration in X11 should then be possible (as
documented previously) using `dri3wsegl
<https://github.com/TexasInstruments/dri3wsegl>`_. And perhaps we can move the
Nokia N900 to using DRM instead too, at some point.

Next steps are documented in the repository, here:

    https://github.com/openpvrsgx-devgroup/linux_openpvrsgx/blob/letux/latest-pvr/drivers/staging/pvr/TODO

Lima
~~~~

There has been quite some activity with Lima, and after being able to run
`hildon-desktop with lima back in 2018
<https://www.youtube.com/watch?v=ihCVsaEMNzY>`_, we expect the performance and
stability to be a lot better now. Once we `fix a bug in hildon-desktop
<https://github.com/maemo-leste/bugtracker/issues/214>`_, we will record demos
of Maemo Leste on the PinePhone and PineTab using the Lima driver.


Nokia N900
~~~~~~~~~~

Recently, the radio transmitter on the Nokia N900 started to work, and `that is
now reflected in the Nokia N900 status page <https://leste.maemo.org/Nokia_N900#Status>`_

We also enabled various features in a newer kernel:

* Vibration driver is now enabled, and can be tested using `fftest`.
* iptables/nftables options have been enabled to allow for nat to share phone
  connections with PCs

The stable release channels also got all the latest PowerVR work, so a simple
`apt update && apt upgrade` should land users with the fastest PowerVR bits.


Motorola Droid 4
~~~~~~~~~~~~~~~~

The Motorola Droid 4 modem has been working in mainline for a while, but
recently some more fixes made the modem work decently with a work-in-progress
ofono driver. It's now possible to make calls, send SMS, receive SMS and use
internet connections. We aim to package a newer kernel with these fixes and an
ofono with enabled backend when we find some time (or when someone steps up to
do this...)

Additionally, most of the patches on top of mainline for the Motorola Droid 4
have been merged, reducing potential maintenance burdens, and making it easier
for others to build their own kernel (previously finding the right patches and
the right versions of patches was a little tricky)


PinePhone & PineTab
~~~~~~~~~~~~~~~~~~~

As previously discussed, Pine64 is creating a `Phone
<https://www.pine64.org/pinephone/>`_ meant to run FOSS mobile platforms, for
the community, by the community. They are also `making a Tablet
<https://www.pine64.org/pinetab/>`_ (which they have also kindly given to us).

They aim to produce the actual phone early 2020 and have generated some press
for Maemo Leste:
https://liliputing.com/2019/06/pinephone-149-linux-smartphone-could-support-ubuntu-sailfish-maemo-luneos-and-more.html

Through collaboration and the already amazing `linux-sunxi
<https://linux-sunxi.org>`_ project we have device trees and kernels that work
quite well on the "Don't be evil" devkit:

    https://gitlab.com/pine64-org/linux/wikis/Don't-be-evil-devkit

Back in April we made a video showing (64 bit arm) Maemo Leste running on the
devkit, without hardware acceleration (apologies for the poor video quality,
we'll do a better one soon):

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/JRjhuAC6jo4"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>


There are also `images available for download
<https://maedevu.maemo.org/images/pinephone-dontbeevil/>`_ (probably won't do
you much good unless you have a devkit - and they didn't make that many). We
also have a `PinePhone device page
<https://leste.maemo.org/Pine64_Anakin_Devkit>`_ documenting the current kernel
support status.

In early September we hope to pick up a PinePhone prototype. Hopefully we'll
soon also be able to get some images for the PineTab, as we believe Maemo Leste
should work quite well on tablets too.


Infrastructure & Distribution
------------------------------

We have migrated our Mediawiki instance (https://leste.maemo.org) and our
Jenkins (https://phoenix.maemo.org) to a new machine with faster storage and
more RAM.

`armel builds have been disabled
<https://github.com/maemo-leste/bugtracker/issues/235>`_ , as we currently have
no devices that need armel. We might enable armel builds again when we need
them.

We've also been working on migrating the Devuan Beowulf (Debian Buster), most
of the work is just porting packages to a newer `debhelper` version, and `help
here would be much appreciated <https://github.com/maemo-leste/bugtracker/issues/234>`_.


Community & Documentation
-------------------------

We've been continually but slowly been documenting `device support status
<https://leste.maemo.org/Category:Device>`_ and the `status of the various core
components <https://leste.maemo.org/Status>`_. There
is still a lot to be done to improve the wiki, though.

Next on the list will be a tutorial on how to start developing with Maemo Leste,
which has been requested several times.


Closing notes / Direction
--------------------------

While we could soon make the N900 Alpha release, we've shifted gears a little
more to get the cellular code and UI in place. One reason for this is that we
hope to have a usable phone, SMS and contact application ready before the
Pinephone goes on sale. We'd love for Maemo Leste to be developer (and maybe
FOSS-enthousiast) ready when the PinePhone is ready.

What that means is that we will need the following in place:

* 2G/3G/LTE data connections working
* Usable (ish) interface for SMS and calls.
* Usable (ish) contacts interface
* (Somewhat sane) audio routing - switching between headphone, earpiece and
  speakers.
* Some contacts UI

It would be great if we could also have:

* Qt5 and Gtk3 port ready


Interested?
-----------

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

**We have several Nokia N900 and Motorola Droid 4 units available to interested
developers**, so if you are interested in helping out but have trouble acquiring
a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay up to date, ask questions and/or
help out. Another great way to get in touch is to join the `IRC channel
<https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
