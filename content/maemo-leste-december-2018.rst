Maemo Leste - seventh update (December) 2018
############################################

:Category: news
:tags: todo
:date: 2018-12-31 23:50
:authors: Merlijn Wajer

TODO: DATE

TODO: TAGS

It's been a while since our `sixth update
<{filename}/maemo-leste-november-2018.rst>`_
and there's quite some stuff to talk about!
First of all, if you missed our `lima update
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

Aarch64 images
--------------

The first aarch64 images are now available, for the raspberry pi 3. They still
lack hardware acceleration, but almost all of the (essential) packages for Maemo
Leste are now also working/built for 64 bit arm:

    https://maedevu.maemo.org/images/raspi3-64bit/20181219/


Motorola Droid 4 improvements
-----------------------------

The Linux kernel developers^W^Wlittle elves have been working hard on improving
`modem support for the Motorola Droid 4
<https://lkml.org/lkml/2018/12/16/231>`_, which should make ofono and/or
modemmanager integration way easier, which is good news!

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

This `mce pull request <https://github.com/maemo-leste/mce/pull/2>` makes the
RGB led on the N900 also usable, and when the right patterns are enabled from
the Settings, the LED patterns should start to work just like in Fremantle!


Rebooting, Shutdown, Watchdog
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We've been working hard on fixing two of the last remaining alpha tickets:

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

`unicsy_demo has now been packaged (#174)
<https://github.com/maemo-leste/bugtracker/issues/174>`_, and success looks like
this:

.. image:: /images/n900-ofone-initial.png
  :height: 324px
  :width: 576px

Incoming SMS works, sending SMS works as well:

.. image:: /images/n900-ofone-incoming-sms.png
  :height: 324px
  :width: 576px

Working voice calls is still work in progress, see `Issue #77
<https://github.com/maemo-leste/bugtracker/issues/77>`_.


LEDs
~~~~

* https://github.com/maemo-leste/bugtracker/issues/186
* mce led patterns work properly now


Flasher/u-boot work
~~~~~~~~~~~~~~~~~~~

TODO

* https://lists.denx.de/pipermail/u-boot/2018-December/353007.html
  https://lists.denx.de/pipermail/u-boot/2018-December/353008.html




Mer mce, dsme, ...
------------------

**TODO**

Community
---------


What is next?
-------------

**TODO**

**TODO: device donations?**

Most of our attention has been focussed on reaching the `Alpha release
<https://github.com/maemo-leste/bugtracker/milestone/4>`_ and we're down to 4
issues before we reach the alpha milestone.

Two issues pertain to reboot/poweroff not functioning as it should, one is for
Qt5 and one for the final pieces of the virtual keyboard - monitoring the slide
state of the keyboard (open or closed).


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


TODO
----


* https://maedevu.maemo.org/images/n900/20181222/
* Aarch64 images?
* connui/cellular updates


TODO:
* lima
* qt

* Link to lima post

* Next steps for Droid 4 and N900

* https://phoenix.maemo.org/job/osso-systemui-modechange-binaries/ (modechange
  is new)

* droid4 calls https://github.com/maemo-leste/bugtracker/issues/150#issuecomment-450674998
  - calls milestone?


* Willen graag meer devices

* n900 u-boot

* droid4 modem work
* droid4 power saving

* anakin devkit noemen

* Could use some (more) test devices: droid4, nexus 5, ...
