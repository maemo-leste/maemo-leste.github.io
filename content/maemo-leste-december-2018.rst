Maemo Leste - sixth update (November) 2018
##########################################

:Category: news
:tags: arm64, aarch64, raspi3, fosdem, lima
:date: 2018-12-31 23:50
:authors: Merlijn Wajer

TODO: DATE


It's been a while since our `sixth update
<{filename}/maemo-leste-november-2018.rst>`_
and there's quite some stuff to talk about!


TODO:

* fosdem
* lima
* qt

* Link to lima post

* Next steps for Droid 4 and N900

* https://phoenix.maemo.org/job/osso-systemui-modechange-binaries/ (modechange
  is new)

* droid4 calls https://github.com/maemo-leste/bugtracker/issues/150#issuecomment-450674998
  - calls milestone?

* necunos? NC_1
* pinetablet @ fosdem

* Willen graag meer devices

* n900 u-boot

* droid4 modem work
* droid4 power saving

* anakin devkit noemen

* connui/cellular updates

* arm64 !!! raspi 3 images https://maedevu.maemo.org/images/raspi3-64bit/20181219/
* https://maedevu.maemo.org/images/n900/20181222/


* Could use some (more) test devices: droid4, nexus 5, ...

Motorola Droid 4 improvements
-----------------------------

* Mention modem patches (also bluetooth)?


Battery
~~~~~~~

* https://github.com/maemo-leste/bugtracker/issues/206
  https://patchwork.kernel.org/patch/10744035/


Nokia N900 improvements
-----------------------

todo: generally feels more like fremantle now

Flasher/u-boot work
~~~~~~~~~~~~~~~~~~~

TODO

* https://lists.denx.de/pipermail/u-boot/2018-December/353007.html
  https://lists.denx.de/pipermail/u-boot/2018-December/353008.html


Battery
~~~~~~~

* upower, status-area-applet-battery, mce (upower related) updates by Spinal:
  now works awesome on n900
  - https://github.com/maemo-leste/mce/pull/2
  - https://github.com/maemo-leste/status-area-applet-battery/pull/4
  - https://github.com/maemo-leste/upower/pull/3

* fixed https://github.com/maemo-leste/bugtracker/issues/167
* fixed https://github.com/maemo-leste/bugtracker/issues/67
* fixed https://github.com/maemo-leste/bugtracker/issues/70


PowerVR/GPU
~~~~~~~~~~~

* powervr perf improvements (properly setting clock rate)
* trying to fix the ioctl failed / slow-startup bug

SMS and Voice calls
~~~~~~~~~~~~~~~~~~~


* WIP voice calls
* https://github.com/maemo-leste/bugtracker/issues/174 : unicsy_demo packaged, libcmtspeechdata packaged


LEDs
~~~~

* https://github.com/maemo-leste/bugtracker/issues/186
* mce led patterns work properly now



Community
---------


What is next?
-------------

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
