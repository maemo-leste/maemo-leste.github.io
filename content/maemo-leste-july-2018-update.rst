Maemo Leste - fourth update (July + August) 2018
################################################

:Category: news
:tags: n900, keyboard, wifi, alpha, icd, networking, connectivity
:date: 2018-08-31 23:39
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been a while since our `third update
<{filename}/maemo-leste-may-2018-update.rst>`_
and there's quite some stuff to talk about!

First of all, we now also have a `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_. Be sure
to subscribe for updates, questions and development. We hope to add a bit more
structure to our development by not just relying on IRC, but also mailing lists,
acknowledging that this is likely a more widely accepted method for coordinating
development. We'll see how that pans out!

Software additions
------------------

The last two months were focussed mostly on wrapping on some projects and
integration, we hope to close the `N900 Alpha release milestone
<https://github.com/maemo-leste/bugtracker/milestone/4>`_ soon.


Virtual keyboard
~~~~~~~~~~~~~~~~

The **virtual keyboard implementation is now usable**, and works
(almost!) out of the box on the latest Nokia N900 images. We've added the
`hildon-input-meta` package, which, together with some files from Fremantle,
makes the virtual keyboard work:

* https://github.com/maemo-leste/image-builder/commit/e5f273a647098352c1ee8491cb42908ac686796f

If you want a virtual keyboard on the Nokia N900, take the latest image, boot
it, then reboot it once it has fully booted. After that, go to `Settings`, `Text
Input` and check the `Use virtual keyboard` option. In future releases, this
likely will not be required, and we should able to close `issue #17
<https://github.com/maemo-leste/bugtracker/issues/17>`_ soon.

The special keys virtual keyboard (the one that complements a hardware keyboard,
if present) does not yet show up when the keyboard slide is open, unless this
gconf key is set::

    gconftool-2 -s /system/osso/af/slide-open -t bool true

**osso-xterm** now also supports the virtual keyboard, before this didn't work.

Networking
~~~~~~~~~~

**Wifi integration in the images is now also completed**, when using the latest
Nokia N900 image (or any device, really), wireless should work out of the box.
See our previous update on what is supported or not, and also check out the
`Wifi connectivity improvements
<https://github.com/maemo-leste/bugtracker/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Wifi+Connectivity+(improvements)%22>`_
milestone!

`EAP PAP for TTLS is now shown by default <https://github.com/maemo-leste/bugtracker/issues/136>`_

Location
~~~~~~~~

Some work has been done exploring our options for GPS, in `issue #57
<https://github.com/maemo-leste/bugtracker/issues/57>`_.

Audio
~~~~~

**Speakers are no longer muted by default** on the Nokia N900, see  `issue #58
<https://github.com/maemo-leste/bugtracker/issues/58>`_. Additionally, and
largely because of fixing this issue, status-area-applet-battery will no longer
warn about low battery levels if the battery is not (yet) calibrated (and thus
no longer make sad "low battery" sounds every minute or so).

Touch input
~~~~~~~~~~~~

**Support for capacitive touch devices** has been improved a lot, previously some
buttons and menus simply did not respond to touch events on capacitive screens,
notably the hildon application menu and the controls of hildon-home.

This has now been fixed, with changes to libmatchbox2 and hildon-desktop to
support touch events:

* https://github.com/maemo-leste/libmatchbox2/commit/5c18fb8583f14feab404b45853149adb502f2fcc
* https://github.com/maemo-leste/hildon-desktop/commit/bab369db0be57bca9366fe9e1a7cde0c40fffbb5
* https://github.com/maemo-leste/hildon-desktop/commit/180c5069e1a3ccc0e3a31c86a997ac1bdbc82d22

Power usage
~~~~~~~~~~~

Some initial research is being done on power usage/saving, **it is reported
that Maemo Leste currently uses about 90mA, versus the 10mA that Fremantle
uses**.  We hope to bring down the power usage a lot while more hardware
components get supported. See `issue #170
<https://github.com/maemo-leste/bugtracker/issues/170>`_


Images
------

There are now new (pre-alpha) images available for the Nokia
N900::

    https://maedevu.maemo.org/images/n900/20180831/


Open issues
~~~~~~~~~~~

* Lock screen and related functionality does not work yet. The issue here is a
  race condition in our startup script and X session scripts. The issue is
  documented in `issue #83
  <https://github.com/maemo-leste/bugtracker/issues/83>`_, and a temporary
  workaround is to issue these two commands after booting::

    dbus-send --system --type=signal /com/nokia/startup/signal com.nokia.startup.signal.init_done
    dbus-send --system --type=signal /com/whatever com.nokia.HildonDesktop.ready

* For virtual keyboard to work, you have to reboot once after booting the
  fresh/new image. Then the virtual keyboard can be enabled from the settings
  `Text Input` applet.



Documentation/Community
-----------------------

The amount of people actively contributing code is still only two. We need more
testers and developers.

If you're interested, please join the `mailing list`_, check out this thread on
maemo.org:

    https://talk.maemo.org/showthread.php?t=100192&page=1


Additionally, more work has been done on our `Wiki <https://leste.maemo.org/>`_,
with device status tables per device, as well as some additional instructions.

Here is an example of the current Nokia N900 page: https://leste.maemo.org/Nokia_N900

What is next?
-------------

The one big remaining item before we will reach the `N900 Alpha release
milestone`_ is Qt. Previously, we anticiated we would port over Qt4, but for
various reasons (gstreamer 0.10 vs 1.0 support being one of them) we will
instead attempt to port the Maemo Qt4 work to Qt5. This means that in the future
any software using Qt4 will have to be ported to Qt5.

`issue #83`_ causing the lockscreen not to work on boot will also need to be
addressed, possibly by drastically changing our X session startup scripts.

Once the Alpha release milestone has been reached, we will focus our attention
towards the `Beta release for the N900
<https://github.com/maemo-leste/bugtracker/milestone/3>`_, which should bring:

* 2G/3G/4G(?) data support in `icd2`
* (Very) basic/rudimentary voice calls
* A media player
* Support for usb gadgets and general usb integration: porting `hildon-status-bar-usb` and `ke-recv`
* Vibration, proximity sensor and accelerometer support

Maybe, if we need a distraction, we will look at `Wireguard integration
<https://github.com/maemo-leste/bugtracker/issues/130>`_.

Interested?
-----------

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

Please also join our `mailing list`_ to stay up to date, ask questions and/or
help out.

If you like our work and want to see happen and continue, join us!

We're currently on irc.freenode.net in #maemo-leste, but also hang out in
#maemo. We also monitor the mailing list and github issues closely.
