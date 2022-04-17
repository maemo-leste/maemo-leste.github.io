Maemo Leste - Sixteenth Update: November and December 2021, January - April 2022
################################################################################

:Category: news
:tags: telepathy, conversations, contacts, addressbook, powervr, graphics, mesa,
       pinephone, droid4, droid3, n900, linux
:authors: Merlijn Wajer
:date: 2022-04-16 09:00

The long overdue update is finally here, and it's our biggest update yet.
(Also check out our `previous update  <{filename}/maemo-leste-update-october-2021.rst>`_ in case you missed it).

These past few months have been heavily about stability and bug fixing, but
there are some cool additions and improvements to our userspace as well, in
particular to the communication and phone aspects of Maemo Leste.

Here are a few highlights:

* improved performance and stability for graphics drivers for OMAP / PowerVR based devices such as Nokia
  N900 and the Motorola Droid 3, Motorola Droid 4 and Motorola Bionic;
* graphics rendering problems on the Pinephone and Pinetab are all fixed;
* Nokia N900 kernel support is now based on 5.15 instead of 5.1 fixing many
  regressions along the way;
* addition of the Maemo contacts application and contacts library
* updates on the conversations application, phone call support and the
  telepathy framework and user interfaces;
* 2-3 day battery life for the supported Motorola Droid devices

Images and upgrading
====================

We are still very actively developing Maemo Leste, so many things remain in
flux. As a result, you might have to occassionally update using ``apt
dist-upgrade`` as opposed to just ``apt upgrade`` - this is especially true for
this update. Alternatively you can just install the latest images if things do
break.

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

Once that was fixed, another problem surfaced, regarding the preservation of
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
because of the aforementioned graphics driver troubles, which have now finally
been resolved. As such we set forth to move to the latest Linux kernel only to
found that the support was once again quite broken. More precisely:

* `Wifi was broken <https://github.com/maemo-leste/droid4-linux/commit/fa7c9a0d1cecf00579b7388f64393ea26c9433d5>`_
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
offering images for the Droid 3. It's a neat device, much like the Droid 4,
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
CPU to prevent additional wakeups (`issue #594
<https://github.com/maemo-leste/bugtracker/issues/594>`_), but only if the
screen is turned off.

``freemangordon`` improved the responsiveness of the module somewhat, leading to
faster screen lock and unlock (see `mce PR #52
<https://github.com/maemo-leste/mce/pull/52/files>`_).

Below is a screenshot from a Motorola Droid 4 with a used battery, showing that
it has two days of online time left. Keep in mind that this means the device
would be online all the time - this is not about suspend to ram time (which is not
necessary on OMAP4). Similar time estimates can be expected on the Droid 3 and
the Bionic, and there are still things to improve upon. OMAP4 does not yet
support ``OFF`` mode, but when it does we suspect we will see further power
savings.  One audio clock also isn't always gated yet, once we figure out why
that is the case, we could save a few more milliwatts.

.. image:: /images/droid4-2days.png
  :height: 324px
  :width: 576px


Pinephone
---------

``rafael2k`` has helped getting our PinePhone support into much better shape. We
now ship a 5.15-based kernel fixing up the modem support and audio during phone
calls.

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


.. image:: /images/contacts.png
  :height: 324px
  :width: 576px

The screenshot above shows the contact overview from the main "Contacts"
application - applications can also embed this view or use it as a dialog. All
the contacts imported from a Nokia N900 that has been in use for over 10 years.

.. image:: /images/contacts-myinformation.png
  :height: 324px
  :width: 576px

This is the screen of the personal information of the user of the device.

.. image:: /images/contacts-settings.png
  :height: 324px
  :width: 576px

Some of the contact settings are not fully implemented yet - for example, we
don't support video calling yet, but at least the setting is there.

.. image:: /images/contacts-options.png
  :height: 324px
  :width: 576px

This screenshot shows the context menu of the contacts application in the
overview window.

.. image:: /images/contacts-newcontact.png
  :height: 324px
  :width: 576px

Creating new contacts is also possible!

