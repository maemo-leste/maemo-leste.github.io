Maemo Leste - Twelfth Update (February and March) 2020
######################################################

:Category: news
:tags: powervr, droid, n900, pinephone, theme, language, localisation, tv,
       extras
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-03-25 19:00


It's been several weeks since our `pre-FOSDEM 2020 update
<{filename}/maemo-leste-update-january-2020.rst>`_, and let's start with a few highlights:

* We've been around for two years now!
* We switched from Devuan **ascii** (Debian stretch) to Devuan **beowulf** (Debian buster)
* `Motorola Droid 4`_ images are available, with **3D acceleration and decent to
  good power management**.
* `Pinephone/Pinetab images`_ are now available.
* We gave a **main track talk at FOSDEM**:
  https://fosdem.org/2020/schedule/event/smartphones/
* N900 hardware support improvements such as TV-out, beginnings of camera
  support
* **Localisation support and theming** is now available from the control panel, with
  many languages already supported.

**And if you're in a rush**, at least read the `summarising`_ section.



FOSDEM 2020
===========

We gave a main-track talk at FOSDEM 2020, you can read the summary on the FOSDEM
website, or through the Maemo Leste FOSDEM application:

.. image:: /images/droid4-sojourner-fosdem.png
  :height: 324px
  :width: 576px

`The video is available here <https://fosdem.org/2020/schedule/event/smartphones/>`_.


Reminder that our repositories changed
======================================

`Please see the previous announcement <{filename}/repo-restructuring.rst>`_.

Base OS upgraded to Devuan Beowulf (Debian Buster)
==================================================

All of our core packages (way more than 100) are now ported to work on the latest
Debian & Devuan stable. The `entire list is documented in issue #299
<https://github.com/maemo-leste/bugtracker/issues/299>`_

This was a multi-month effort involving everyone in the core
team, and it marks a big step forward!

A few packages remain to be ported from ascii (oldstable) to beowulf, but those
were not in use yet on ascii either.

The recommended way to upgrade is to download the latest image for your device,
and install the new image. Otherwise, if you're feeling adventurous, you can try
to use change `/etc/apt/sources.list`, change `ascii` to `beowulf`, and run `apt
update && apt dist-upgrade`.


Maemo Leste Extras
------------------

Not all extras packages have been ported yet (this is not an exhaustive list): https://github.com/maemo-leste-extras/bugtracker/issues/4

If you're interested in helping out in porting existing packages, or even
maintaining your own packages for Maemo Leste, be sure to check out the
README in the `ticket tracking repository for Maemo Leste Extras!
<https://github.com/maemo-leste-extras/bugtracker>`_


Device support
==============

Motorola Droid 4
----------------

Wiki page: https://leste.maemo.org/Motorola_Droid_4


PowerVR 3D
~~~~~~~~~~

Maemo Leste now runs on the Motorola Droid 4 with 3D acceleration. And not just
3D acceleration, a lot more hardware support has improved. The end result, quite
frankly, is stunning: Maemo Leste runs fast and buttersmooth. The Motorola
Droid 4 truly feels like an upgrade to the Nokia N900 now. This has been a
multi-year multi-man effort, and it's great to see it pay off.

Here's a video that was made a week ago or so, some of the rendering artifacts
are no longer present:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/XCnErJnkWQM"
     ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>


Wireless
~~~~~~~~


Additionally, we've mostly fixed the wireless stability issues (`see #296
<https://github.com/maemo-leste/bugtracker/issues/296>`_). Apparently, the
wireless firmware and bluetooth firmware need to be loaded in a specific order,
and there currently is no way to do this properly in mainline Linux, so we've
resorted to blacklisting the bluetooth module for now.


Power management
~~~~~~~~~~~~~~~~

