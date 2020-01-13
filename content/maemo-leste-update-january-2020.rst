Maemo Leste - Eleventh Update (January) 2020
############################################

:Category: news
:tags: n900, droid4, python, games, scummvm, brainparty, portait, pdf, pinephone
:authors: Merlijn Wajer
:date: 2020-01-13 01:00

It's been a few weeks since our `end of 2019 update
<{filename}/maemo-leste-update-october-2019.rst>`_, and let's start with a few highlights:

* We have a main track talk in the FOSDEM 2020 `Freedom Track
  <https://fosdem.org/2020/schedule/event/smartphones/>`_ - make sure to meet us
  there if you're attending FOSDEM.
* New `Virtual Machine`_ images are available: https://maedevu.maemo.org/images/virtual-machines/20200103/
* New `Nokia N900`_ images are available: https://maedevu.maemo.org/images/n900/20200112/
* New `Motorola Droid 4`_ images are available: https://maedevu.maemo.org/images/droid4/20200112/
* Leste **Extras** repository is now set up and usable.
* An overview of various (important) development tasks is tracked on the wiki: https://leste.maemo.org/Development/Tasks


*There will be a separate post for the Pinephone in the next few days, along with
images for the Pinephone.*


Software additions
==================

There have been many additions, bugfixes and improvements, perhaps best
illustrated by this screenshot of a developer's Nokia N900 running Maemo
Leste:

.. image:: /images/leste-swstate.png
  :height: 324px
  :width: 576px

The above screenshot shows the availability of python bindings (binary clock),
importing Fremantle themes, the progress of connui-cellular (status bar with 3G
logo, signal bar, operator name 'KPN' on the home screen), and homescreen shortcuts of
applications that have been ported, including a package manager and PDF reader.


Leste "Extras" software repository
----------------------------------

We now have a separate repository called `leste-extras` for non-core packages,
similar to the "Maemo Extras" repository -
http://maemo.org/downloads/updated/Maemo5/

Currently `leste-extras` contains a few games, emulators and status widgets.
Eventually, it will be home to status widgets, home widgets, different browsers,
map applications, games, and more.

https://github.com/maemo-leste-extras

Keep in mind that in addition to the packages available in this repository,
every package available in Debian can be installed using `apt-get install` -
usability will vary.

Wishlist
~~~~~~~~

If there is a specific application you would like to see (ported), the wiki now
contains an `Application Wishlist <https://leste.maemo.org/Wishlist>`_. Feel
free to add suggestions to the table.

Porting
~~~~~~~

Porting applications from Maemo Fremantle ("Maemo 5") is usually not very hard,
and sometimes particularly simple, as outlined in this `talk.maemo.org forum
post <https://talk.maemo.org/showpost.php?p=1563848&postcount=18>`_.
In general, if an application depends on libraries that are mostly available in
Debian, and uses gtk2, it should be not very hard to port. If it relies on Qt, it
is not yet possible to properly port it, as we do not have a usable Qt5 Hildon
port yet. A `gtk3 port is in the works
<https://github.com/maemo-leste/bugtracker/issues/261>`_ -but help is needed.

One application that was ported recently is the `PDF Reader`_.

Python support
--------------

`Maemo had pretty decent Python bindings and documentation for them
<http://wiki.maemo.org/PyMaemo>`_ -- and they were only available for Python
2.5, which is beyond ancient. `Issue #260
<https://github.com/maemo-leste/bugtracker/issues/260>`_ was created to
modernise and port some of the python bindings to Maemo Leste, allowing us to
run port and build (new) python applications.

As of a few weeks, `pygtk <https://github.com/maemo-leste/pygtk>`_ is available
with hildon widget support, `python-hildon
<https://github.com/maemo-leste/python-hildon>`_, `python-hildondesktop
<https://github.com/maemo-leste/python-hildondesktop>`_ and `python-osso
<https://github.com/maemo-leste/python-osso>`_ are all available as well.
These are the main bindings to the Maemo mobile environment.  They have all been
ported to Python 2.7. Python 2.7 is now end of life, so we'll have to migrate to
3.x eventually, but 2.7 seemed like a good and useful intermediate goal.