conversations
-------------

We've been working on an open source replacement for the Conversations
application, with many of the core components written by a newcomer - ``dsc``.
The `replacement is written in Qt5 and QML
<https://github.com/maemo-leste/conversations>`_, and can currently read and
show the rtcom communications database, but has only limited addressbook
integration. We have had some luck integrating Telepathy, and both sending and
receiving SMS/IRC/XMPP messages works (including logging the messages to the
RTcom database), but the code is not yet available in the package repositories,
as there are still some bugs to solve when using multiple Telepathy accounts.

For it to fully work, more work is also required for the Telepathy integration
in other parts of the system, in particular we need to get some of the other
RTCom components in place. `This wiki page
<https://leste.maemo.org/User:Wizzup/Telepathy>`_ contains some notes on the
various components, but it hasn't been kept up to date with the latest
developments yet.

The following still needs to be fixed up or outright implemented:

* Support for starting a new chat with a potentially unknown contact
* Support for multi-person chat rooms
* Support for multiple accounts (this should in theory work, but we have to
  debug how we use Telepathy Qt here)
* Various UI improvements to clearly separate the different protocols
* Better support for system themes, some of the assets are currently
  semi-hardcoded in the QML files

Nevertheless - here are some screenshots of the current application.

The screenshot below shows the recent messages overview, scrolling in this
screen is also very smooth.

.. image:: /images/conversations-overview.png
  :height: 324px
  :width: 576px

The settings in Conversations are currently limited to switching between the
built-in themes and changing the text scaling.

.. image:: /images/conversations-settings.png
  :height: 324px
  :width: 576px

The chat view of a specific conversation typically looks something like this

.. image:: /images/conversations-dapsi-message-view-landscape.png
  :height: 324px
  :width: 576px

and it works in portrait mode, too!

.. image:: /images/conversations-dapsi-message-view.png
  :width: 324px
  :height: 576px


.. .. image:: /images/conversations-dapsi-message-view-irssitheme.png
..   :width: 324px
..   :height: 576px

And of course, we just have to show off the irssi theme...

.. image:: /images/conversations-dapsi-message-view-irssitheme-landscape.png
  :height: 324px
  :width: 576px



rtcom-accounts-ui
-----------------

The user interface to configure communication accounts is ``rtcom-accounts-ui``,
which ``freemangordon`` has also been working on. Currently there is already a
control panel plugin, which allows configuring a XMPP account. We will be
integrating this into conversations Telepathy support, at which point we should
soon have working communications for many protocols. At that point, we'll add
more plugins for ``rtcom-accounts-ui`` to support more protocols.

The last piece of this work will be getting ``rtcom-presence-ui`` into shape,
which adds presence and also (we believe) managing the online status of the
Telepathy accounts of the user.

These screenshots show the control panel applet in action (and no, we didn't forget
to remove the email address or name):

.. image:: /images/rtcom-accounts-list.png
  :height: 324px
  :width: 576px

.. image:: /images/rtcom-account-edit.png
  :height: 324px
  :width: 576px

.. image:: /images/rtcom-account-advanced.png
  :height: 324px
  :width: 576px


The relevant repositories are here:

* https://github.com/maemo-leste/libaccounts
* https://github.com/maemo-leste/rtcom-accounts-ui
* https://github.com/maemo-leste/rtcom-accounts-plugin-gtalk
* https://github.com/maemo-leste/rtcom-accounts-ui-client

sphone
------

The sphone dialer application has gained basic support for the Maemo address
book, and it can also write text and call events to the RTCom database. This
means that all incoming messages and calls are being logged (that's a good
thing) -- in the future other applications (like conversations) will likely deal
with the logging of incoming messages, though.

.. image:: /images/sphone-contacts.png
  :height: 324px
  :width: 576px


charging-mode
-------------

Our latest images (and also upgraded devices) now ship with a feature called
"charge mode", which will boot to a special charging-only mode when the phone
starts with a usb cable providing power. This was created (based on existing
software) by ``uvos``, and here is a video he made to show off the work:

