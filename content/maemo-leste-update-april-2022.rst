Maemo Leste - Sixteenth Update: November and December 2021, January - April 2022
################################################################################

:Category: news
:tags: todo
:authors: Merlijn Wajer
:date: 2022-02-02 00:00

The long overdue update is finally here, it's been a while since our `last
update <{filename}/maemo-leste-update-october-2021.rst>`_.

These past few months have been heavily about stability and bug fixing, as well
as the phone aspects of Maemo Leste.

Here are a few highlights:

* improved performance and stability for graphics drivers for OMAP / PowerVR based devices such as Nokia
  N900 and the Motorola Droid 3, Motorola Droid 4 and Motorola Bionic;
* graphics rendering problems on the Pinephone and Pinetab are all fixed;
* Nokia N900 kernel support is now based on 5.15 instead of 5.1 fixing many
  regressions along the way;
* TODO: Conversations update;
* 2-3 day battery life for the supported Motorola Droid devices.

Images and upgrading
====================

We are still very actively developing Maemo Leste, so many things remain in
flux. As a result, you might have to occassionally have to update using ``apt
dist-upgrade`` as opposed to just ``apt upgrade`` - this is especially true for
this update. Alternatively you can just install the latest images.

In the past, sometimes Maemo Leste upgrades would cause unexpected reboots,
breaking the system, we've tried to now solve those problems by `preventing
certain packages from restarting
<https://github.com/maemo-leste/leste-config/blob/master/leste-config-common/usr/sbin/policy-rc.d.leste>`_.
Additionally, the presence of the `/etc/no_lg_reboots
<https://github.com/maemo-leste/leste-config/blob/master/leste-config-common/etc/no_lg_reboots.leste>`_
file will prevent the system from rebooting in cases where services do crash
repeatedly.

New images
----------

We spin new images weekly, but for this blog post have checked that all of the
supported devices (``n900``, ``droid3``, ``droid4``, ``bionic``, ``pinephone``)
boot fine. `You can find the images here <https://maedevu.maemo.org/images/>`_.


Hardware & Drivers
==================

OMAP and PowerVR drivers
------------------------

``freemangordon`` has been working really hard together with some other Maemo
Leste developers to move to the latest PowerVR drivers available - both in
kernel and userspace. In addition to that, there is now **2D EXA** acceleration
in X using the PowerVR drivers as well. This has been a multi-year effort by
many people, and it's finally here, bringing all devices to the latest Linux
kernels.

This involved integrating and `improving on the chromium os PowerVR mesa driver
<https://github.com/maemo-leste-upstream-forks/mesa/commits/maemo/beowulf>`_
(which also brought all the devices up to a newer mesa version - ``21.2.5``),
fixing up the `xf86-video-omap
<https://github.com/maemo-leste/xf86-video-omap/commits/master>`_ driver to
support EXA and fix up its buffer management, rotation support, as well as many
fixes to the kernel, here are just a few:

* https://github.com/maemo-leste/droid4-linux/commit/067976f0afd4a65bf32a3f450ee42f508a1b0612
* https://github.com/maemo-leste/droid4-linux/commit/7708a2ab996360826fa085374ca794cfd034cc4b
* https://github.com/maemo-leste/droid4-linux/commit/f56836db3ec4210c5cfaf40fa721a6e21cd7730e

In addition to all of that impressive work, we're also hoping to finally enable
the **tear free** operation of the Droid 4 display.

The driver also improves stability and fixes various crashes in the previous
drivers. The driver is available immediately for the Nokia N900, Motorola
Droid 3, Motorola Droid 4 and Droid Bionic.

The Nokia N900 won't support rotation yet, but at least it will `no longer
segfault <https://github.com/maemo-leste/bugtracker/issues/578>`_ - we know what
needs to be done to support rotation, and it's in the works.

Some more background information can be found in `issue #524
<https://github.com/maemo-leste/bugtracker/issues/524>`_.

Pinephone, Mesa and Clutter
---------------------------