And, surely enough, python applications like the binary clock applet now run:

.. image:: /images/python-maemo-binaryclock.png
  :height: 324px
  :width: 576px

Here one can see a home widget example:

.. image:: /images/python-hildon-homewidget.png
  :height: 324px
  :width: 576px

And a status bar example:

.. image:: /images/python-hildon-statuswidget.png
  :height: 324px
  :width: 576px

Hildon-type stacked windows in Python:

.. image:: /images/python-hildon-stack.png
  :height: 324px
  :width: 576px

.. image:: /images/python-hildon-stack-sub.png
  :height: 324px
  :width: 576px

Hildon-type wizards:

.. image:: /images/python-hildon-wizard1.png
  :height: 324px
  :width: 576px

.. image:: /images/python-hildon-wizard2.png
  :height: 324px
  :width: 576px

.. image:: /images/python-hildon-wizard3.png
  :height: 324px
  :width: 576px

Hildon menus:

.. image:: /images/python-hildon-menu1.png
  :height: 324px
  :width: 576px

.. image:: /images/python-hildon-menu2.png
  :height: 324px
  :width: 576px


PDF reader
----------

Maemo 5 features a PDF reader, and it has now been ported to Maemo Leste, `the
osso-pdf-viewer source can be found here <https://github.com/maemo-leste/osso-pdf-viewer/commits/master>`_.
Porting was slightly more involved than we hoped, but all in all it was maybe
half a day of work. Porting did reveal that there is a bug in the underlying
maemo file manager libraries, making it impossible for users to select a file to
open if the enviroment variable `MYDOCSDIR` is set, see `#280 <https://github.com/maemo-leste/bugtracker/issues/280>`_.
This bug also effects the SNES emulator drnoksnes, so we'll hopefully get it
resolved soon.

Even though it's currently hard to open PDFs, the application is available in
the core Maemo Leste repository now, and part of the new images.

.. image:: /images/leste-pdf-n900-1.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-pdf-n900-2.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-pdf-n900-3.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-pdf-n900-4.png
  :height: 324px
  :width: 576px


Hildon Application Manager
--------------------------

Another core component of Maemo is "HAM", also known as the "Hildon Application
Manager". It's an user interface to the Debian package manager, `apt`, which allows
users to discover, install and uninstall packages, and it also notifies the user 
when updates are available, and if the user agrees, updates the system. You can 
adjust the frequency of update checks.

This was a relatively quick port, and there are likely bugs, so there is more
work to be done. Nevertheless, it works.

This screenshot shows the device informing the user there are (important)
updates to be installed (**Yellow "!" icon**).

.. image:: /images/leste-update-notification-via-alarmd-and-status-applet.png
  :height: 324px
  :width: 576px

Clicking on the updates button in the status menu will show the following
sequence of dialogs:

.. image:: /images/leste-n900-ham-updates.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-2.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-3.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-4.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-5.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-6.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-7.png
  :height: 324px
  :width: 576px

.. image:: /images/leste-n900-ham-updates-8.png
  :height: 324px
  :width: 576px


As of today, the Hildon Application Manager will also automatically add and
enable our `Leste "Extras" software repository`_.


Portrait mode
-------------

For a long time, our hildon-desktop environment completely did not work in so
called "Portrait" mode -- where the screen is higher than it is wide. This is
very common now in smart phones. As a result, many devices have "Portrait" as the
native orientation of the display. The Droid 4 and Pinephone are no exception.

Maemo Leste still doesn't work very well yet in Portrait mode (although the
original Maemo Fremantle does mostly work really well in Portrait mode).
There were some real show stopping bugs, in particular `#214
<https://github.com/maemo-leste/bugtracker/issues/214>`_, which resulted in the
entire desktop been drawn offscreen. Some bugs still remain, like `#283
<https://github.com/maemo-leste/bugtracker/issues/283>`_ and these affect the
Pinephone in a negative way.