.. raw:: html

    <video controls height="480px" width="720px">
    <source src="images/charge-mode.webm" type="video/webm">
    </video>


Virtual keyboard
----------------

The virtual keyboard has a mode where it only shows special keys - this had
silently been broken but has since been fixed.

maemo-launcher
--------------

maemo-launcher has seen some fixes with regards to resolving symlinks that are
multiple levels deep, see `issue #484 <https://github.com/maemo-leste/bugtracker/issues/484>`_.
This helps selecting alternative default terminal applications.

hildon-desktop
--------------

``uvos`` fixed a particularly interesting bug in hildon-desktop where scrolling
the applications would immediately stop scrolling when the touch event ended
(i.e. the user stopped touching the touch screen), this was ultimately related
to a time overflow, and since ``Fri May 15 02:09:25 2015 UTC`` the scroll
events were no longer smooth. See `PR 17
<https://github.com/maemo-leste/hildon-desktop/pull/17>`_ for more details.

hildon-desktop also now `quotes commands send to the terminal emulator
<https://github.com/maemo-leste/hildon-desktop/pull/18>`_, ensuring that the
commands get through correctly.

libhildondesktop will now also (re)load applications and widget applets upon
install, `fixed in this commit
<https://github.com/maemo-leste/libhildondesktop/commit/b672af1a60fadbf0453befb908ebf4fc74312b8d>`_,
for some more information, one can also check out `issue 459
<https://github.com/maemo-leste/bugtracker/issues/459>`_.

GTK 3 and higher applications now render properly in fullscreen mode, see
this `libmatchbox PR #8 <https://github.com/maemo-leste/libmatchbox2/pull/8>`_.


Volume applet
-------------

It is now possible to change the volume of the headphones or speakers (depending
on what is active) using the volume buttons. `maemo-statusmenu-volume pull
request #1 <https://github.com/maemo-leste/maemo-statusmenu-volume/pull/1>`_ and
the follow up `pull request #2
<https://github.com/maemo-leste/maemo-statusmenu-volume/pull/2>`_ made this
possible.

.. image:: /images/volume-applet.png
  :height: 324px
  :width: 576px



Additional Software changes
===========================


ofono
-----

The ofono version for all our supported devices has been updated to a more recent
release - ofono 1.34. We've additionally also merged in some more patches for
better pinephone support (see `issue #597
<https://github.com/maemo-leste/bugtracker/issues/597>`_ and `issue #598
<https://github.com/maemo-leste/bugtracker/issues/598>`_)

Having all devices on the same ofono package also helps with maintainability!

gtk2
----

Our Gtk2 sliders weren't as repsonsive to touch input as they should be, due to
some Maemo patches that were missing. This is now fixed, see `issue #582
<https://github.com/maemo-leste/bugtracker/issues/582>`_ for more info.


.. libicd-network-wpasupplicant
.. ----------------------------
.. 
.. * libicd-network-wpasupplicant segfault fix when net->type NULL

Themes on images
----------------

At some point, loading themes was broken on our 32bit image builds (`see issue
#599 <https://github.com/maemo-leste/bugtracker/issues/599>`_ for what that
looks like), but this has since been fixed. The problem turned out to be a
problem in QEMU where `readdir()` would fail for a 32 bit guest on a 64 host. We
worked around this problem by adding an additional image building machine that
is 32 bit.


Pulseaudio configuration
------------------------

We have improved the pulseaudio setup on the devices, in particular:

* We now set the correct default audio sink on the Pinephone
* All devices should not automatically switch upon headphone plug or unplug
  events, using the switch on port module
* We have added the ability to add arbitrary other config files in
  the ``/etc/pulse/leste.pa.d`` directory.


System log (rsyslog) configuration changes
------------------------------------------

The latest ``leste-config`` separates out the logging so that it is easier to
track down problems by reviewing the logs. Some daemons got their own log files
in ``/var/log/maemo``, like ``icd2``, ``mce``, ``ofono``, ``dsme``, and so on.
See `issue #588 for some more details <https://github.com/maemo-leste/bugtracker/issues/588>`_.

