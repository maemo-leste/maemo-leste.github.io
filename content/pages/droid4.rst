Droid 4 Status
##############

:status: hidden


Images
======

Pre-alpha images are not yet available, but will surface soon.
We need to provide a proper ddroid.zip and create a repository with all the
different kernel patches required.

Installation
------------

Not yet.


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
.. [#] X works, but for hildon-desktop to work, the screen needs to be rotated
       with xrandr, which then for some reason causes the screen to work fine, but the
       display is no longer updated.
.. [#] Also PowerVR, but llvmpipe works, so we'll stick to that for a bit.
