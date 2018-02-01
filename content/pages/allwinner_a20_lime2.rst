Allwinner A20 LIME2 Status
##########################

:status: hidden


Images
======

Pre-alpha LIME2 images are available here (named sunxi)::

    http://maedevu.maemo.org/images/

Note that they are not particularly usable, as we did not yet enable Mali GPU
acceleration, and without touchscreen a mouse is not very usable, as the pointer
is not (yet) visible.

Installation
------------

This image is flashed to a microSD card in two parts: first the actual image
with the kernel and root filesystem, followed by the u-boot bootloader.

u-boot should be flashed using the following:

    # dd if=A20-OLinuXino-Lime2_defconfig.bin of=/dev/yourmicrosd bs=1024 seek=8


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
