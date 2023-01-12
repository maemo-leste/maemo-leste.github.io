Maemo Leste - New Year update: May 2022 - January 2023
######################################################

:Category: news
:tags: telepathy, conversations, contacts, rtcom, calls,
       sphone, pinephone, performance, mesa, bullseye,
       chimaera, funding, droid4
:authors: Merlijn Wajer
:date: 2023-01-12 18:00

First of all, happy new year to everyone following along.

This is probably our last blog post before our Beta release. This latest update
focuses heavily on cellular software and drivers as well as other communication
features, but there's also a healthy amount of bugfixes and performance
improvements mixed in.

(Also check out our `previous update
<{filename}/maemo-leste-update-april-2022.rst>`_ in case you missed it).

Highlights:

* big performance improvements for the PinePhone, PineTab and other Lima (Mali GPU) devices;
* performance and stability improvements for PowerVR devices like the Droid 4, N900, Bionic and more;
* many modem stability improvements (both ofono and Linux kernel driver) for mapphones (Droid 4, Bionic, Droid 3, etc);
* the cellular stack is maturing and basically ready for day-to-day usage;
* RTCom user interfaces landed, allowing one to configure various instant
  messaging accounts;
* Alarms are now working;
* porting to the new Devuan Chimaera (Debian bullseye) is moving along swiftly;


Images and upgrading
====================

Devuan accidentally `let their signing key expire
<https://dev1galaxy.org/viewtopic.php?id=5213>`_ (something which has happened
to us in the past as well). This meant that any Devuan (and thus, Maemo Leste)
user would no longer get updates from the Devuan repositories unless they
manually took some action. Our packages were unaffected, so we have just
imported the ``devuan-keyring`` package into our repository. By simply
updating and upgrading twice, you should be all set again.


Some of our images `failed to build for a while
<https://github.com/maemo-leste/bugtracker/issues/630>`_, but this issue has now
been resolved.

Funding
=======

Back in August 2022 we applied for funding in the "NGI0 Entrust" fund of NLNet,
and they have approved our proposal, which focuses on improving our mobile
effort in a few key areas:

* `Moving to the new Debian release
  <https://github.com/maemo-leste/bugtracker/issues/644>`_: we're looking to move
  to Devuan Chimaera
  (Debian bullseye) in the next month, bringing in the latest and greatest
  software packages. This involves porting Maemo software to new compilers,
  frameworks, and so on.

* `Supporting more devices
  <https://github.com/maemo-leste/bugtracker/milestone/25>`_: We're looking to bring up Maemo Leste (and thus the
  Linux kernel and drivers) on the Motorola Razr phone (XT910, XT912), the
  Motorola Xyboard tablets (MZ609, MZ617), the Motorola Atrix 2 phone (MB865) and
  the Moto G4 Play.

* Improving and further integrating the Telepathy communication framework: we're
  looking at `adding OMEMO support to the Telepathy Gabble (XMPP) plugin
  <https://github.com/maemo-leste/bugtracker/milestone/26>`_, `integrating XMPP and
  SIP calls in Maemo <https://github.com/maemo-leste/bugtracker/milestone/27>`_
  and are looking into `adding/improving Matrix support to Telepathy
  <https://github.com/maemo-leste/bugtracker/milestone/28>`_.

* `Creating and improving our documentation
  <https://github.com/maemo-leste/bugtracker/milestone/29>`_: we're looking to
  create a user handbook, a contributors guide as well as a developer portal.


