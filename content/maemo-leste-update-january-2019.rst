Maemo Leste - Eight Update (January + February) 2019
####################################################

:Category: news
:tags: droid4, n900, linux, modem, powervr, lima, allwinner, fosdem
:authors: Merlijn Wajer
:date: 2019-03-11 20:00

It's been two months since our `seventh update
<{filename}/maemo-leste-december-2018.rst>`_
and there's a lot to talk about!

Let's start off with a gentle reminder - don't forget that we have a mailing list -
`mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_. Be sure
to subscribe for updates, questions and development. The mailing list archives
are now also functional:
https://lists.dyne.org/lurker/mindex/maemo-leste@19700101.000000.00000000.en.html


Software additions
------------------

There have been various additions to our userspace, although most of the work in
the last two months has been focused on fixing bugs and driver/kernel support.


connui-cellular
~~~~~~~~~~~~~~~

freemangordon is still steadily working on connui, which is one of the core
components of our modem support:

* https://github.com/maemo-leste/connui-common
* https://github.com/maemo-leste/connui-cellular

Once a few other things are sorted (integration with `Telepathy
<https://telepathy.freedesktop.org/>`_) we will begin work on the `icd2` oFono
plugin, which will provide the actual connectivity part.

https://github.com/maemo-leste/bugtracker/issues/196
https://github.com/maemo-leste/bugtracker/issues/195

PowerVR
~~~~~~~

There has been a lot of movement on the PowerVR side (the 3D acceleration unit/
GPU that a number of our supported devices - such as N900 and the Droid 4 - use).

Developers from various platforms and devices are now trying to work on a single
PowerVR patchset for mainline to make it easier to support new devices, and
eventually attempt to mainline various kernel components. Since a couple of
weeks, there is now a Github repository that contains recent kernel sources with
some form of PowerVR support: https://github.com/openpvrsgx-devgroup

A mailing list for this effort is still being worked out, but the initial
message (over a year ago) can be viewed here:
https://www.pyra-handheld.com/pipermail/kernel/2018-January/002315.html

And the recent continuation can be read here:
https://www.pyra-handheld.com/pipermail/kernel/2019-February/003094.html (And in
thread form
https://www.pyra-handheld.com/pipermail/kernel/2019-February/thread.html#3094)

Hopefully there will soon be a base to support PowerVR on `omap`, `sunxi` and
`exynos` platforms.