Nevertheless, here's a photo of a Motorola Droid 4 in Portrait mode:

.. image:: /images/droid4-rot3.jpg
  :height: 575px
  :width: 324px


Games
-----

Various games have been ported from Fremantle, and they work really well on the
Nokia N900. Most games still require some fixes to work on devices with other screen
sizes and orientations.

* brainparty:

  .. raw:: html
  
      <iframe width="560" height="315" src="https://www.youtube.com/embed/IlweegA2ORQ"
      ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>

* Latest ScummVM from git works on the N900:

  .. raw:: html
  
      <iframe width="560" height="315" src="https://www.youtube.com/embed/DHGaUI8wA7Q"
      ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>

* UAE4ALL is also in the `leste-extras` repository, but could see some more
  testing.

The marbles port is in the works, `the mahjong port mostly works (#275)
<https://github.com/maemo-leste/bugtracker/issues/275>`_, and the chess port
compiles, `but is not yet functional (#277)
<https://github.com/maemo-leste/bugtracker/issues/277>`_

Related issues:

`#259 <https://github.com/maemo-leste/bugtracker/issues/259>`_, `#273
<https://github.com/maemo-leste/bugtracker/issues/273>`_

User Angel Vega also has UAE4ALL and milkytracker running on Maemo Leste:

  .. raw:: html
  
      <iframe width="560" height="315" src="https://www.youtube.com/embed/UGcQ4NV3jO8"
      ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>

Upstream
--------

Maemo and Mer (base system for Sailfish OS and Nemo Mobile) share a lot of core
packages, even though those have diverged over time. `spiiroin` has Maemo Leste
running with various core packages replaced with their (newer!) Mer
equivalents:

* https://git.sailfishos.org/spiiroin/mce/tree/maemo-leste-hacking
* https://git.sailfishos.org/spiiroin/dsme/tree/maemo-leste-hacking

We hope to make use of this work in the (near) future and use the same base
software as Mer does. The evolved versions of MCE and DSME that are used in Mer
also have some features that we will need, like being able to deal with the new
(well, not so new anymore) kernel vibration interface.


connui-cellular
---------------

connui-cellular is the piece of software that contains a lot of widgets and
libraries used in cellular activities. The home widget that displays the
operator name, the program that asks you for your PIN to unlock your SIM card,
the status applet that shows the strength of your cellular signal, what
technology is being used to connect to the network, the Phone settings applet.
And more. This piece is being ported to ofono, but it's not ready for general
use yet. You might see various screenshots in this blogpost already featuring
various pieces of `connui-cellular` - it is available in the `leste-devel`
repository, which contains unstable or testing versions of our software.

Hopefully in the next one or two weeks a first version will make it to the
production `leste` repository.

This video shows that unlocking your SIM using the pin-entry dialog now works:

  .. raw:: html
  
      <iframe width="560" height="315" src="https://www.youtube.com/embed/BpJPTc8Q_4c"
      ;rameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>


osso-abook
----------

Maemo had a pretty good address book and presence (for Instant Messaging and SIP
calling) system. Developer freemangordon is working on getting that in Maemo
Leste as well. It's a rather big task, so it might take a while, but we will
rely on this piece of software to integrate our various contact applications.
Examples of this would be the `modest` email client, and a not-yet-existing
dialer and SMS application.

Themes
------

One of the cool things about being compatible with Maemo 5 "Fremantle" on
various levels is that it's often really easy to cherry pick things we like.

In this case, one can literally just download a theme from the maemo.org
website and install it on Maemo Leste. For example, the `Marina Theme
<http://maemo.org/downloads/product/Maemo5/hildon-theme-marina/>`_ can be
installed with `dpkg -i <debhere>`. Currently, the `/usr/share/themes/default`
symlink also needs to be updated, but after that, the themes from Maemo 5
"Fremantle" are fully usable on Maemo Leste.

