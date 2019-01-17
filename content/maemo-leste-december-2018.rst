Maemo Leste - seventh update (December) 2018
############################################

:Category: news
:tags: lima, powervr, exynos, pine64, necunos, fosdem, aarch64, droid4, n900, u-boot, voice calls
:date: 2019-01-17 20:00
:authors: Merlijn Wajer


It's been a while since our `sixth update
<{filename}/maemo-leste-november-2018.rst>`_
and there's quite some stuff to talk about!

First of all, sorry for the delay in the update, it's overdue by almost two
weeks. Second of all, if you missed our `lima update
<{filename}/lima-alive-foss-mali-driver.rst>`_, make sure to check that out!

FOSDEM
------

There will be a lightning talk about `Maemo Leste at FOSDEM 2019
<https://fosdem.org/2019/schedule/event/maemo_leste_mobile/>`_ - we will try our
best to bring a couple of demo devices and show off Maemo Leste after the
lightning talk!

Pine64
~~~~~~

The Pine64 community will have a stand at FOSDEM, where they will
show their prototypes of the PineTablet and PinePhone - they might even be able
to show off Maemo Leste running on their prototypes.

Necunos NC_1
~~~~~~~~~~~~

`Necunos NC_1 and NE_1
<https://necunos.com/news/necunos-nc_1-and_ne_1-press-release/>`_ has launched,
and `can be ordered with Maemo Leste preinstalled
<https://necunos.com/shop/#!/Necunos-NC_1/p/127507133/category=0>`_ - at least,
if we manage to have a usable image by the time they plan to ship the devices -
we don't have Maemo Leste running in their device yet.

Necunos has told us that we will probably get a Necunos development kit at FOSDEM.

Aarch64 images!
---------------

The first aarch64 images are now available, for the raspberry pi 3. They still
lack hardware acceleration, but almost all of the (essential) packages for Maemo
Leste are now also working/built for 64 bit arm:

    https://maedevu.maemo.org/images/raspi3-64bit/20181219/

And the aarch64 packages are confirmed to also work on other devices - like the
Pine64 Anakin Devkit!


Motorola Droid 4 improvements
-----------------------------

The Linux kernel developers^W^Wlittle elves have been working hard on improving
`modem support for the Motorola Droid 4
<https://lkml.org/lkml/2018/12/16/231>`_, which should make ofono and/or
modemmanager integration way easier, which is good news!
We're tracking `ofono support for the Droid 4
<https://github.com/maemo-leste/bugtracker/issues/150>`_ in this issue.

And they also report that during `idle the phone battery life might be almost 5
days <https://lkml.org/lkml/2018/12/28/429>`_.

We have contributed a patch that should make the charger events on the Droid 4
fast, before the events were not send by the kernel, see `Issue #206
<https://github.com/maemo-leste/bugtracker/issues/206>`_. (`Patch here
<https://patchwork.kernel.org/patch/10744035/>`_)

PowerVR support for the Droid 4 should make the device quite usable, so that
should perhaps soon become a priority. We have a couple of spare Droid 4 devices
now, so if you're a capable developed and want to help out with kernel or
userspace development but don't have a device, we can perhaps arrange to get you
one.


Nokia N900 improvements
-----------------------

`spinal84` and `freemangordon` have made some great progress towards making Maemo
Leste on the N900 feel more like Maemo Fremantle - in a good way. Graphics are
more smooth, charging detection responds almost instantaneously now, and the RGB
led works like you're used to in Fremantle.

There are newer images, even though those are likely already a bit outdated:

    https://maedevu.maemo.org/images/n900/20181222/

Battery improvements
~~~~~~~~~~~~~~~~~~~~

spinal84 has been working on fixing up the battery/power parts of the N900, and
he has succeeded, with this `status-area-applet-battery pull request
<https://github.com/maemo-leste/status-area-applet-battery/pull/4>`_ and this
`upower pull request <https://github.com/maemo-leste/upower/pull/3>`_, state
changes in charging are now picked up instantly. (Fixes `#67
<https://github.com/maemo-leste/bugtracker/issues/67>`_ and `#70
<https://github.com/maemo-leste/bugtracker/issues/70>`_ and `#167
<https://github.com/maemo-leste/bugtracker/issues/167>`_)

RGB LED support
~~~~~~~~~~~~~~~

This `mce pull request <https://github.com/maemo-leste/mce/pull/2>`_ makes the
RGB led on the N900 usable, and when the right patterns are enabled from
the Settings, the LED patterns should start to work, soon we'll be able to close
`issue #186 <https://github.com/maemo-leste/bugtracker/issues/186>`_.


Rebooting, Shutdown, Watchdog
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We've been working hard on fixing two of the last few remaining alpha tickets:

* `N900: Device Does Not Boot After Shutdown From System Menu Until Battery Removed <https://github.com/maemo-leste/bugtracker/issues/125>`_
* `Not possible to shutdown the system (N900) <https://github.com/maemo-leste/bugtracker/issues/85>`_

Various fixes to dsme made a different, and in some setting now allow for clean
shutdown and reboot. However, more work seems to be required to make it always
work reliably. The PowerVR module for current kernel also has some bugs that
prevent clean shutdown.

https://github.com/maemo-leste/dsme/commit/8831309eebb232fbd7d6e678f7803e3177cdd458
https://github.com/maemo-leste/dsme/commit/2d4db8f5e14bc0f131ee5402915188b01968f8e0

On the subject of PowerVR...


PowerVR/GPU
~~~~~~~~~~~

A lot of time has been spent trying to figure out why PowerVR hangs for minutes
on startup. In this process, freemangordon wrote a patch to bring the PowerVR up
to it's proper clock speed, which greatly improves the performance of PowerVR in
general, but this unfortunately does not fix the slowness/hang on startup.