Additionally, `spinal84` has, through truly admirable perseverance, figured out
how to work around the PowerVR hangs and general slowness of Maemo Leste on the
Nokia N900 and we've been working on `ensuring those fixes end up in the alpha
(#218) <https://github.com/maemo-leste/bugtracker/issues/218>`_

You can see a video of PowerVR on Maemo Leste with better performance here:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/M28Ojvg9i9Q"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>



Generic 64 bit ARM rootfs
~~~~~~~~~~~~~~~~~~~~~~~~~

There is now a generic root filesystem image for 64 bit ARM devices available,
see `#205 <https://github.com/maemo-leste/bugtracker/issues/205>`_:

    https://maedevu.maemo.org/images/arm64-generic/

This is useful for adding support for a new arm64 device. Previously we had to
take the Raspberry Pi 3 image and remove device specific packages/drivers.
The PineTablet and PinePhone will probably make some use of this generic rootfs.

Device support
--------------

The last two months have been particularly exciting for device support. Both the
Nokia N900 and the Motorola Droid 4 now ship with Linux 5.0 with some additional
patches.

Nokia N900
~~~~~~~~~~

Easier installation
*******************

For the Nokia N900, a new (and easier) way to install Maemo Leste is available
and `documented on our wiki
<https://leste.maemo.org/Nokia_N900#If_you_don.27t_want_to_use.2Finstall_Fremantle.2C_or_want_to_install_quickly>`_ -
it is aimed only for users who have no intention of running the old Maemo
(Fremantle). Suggested improvements are welcome, please add them to this ticket:
`Provide a way to flash leste (or u-boot) directly
<https://github.com/maemo-leste/bugtracker/issues/211>`_

Newer images for the Nokia N900 are also available:

    https://maedevu.maemo.org/images/n900/


-funroll-all-loops
******************

And a performance optimised clutter and hildon-desktop are (temporarily)
available here, kindly provided by `spinal84`:

    https://maedevu.maemo.org/images/n900/hd-temporary/

**Before you install this optimised clutter and hildon-desktop, ensure that your
installation is up to date, either by installing the latest image and upgrading
or just running apt update && apt upgrade!**

You can install these packages by downloading both, and then running:

    dpkg -i hildon-desktop_2.2.160_armhf.deb libclutter-0.8-0_0.8.2-0maemo68_armhf.deb

Subsequent updates might replace your optimised hildon-desktop again, but you
can reinstall it with the same command.


Linux 5.0
*********

Newer kernel images for the Nokia N900 are also available, but you will have to
make sure that your `/boot` partition is an `ext2` filesystem, older Maemo Leste
images shipped with `/boot` as a `vfat` partition. You can copy all the files
in `/boot` to a temporary location, and then call `mkfs.ext2` on the boot
partition and finally copy the files back. Here is a screenshot of Maemo Leste
on the Nokia N900 using Linux 5.0:

.. image:: /images/leste-n900-linux-5.0.png
  :height: 324px
  :width: 576px

Faster charging
***************

The N900 will now charge using up to 950mAh, instead of the previous 650mAh, see
`this pull request for n9xx-linux
<https://github.com/maemo-leste/n9xx-linux/pull/4>`_.


rebooting, who does that anyway?
********************************

All known problems regarding device shutdown and reboot have been fixed:

* `N900: Device Does Not Boot After Shutdown From System Menu Until Battery Removed <https://github.com/maemo-leste/bugtracker/issues/125>`_
* `Not possible to shutdown the system (N900) <https://github.com/maemo-leste/bugtracker/issues/85>`_


`lookenpeepers <https://en.wikipedia.org/wiki/Blinkenlights>`_
**************************************************************

The LED patterns on the Nokia N900 should now also work just like Fremantle, see
`#186 <https://github.com/maemo-leste/bugtracker/issues/186>`_.


Motorola Droid 4
~~~~~~~~~~~~~~~~

The Motorola Droid has seen some love - the most significant changes are way
better kernel and driver support. The device is still not particularly useful
for day-to-day usage due to the lack of PowerVR acceleration (but we'll get
there). Experimental modem support is now in place, as well as audio and GPS
support. This is the result of years of hard work from various people in the
FOSS community, and it's amazing how well supported the device has become.

The Droid 4 is now also on Linux 5.0:

.. image:: /images/droid4-linux-5.0.png
  :height: 360px
  :width: 613px

Giving Android the kexecboot
****************************

It should now be a lot easier to install Maemo Leste, thanks to all the work
done by Tony Lindgren on `kexecboot
<https://github.com/tmlind/droid4-kexecboot>`_. The installation process is
documented on our wiki:

  https://leste.maemo.org/Motorola_Droid_4#Installation_using_kexecboot

Make sure that you use the latest images, since they have been modified to work
well with kexecboot:

    https://maedevu.maemo.org/images/droid4/

The latest images also contain a Debian kernel package for the kernel (`see #220
<https://github.com/maemo-leste/bugtracker/issues/220>`_:
`linux-image-droid4` (currently at version `5.0.0+1m7.1_armhf.deb`), and the source
can be found here: https://github.com/maemo-leste/droid4-linux

https://github.com/maemo-leste/bugtracker/issues/206

Audio
*****

Audio works now too, including various switches to control the modem and echo
cancellation:

.. image:: /images/droid4-alsamixer.png
  :height: 360px
  :width: 613px

oFono support
*************

Pavel Machek has been working on `oFono support for the Droid 4
<https://github.com/pavelmachek/ofono/tree/d4>`_, and we will attempt to package
that work for the Droid 4 soon. Then we should hopefully have a working UI test
voice calls.


Random screenshot
*****************

The Droid4 is generally more responsive than the Nokia N900 when it comes to CPU
and IO bound operations, but this is not yet visible due to everything being
rendered through a 3D pipeline on the cpu. Regardless, here's a screenshot with
various applications running on the Droid 4:

.. image:: /images/droid4-various-apps.png
  :height: 360px
  :width: 613px


PinePhone "Anakin" Devkit
~~~~~~~~~~~~~~~~~~~~~~~~~

Pine64 PinePhone first development kit was sent to us some time before FOSDEM,
and it took quite some time to test out various patch sets and fixes to these
patch sets, but now the display works well, and the lima driver also works. The
lima driver is still experimental, and hildon-desktop tends to crash under lima,
but we'll get to solving those issues eventually.

At FOSDEM, the UBPorts people figured out how to make the touchscreen work as
well, so we will probably release an image some time soon for the devkit, as it
should quite closely match the upcoming PineTab.


Community
---------

Devuan Conference
~~~~~~~~~~~~~~~~~

There is a Devuan (the distribution that Maemo Leste is based on) conference in
Amsterdam in April, so if you're around, it might be fun checking it out:
https://devuan.org/os/debian-fork/d1conf-announce-20190119


FOSDEM
~~~~~~

FOSDEM 2019 was a lot of fun, and `we gave a lightning talk:
<https://fosdem.org/2019/schedule/event/maemo_leste_mobile/>`_

This video is optimised for 800*480 on Firefox 3.5
**************************************************

.. raw:: html

    <video width="750" height="441" controls>
      <source src="https://video.fosdem.org/2019/H.2215/maemo_leste_mobile.webm" type="video/webm">
      <p>Your browser doesn't support HTML5 video. Here is a <a
      href="https://video.fosdem.org/2019/H.2215/maemo_leste_mobile.webm">link
      to the video</a> instead.</p>
    </video>


The slides can be found here:

    https://maedevu.maemo.org/media/fosdem-2019-maemo-leste.pdf

After the talk, we chatted for over an hour in the hall next to the Lightning
Talks room. Several postmarketOS developers showed up, as did old Nokia
employees who actually worked on Maemo Fremantle! The people from Necunos also
showed up and demonstrated their prototype NC_1 board.


Mobile humans and martians
**************************

Also present at FOSDEM were people from PostmarketOS, UBPorts and KDE Plasma,
and we got together for a picture:

.. image:: /images/fosdem-meetup.jpg
  :height: 324px
  :width: 576px

Additionally, various community hardware vendors were also present. The Pine64
community had a stand, where they presented their first phase `Anakin devkit
<http://wiki.pine64.org/index.php/Project_Anakin>`_ and the `"Don't be evil"
<http://wiki.pine64.org/index.php/Project_Don%27t_be_evil>`_ second phase
devkit. Maemo Leste will receive several "Don't be evil" devkits somewhere this
months, when they start shipping. In fact, there is already a placeholder for
Maemo Leste OS releases:
http://wiki.pine64.org/index.php/Project_Don%27t_be_evil#Maemo_OS_build

Some of us also met with the Necunos team and discussed some more details of
their upcoming device, of which Maemo Leste will also receive a devkit.

Artwork
~~~~~~~

A member of `talk.maemo.org <http://talk.maemo.org>`_ created this `Crest of
Maemo <https://talk.maemo.org/showthread.php?t=100648&highlight=maemo+legend>`_
and offered to send it our way!

.. image:: /images/crestofmaemo.jpg
  :height: 866px
  :width: 688px


A loving fan has created this large reproduction of the Nokia N900,
including `hildon-desktop`, the `osso-xterm` application, the status applets and
even real backlight! The metal theme looks quite good, too.

.. image:: /images/n900-giant-reproduction.jpg
  :height: 400px
  :width: 600px


Some screenshots
~~~~~~~~~~~~~~~~

The next couple of updates will probably be accompanied with screenshots showing
off some software straight from Debian repositories running on Maemo Leste, to
show off how many applications are already available.

Cute theme?
***********

Qt5 applications can be started with different themes, this is Wireshark with
the default theme:

.. image:: /images/wireshark-leste.png
  :height: 324px
  :width: 576px

And this is wireshark with our (work in progress) Qt5 theme:

.. image:: /images/wireshark-leste-style-wip.png
  :height: 324px
  :width: 576px

Wireshark is not particularly usable on such a small resolution regardless, but
at least the theme fits - usability aside.


GTK
***

Other applications from Debian are also quite usable, without any recompilation
whatsoever. This is GMPC, the Gnome frontend of MPD, the music player daemon.
(These applications are not "hildonised", that is, they are not optimised for
Maemo Leste per se, but it does goes to show that this might not always be
necessary either):

.. image:: /images/gmpc.png
  :height: 324px
  :width: 576px

And here are it's initial assistant dialogs:

.. image:: /images/gmpc-assistant.png
  :height: 324px
  :width: 576px

.. image:: /images/gmpc-assistant-2.png
  :height: 324px
  :width: 576px


In this case, the virtual keyboard is also integrated in standard Debian gtk
applications, such as netsurf, a very lightweight browser:

.. image:: /images/netsurf-vkb.png
  :height: 324px
  :width: 576px

And the resulting web page render:

.. image:: /images/netsurf-maemo-leste.png
  :height: 324px
  :width: 576px


What is next?
-------------

The last missing item before we release an Alpha is to add support for
keyboard slide monitoring to either `mce` or `ke-recv-extra`, so that the slide
value for the keyboard is set properly in gconf. This is required to have the
virtual keyboard behave on phones with physical keyboards: if the keyboard is
opened, then we only want to present special symbols not present on the
keyboard, if the keyboard is closed, then we may want to present the full
virtual keyboard instead.

Other than that, it seems like we've reached almost all of our `Alpha goals
<https://github.com/maemo-leste/bugtracker/milestone/4>`_,
to the point that we might actually issue the first Alpha release soon!

We may end up switching to Devuan Beowulf (Debian Buster) before or after the
Alpha, it depends on how time it takes to port to the newer release, as well as
the amount of bugs introduced by doing so.

We will likely also have one or two days of downtime on our Jenkins build
service while we migrate it to a more powerful server to speed up build times
and ensure that we will not run out of storage any time soon.

Personally, I hope that we will be able to get decent support for modems in
place soon: with `connui-cellular` well on underway it may soon be time to start
working on the `oFono` plugin for `icd2`. At least the Nokia N900 and Droid 4
now also have a working modem and (mostly) working oFono support, so that should
be promising.

Hopefully we'll also get PowerVR support for the Droid 4 hammered out soon, that
will make the device a lot more usable.


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
