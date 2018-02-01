Allwinner A20 LIME2 Status
##########################

:status: hidden


Images
======

Pre-alpha N900 images are available here::

    http://maedevu.maemo.org/images/

Note that they are not particularly usable, as we did not yet enable Mali GPU
acceleration, and without touchscreen a mouse is not very usable, as the pointer
is not (yet) visible.

Installation
------------

TODO PARAZYD: dd instructions


Status
======

This is a status overview of the device specific drivers, for the general
software status, see TODO.

For a more detailed overview, see: http://linux-sunxi.org


============= =================================
 Feature       Status
============= =================================
 Kernel         4.14
 Serial         OK
 Charging       OK (if LiPo is used)
 USB            OK (slave, host)
 Keyboard       OK
 Screen         OK
 X              OK
 3D             NO [#]_
 Touchscreen    OK
 Ethernet       OK
 Wifi           N/A
 3G/4G          N/A
 Phone calls    N/A
============= =================================

Media
=====

.. image:: /images/lime2-h-d-1.jpg
    :height: 324px
    :width: 576px


.. image:: /images/lime2-h-d-2.jpg
    :height: 324px
    :width: 576px


Footnotes
=========

.. [#] Once we add Mali support, then this should just work.
