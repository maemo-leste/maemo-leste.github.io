Maemo Leste - fifth update (September + October) 2018
#####################################################

:Category: news
:tags: n900, xterm, nexus 5, alpha, qt, usb, openfest, fosdem, pine64, pinephone, lima
:date: 2018-11-06 23:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


It's been a while since our `fourth update
<{filename}/maemo-leste-july-2018-update.rst>`_
and there's quite some stuff to talk about!


Don't forget that we have a mailing list - `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_. Be sure
to subscribe for updates, questions and development. The mailing list archives
are now also functional: https://lists.dyne.org/lurker/mindex/maemo-leste@19700101.000000.00000000.en.html


Software additions
------------------

There have been lots of changes all over the place, below follows an attempt to
highlight some of those changes.

Boot issues resolved
~~~~~~~~~~~~~~~~~~~~

`issue #83 <https://github.com/maemo-leste/bugtracker/issues/83>`_ is now fixed and
the lock screen now works properly on boot, without requiring parallel boot to
be enabled (in fact, parallel boot is still buggy, so don't enable it).

Scrolling in osso-xterm
~~~~~~~~~~~~~~~~~~~~~~~

Spinal84 `fixed scrolling in osso-xterm <https://github.com/maemo-leste/osso-xterm/pull/1>`_,
which is a really welcome addition.

USB Gadget/Host/OTG mode
~~~~~~~~~~~~~~~~~~~~~~~~

Maemo Leste uses the Linux `gadget configfs <https://www.kernel.org/doc/Documentation/usb/gadget_configfs.txt>`_
to configure USB gadgets. The userspace library used to interface
with the kernel configfs is `libusbgx <https://github.com/maemo-leste/libusbgx>`_.

The new `hildon-usb-gadgets <https://github.com/maemo-leste/hildon-usb-gadgets>`_
package uses libusbgx to implement two simple gadgets: a network gadget and a
mass storage gadget. The mass storage gadget needs significantly more work, so
it's mostly a stub right now.

This is complemented by the initial udev-enabled (previous versions relied on
the now deprecated hal) version of `ke-recv <https://github.com/maemo-leste/ke-recv>`_,
which received kernel events regarding usb cable plugging and managed the gadget
mode of the phone. The branch "nextgen-usbhack" contains the udev work and
hildon-usb-gadgets integration.

The same udev code was used to bring up `hildon-status-bar-usb
<https://github.com/maemo-leste/hildon-status-bar-usb>`_, the lengthy path to
getting this to work is documented in
`issue #39 <https://github.com/maemo-leste/bugtracker/issues/39>`_

The result of this work can be seen here:

.. image:: /images/n900-usb-pcsuite-3.png
  :height: 324px
  :width: 576px

.. image:: /images/n900-usb-pcsuite-1.png
  :height: 324px
  :width: 576px

.. image:: /images/n900-usb-pcsuite-2.png
  :height: 324px
  :width: 576px

By default, ke-recv will always enter "PC Suite" mode for now, which really
just means that any device that is capable of usb peripherals will have usb
networking set up to ease debugging. The device will assign itself the static IP
`192.168.42.2`, so something like this on the host device should bring up
communication: `ifconfig usb0 up 192.168.42.1`.

More information on usb networking can be found on this page:
https://leste.maemo.org/Status/USB_Peripheral

This currently works on the Nokia N900, Motorola Droid 4, and Allwinner devices
(like the LIME2 and A33 Twister Tablet).

To be able to detect whether a device is connected to a PC or just a "wall
charger", we have to rely on musb (and other similar drivers). Unfortunately,
musb will only expose this state if a gadget is loaded. As a result, a usb
gadget is always loaded, even when it's not in use.

The `ke-recv` and `hildon-status-bar-usb` code still requires some significant
refactoring - they both share the same udev code, but right now this code is
just duplicated amongst the two projects. The `hildon-usb-gadgets` repository
could also see some more love - both in terms of the descriptors of the gadgets
and the actual code. So if you know some C - this might be a fun project to
pick up!


Nokia N900 LED control
~~~~~~~~~~~~~~~~~~~~~~

It turns out that some control over the `RGB led on the N900
<https://github.com/maemo-leste/bugtracker/issues/186>`_ already works
using mce.

Simply running the following command::

    echo 0 > /sys/class/power_supply/bq24150a-0/stat_pin_enable

Will disable the LED override when the N900 is being charged, and then this dbus
command will show the communication LED pattern::

    dbus-send --system --type=method_call --dest=com.nokia.mce /com/nokia/mce/request com.nokia.mce.request.req_led_pattern_activate string:"PatternCommunicationIM"

This command will disable the pattern::

	dbus-send --system --type=method_call --dest=com.nokia.mce /com/nokia/mce/request com.nokia.mce.request.req_led_pattern_deactivate string:"PatternCommunicationIM"

In fact, other Maemo.org examples also work on Leste already, `like this message dialog created using dbus and Python <https://wiki.maemo.org/Phone_control#Make_an_.22Email_Style.22_notification_dialog>`_::

	import dbus
	bus = dbus.SessionBus()
	proxy = bus.get_object('org.freedesktop.Notifications', '/org/freedesktop/Notifications')
	interface = dbus.Interface(proxy,dbus_interface='org.freedesktop.Notifications')
	interface.Notify('Notification', 0, 'control_bluetooth_paired', 'Testing 123', 'Hello World', [], {}, 0)

Results in:

.. image:: /images/leste-message.png
  :height: 324px
  :width: 576px


New kernel and image for the A33 Twister tablet and the LIME2
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There is now a first image available for the `A33 Twister tablet
<https://leste.maemo.org/A33-TurboX-Twister>`_. The image features working
usb gadget/otg,  battery, charging, touchscreen and `(unstable) wireless
<https://github.com/maemo-leste/bugtracker/issues/192>`_.
Currently, `backlight is not working
<https://github.com/maemo-leste/bugtracker/issues/191>`_, so the screen is not
very bright, and there is no 3D acceleration yet, and also no accelerated video
decoding yet.

On the 3D front, we have managed to run the open source 3D driver on the LIME2
(which will also work for other devices with Mali GPUs), the mesa gears demo
program works:

.. image:: /images/lima-lime2.jpg
  :height: 324px
  :width: 576px

However, the driver is not yet able to run the Hildon desktop UI - the kernel
hangs.

The source code for this driver can be found here:

* https://gitlab.freedesktop.org/lima/mesa
* https://gitlab.freedesktop.org/lima/linux

The lima driver is currently enabled in our LIME2 and A33 Twister tablet kernel
(4.18 based):

* https://github.com/maemo-leste/lime2-linux/tree/lime2-and-twister

However, the userland required to actually run any 3D demos is lacking, since it
requires a newer mesa (and other supporting packages), which are not currently
available in Devuan ascii.

The LIME2 images expect a 4.3 inch touchscreen to be connected, but should also
work over HDMI. *hildon-home* doesn't look so bad at 480x272px, does it?

.. image:: /images/lime2-home.png

Porting Maemo Extras packages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the advantages of being really close to Maemo Fremantle is that a lot of
the existing Maemo applications require minimal work to run on Maemo Leste. Out
of curiousity, we imported the wifi signal applet (`issue #185 <https://github.com/maemo-leste/bugtracker/issues/185>`_). The maemo.org extras page for the package is here: http://maemo.org/packages/view/wifi-signal-applet/

With minimal changes (https://github.com/maemo-leste/wifi-signal-applet) compiled and just works:

.. image:: /images/n900-wifi-applet.png
  :height: 324px
  :width: 576px

This package is now available in our main repository, as *wifi-signal-applet*.

Going forward, we should probably have a separate repository (or repository
component) for non-essential packages like the wifi-signal-applet. We'll have to
set up in a such a way that it easy for others to also submit and build
packages. `Feedback is welcome in ticket #194
<https://github.com/maemo-leste/bugtracker/issues/194>`_


Qt5 and gstreamer!
~~~~~~~~~~~~~~~~~~

*freemangordon* has started the immense task of porting the Maemo style and
widgets to Qt5, which is one of the last remaining big items for our N900 alpha
image:

* https://github.com/maemo-leste/qtstyleplugins
* https://github.com/maemo-leste/qtmaemo5

This screenshot shows Qt5 in action on Maemo Leste:

.. image:: /images/leste-qt5-widget-1.png
  :height: 340px
  :width: 400px

In the process, he also ported several mafw components to gstreamer 1.0 and
packaged them for Leste:

* https://github.com/maemo-leste/?utf8=%E2%9C%93&q=mafw&type=&language=

Once these components are in place, we could even look at porting `Open Media
Player <https://wiki.maemo.org/Open_Media_Player>`_ from Fremantle!

Packages from Maemo Fremantle that rely on Qt 4.x will likely need to be ported
to Qt 5 before they will run on Maemo Leste.




Documentation
-------------

*spinal84* has been working on adding documentation to various repositories and
he has also been working on generating the required doxygen documentation for
various projects:

* https://github.com/maemo-leste/mce/pull/1
* https://github.com/maemo-leste/ke-recv/pull/1
* https://github.com/maemo-leste/ke-recv-extra/pull/1
* https://github.com/maemo-leste/status-area-applet-battery/pull/1
* https://github.com/maemo-leste/icd2/pull/3

* https://github.com/maemo-leste/clockd/pull/3
* https://github.com/maemo-leste/icd2/pull/8

Images
------

*parazyd* has build new images for all the currently supported devices:

* Virtual machine: https://maedevu.maemo.org/images/virtual-machines/20181102/
* Nokia N900: https://maedevu.maemo.org/images/n900/20181103/
* Motorola Droid 4: https://maedevu.maemo.org/images/droid4/20181103/
* A33 Twister tablet: https://maedevu.maemo.org/images/turbox-twister/20181103/
* Raspi 2/3: https://maedevu.maemo.org/images/raspi2/20181103/
* N9: https://maedevu.maemo.org/images/n9/20181103/
* N950: https://maedevu.maemo.org/images/n950/20181103/

We have not been able to test all of them, so please do, and let us know if
something is broken!


Open issues
~~~~~~~~~~~

* For virtual keyboard to work, you have to reboot once after booting the
  fresh/new image. Then the virtual keyboard can be enabled from the settings
  `Text Input` applet.

* Several devices still lack 3D acceleration support, making the user experience
  particularly painful.


Community
---------

We're slowly but steadily moving forward and we seem to be attracting more
developers - which is fantastic news. Hopefully once we reach an Alpha state for
the Nokia N900, we will be able to reach out to more developers and get even
more people on board.


OpenFest 2018
~~~~~~~~~~~~~

Three of us got together at OpenFest 2018 in Sofia, Bulgaria.
We also held a presentation at OpenFest, the official videos will be made
available later, but the slides for the presentation can be downloaded here:
https://maedevu.maemo.org/media/openfest-2018-maemo-leste.pdf

Someone from the community has additionally also recorded the talk (thanks for
that), and you can find the recording here:
http://talk.maemo.org/showpost.php?p=1550095&postcount=152


FOSDEM 2019
~~~~~~~~~~~

We've submitted a proposal for a talk about Maemo Leste at FOSDEM; we hope that
it will be accepted. Additionally, we've submitted a request for a stand at
FOSDEM, together with the people from `postmarketOS
<https://postmarketos.org>`_!


PineTab, PinePhone?
~~~~~~~~~~~~~~~~~~~

`Pine64  <https://www.pine64.org/>`_ has announced that they are going to
produce an Allwinner tablet and an Allwinner phone. They are planning to
provide details before or at `FOSDEM 2019`_ [1]_ [2]_. An Allwinner phone will
hopefully be quite well supported by mainline, since most of the components have
drivers in mainline now - perhaps even the Lima driver will be usable on time.

We have reached out to Pine64, and they have kindly agreed to send development kits our way!

.. [1] https://itsfoss.com/pinebook-kde-smartphone/
.. [2] https://www.notebookcheck.net/Pine64-maker-of-cheap-Linux-laptops-may-be-making-a-cheap-Linux-phone.346011.0.html


What is next?
-------------

Most of our attention has been focussed on reaching the `Alpha release
<https://github.com/maemo-leste/bugtracker/milestone/4>`_ and we're down to 4
issues before we reach the alpha milestone.

Two issues pertain to reboot/poweroff not functioning as it should, one is for
Qt5 and one for the final pieces of the virtual keyboard - monitoring the slide
state of the keyboard (open or closed).


Nexus 5?
~~~~~~~~

Some time was also spent on working on the (upcoming!) `Nexus 5 port
<https://github.com/maemo-leste/bugtracker/issues/189>`_, which isn't quite
functional, as you can see:

.. image:: /images/leste-n5-initial.jpg
    :height: 400px
    :width: 526

There is a work in progress status page on our wiki: https://leste.maemo.org/Nexus_5


Interested?
-----------

If you're interested in specifics, or helping out, or wish to have a specific
package ported, please see our `bugtracker
<https://github.com/maemo-leste/bugtracker>`_.

Please also join our `mailing list`_ to stay up to date, ask questions and/or
help out. Another great way to get in touch is to join the `IRC channel
<https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join us!
