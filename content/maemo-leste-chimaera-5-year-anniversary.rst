Maemo Leste - Five year anniversary and Chimaera release
########################################################

:Category: news
:tags: chimaera, mediaplayer, rtcom, calls, n900, qt5
:authors: Merlijn Wajer
:date: 2023-07-19 21:00

We're back with another overdue update, marking our five year anniversary as
well as the official Chimaera release. Apart from the upgrade to Chimeara /
Bullseye (from Beowulf / Buster), here are some other highlights:

* Modem and cellular data enabled by default on various devices;
* Support for elogind login sessions;
* Various quality of life fixes such as Qt theming improvements;
* Better power management on the Nokia N900;
* Camera application for the Pinephone, additional firmware;
* Work has started on the user manual / user guide;
* Developers now have Nokia N900 phone calls working, but some integration and
  bug fixing still remains;
* Telepathy-based voice calls are coming soon to sphone;

(Also check out our `previous update
<{filename}/maemo-leste-update-january-2023.rst>`_ in case you missed it).


Devuan Chimaera (Debian Bullseye)
=================================

The upgrade to Devuan Chimaera (Debian Bullseye) has been a long time coming,
but it is finally here. We had been testing Maemo Leste based on Chimaera for
half a year already, but with this blog post the release (and switchover) is
official. The `Chimaera milestone ticket
<https://github.com/maemo-leste/bugtracker/milestone/24>`_ lists all the
packages that were rebuilt and any of the changes made to them.

The upgrade brings new Linux kernels to various devices (6.1.x for the
Droid 4, Droid Bionic, Nokia N900 and Pinephone), as well as a switch to elogind
sessions. This was required for staying compatible with modern software, which
now often require some form of login session manager in order to function
properly (or at all).

Most of the supported devices will now also have their modem activated, as well 
as having software to make phone calls and use mobile data present on the device,
providing a much more phone-like experience out of the box.

In fact, the more recent Chimaera images should allow users to make working
phone calls on the Pinephone, Motorola Droid 4, Motorola Bionic out of the box.
Even on the Nokia N900 calls are now working, but they still require some manual
work after the device has started. The author of this news post has been using
his Droid 4 as a daily driver for over half a year now.

The image builder can now build Chimaera images, see the following commits
(`ed150008c
<https://github.com/maemo-leste/image-builder/commit/ed150008c1981550e9673ebd9bb19cb28770d3c7>`_,
`e7a672f9
<https://github.com/maemo-leste/image-builder/commit/e7a672f9cb9bf46c427576a077bd365a96a5d403>`_,
`8f2dee26
<https://github.com/maemo-leste/image-builder/commit/8f2dee2640e53ffec8c328f343c339ddf153a2c0>`_,
`c5ed472f
<https://github.com/maemo-leste/image-builder/commit/c5ed472f5b2e585c5412ceb12c4f1f6e6ebf4ed3>`_,
`3438cadb
<https://github.com/maemo-leste/image-builder/commit/3438cadb2e84269f337749f87a0da21b260663b3>`_,
`083cbfab <https://github.com/maemo-leste/image-builder/commit/083cbfabffcdad4383117a28964775e156f2947b>`_).

Additionally, the image builder base operating system has also been upgraded to
Chimaera.

Upgrading
---------

Users can perform a ``dist-upgrade`` from their Beowulf install to Chimaera, but
the process isn't well supported at this point, and we instead recommend
users to install a latest image. However, if one prefers to perform a
dist-upgrade, please ensure that your beowulf installation is up to date before
attempting to dist-upgrade to chimaera. This sequence of commands might get you
through the upgrade::

    apt dist-upgrade -o APT::Force-LoopBreak=true
    dpkg-reconfigure --force gconf2
    dpkg-reconfigure --force libgconf-2-4:armhf
    apt --fix-broken install
    apt dist-upgrade -o APT::Force-LoopBreak=true