The project page of our proposal can be found on the `NLnet website
<https://nlnet.nl/project/MaemoLeste-Telepathy/>`_, along with our `now finished
previous proposal <https://nlnet.nl/project/MaemoLeste/>`_. (And don't forget,
we've also finished a project with `DAPSI
<https://dapsi.ngi.eu/hall-of-fame/maemo-leste/>`_ in 2022)


Hardware & Drivers
==================


Pinephone
---------

Pinephone support has been greatly improved with the help of ``freemangordon``
on the graphics side and ``rafael2k`` on the kernel and camera side.
``rafael2k`` is our pinephone kernel maintainer.

The pinephone kernel will move to Linux 6.1 for Chimaera.
`pine64-kernel PR #4 <https://github.com/maemo-leste/pine64-kernel/pull/4>`_
added a newer kernel and initial camera support, `pine64-kernel PR #5
<https://github.com/maemo-leste/pine64-kernel/pull/5>`_ then added v4l support,
`pine64-kernel PR #6 <https://github.com/maemo-leste/pine64-kernel/pull/6>`_
added some more fixes. `pine64-kernel PR #8
<https://github.com/maemo-leste/pine64-kernel/pull/8>`_ and `pine64-kernel PR #9
<https://github.com/maemo-leste/pine64-kernel/pull/9>`_ made the usbnet work
again.


Graphics
~~~~~~~~

In one of our previous updates we had mentioned we fixed the graphics corruption
bug at the expense of some performance. We have since fixed the problem
properly in clutter by `adding support for the buffer age extension
<https://github.com/maemo-leste-upstream-forks/clutter-0.8/pull/2>`_ and now
the performance is once again great. There are still some issues to be tackled:
landscape mode is not as snappy as portrait, hitting some slow path in glamor.

We believe users may find Maemo Leste in portrait mode one of the snappiest
experiences they might have seen yet on the pinephone.

.. raw:: html

    <video controls height="480px" width="720px">
    <source src="images/pp-leste.mp4" type="video/mp4">
    </video>


Camera
~~~~~~

We have imported `libcamera
<https://github.com/maemo-leste-upstream-forks/libcamera>`_ and the `ov5640
firmware <https://github.com/maemo-leste/firmware-ov5640>`_ thanks to the work
of ``rafael2k``, who is also working on packaging a V4L-based camera application
which is also used on Sailfish, called `Harbour Advanced Camera
<https://github.com/piggz/harbour-advanced-camera>`_ - so we might soon have a
(default) camera application.


Mapphones (Droid 4, Bionic, etc) and Nokia N900
-----------------------------------------------

Our kernel for the mapphones and Nokia N900 is now at version 6.1, with various
changes to the graphics and modem stack, as well as some other changes.

Modem
~~~~~

The modem support has been greatly improved by ``freemangordon``, to the point
where all known bugs seem to be fixed. In the past, calls to the modem would
sometimes time out or simply not happen, which would lead to all kinds of
problems. It would also take a long time for the modem to show up, and sometimes
required restarting ofono, which would also occasionally crash. All of these
problems are now resolved. `Issue #445
<https://github.com/maemo-leste/bugtracker/issues/445>`_ and `issue #530
<https://github.com/maemo-leste/bugtracker/issues/530>`_ describing those
problems are thus now resolved. The commits can be found in this `ofono branch
<https://github.com/maemo-leste-upstream-forks/ofono/commits/maemo-ofono>`_, and
kernel commits `64655c0c
<https://github.com/maemo-leste/droid4-linux/commit/64655c0c2e6498658072a4aeac3539a418397f19>`_,
`977de3af
<https://github.com/maemo-leste/droid4-linux/commit/977de3af9a11f681c7b0669f60ae33a941c00380>`_
and `1b2a0860
<https://github.com/maemo-leste/droid4-linux/commit/1b2a0860cd17c5ea5d3bf16119945f1dcc46ed8f>`_
are also required.

The latest kernel also contains a commit to work around the kernel suspending
the audio in a call, which combined with the latest sphone, **make calls work
with headphones, earpiece and speakers on the mapphones and Pinephone**.


Some intermediate development kernels `broke the modem on the N900, causing the
device to bootloop
<https://github.com/maemo-leste/bugtracker/issues/681#issuecomment-1337958216>`_
- this remained broken for quite some time, but has since been fixed -
apologies for the inconvenience caused by this.

Graphics
~~~~~~~~

The X11 (DDX) driver now supports Xv video acceleration, which (as the name
implies) accelerates the playing of videos.

The driver now also implements a cache for buffer objects, which drastically
improves the scrolling speed in various applications that do not use 3D
rendering, see `xf86-video-omap PR #1 <https://github.com/maemo-leste/xf86-video-omap/pull/1>`_.

There are also some fixes for some crashes and memory leaks that were occuring
before. All of the commits can be found in the `xf86-video-omap github repo
<https://github.com/maemo-leste/xf86-video-omap/commits/master>`_.


Previously it wasn't possible to use GLES1 due to Debian disabling it by
default (?), but we have now fixed this in our mesa package, see `issue #606
<https://github.com/maemo-leste/bugtracker/issues/606>`_.

Miscellaneous
~~~~~~~~~~~~~

We now use the IIO driver for the accelerometer on the Nokia N900, rather than
the input device based driver (see `droid4-linux PR #3
<https://github.com/maemo-leste/droid4-linux/pull/3>`_ - the IIO (Industrial
I/O) subsystem is a better fit for the accelerometer, and we already support
this.

Additionally, the N900 could no longer use USB networking and more importantly,
`could no longer charge because it did not detect when connected to a charger
<https://github.com/maemo-leste/bugtracker/issues/681#issuecomment-1341835131>`_.
This was also fixed in the kernel.

In the past we had reverted some commits to the Linux kernel that caused
dramatic power consumption, but now this is no longer necessary as the interval
can be changed via sysctl, see `leste-config PR #32 <https://github.com/maemo-leste/leste-config/pull/32>`_.



.. * https://github.com/maemo-leste/droid4-battery-calibration/pull/1 (Correct the script path)

.. * https://github.com/maemo-leste/leste-config/pull/31 (Mapphones: up hifi volume a bit)

.. * https://github.com/maemo-leste/bugtracker/issues/348 (flakey usb networking)


Bluetooth
---------

Maemo Leste does not currently ship with any bluetooth UI, but ``blueman`` can be
installed. Once the right kernel modules are also loaded, bluetooth ought to
work. ``Wizzup`` tried to have his car connect to his Maemo Leste phone recently,
but found various things still had to be fixed. The work described below is not
yet integrated, as we don't have a (proper) Maemo UI for bluetooth yet.

The ``Class`` value in ``/etc/bluetooth/main.conf`` has to be set to ``0x005a020c``,
which will make devices recognize your device as an actual phone.  If you don't
do this, some devices (like cars) won't even "see" your device.

After that, the car would connect to the device. From this point on,
`module-bluetooth-discover` had to be loaded in pulseaudio if not already::

    pactl load-module module-bluetooth-discover

Then, just running `mpris-proxy` will cause the car to detect any media player
that supports `mpris`, for example `mpd` with `mpdris2` installed. Furthermore,
`ofono` and `bluez` will now also collaborate and handle calls correctly -
making it possible to accept phone calls from your car!

The video below shows this in action:

.. raw:: html

    <video controls height="380px" width="676px">
    <source src="images/bluetooth-car.webm" type="video/webm">
    </video>


Device porting
==============

As of this news post, we have Maemo Leste booting on a Razr XT910 device
`after some Linux kernel changes by uvos and tmlind
<https://github.com/maemo-leste/droid4-linux/commits/maemo-6.1>`_ - but the
display doesn't fully refresh properly yet. Most other things seem to work,
though, see `leste-config PR #33
<https://github.com/maemo-leste/leste-config/pull/33>`_ and `leste-config PR #34
<https://github.com/maemo-leste/leste-config/pull/34>`_.

``tmlind`` added ``kexecboot`` support for the Razr XT910/XT912, and Xyboard
tablets model MZ609 and MZ617, which will allow us to boot Maemo Leste. The
tablets also require some further work on the display bridge, but we're hoping
that otherwise most things will start to work relatively soon on those too.

The devices already have kexecboot support, with this commit `adding support for
xt910, mz609 and mz617
<https://github.com/tmlind/droid4-kexecboot/commit/2c85eea545e33098a960e439e2b20a788ea06cc8>`_
and this commit `fixing xt912 support
<https://github.com/tmlind/droid4-kexecboot/commit/cd2ef83e5b55f33a3012761a4bd68bc519922a19>`_.

.. TODO: photos of razr, photos of mz609/mz617

While we already have initial support for the Droid 3 (XT862), it is not yet
stable and the device very frequently resets - we hope to address this soon, but
we don't have a clear idea about what exactly causes it yet.



Core Software additions and changes
===================================


rtcom (real time communication) framework
-----------------------------------------

The `"presence" UI <https://github.com/maemo-leste/rtcom-presence-ui>`_ is now
ready, allowing one to change their presence from status menu.

Note the green circle in the status area:

.. image:: /images/presence-ui-3.png
  :height: 324px
  :width: 576px

which shows as a status applet here as well:

.. image:: /images/presence-ui-2.png
  :height: 324px
  :width: 576px

which can be clicked to get to this dialog:

.. image:: /images/presence-ui.png
  :height: 324px
  :width: 576px


We have also added support for wildcard matching queries that search all the
messages in the rtcom databases, allowing for fast message history searching in
the conversations UI, see `rtcom-eventlogger PR #1
<https://github.com/maemo-leste/rtcom-eventlogger/pull/1>`_ and
`rtcom-eventlogger PR #2
<https://github.com/maemo-leste/rtcom-eventlogger/pull/2>`_.

On top of that, we figured out how to have rudimentary multi-user and group chats work
in Telepathy in conversations, but this is not yet available for testing for the
general public.

The phone application also has seen various improvements. For example, after a
call is finished, the window doesn't disappear immediately, but rather stays
around for a few seconds so that the user can understand what happened.

The rtcom framework now allows setting up not just IRC and XMPP accounts, but
also `SIP (internet telephony) accounts
<https://github.com/maemo-leste/rtcom-accounts-plugins/commit/c545748d0b8862c6e1fb3a536418a0acced7f85f>`_,
and during our testing we were even able to utilise `slack-libpurple
<https://github.com/dylex/slack-libpurple>`_ - but this is not currently
packaged or well tested.

slack
~~~~~

Using `slack-libpurple <https://github.com/dylex/slack-libpurple>`_ in
``telepathy-haze`` (a telepathy connection manager that can load
libpurple/pidgin plugins), we got Slack to work, at least in a very basic
fashion, on Maemo Leste. We were able to send direct messages to folks,
including ourselves:

.. image:: /images/slack-conversations.png
  :height: 324px
  :width: 576px

Here is the other side of that conversation (in the browser):

.. image:: /images/laptop-slack.png

And here is an overview of the recent communications (names removed):

.. image:: /images/slack-overview.png
  :height: 324px
  :width: 576px

The ``telepathy-haze`` processes use about 8MB of RAM, which is a nice change
from the many gigabytes that Slack typically uses in a browser tab.


cellulard
---------

A new daemon was introduced to our mobile operating system, called
`cellulard <https://github.com/maemo-leste/cellulard>`_. Its main task is to
deal with the modem on a high level: it will, for example power and online the
modem via ofono on startup, or offline the modem in case flight mode is
selected.

This was necessary because nothing else configures the modem, but also to ensure
that we would be able to show SIM PIN entry dialogs on start of the device, as
there was previously no program putting the modem in the right state. If
no PIN is required and flight mode is not on, the modem will just be put in the
online mode upon start of the device.

As a result, flight mode now also works as intended.

maemo-ringtones
---------------

The ``maemo-ringtones`` package that we used to import from Fremantle contained
some wrong paths and configuration files, which ``rafael2k`` has fixed in
`maemo-ringtones PR #1
<https://github.com/maemo-leste-assets/maemo-ringtones/pull/1>`_. This makes it
so that in the near future the new images will actually use a ringtone out of
the box (i.e. without any changes required by the user) when being called.

alarms
------

Alarms now work well. Before, alarms could be set, but they wouldn't actually
vibrate the phone and play sounds, but this is all fixed now. To achieve this,
we had to fix problems in our `gst 1.0 port in the notify plugin
<https://github.com/maemo-leste/hildon-plugins-notify-sv/pull/1>`_ and `fix a
crash <https://github.com/maemo-leste/hildon-plugins-notify-sv/pull/2>`_. We
also had to perform the same gstreamer work for the `Qt gst 1.0 code
<https://github.com/maemo-leste/clock-ui/pull/1>`_.


.. image:: /images/alarm-clock-portrait.png
  :height: 576px
  :width: 324px


calendar
--------

With the addition of the address book as a default application, we have now also
updated our instructions on how to synchronise your contacts, calendar and
notes on the `Sync wiki page <https://leste.maemo.org/Sync>`_.


notifications
-------------

`hildon-home PR #2 <https://github.com/maemo-leste/hildon-home/pull/2>`_
provides a more up to date and compatible implementation of notifications as
defined by freedesktop.org's ``org.freedesktop.Notifications`` DBUS specification.


input for gtk3
--------------

Thanks to the work of ``freemangordon``, we now support the Hildon virtual
keyboard in Gtk 3 (`issue #537
<https://github.com/maemo-leste/bugtracker/issues/537>`_) - this is great news
in particular for devices that lack a hardware keyboard, such as the pinephone
and the Droid bionic. In addition, this also allows for switching keyboard
layouts from Gtk 3 applications using hildon-input-method.

Gtk3 text input is shown below on the Droid 4:

.. image:: /images/gtk3-dino-im.gif
  :height: 324px
  :width: 576px

(if you happened to see a mouse cursor, that's just how ffmpeg captures the
touch screen events)


mobile data improvements
------------------------

The ``libicd-network-ofono`` package (for mobile data) has seen a lot of
improvements, see `all the commits from September
18th <https://github.com/maemo-leste/libicd-network-ofono/commits/master>`_
- making it now a quite usable plugin.

DHCP for mobile data has been fixed now (see `libicd-network-ipv4 PR #4
<https://github.com/maemo-leste/libicd-network-ipv4/pull/4>`_, and one of the
shell scripts is now also more ``sh`` compliant (see `libicd-network-ipv4 PR #6
<https://github.com/maemo-leste/libicd-network-ipv4/pull/6>`_


Additional Software changes
===========================

hildon-application-manager
--------------------------

The Hildon application manager no longer shows debug symbol packages, which was
quite pointless for most users and showed every package twice - once for the
actual package, and once for its debug symbols.

Furthermore, in the process of porting hildon-application-manager to Chimaera
(`which <https://github.com/maemo-leste/hildon-application-manager/commits/master>`_
`was <https://github.com/maemo-leste/hildon-application-manager/commit/c9a3b01f3c39990df33ae5e02928327df50f8615>`_
`actually <https://github.com/maemo-leste/hildon-application-manager/commit/fb07a532ddb8fa3f96880188e97e242f3e2c35cc>`_
`quite
<https://github.com/maemo-leste/hildon-application-manager/commit/5ce3388cabe671aff2627818b94616f86a5376de>`_
`a <https://github.com/maemo-leste/hildon-application-manager/commit/a5b0591a768155087ffa908da01c609e53c2012b>`_
`sizeable <https://github.com/maemo-leste/hildon-application-manager/commit/7acb76a488701bec05fd97d2eca70c06f8514b25>`_
`undertaking
<https://github.com/maemo-leste/hildon-application-manager/commit/addecba6527b58da62c1d5cc4e568c4cfbacf63a>`_),
we have fixed the problem that made the `application crash when the "Details"
button was being pressed
<https://github.com/maemo-leste/hildon-application-manager/commit/ed2def0fe7151acb0728a3906f25debd206874f2>`_.


.. image:: /images/ham-details.png
  :height: 324px
  :width: 576px

There are also updates to the `Bulgarian translation <https://github.com/maemo-leste/hildon-application-manager/pull/2>`_.


qtwebbrowser
------------

In Chimaera, we have a custom ``qtwebengine`` build to ensure that 
``qtwebbrowser`` can use 3D acceleration (unfortunately ``qtwebengine`` has a
hardcoded list of Qt platforms that it supports, so we had to add ``"maemo"`` to
this list). As a result, the browser is now much snappier. Additionally, the
browser now also `supports portrait mode in Chimaera
<https://github.com/maemo-leste-extras/qtwebbrowser/commit/4704f8f793044cdf920a408cae4397fa8b0f2415>`_.
We'll be working on further integrating the browser in Maemo so that it's easier
to interact with.

.. image:: /images/qtwebbrowser-portrait-d4.png
  :height: 576px
  :width: 324px


osso-xterm
----------

``osso-xterm`` `now opens the browser
<https://github.com/maemo-leste/bugtracker/issues/23>`_ when a link is touched /
clicked upon.



Chimaera porting
================

As mentioned in other places in the post, we're actively working on porting
Maemo Leste from Devuan Beowulf (Debian buster) to Devuan Chimaera (Debian
bullseye).

Following Debian stable brings along the benefits of up to date software, timely
security updates and in general new things that the free software ecosystem
brings. In addition, we will also need to maintain less 'forks' of software:
sometimes we have to provide a newer package of some software, which requires us
to fork it to our own repositories and then build it in our CI, which in turns
takes time and also requires us to stay on top of updates and fixes.

The Chimaera image will **be our first image that provides working phone calls out
of the box** on several supported devices. Previously various cellular packages
were hidden in the development repositories -- so our beowulf images never even
powered on the modem by default.

The main remaining challenge for supporting Chimaera fully is supporting elogind
compatible sessions, which we hope to finish in one or two weeks.

.. We also had to increase the default `disk size for images
.. <https://github.com/maemo-leste/bugtracker/issues/625>`_.


Progress can be tracked in `issue #644
<https://github.com/maemo-leste/bugtracker/issues/644>`_ and `pkgweb
<https://maedevu.maemo.org/pkgweb/>`_ already shows the packages in Chimaera and
the image builder has been updated to support building Chimaera images.

We do not yet encourage users to switch - we plan to have the full release ready
in February and more details will emerge by then.


Community and supporting software updates
=========================================

OpenFest 2022
-------------

Maemo Leste had a presence at the open and free software conference in Sofia,
Bulgaria, in October of 2022. ``Wizzup`` `gave a talk on Sunday
<https://www.youtube.com/watch?v=I2qnjBZ-Scg>`_, and we also had a very well
visited stand during both days of the conference. Here we were showing
off various devices that Maemo Leste runs on (anticlockwise from bottom left):

* Allwinner LIME20 tablet in a metal enclosure with wifi and a LTE modem attached over
  USB
* Motorola Bionic
* Motorola Droid 4
* Pinephone
* Raspberry pi with a HDMI/USB touchscreen attached
* Allwinner A33 tablet
* Two more Droid 4

The Nokia N900 was missing from the stand as we forgot to bring one.

The photos below show off parts of the stand, starting with an overview of the
stand:

.. image:: /images/openfest-2022-1.jpg
  :height: 375px
  :width: 666px

Here is the tablet that ``freemangordon`` has made Leste work on (there are
dd'able images online at the moment):

.. image:: /images/openfest-2022-2.jpg
  :height: 375px
  :width: 666px

Below is an OLIMEX LIME2 (Allwinner A20) board with a resistive 7" screen
(800x480px) in a `LCD Metal Frame
<https://www.olimex.com/Products/OLinuXino/LCD/LCD7-METAL-FRAME/>`_ box, with
both a USB wifi dongle and an OLIMEX `USB LTE module
<https://www.olimex.com/Products/IoT/LTE/USB-gLINK-ANT/open-source-hardware>`_.
This device was actually quite cool, since it was able to send SMSes and make
phone calls, just without the audio routing that one would usually expect from a
phone call (the USB LTE module doesn't allow for this). As such, it was
basically a Maemo Leste tablet that can make phone calls. Various attendees used
the device to call themself and noticed that indeed worked.

In this photo, it is showing a Jabber chat in Conversations.

.. image:: /images/openfest-2022-3.jpg
  :height: 375px
  :width: 666px 

We also had some cool propaganda stickers made for the conference, which were
quite popular.

.. image:: /images/openfest-2022-4.jpg
  :height: 375px
  :width: 666px 


Documentation
-------------

We're working with a few folks to develop a centralised and organised place for
developer documentation, and also to create a user guide. Hopefully we'll have
something to share in a month or two.


Legal entity: Association
-------------------------

Maemo Leste is now a registered non profit association in the public interest
in the country of Bulgaria (`see the registration here
<https://portal.registryagency.bg/CR/en/Reports/ActiveConditionTabResult?uic=206961328>`_).
This makes it easier to purchase and send hardware to interested developers and
allows us fund developers using the money we have left over from previous
funding rounds (some people who worked on the funding projects decided to donate
the funding they got to the association). The association is legally prohibited from
selling anything and currently consists of 8 founding members.

Jenkins
-------

Our Jenkins CI (Continuous Integration) setup, which we use to build all the
packages for Maemo Leste was running into problems where its hard disk was
filled up. We realised that **every single build we ever did was saved to
disk**, which was causing it to fill up. Going forward, only the last three
successful builds of each package are now saved.

Themes
------

We've been looking at using AI to upscale some of the background images of our
themes using Real-ESRGAN. Most of themes were developed only for the Nokia N900,
with a screen resolution of 800x480 - this makes many of the theme backgrounds
looks a little ugly on the larger devices that we have. We've made pretty good
progress with this, and hopefully in the next few weeks we'll push out a few
'upscaled' themes that genuinely look better on higher resolution screens.

The work on the beta theme can be examined `in this directory
<https://wizzup.org/dirlist/maemo-leste/theme-upsample/beta/>`_.

Tor Hidden Service
------------------

Maemo Leste now has a Tor hidden service for its package repository. The URL
is: http://maemopkgove3kc2xxzyuk26j3ict6qzbqi3govge3s6h5aokr2uo6eqd.onion

See `issue #570 <https://github.com/maemo-leste/bugtracker/issues/570>`_ for a
list that also includes the Devuan hidden service URL.
Users will have to install ``apt-transport-tor`` for this to work.


Lapdock
-------

``Blago`` received a Motorola Lapdock and he managed to hook the Motorola
Droid 4 up to it. Here is a frontal view:

.. image:: /images/lapdock-front-view.jpg
  :height: 439px
  :width: 585px

A view from the side, with the Motorola Droid 4 being visible in the back:

.. image:: /images/lapdock-side-view.jpg
  :height: 439px
  :width: 585px

Another view, but of the back of the lapdock:

.. image:: /images/lapdock-back-view.jpg
  :height: 439px
  :width: 585px

``Blago`` is still working on turning all of this into a package, but we will
eventually have support for lapdocks (and other external displays, since this
just attached to the HDMI port on the phone).


Extra packages
--------------

``norayr`` has contributed various new packages:

* `msid <https://github.com/maemo-leste-extras/msid/>`_ - a sid player for the
  Maemo platform;
* `live-wallpaper <https://github.com/maemo-leste-extras/live-wallpaper>`_
  support;
* `shermans-aquarium-maemo
  <https://github.com/maemo-leste-extras/shermans-aquarium-maemo>`_, for a nice
  live aquarium background on your phone;
* `mstardict <https://github.com/maemo-leste-extras/mstardict>`_ - a frontend
  for star dict dictionary files. Also check out the `wiki page here
  <https://leste.maemo.org/Extras/MStarDict>`_;
* `easylist <https://github.com/maemo-leste-extras/easylist>`_ - an application
  to manage lists of notes.



translation gui
---------------

``sanderfoobar`` is working on an **offline** machine-based (neural network)
translation tool, with both command line and user interface, for Maemo. It is
based on the same models and code that are used by `Firefox Translations
<https://addons.mozilla.org/en-US/firefox/addon/firefox-translations/>`_ - he
hopes to present this work in some shape in the next few weeks. Currently it can
translate a sentence in under a second from and to various European
languages. The project welcomes any projects that provide these cool features
without relying on cloud services.

What's next
===========

The author of this news post has made it a personal goal to switch from his
Nokia N900 Fremantle phone to a Maemo Leste Droid 4 phone on
February 1st, 2023 - exactly five years after the first Maemo Leste post. At
that point, his contacts and messages will be imported onto the Droid 4 and the
SIM will be moved.

For this to be achieved, a few tasks will still need to be completed:

* Finish our Chimaera port;
* Support Telepathy in sphone so that phone calls are managed using
  ``telepathy-ring`` instead of directly with ``ofono`` - this will also help
  bring SIP and XMPP calls closer to working state;
* Support messaging contacts from conversations;
* Support incoming message notifications with conversations;


Interested?
===========

If you have questions, are interested in specifics or helping out, or wish to
have a specific package ported, please see our bugtracker.

**We have several Nokia N900, Motorola Droid 3, Droid 4 and Bionic units
available for interested developers**, so if you are interested in helping out
but have trouble acquiring a device, let us know...

.. image:: /images/massdroid.jpg
  :height: 375px
  :width: 666px


Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join our effort!