Power management is looking very promising (`0.01A` or less at `4.4V` when
idle). The package `droid4-powermanagement`
(https://github.com/maemo-leste/droid4-pm) is now available on the latest image,
and it should significantly improve battery life. Some work on MCE is pending,
but once that is merged, users will be able to enjoy better power
management (`#338 <https://github.com/maemo-leste/bugtracker/issues/338>`_,
`#340 <https://github.com/maemo-leste/bugtracker/issues/340>`_).

I would not be surprised if we can manage several days of battery time
in the next month or two.


Battery calibration
~~~~~~~~~~~~~~~~~~~

Battery calibration is still being worked on, and a percentage will only be
shown once the battery has (almost fully) discharged and charged, and does not
persist across reboots. This is being worked on.


Audio
~~~~~

Audio should work out of the box. You will find that the speaker and headphones
are muted, but the wiki will contain instructions on setting up the audio
mixers.


Modem and calls
~~~~~~~~~~~~~~~

The Motorola Droid 4 image is capable of performing calls, but they do not work
via ofono yet. Pavel has been working on an ofono port for the Droid 4, and
hopefully others will help him out soon and complete the initial port. Having
ofono support in place will make the Droid 4 the ultimate developer device.

Shortly from now, we hope to have instructions on how to perform a test phone
call on the wiki.


Custom bootup logo
~~~~~~~~~~~~~~~~~~

You can replace the Motorola logo on boot with a sweet Maemo Leste logo:

.. image:: /images/Droid4_leste_logo.jpg
  :height: 390px
  :width: 525px

Instructions can be found here: https://github.com/xsetiadi/droid4-kexecboot/blob/master/LOGO


Nokia N900
----------

Wiki page: https://leste.maemo.org/Nokia_N900

The Nokia N900 has also seen some power management love, and we've been able to
reach deep idle states, which we also shared on twitter
https://twitter.com/maemoleste/status/1226265997981646849 -- however, this work
is not yet usable in the latest image.


TV out
~~~~~~

What is usable, is using the Nokia's composite out functionality, which is kinda
neat:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/RNEJYYQyftI"
     ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>


Enabling it can be done like this::

  02:57 < Wizzup> Had to change Jack Function in alsamixer to TV OUT, and use xrandr:
  xrandr --output TV --mode 800x480 --same-as LCD
  xrandr --output TV --set SignalProperties PAL
  xrandr --output TV --set TVScale 100


Camera support
~~~~~~~~~~~~~~

You read that right -- Pavel posted instructions on how to use the N900 camera
and take photos with it. Some work remains before we'll have a stock application
where taking photos just works, but it's great news. If you wanted to start
hacking on it, the instructions were shared on the mailing list, and you can see
the archive here:

    https://lists.dyne.org/lurker/message/20200306.084252.32b5515a.en.html


SW_MACHINE_COVER
~~~~~~~~~~~~~~~~

The Nokia N900 has a sensor for the backcover, and when it's removed, current
mainline Linux will refuse to recognize the MicroSD card, as it uses this sensor
to detect the card. Hopefully this will be changed in the future, and the
backcover will be exposed as an input device, with the key `SW_MACHINE_COVER`:

    https://marc.info/?l=linux-omap&m=158168528609413&w=2


Pinephone & Pinetab(let)
------------------------

Wiki page: https://leste.maemo.org/PinePhone

We've also uploaded a Pinephone image! We uploaded one before, which we didn't
quite intend to share with the public yet, but Pine64 already shared our ascii
Pinephone image on Twitter a while back:

    https://twitter.com/thepine64/status/1231702499305893891

Well, the beowulf image is here, and it's even better.

For developers
~~~~~~~~~~~~~~

Still, keep in mind that these are images for developers. Some things definitely
do not work yet, and the lack of a hardware keyboard makes using some parts of
UI a bit of a challenge, at least the places where the virtual keyboard is not
yet available.


Keyboard monitoring
~~~~~~~~~~~~~~~~~~~

The upcoming `Pine64 tablet <https://www.pine64.org/pinetab/>`_ has a removable
keyboard, and the Maemo virtual keyboard should only show up when the keyboard
is not attached to the tablet. Previously, removing the keyboard from the tablet
caused MCE to crash, `but this has now been fixed <https://github.com/maemo-leste/mce/commit/0bec2e390e42f49bdbf01976a3b17609ddfd1483>`_, and together with the `keyboard attached monitoring <https://github.com/maemo-leste/ke-recv-extra/pull/3>`_, the Pinetab is in a much better shape.


Software additions
==================

hildon-desktop improvements
---------------------------

We have now switched hildon-desktop on all our devices to clutter 0.8, as
opposed to clutter 1.2. The reason is poor performance, in particular on PowerVR
devices (but likely also on other devices), and the unwillingness of the clutter
1.2 maintainer to fix it. We package clutter 0.8, but downstream distributions
will likely have to go through a bit of pain to get our latest and fastest bits
packaged (sorry!).


Theme switching control panel applet
-------------------------------------

For a long time, changing the default theme was not well documented, because
Maemo Fremantle had a control panel applet for it, and `now we do too
<https://github.com/maemo-leste/hildon-control-panel-personalisation>`_, which
fixes `issue #306 <https://github.com/maemo-leste/bugtracker/issues/306>`_.

Try it out for yourself!


Themes available in the extras repository
-----------------------------------------

We've imported our first community made theme from Maemo.org,
`hildon-theme-marina
<https://github.com/maemo-leste-extras/hildon-theme-marina/>`_. To achieve this,
we also had to import `hildon-theme-layout
<https://github.com/maemo-leste/hildon-theme-layout>`_ and `hildon-theme-tools
<https://github.com/maemo-leste/hildon-theme-tools/>`_ (and fix it up in
the process).

Relevant bug report: `#336
<https://github.com/maemo-leste/bugtracker/issues/336>`_


Language and region switching control panel applet
--------------------------------------------------

Maemo Fremantle supported many languages, and since we implement the same base,
the translations can be reused. There is now an application to switch between
languages (source: https://github.com/maemo-leste/hildon-control-panel-personalisation), this was covered in `issue #304 <https://github.com/maemo-leste/bugtracker/issues/304>`_

This is what the language applet looks like:

.. image:: /images/droid4-language-applet-english.png
  :height: 324px
  :width: 576px

Here, the language is set to English and still makes sense:

.. image:: /images/droid4-cp-english.png
  :height: 324px
  :width: 576px

After changing the language to Dutch, and confirming that the device will indeed
reboot, this is what the control panel looks like now:

.. image:: /images/droid4-cp-dutch.png
  :height: 324px
  :width: 576px

Confusing, right?

.. image:: /images/droid4-status-dutch.png
  :height: 324px
  :width: 576px


Additionally, language names now resolve in the hildon input method control
panel.


Attached keyboard slider monitoring
-----------------------------------

Maemo Leste now keeps track of the slide state of a keyboard, and the virtual
keyboard will act accordingly. If the keyboard slide is opened, the virtual
keyboard will not show up by default, but if the keyboard slide is closed, and
the virtual keyboard is enabled, it will work as expected.

Relevant pull requests:

* https://github.com/maemo-leste/ke-recv/pull/2
* https://github.com/maemo-leste/ke-recv-extra/pull/3


Modem/cellular updates
----------------------

The "connui" userspace to interface with the modem is still being worked on, but
more progress was made recently. The PIN entry dialog now works, on start, like
one would expect it to:

.. image:: /images/pinentry-n900.png
  :height: 324px
  :width: 576px

.. image:: /images/pinentry-n900-2.png
  :height: 324px
  :width: 576px

Once the PIN is filled in (or skipped), the homescreen shows the operator name
and the RAT (radio access technology) that is currently in use:

.. image:: /images/homescreen-cellular-n900.png
  :height: 324px
  :width: 576px

This work is only available in the development repositories, as it's not stable
enough to be used on a day to be day basis without being aware of all the bugs.
Yours truly is working hard to get this piece finished.

The package `libicd-network-ofono` is also still being worked, in particular, IP
assignment for the data connections is not yet implemented. Once this works,
it'll likely be possible to have data connections working on devices that
have ofono support for their modem.



Desktop widgets & calendar support
----------------------------------

Previously, desktop widgets would crash hildon-home (`#326 <https://github.com/maemo-leste/bugtracker/issues/326>`_), this has now been fixed. Sicelo has made some progress getting the calendar backend and widgets to run, but more work remains to be done, see `#203 <https://github.com/maemo-leste/bugtracker/issues/203>`_.


Devices / Hardware
==================

Virtual Machine images
----------------------

New Virtual Machine images are available for download:

* https://maedevu.maemo.org/images/virtual-machines/20200324/

We build qcow2 images usually used with QEMU, VirtualBox VDI images, and Vagrant
images.

Currently, the mouse cursor might not be visible, we're working on resolving
this problem.

https://leste.maemo.org/Virtual_Machine


Nokia N900 images
-----------------

New images are available for download:

* https://maedevu.maemo.org/images/n900/20200323/


Motorola Droid 4 images
-----------------------

New images are available for download:
https://maedevu.maemo.org/images/droid4/20200323/


Pinephone/Pinetab images
------------------------

New images are available for download:

* https://maedevu.maemo.org/images/pinephone/20200323/
* https://maedevu.maemo.org/images/pinetab/20200324/

These images are very usable, and have 3D acceleration with the open source Lima
drivers. There is still some jittery performance, but hopefully it will be fixed
with time as we go forward and the mesa driver gets improved.

Summarising
===========

`It has been two years since our very first news post
<{filename}/maemo-leste-standing-on-shoulders-of-giants.rst>`_, and we've come a long way.

With 3D support now looking quite decent on the Droid 4, we now have a device
that is easily obtainable, has great mainline support, very decent power
management, and is able to make calls right now. By focussing on supporting the
Nokia N900, Droid 4 and the Pinephone, and developing software with these
devices in mind, we can expect to be able to perform phone calls in the next few
months, if not weeks. It will take time for our userspace software to mature,
but things are looking really bright for Maemo Leste.

I think we're putting together a great versatile mobile Linux distribution, with
it's own userspace, based on top of Debian, the universal operation system. It
really is just Devuan/Debian at the core, and everything happens through the
Debian package manager. There are no read-only images, specific partitions that
you must have to install a new over the air update -- updates just work with
`apt upgrade`.

You will see that you can update from `ascii` to `beowulf` with
`dist-upgrade`, and at the end of the upgrade, you will **still** have a
functional `ascii` system. And when you reboot - you will have the new `beowulf`
(buster) version. We think that's powerful.

Additionally, some (old and new) members from the community have started
contributed their packages to our `"Extras" repository
<https://github.com/maemo-leste-extras>`_. Make sure to check that out too, or
even better: port and contribute packages that you would love to see!

Interested?
===========

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