But again, this is not recommended for novice users. However, **this can be done
entirely 'live' on the phone, while keeping the UI enabled**. Even after the
upgrade is complete, you can still use the phone to an extent - but you really
ought to reboot when it's done.

elogind and Xorg
----------------

Xorg now runs as the ``user`` user, and no longer as ``root``, as part of the
switch to (e)logind.

Initially the switch caused trouble because it was no longer possible to ensure
that both elogind and Xorg would close all the file descriptors to the input
devices, keeping the input devices awake. However, a new kernel mechanism was
introduced (the ``inhibited`` property) to suspend input devices regardless of
whether they are kept open (see this `mce PR
<https://github.com/maemo-leste/mce/pull/58>`_) or not. Ironically, Maemo had support
for that previously (in the form of a ``disable`` property in sysfs), but this
was removed by the upstream kernel because it was deemed an unclean mechanism,
only to re-implement it again, years later.

We also have some policy kit integration now, through the `policykit-1-hildon
<https://github.com/maemo-leste/policykit-1-hildon>`_ package.


Pulseaudio
----------

The new Pulseaudio in Chimaera had significantly reworked their UCM2 support,
and as result our `audio setup was completely broken
<https://github.com/maemo-leste/bugtracker/issues/685>`_.
We took a deep dive and figured out what the problem was, only to find out that
the headphone plug detection was also broken. These problems have now been fixed
in commit `1d08e6cb
<https://github.com/maemo-leste/leste-config/commit/1d08e6cbaa4eb18d07fc7a29423ac0db1e98d536>`_
and commit `4b885151
<https://github.com/maemo-leste/leste-config/commit/4b8851518d8d523065dc1bb12df8d368de9d0af2>`_


CPU flags
---------

We now also build packages in the Maemo repositories with NEON and Thumb2.
Most packages in Debian are already using Thumb2, but not all make use of NEON.
See issue `#691 <https://github.com/maemo-leste/bugtracker/issues/691>`_ and the
jenkins-integration commits `bf2ce8c3 <https://github.com/maemo-leste/jenkins-integration/commit/bf2ce8c3423ec12c13f086d1acf64959b073bfaf>`_ and `75a8e3fb <https://github.com/maemo-leste/jenkins-integration/commit/75a8e3fbff361653c0fd01ff1db136b40ec62b80>`_
for more details.


qtwebengine
-----------

Unfortunately Qt Webengine has a hardcoded list of Qt platform plugins that it
will attempt to use 3D acceleration on, so we have had to patch qt web engine
to ensure that it also uses 3D acceleration on the Maemo platform plugin.

See `this patch to qtwebengine
<https://github.com/maemo-leste-upstream-forks/qtwebengine/commit/c1fbfce8d8ea6c89f65fb8c884d506a39f717049>`_
for more info. As a result many browsers will now run much more smoothly on Maemo Leste.


syncevolution
-------------

TODO: currently broken (!)

Hardware & Drivers
==================

Pinephone
---------

On the Pinephone, the Pinhole/Shutter camera application should now let users
take pictures. See this `wiki page
<https://leste.maemo.org/PinePhone#How_to_take_a_picture>`_ for more
information.


Nokia N900
----------

The Nokia N900 has seen a lot of love from the community members. The power
management has improved a bunch (while not yet hitting the actual low power OMAP
modes), and a good battery will give one at least a day of uptime.

`Blacklisting some modules <https://github.com/maemo-leste/leste-config/commit/f0de824b14ccf9070efae90d6dcb97b097ecb325>`_ and `setting proper parameters on the 1-wire module <https://github.com/maemo-leste/leste-config/commit/7dd372bf75b016c02a7acc13ddae928e722d2339>`_ has significantly improved the battery life.

