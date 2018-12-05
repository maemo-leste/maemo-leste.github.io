Maemo Leste - sixth update (November) 2018
##########################################

:Category: news
:tags: arm64, aarch64, pine64, openfest, qt, lima
:date: 2018-12-05 09:00
:authors: Merlijn Wajer


It's been a while since our `fifth update
<{filename}/maemo-leste-september-2018.rst>`_
and there's quite some stuff to talk about!

Media
-----

Our talk introducing Maemo Leste at `OpenFest 2018
<https://www.youtube.com/watch?v=WT1hwtEPt7o>`_ is now online (The `slides are
also available
<https://maedevu.maemo.org/media/openfest-2018-maemo-leste.pdf>`_).

We have also switched to a more clear Pelican theme for our (this) website and
added a `Screenshots <{filename}/pages/screenshots.rst>`_ page!


Software
--------


aarch64
~~~~~~~

Our `Jenkins <https://phoenix.maemo.org/>`_ instance now has **aarch64**
(**arm64**) builds for almost all our packages and we have a working Raspberry
Pi 3 with **aarch64** Maemo userland. Images for the Raspberry 3 (and other
devices) will follow in December.


Qt5
~~~

Work on porting the Maemo style and Maemo widgets to Qt5 is still progressing.
There are still some issues to sort out - some widgets end up being too large or
fullscreen when they should not be. Regardless, here is an example widget:

.. image:: /images/n900-qt5.png
  :height: 324px
  :width: 576px

Once the Qt5 port is in better shape, we'll work on supporting GStreamer 1.0 as
well, so that we can build `Open Media Player
<https://wiki.maemo.org/Open_Media_Player>`_.


lima driver for Mali GPUs, apitrace
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The open source `lima <https://gitlab.freedesktop.org/lima/>`_ driver is a
driver for Mali GPUs (see the `FOSDEM talk
<https://www.youtube.com/watch?v=7z6xjIRXcp4>`_).

The lima driver is still under heavy development, and it is not yet merged into
mesa yet. We `use Jenkins to build a Lima enabled mesa for us
<https://phoenix.maemo.org/job/mesa-binaries/>`_, which can be found in the
`lima` component in our repositories: https://maedevu.maemo.org/leste/pool/lima/
The lima driver also has a kernel component, which is already included in our
latest Allwinner images.

However, `lima cannot render hildon-desktop yet
<https://gitlab.freedesktop.org/lima/mesa/issues/70>`_; and while trying to
submit a debug trace using apitrace `we ran into (and fixed) an apitrace issue
<https://github.com/apitrace/apitrace/issues/599>`_, and now a proper debug
trace is also submitted to the Lima driver developers.

Finally, we have a `tracking ticket for Lima support
<https://github.com/maemo-leste/bugtracker/issues/181>`_.


icd2 and clockd code improvements, documentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*spinal84* has been continuing his great work on cleaning up the *icd2* and
*clockd* code, as well as documenting it (this list is not exhaustive):

https://github.com/maemo-leste/icd2/pull/9
https://github.com/maemo-leste/clockd/pull/4


Hildon Application Manager (HAM)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

What is a mobile distribution without a GUI package manager?
We took the source straight from Maemo Fremantle, fixed a few compilation
errors, and behold, the package manager starts (and that's probably about it,
nothing else was tested yet):

.. image:: /images/raspi-ham.png
  :height: 324px
  :width: 576px

Shutdown woes
~~~~~~~~~~~~~

One of the remaining alpha blocker bugs is that shutting down the device using
the UI doesn't work the way it's supposed to work. We've now `figured out the
problem
<https://github.com/maemo-leste/bugtracker/issues/125#issuecomment-443454882>`_
and will be able to move forward with both a temporary and more permanent
solution. The reason is that the shutdown feature actually tries to bring the
device into the so called **act dead** mode, in which mode the device acts like
it's not powered on. Sounds scary? Perhaps, but this feature is for example
essential for the phone to turn itself on on an alarm (and more, but we have to
figure that out, the entire Maemo Fremantle boot process is documented here:
http://wiki.maemo.org/Maemo_5_boot_process).


Calendar support
~~~~~~~~~~~~~~~~

While no code has been written yet, we have a plan on how to move forward with
`calendar support <https://github.com/maemo-leste/bugtracker/issues/203>`_.
The various components (backend and GUI) are open source or have open source
clones/implementations. Unfortunately, the GUI will (also) depend on Qt5 port
being brought to a usable state.

Devices
-------

PineTablet/PinePhone "Anakin" devkit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Pine64 folks are making a PineTablet and a PinePhone, and they were so kind
as to provide us with *three* developer kits, more information on the developer
kit can be found here:

http://wiki.pine64.org/index.php/Project_Anakin

This developer kit is one of the main reasons that our packages are now
available on **aarch64**. We'll share updates once more starts to work on the
developer kit.

.. image:: /images/Anakin_kit_1.jpg
  :width: 300px
  :height: 400px


.. image:: /images/Anakin_kit_2.jpg
  :width: 300px
  :height: 400px


Distribution
------------

Maemo Leste is based on Devuan, currently targetting **Devuan Ascii**, which
closely tracks **Debian Stretch** (current stable version of Debian).

Devuan Beowulf (Debian Buster)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We've making some progress towards porting and building the Maemo Leste packages
on the next version of Devuan: Beowulf (which in turn is based on upcoming
version of Debian: Buster). Jenkins now supports building our packages for this
upcoming release. It will be a while before Beowulf is releases, but when it is,
we will be ready!


leste-devel repository
~~~~~~~~~~~~~~~~~~~~~~

We have introduced a `leste-devel` repository, which developers and users can
use to test experimental code changes; see `this icd2 pull request
<https://github.com/maemo-leste/icd2/pull/9#issuecomment-443375660>`_
on how we currently use this repository.


Documentation
-------------

We've put some more effort into our
`Software Status <https://leste.maemo.org/Status>`_ page - it now covers more
software components and also (might) have some information on the status of each
component.



Open issues
-----------

https://github.com/maemo-leste/bugtracker/issues

* For virtual keyboard to work, you have to reboot once after booting the
  fresh/new image. Then the virtual keyboard can be enabled from the settings
  `Text Input` applet.

* Several devices still lack 3D acceleration support, making the user experience
  particularly painful.



Community
---------

No FOSDEM stand
~~~~~~~~~~~~~~~

Together with postmarketOS we applied for a stand at FOSDEM 2019, which
unfortunately was not accepted. However, both the postmarketOS and Maemo Leste
people will attend FOSDEM regardlessly.


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
