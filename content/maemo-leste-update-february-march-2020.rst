Maemo Leste - Twelfth Update (February and March) 2020
######################################################

:Category: news
:tags: powervr, droid, n900, pinephone, theme, language, localisation, tv,
       extras
:authors: Merlijn Wajer, Ivan Jelincic
:date: 2020-03-24 01:00

.. TODO DATE

It's been several weeks since our `pre-FOSDEM 2020 update
<{filename}/maemo-leste-update-january-2020.rst>`_, and let's start with a few highlights:

* We switched from Devuan **ascii** (Debian stretch) to Devuan **beowulf** (Debian buster)
* Motorola Droid 4 images are available, with **3D acceleration and decent to
  good power management**: TODO
* **Pinephone images** are now available: TODO
* We gave a **main track talk at FOSDEM**:
  https://fosdem.org/2020/schedule/event/smartphones/
* N900 hardware support improvements such as TV-out, beginnings of camera
  support
* **Localisation support and theming** is now available from the control panel, with
  many languages already supported.



FOSDEM
======

We gave a main-track talk at FOSDEM 2020. The video is available here:

    https://fosdem.org/2020/schedule/event/smartphones/

**TODO**

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

The suggested way to upgrade is to download the latest image for your device,
and install the new image. Otherwise, if you're feeling adventurous, you can try
to use change `/etc/apt/sources.list`, change `ascii` to `beowulf`, and run `apt
update && apt dist-upgrade`.


Maemo Leste Extras
------------------

Not all extras packages have been ported yet: https://github.com/maemo-leste-extras/bugtracker/issues/4

If you're interested in helping out in porting existing packages, or even
maintaining your own packages for Maemo Leste, be sure to check out the
README in the `ticket tracking repository for Maemo Leste Extras!
<https://github.com/maemo-leste-extras/bugtracker>`_


Device support
==============

Motorola Droid 4
----------------

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


Here's a random Droid 4 lockscreen:

.. image:: /images/droid4-lockscreen.png
  :height: 324px
  :width: 576px

And the USB popup for usb networking and mass storage:

.. image:: /images/droid4-usbbar.png
  :height: 324px
  :width: 576px

Wireless
~~~~~~~~


Additionally, we've mostly fixed the wireless stability issues (`see #296
<https://github.com/maemo-leste/bugtracker/issues/296>`_. Apparently, the
wireless firmware and bluetooth firmware need to be loaded in a specific order,
and there currently is no way to do this properly in mainline Linux, so we've
resorted to blacklisting the bluetooth module for now.


Power management
~~~~~~~~~~~~~~~~