The FM transmitter module has also been enabled in the kernel, as well as some
additional features for the ``iotop`` program to work properly (see `issue #706
<https://github.com/maemo-leste/bugtracker/issues/706>`_ and `issue #703
<https://github.com/maemo-leste/bugtracker/issues/703>`_.

User ``sicelo`` has improved the `capacity evaluation of the battery
<https://github.com/torvalds/linux/commit/68fdbe090c362e8be23890a7333d156e18c27781>`_
in the upstream kernel, which permits `simplifying
<https://github.com/maemo-leste/n900-pm/pull/1>`_ the ``n900-pm`` script.

User ``arno II`` has contributed a UCM2 file for the Nokia N900, thereby much
improving the audio situation on the Nokia N900. He has reported that it can
also be used for phone calls when a few other pieces are integrated. The
earpiece doesn't work yet, but users should be able to use both the speakers or
headphones for calls.

The modem still needs to be loaded in a certain way for audio calls to work, and
the necessary changes for the ``cmtspeech`` package and ``pulseaudio``
configuration are still under development.

For the next update, users can expect that phone calls will work normally and
properly.


Volume control
--------------

The volume applet has been improved to ensure that it now also `works on the
Pinephone <https://github.com/maemo-leste/bugtracker/issues/615>`_. The right
audio sinks are now detected automatically, rather than being hardcoded per
device, see `maemo-statusmenu-volume PR #4
<https://github.com/maemo-leste/maemo-statusmenu-volume/pull/4>`_ and
`maemo-statusmenu-volume issue #3
<https://github.com/maemo-leste/maemo-statusmenu-volume/issues/3>`_.

With the `volume keys remapped
<https://github.com/maemo-leste/droid4-linux/commit/0e2611e5c6c952eded5e737189da219a8c2e1f48>`_,
and having received a UCM2 file, the volume applet now also works on the Nokia
N900:

.. image:: /images/n900-volume-applet.png
  :height: 324px
  :width: 576px



Core Software additions and changes
===================================


mafw / (Open) Media Player
--------------------------

We've been working on making Open Media Player (OMP) and its dependencies work
on Maemo Leste. At this point, the internet radio player works, and work is
underway to also be able to play files from the file system as well. This
involves porting mafw-tracker-source to the newer GNOME APIs and
``freemangordon`` has started working on this.

This is what the media player looks like when started:

.. image:: /images/omp-start.png
  :height: 324px
  :width: 576px

Listening to a radio stream:

.. image:: /images/omp-radio.png
  :height: 324px
  :width: 576px

Showing the details of a radio stream:

.. image:: /images/omp-radio-details.png
  :height: 324px
  :width: 576px

Adding a new radio stream:

.. image:: /images/omp-add-baroque.png
  :height: 324px
  :width: 576px

Portrait mode:

.. image:: /images/omp-portrait.png
  :height: 576px
  :width: 324px

Open Media Player is now available for installation from the Hildon Application
Manager.


Qt 5 styling
------------

Some of the Qt5 styling problems that were present on Maemo Leste in the past
have now been solved.

One of the problems was that some applications had (white) backgrounds that didn't
fit with the theme (this was particularly present in the clock application).
Another problem was that text wouldn't always contrast well with the background
- for example black text on a dark gray background.

Various widgets should now also `support scrolling by default
<https://github.com/maemo-leste/qtstyleplugins/commit/83aca5c8f2f69f5815307ebac0a65a9be5522d19>`_.


Notifications
-------------

Maemo now implements more of the XDG specification for notification patterns
such as the vibration property.

TODO: which pkg/repo?
libnotify changes (vibrate on general patterns)



Telepathy
---------

`Work is underway <https://github.com/maemo-leste/sphone/pull/4>`_ to add a
Telepathy module to our sphone application. This would then allow making regular
phone calls through Telepathy - as well as XMPP and SIP phone calls. The current
work can already be used to make phone calls, but for outgoing calls the
"privacy" bit is unconditionally being set, which means that the receiving
caller won't be able to see your phone number. XMPP and SIP phone calls start,
but the audio isn't being routed properly yet.

Having sphone use Telepathy is important, because then we can finally start
sending and receiving SMS messages from the Conversations application.

This work will be completed by the next news post.

Meanwhile, enjoy a screenshot showing SIP messages being exchanged between two
Maemo Leste users using Conversations.

.. image:: /images/sip-messages-conversations.png
  :height: 324px
  :width: 576px


Documentation: User Manual
==========================

As part of the funding, we have been working on improving our documentation and
created a user manual. It is still being worked on and we haven't decided on a
place for it yet, but the `manual can be found here <http://maemo-leste-manual.motionlibre.org/>`_.

The `source code for the manual
<https://gitlab.com/motionlibre1/maemo-leste-user-handbook>`_ is also available.


Community and supporting software updates
=========================================


DORS/CLUC 2023
--------------

* TODO: Talk
* TODO: Stand

Extra packages
--------------

new extra packages:

* harbour-amazfish with dependency: nemo-qml-plugin-dbus
* mstardict?


Maemo Weather
~~~~~~~~~~~~~

``dsc`` has built a weather application in Qt called `NOMWeather
<https://github.com/maemo-leste-extras/NOMWeather>`_. It looks great and is very
usable - you can find some screenshots of the application below.

.. image:: /images/maemo-weather-korcula.png
  :height: 324px
  :width: 576px

.. image:: /images/maemo-weather-korcula-wind.png
  :height: 324px
  :width: 576px


Maemo (Offline) Translate
~~~~~~~~~~~~~~~~~~~~~~~~~

Mozilla recently created a browser extension called
`firefox-translations
<https://addons.mozilla.org/en-US/firefox/addon/firefox-translations/>`_
which translates webpages from one language to another *without* using a
third-party service. The translation happens locally, in the browser, via
language models created using machine-learning.

Since this browser extension is open-source, ``dsc`` wondered if he could port
this translation engine to Maemo Leste for use as a standalone GUI application
for quality **offline** translation. This meant porting and packaging the
underlying machine learning technologies for low-powered ARM devices (like the
Droid 4) which turned out to be a challenging, but not impossible task.

.. ![https://plak.infrapuin.nl/selif/22275ry4.jpg](https://plak.infrapuin.nl/selif/22275ry4.jpg)

Then end result is a responsive GUI that offers quick translations.

.. image:: /images/maemo-translate-enbg.png
  :height: 324px
  :width: 576px

.. image:: /images/maemo-translate-deen.png
  :height: 324px
  :width: 576px


Maemo translate is now available from the repository as `maemo-translate`. In
addition, check out the individual language packs in the Hildon Application
Manager or via `apt search maemo-translate-data`

.. image:: /images/ham-translate-data.png
  :height: 576px
  :width: 324px


Windows 7 theme
~~~~~~~~~~~~~~~

We have ported the old `Maemo Windows 7 theme
<http://maemo.org/packages/view/windows7-theme/>`_ - see the `windows7-theme
<https://github.com/maemo-leste-extras/windows7-theme>`_ extras repository for
the source. It can now be installed on your Maemo Leste devices. Find below some
screenshots of what it looks like:

.. image:: /images/win7-1.png
  :height: 324px
  :width: 576px

.. image:: /images/win7-2.png
  :height: 324px
  :width: 576px

.. image:: /images/win7-3.png
  :height: 324px
  :width: 576px



TODO
====

* dsme updates
* mce updates
* hildon-base 1.14+m7 (> 1.10+m7.1 )
* hildon-meta 2.5+m7 (> 2.3+m7 )
* maemo-system-services 0.6.10-0+m7 (> 0.6.9-0+m7.1 )
* osso-af-startup 1.81.13+m7 (> 1.81.12+m7 )
* https://bugzilla.mozilla.org/show_bug.cgi?id=1812016




Interested?
===========

If you have questions, are interested in specifics or helping out, or wish to
have a specific package ported, please see our bugtracker.

**We have several Nokia N900, Motorola Droid 3, Droid 4, Bionic and RAZR units
available for interested developers**, so if you are interested in helping out
but have trouble acquiring a device, let us know.

.. .. image:: /images/massdroid.jpg
..   :height: 375px
..   :width: 666px


Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join our effort!
