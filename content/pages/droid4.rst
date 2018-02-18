Droid 4 Status
##############

:status: hidden


Images
======

Pre-alpha images are available here::

    http://maedevu.maemo.org/images/droid4/

We still need to write instructions on how to install safestrap and then install
the ddroid.zip file.

Installation
------------

`dd` the image file to a microsd card and install the ddroid.zip in safestrap.
When you boot the phone, it should boot to hildon-desktop in a minute or two.

**NOTE: The UI will be slow, since the 3D is done entirely on the CPU for now.**

Status
======

This is a status overview of the device specific drivers, for the general
software status, see TODO.

For a more detailed overview, see: http://elektranox.org/droid4/


============= =================================
 Feature       Status
============= =================================
 Kernel         4.15 [#]_
 Serial         OK
 Charging       OK
 USB            OK (slave, host)
 Keyboard       OK
 Screen         OK
 X              OK [#]_
 3D             NO [#]_
 Touchscreen    OK
 Wifi           OK (lacks UI)
 3G/4G          NO
 Phone calls    NO
============= =================================


Media
=====

.. image:: /images/droid4-h-d-1.jpg
    :height: 324px
    :width: 576px


.. image:: /images/droid4-h-d-2.jpg
    :height: 324px
    :width: 576px



.. https://github.com/sre/ddroid

Footnotes
=========


.. [#] You need 4.14 or 4.15 with at least 10-15 patches. We will document
       this further and also create a repo with the patches applied.
       For now, see http://elektranox.org/droid4/
.. [#] HDMI also works, but hildon-desktop does not deal with it too well
.. [#] Also PowerVR, but llvmpipe works, so we'll stick to that for a bit.