More investigation will be required to fix the temporary hang on start.


SMS and Voice calls
~~~~~~~~~~~~~~~~~~~

unicsy_demo, a tool to test and use various modem functionality (amongst other
things) `has now been packaged (#174)
<https://github.com/maemo-leste/bugtracker/issues/174>`_, and success looks like
this:

.. image:: /images/n900-ofone-initial.png
  :height: 324px
  :width: 576px

Incoming SMS works (sending SMS works as well):

.. image:: /images/n900-ofone-incoming-sms.png
  :height: 324px
  :width: 576px

Working voice calls is still work in progress, see `Issue #77
<https://github.com/maemo-leste/bugtracker/issues/77>`_.


2G, 3G and 4G data
~~~~~~~~~~~~~~~~~~

`freemangordon` has been doing more work on connui, to make it feasible to
implement the ofono/data plugin for icd2. Apart from a plugin icd2, there's more
work required, as we'll have to implement or replace various dbus interfaces
that Fremantle offers.

The current work can be found here:

* https://github.com/maemo-leste/connui-cellular
* https://github.com/maemo-leste/connui-common/commits/master

The next step will be to make an overview of all the work that needs to be done,
and then start picking up the tasks one by one.


Flasher/u-boot work
~~~~~~~~~~~~~~~~~~~

We're working on a way to make testing and installing Maemo Leste easier than
the current procedure - which involves installing and update Maemo Fremantle
before running Maemo Leste. `Issue 211
<https://github.com/maemo-leste/bugtracker/issues/211>`_ covers this in more
detail, but our hope is that we can make it so that users can flash u-boot to
the device, and then be able to directly boot Fremantle or Leste, or another OS,
like postmarketOS.

There is also some upstream churn going on regarding u-boot support for the
Nokia N900, see:

* https://lists.denx.de/pipermail/u-boot/2018-December/353007.html
* https://lists.denx.de/pipermail/u-boot/2018-December/353008.html


Lima
----

As mentioned in our last `lima update`_, the driver can now render
`hildon-desktop`. Not everything renders correctly, some borders are missing, as
can be seen here, but otherwise - it's working quite fast and smooth:

.. image:: /images/lima-twister-wifi.png
  :height: 300px
  :width: 512px

The lima mesa package in our repository is still on Mesa 18.2, while upstream
lima has moved to Mesa 18.3. We need to rebuild the latest 18.3 version and
check if it still works.

We also tried to compile lima for aarch64, but ran into internal errors in `ld`
when linking the final drivers:

    https://web.archive.org/web/20190117070625/https://phoenix.maemo.org/job/mesa-binaries/architecture=arm64,label=arm64/1/console

This is slightly problematic, because we need the aarch64 version for the Pine64
Anakin Devkit. But perhaps the issue will be gone with mesa 18.3.

If you want to follow lima activity, you can do so here:
https://gitlab.freedesktop.org/lima/mesa/activity


Maemo Leste and Mer
-------------------

`spiirion` has been working on making mer versions of some core software (like
`dsme` and `mce` work on Maemo Leste), at this point he has some of it working
here:

* https://git.merproject.org/spiiroin/mce-dev/tree/maemo-leste-hacking
* https://git.merproject.org/spiiroin/libdsme/tree/maemo-leste-hacking
* https://git.merproject.org/spiiroin/libiphb/tree/maemo-leste-hacking
* https://git.merproject.org/spiiroin/dsme/tree/maemo-leste-hacking
* https://git.merproject.org/spiiroin/mce/tree/maemo-leste-hacking
* https://github.com/spiiroin/mce-plugin-libhybris/tree/maemo-leste-hacking


Samsung S5PV210 support?
------------------------

Someone from the community named `PabloPL` has made impressive progress with
making an Exynos based phones work with mainline, `see the current status of
mainline plus patches here <https://github.com/PabloPL/linux/wiki>`_. The
Samsung Galaxy S (i9000) also has a PowerVR GPU, just like the Droid4, so
hopefully we can collaborate on making PowerVR better supported on mainline
Linux (although the userspace will probably remain closed forever).

`PabloPL` also has an open issue for supporting PowerVR:
https://github.com/PabloPL/linux/issues/18


Community
---------

What is next?
-------------

A lot has happened in the past month and a half, and it's been hard to focus on
one specific issue, but nevertheless we've made a lot of progress.

Our current software/driver goals are:

* Fix reboot/poweroff issues
* Make text and voice calls work on N900 and Droid4
* Fix PowerVR issues on N900, make PowerVR work on the Droid4
* Work on 2g/3g/4g data plugin for icd2

As for new hardware enablement/drivers, we plan to:

* Build the lima driver for mesa 18.3 for aarch64 and armhf
* Make Leste work properly on the Anakin kit, hopefully -before- FOSDEM
* Make Leste work on Necunos NC_1 development kit when we get one.

At that point, we're almost ready for the first alpha release. We might move the
(large) `Qt task <https://github.com/maemo-leste/bugtracker/issues/53>`_ to a
next alpha or beta release.  If you're experienced with Qt, we could definitely
use the help!

Finally, if you have a spare device that we currently already support, there
might be developers very happy to recieve it by post and make Maemo Leste work
(even) better! We now have a couple of spare Motorola Droid 4 devices that we
can give to developers who want to work on phone calls and/or powervr support.

If you have a spare Nexus 5 or Nokia N900, those might turn out to be quite
helpful as well.


Interested?
-----------

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay up to date, ask questions and/or
help out. Another great way to get in touch is to join the `IRC channel
<https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