`There are a lot of themes available too
<http://maemo.org/downloads/search/application.html?org_openpsa_products_search%5B1%5D%5Bproperty%5D=title&org_openpsa_products_search%5B1%5D%5Bconstraint%5D=LIKE&org_openpsa_products_search%5B1%5D%5Bvalue%5D=theme&org_openpsa_products_search%5B2%5D%5Bproperty%5D=os&org_openpsa_products_search%5B2%5D%5Bconstraint%5D=LIKE&org_openpsa_products_search%5B2%5D%5Bvalue%5D=Maemo5&fetch=Search>`_,
we are hoping to eventually have a default theme with a Maemo Leste logo, there
was `some discussion about a default Maemo Leste theme on talk.maemo.org
<https://talk.maemo.org/showthread.php?t=100905>`_



Devices / Hardware
==================

Virtual Machine
---------------

New Virtual Machine images are available:
https://maedevu.maemo.org/images/virtual-machines/20200103/

Nokia N900
----------

`New N900 images are available here
<https://maedevu.maemo.org/images/n900/20200112/>`_, main changes include:

1. There are now udev rules in place to allow using the modem with ofono. (Just
   `apt install ofono mdbus; mdbus2 -s org.ofono` and you should see the modem)
2. `hildon-application-manager` is now installed by default, as is the
   `osso-pdf-reader` application. Users can install packages from Leste "Extras"
   directly from the `hildon-application-manager`.
3. Specific rules in `/etc/network/interfaces` for `usb0` are removed because
   they confliced with `ke-recv`, net result is that usb networking should be
   more smooth now.

Motorola Droid 4
----------------

`New Motorola Droid 4 images are available here
<https://maedevu.maemo.org/images/droid4/20200112/>`_, main changes include:

1. udev rules for the modem.
2. Much newer kernel (5.4.0 based) with a ton of fixes and improvements,
   including modem and audio support.
3. `An ofono fork with rudimentary support for the Motorola Droid 4 modem (#286)
   <https://github.com/maemo-leste/bugtracker/issues/286>`_. It is
   not installed by default, but `apt install ofono` will get you set up with
   the right version. It does not yet support the `SimManager` interface, which
   `connui-cellular` will need. If someone wants to implement this, that would
   be great.
4. Support for PowerVR testing and development. The current image will allow
   developers to build a PowerVR kernel module and test it, without having to
   recompile or patch the Linux kernel.

Audio
~~~~~

Sound works, but requires three manual steps every boot. Basically, you need to
insert the modules. Inserting them at boot time will not work::

    modprobe snd-soc-cpcap
    modprobe snd-soc-motmdm
    modprobe snd-soc-audio-graph-card

Bluetooth
~~~~~~~~~

If you like bluetooth, installing `this firmware file
<https://github.com/TI-ECS/bt-firmware/blob/master/TIInit_10.6.15.bts>`_
to `/lib/firmware/ti-connectivity/TIInit_10.6.15.bts` will make it work after a
reboot::

    # hcitool scan
    Scanning ...
        C0:38:F9:A6:29:BA       Nokia N900

PowerVR / 3D acceleration
~~~~~~~~~~~~~~~~~~~~~~~~~

Detailed instructions on how to play with PowerVR using this image will follow, but you
will need at least:

1. https://github.com/tmlind/pvr-omap4-dkms/blob/testing-v5.4/README_DROID4
2. This package: https://launchpad.net/ubuntu/artful/armhf/libdri2-1/1.0.0~git20120510+26fee2e-0ubuntu2
3. `apt install xserver-xorg-video-omap`
4. Rename `/etc/X11/xorg.conf.d.pvr` to `/etc/X11/xorg.conf.d`

**DOING SO WILL BREAK HILDON-DESKTOP AND MIGHT MAKE YOUR SYSTEM BOOT LOOP, SO
CONTINUE AT YOUR OWN RISK**.


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