Maemo Leste on the Pinephone suffered from various graphical glitches, but these
have now all finally been resolved. There were various problems to resolve, the
first one was in clutter, `which assumed that the display drivers were not using
double buffering
<https://github.com/maemo-leste-upstream-forks/clutter-0.8/commit/13903d341009266d0bfa19806e74625a16ab552a>`_,
even though they in fact were.

Once that was fixed, another problem was surfaced, regarding the preservation of
EGL buffers in Mesa. Clutter relies on the fact that the buffers are preserved,
`but didn't actually request that support
<https://github.com/maemo-leste-upstream-forks/clutter-0.8/commit/6f753308446ff833d8c2713357cdc97d94dcb15b>`_.
However, requesting the support was not enough, because Mesa doesn't (always)
implement the feature, for which we `filed this report
<https://gitlab.freedesktop.org/mesa/mesa/-/issues/5800>`_ at mesa.

``enunes`` was particularly instrumental in helping working around the problem.
providing us with a `minimal stop-gap patch
<https://github.com/maemo-leste-upstream-forks/mesa/commit/dde856128e67b0d3760cd3b8fa95c4c1463168bd>`_
to add support for this feature to mesa while we improve clutter further to
switch to buffer age extensions, rather than relying on this feature being
available.

Nokia N900
----------

The Nokia N900 was stuck on Linux 5.1 for quite a long time in Maemo Leste,
because of the aforementioned graphics drivers trouble, which have now finally
been resolved. As such we set forth to move to the latest Linux kernel only to
found that the support was once again quite broken. More precisely:

* `wifi was broken <https://github.com/maemo-leste/droid4-linux/commit/fa7c9a0d1cecf00579b7388f64393ea26c9433d5>`_;
   (`see issue #572 <https://github.com/maemo-leste/bugtracker/issues/572>`_)