Debugfs entries in fstab
------------------------

Upon installation of the ``leste-config`` package, the install scripts will
check if ``debugfs`` is present in ``/etc/fstab``, and if not, it will add a
line to mount it. This will not remain the case forever (as it can potentially
lead to more security issues), but various kernel power management tweaks are
only available through ``debugfs``, so for now we have to keep it mounted.


Default DNS server is none is provided
--------------------------------------

In some rare cases where a network does not provide a DNS server over DHCP,
devices running Maemo Leste would not be able to resolve any addresses over DNS,
as no server was available.

We have decided to default to `9.9.9.9` (aka "Quad9") is nothing else is
available. In the future we might replace this by just running a recursive DNS
resolver on the device itself. See `this commit on libicd-network-ipv4
<https://github.com/maemo-leste/libicd-network-ipv4/commit/49afd837bf5a7764c0cc59854aad2b01175088a4>`_
for some more information. **We also very much welcome feedback** regarding
alternative or better default DNS servers - we have simply tried to make a
decision based on privacy and availability.


libsdl1 environment variables and enabling GLESv1 in mesa
---------------------------------------------------------

For some reason, Debian no longer enabled OpenGLES 1.0 in the Mesa builds. We
have changed that in our Mesa build, once again enabling GLESv1. 

Additionally, we have added some enviroment variables that make SDL prefer EGL
over GLX, as that is generally better supported on our devices.

CSSU Features Configuration Editor
----------------------------------

We have ported the `CSSU features program
<http://wiki.maemo.org/CSSU_Features_Configuration_Editor>`_ from Maemo
Fremantle's CSSU.  This tools allows customising various parts of hildon-desktop
and animations in the environment in general. The port is still work in
progress, as some of the original user interface design files seemingly were not
included in the source package (and yes there is a small menu key `Main` in the
top right that shouldn't be there :-)).

The port is somewhat noteworthy since it's a Python Qt5 package using hildon
specific features.

.. image:: /images/cssufeatures.png
  :height: 324px
  :width: 576px


Community and supporting software updates
=========================================


Keyring and Jenkins updates
---------------------------

Our key for the "extras" repository silently expired (not the first time), but
now we had an easier way to providing updates, by just updating our keyring
package. We have also upgraded our Jenkins instance to the latest version(s),
and are working on adding a Honeycomb LX2 machine for fast ARM package builds.

Mediawiki theme
---------------

IRC user ``ashley`` contributed a forward-port of the old Maemo mediawiki theme
as a selectable theme on our wiki, `and you can preview it here
<https://leste.maemo.org/index.php?title=Tor&useskin=maemo>`_. If you like the
theme, you can make it the default from the preferences in mediawiki. See `issue
#590 <https://github.com/maemo-leste/bugtracker/issues/590>`_ for some more
information.


What's next
===========

Getting Telepathy support for conversations fully worked out together with the
RTCom applications will be an amazing thing for our mobile operating system.
Once that is working well, we can start adding support for more protocols (we're
working on a Telepathy signal plugin using signald), and perhaps also fix up
telepathy-hazy, which allows running many Pidgin (libpurple) protocols inside
Telepathy.

From a stability standpoint, there are some bugs to be investigated still, in
particular for the ofono support of the Droid series that we support. There are
also some things to improve further for 2D/3D support, but it's looking much
better than before.

This year we also hope to the new Devuan chimaera (Debian bullseye) release,
further modernising our codebase and building on top of the latest and greatest
that the free software community has to offer.

Finally, we're slowly but surely getting all our of userland in place, while
still heavily working on device support for the devices we support. Once
userland is more or less complete, it will probably get much easier to port
Maemo Leste to other (potentially newer) devices, so look forward to that too.


Interested?
===========

If you have questions, are interested in specifics or helping out, or wish to
have a specific package ported, please see our bugtracker.

**We have several Nokia N900 and Motorola Droid 3, Droid 4 and Bionic units
available for interested developers**, so if you are interested in helping out
but have trouble acquiring a device, let us know.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