Power management is looking very promising (`0.01A` or less at `4.4V` when
idle). The package `droid4-powermanagement`
(https://github.com/maemo-leste/droid4-pm) is now available on the latest image,
and it should significantly improve battery life. Some work on MCE is pending,
but once that is merged, you (as a user) too will be able to enjoy this power
management (`#338 <https://github.com/maemo-leste/bugtracker/issues/338>`_,
`#340 <https://github.com/maemo-leste/bugtracker/issues/340>`_)

I would not be surprised if we can manage several days of battery time
in the next month or two.

Audio
~~~~~

Audio should work out of the box. You will find that the speaker and headphones
are muted, but the wiki will contain instructions on setting up the audio
mixers. **TODO**

Modem and calls
~~~~~~~~~~~~~~~

The Motorola Droid 4 image is capable of performing calls, but they do not work
via ofono yet. Pavel has been working on an ofono port for the Droid 4, and
hopefully others will help him out soon and complete the initial port. Having
ofono support in place will make the Droid 4 the ultimate developer device.

Custom bootup logo
~~~~~~~~~~~~~~~~~~

You can replace the Motorola logo on boot with a sweet Maemo Leste logo:

.. image:: /images/Droid4_leste_logo.jpg
  :height: 390px
  :width: 525px

Instructions can be found here: https://github.com/xsetiadi/droid4-kexecboot/blob/master/LOGO


Nokia N900
----------

The Nokia N900 has also seen some power management love, and we've been able to
reach deep idle states, which we also shared on twitter
https://twitter.com/maemoleste/status/1226265997981646849 -- however, this work
is not yet usable in the latest image.


TV out
~~~~~~

What is usable, is using the Nokia's composite out functionality, which kinda
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


Pinephone & Pinetab(let)
------------------------

We've also uploaded a Pinephone image! We uploaded one before, which we didn't
quite intend to share with the public yet, but Pine64 already shared our ascii
Pinephone image on twitter a while back:

    https://twitter.com/thepine64/status/1231702499305893891

Well, the beowulf image is here, and it's even better.

Still, keep in mind that these are images for developers. Some things definitely
do not work yet, and the lack of a hardware keyboard makes using some parts of
UI a bit of a challenge, at least the places where the virtual keyboard is not
yet available.

**TODO**


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

* https://github.com/maemo-leste/bugtracker/issues/306 -- yay

Themes available in the extras repository
-----------------------------------------

* marina theme is present - https://github.com/maemo-leste-extras/hildon-theme-marina/blob/master/template/template.png

hildon-theme-tools

https://github.com/maemo-leste/bugtracker/issues/336

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


Attached keyboard slider monitoring
-----------------------------------

**TODO** for virtual keyboard

* slide monitoring

Modem/cell updates
------------------

The "connui" userspace to interface with the modem is still being worked on, but
more progress was made recently. The pin entry dialog now works, on start, like
one would expect it to:

.. image:: /images/pinentry-n900.png
  :height: 324px
  :width: 576px

.. image:: /images/pinentry-n900-2.png
  :height: 324px
  :width: 576px

Once the pin is filled in (or skipped), the homescreen shows the operator name
and the RAT (radio access technology) that is currently in use:

.. image:: /images/homescreen-cellular-n900.png
  :height: 324px
  :width: 576px

This work is only available in the development repositories, as it's not stable
enough to be used on a day to be day basis without being aware of all the bugs.
Yours truly is working hard to get this piece finished.


Dialer
------

* https://wizzup.org/rhizo-dialer-test.png / https://github.com/DigitalHERMES/rhizo-dialer


Desktop widgets & calendar support
----------------------------------

https://github.com/maemo-leste/bugtracker/issues/326
https://github.com/maemo-leste/bugtracker/issues/203

Devices / Hardware
==================

Virtual Machine
---------------

New Virtual Machine images are available for download:

* https://maedevu.maemo.org/images/virtual-machines/20200324/

We build qcow2 images usually used with QEMU, VirtualBox VDI images, and Vagrant
images.


Nokia N900
----------

New images are available for download:

* https://maedevu.maemo.org/images/n900/20200323/


Motorola Droid 4
----------------

New images are available for download:
https://maedevu.maemo.org/images/droid4/20200323/


Audio
~~~~~



PowerVR / 3D acceleration
~~~~~~~~~~~~~~~~~~~~~~~~~


Pinephone/Pinetab
-----------------

New images are available for download:

* https://maedevu.maemo.org/images/pinephone/20200323/
* https://maedevu.maemo.org/images/pinetab/20200324/

These images are very usable, and have 3D acceleration with the open source Lima
drivers. There is still some jittery performance, but hopefully it will be fixed
with time as we go forward and the mesa driver gets improved.


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






To mention:

* https://github.com/maemo-leste/bugtracker/issues/302
* https://github.com/maemo-leste/bugtracker/issues/315
* Language names now resolve: https://wizzup.org/leste-input-method-languages.png https://wizzup.org/leste-input-method-languages-2.png
* pdf reader launcher fixes - https://github.com/maemo-leste/bugtracker/issues/280
* https://github.com/maemo-leste/bugtracker/issues/326
* https://github.com/maemo-leste/bugtracker/issues/330