* `LEDs were broken
  <https://github.com/maemo-leste/droid4-linux/commit/4f9a153a44cb4a4d34e265e451da507b64e042cd>`_
  (also `device tree work was required)
  <https://github.com/maemo-leste/droid4-linux/commit/af2872bfcd6eb527b227b79fddbf6927952c9f86>`_;

* OFF mode was never being hit again `due to memory compaction <https://github.com/maemo-leste/droid4-linux/commit/b119ddd34750b1a9e2d66745912a2fe9479b85fe>`_
  and `thermal driver changes <https://github.com/maemo-leste/droid4-linux/commit/a42cb7d0afcde0d4c1dfdfbb6f5eb33597387481>`_;

* The `N900 modem driver would panic and reset the device upon usage <https://github.com/maemo-leste/droid4-linux/commit/2c7e4a1ac8ec1f908927793e893566aac3dcb9df>`_;

* `Automatically turning on OFF mode caused race conditions during boot that causes resets <https://github.com/maemo-leste/droid4-linux/commit/083a17e41a4a9b44ac37de26e5ac357289248e6b>`_;

After spending a week bisecting to find all the various problems, various
fixes have already made it mainline, but other breakage still needs more
investigate before we can send a fix upstream, but at least our kernel carries
the necessary fixes and reverts.

We've also unified the Droid 4 and N900 kernel, so all this work can now be
found here (the repository will be renamed to ``omap-linux`` in due time):

* https://github.com/maemo-leste/droid4-linux/commits/wip/n900/maemo-5.15-cleaned-up

As part of the kernel unification, we also created `maemo-kernel-config
<https://github.com/maemo-leste/maemo-kernel-config>`_ to create kernel images
that are N900 u-boot compatible.

We're also still working on further Nokia N900 power management improvements, to
this end we have created the `n900-pm script
<https://github.com/maemo-leste/n900-pm>`_, and have starting improving power
management of various drivers (touchscreen work `to use runtime pm
<https://github.com/maemo-leste/droid4-linux/commit/fbe57fb618ffefaed2526acfc3d53b8a8a6fcc79>`_
and to `disable irqs upon suspend
<https://github.com/maemo-leste/droid4-linux/commit/1fb2c44148536463875bb1d4bbb35c617d7b72e7>`_
already help some), but there are more drivers that need to be worked on.

This `long github issue <https://github.com/maemo-leste/bugtracker/issues/545>`_
details some of the things we went through to get the N900 back in shape.

As of writing, we now run the N900 on Linux 5.15 (see `issue #587
<https://github.com/maemo-leste/bugtracker/issues/587>`_), and will soon switch to 5.16
or 5.17 in our development channel(s).

`We also tweeted about this work
<https://twitter.com/maemoleste/status/1469852192848941058>`_ in what turned out
to be our most popular tweet so far.


Motorola Droid 3, Droid 4, Bionic
---------------------------------

Headphone plug events
~~~~~~~~~~~~~~~~~~~~~

The Droid 4 (and other mapphones) now support detecting the (un)plugging of a
headphone, to ensure that audio is routed properly.

Droid 3 images
~~~~~~~~~~~~~~

After reporting on the Droid 3 port in the previous update, we are now also
offering images for the Droid 3. It's a neat device, much like the Droid 3,
feels more sturdy, but comes with less RAM. We still have more issues to work on
for the Droid 3 port, though - in particular there is still a common problem
where the Droid 3 freezes and resets.

The latest Droid 3 image can be found here - keep in mind that a special
clownboot kexec bootloader setup is still required (`see the instructions here
<https://github.com/MerlijnWajer/bionic-clown-boot/tree/solana>`_).

Power management
~~~~~~~~~~~~~~~~

A new mce module called `quirks-mapphone
<https://github.com/maemo-leste/mce/commit/f25e8f20562a358d3df37c14e5d7b8639ec869c8>`_
has been introduced, introducing additional power saving mechanisms. For
example, it will cause the modem not to report on signal strength if the device
screen is turned off, which prevents waking up ofono, and then D-Bus, and then
programs that listen for ofono on D-Bus. The module also turns off the secondary
CPU to prevent additional wakeups (`issue #594 <https://github.com/maemo-leste/bugtracker/issues/594>`_).

``freemangordon`` improved the responsiveness of the module somewhat, leading to
faster screen lock and unlock (see `mce PR #52
<https://github.com/maemo-leste/mce/pull/52/files>`_).

Below is a screenshot from a Motorola Droid 4 with a used battery, showing that
it has two days of online time left. Keep in mind that this means the device
would online all the time - this is not about suspend to ram time (which is not
necessary on OMAP4). Similar time estimates can be expected on the Droid 3 and
the Bionic, and there are still things to improve upon. OMAP4 does not yet
support ``OFF`` mode, but when it does we suspect we will see further power
savings.  One audio clock also isn't always gated yet, once we figure out why
that is the case, we could save a few more milliwatts.

.. image:: /images/droid4-2days.png


Pinephone
---------

``rafael2k`` has helped getting our PinePhone support into much better shape. We
now ship a 5.15-based kernel fixing up the modem support and audio during phone calls.

We now also have a package for `PinePhone bluetooth firmware
<https://github.com/maemo-leste/bugtracker/issues/327>`_. Combined with the
graphics updates mentioned in `Pinephone, Mesa and Clutter`_ and supported for
the `light and proximity sensor
<https://github.com/maemo-leste/pine64-kernel/pull/2>`_, the Pinephone is in
good shape - better than it has ever been on Maemo Leste.

Last but definitely not least, our newer PinePhone kernel images also support
the hardware keyboard case for the PinePhone.


Core Software additions and changes
===================================

osso-abook (addressbook)
------------------------

After many months of hard work (maybe even years),
the `Maemo addressbook library <https://github.com/maemo-leste/osso-abook/>`_ is now
ready and the `Contacts user interface
<https://github.com/maemo-leste/osso-addressbook>`_ based on the library is also
shaping up nicely.

Importing contacts from a Fremantle Nokia N900 works, and synchronising them
with remote servers using syncevolution has also been reported to work. The
email client (`modest`) has already integrated support for the address book.

What works:

* importing contacts
* using it from email client
* using it from sphone

many screenshots pls


conversations
-------------

We've been working on an open source replacement for the Conversations
application. The replacement is written in Qt5, and can currently read and show
the rtcom communications database, but has only limited addressbook integration.
We have had some luck integrating Telepathy, and both sending and receiving
SMS/IRC/XMPP messages works, but the code is not yet available in the package
repositories, as there are still some bugs to solve when using multiple
Telepathy accounts.

For it to fully work, more work is also required for the Telepathy integration
in other parts of the system.

Nevertheless, the application can already quite accurately render a
communications database from a Fremantle Nokia N900.


TODO:

- explain what we did, built
- show screenshots
- show off reading rtcom db
- interactive telepathy demo

rtcom-accounts-ui
-----------------

still wip


sphone
------

new: osso addressbook integration


charging-mode
-------------

new: charging mode

virtual keyboard
----------------

* hildon input method special keys fix


maemo-launcher
--------------

* maemo launcher fixes https://github.com/maemo-leste/bugtracker/issues/484

hildon-desktop
--------------

* hildon-desktop time overflow bug in scroll (lol) https://github.com/maemo-leste/hildon-desktop/pull/17


* libhildondesktop (re)load applets upon install

* fixed via libhildondesktop https://github.com/maemo-leste/mce/pull/52

* https://github.com/maemo-leste/hildon-desktop/pull/18 (quote command)

* https://github.com/maemo-leste/libmatchbox2/pull/8 (fullscreen fixes)

hildon-home
-----------

* https://github.com/maemo-leste/bugtracker/issues/459


Volume applet
-------------

* volume applet https://github.com/maemo-leste/maemo-statusmenu-volume/pull/1
  + https://github.com/maemo-leste/maemo-statusmenu-volume/pull/2

https://github.com/maemo-leste/bugtracker/issues/271

todo: screenshots

Additional Software changes
===========================


hamsterfiler
------------

* hamsterfiler?


ofono
-----

* new ofono (1.34), shared with all devices, with better pinephone support

* pp ofono  https://github.com/maemo-leste/bugtracker/issues/598
* https://github.com/maemo-leste/bugtracker/issues/597


gtk2
----

Our Gtk2 sliders weren't as repsonsive to touch input as they should be, due to
some Maemo patches that were missing. This is now fixed, see `issue #582
<https://github.com/maemo-leste/bugtracker/issues/582>`_ for more info.


libicd-network-wpasupplicant
----------------------------

* libicd-network-wpasupplicant segfault fix when net->type NULL

themes on images
----------------

* theme loading was broken on images builds https://github.com/maemo-leste/bugtracker/issues/599


pulseaudio configuration
------------------------

leste-config, pa switch on port, default pa sink for pp

todo: pulseaudio setup (.d structure)

System log (rsyslog) configuration changes
------------------------------------------

todo: leste-config rsyslog.d https://github.com/maemo-leste/bugtracker/issues/588


Debugfs entries in fstab
------------------------

todo: debugfs entries for mapphone(s)

Default DNS server is none is provided
--------------------------------------

(also: fix dns if none is provided?)

todo: 9.9.9.9 if no dns server provided/specified https://github.com/maemo-leste/libicd-network-ipv4/commit/49afd837bf5a7764c0cc59854aad2b01175088a4 
  maybe invite further comments on a (new) issue, instead running unbound
  locally and just run our own local rdns

libsdl1 environment variables and enabling GLESv1 in mesa
---------------------------------------------------------

* mesa now with gles1

* libsdl1 env vars


CSSU Features Configuration Editor
----------------------------------

* cssu features?
  http://wiki.maemo.org/CSSU_Features_Configuration_Editor

Community and supporting software updates
=========================================


keyring and jenkins updates
---------------------------

Our key for the "extras" repository silently expired (not the first time), but
now we had an easier way to providing updates, by just updating our keyring
package. We have also upgraded our Jenkins instance to the latest version(s),
and are working on adding a Honeycomb LX2 machine for fast ARM package builds.

Mediawiki theme
---------------

* wiki theme that makes it look like maemo


What's next
===========

- conversations more, group chat support
- telepathy uis rtcom
- addressbook completion
- ofono mapphone support


Interested?
===========

If you have questions, are interested in specifics, or helping out, or wish to
have a specific package ported, please see our bugtracker.

**We have several Nokia N900 and Motorola Droid 4 and Bionic units available to
interested developers**, so if you are interested in helping out but have
trouble acquiring a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
