Maemo Leste - sixth update (November) 2018
##########################################

:Category: news
:tags: arm64, aarch64, pine64, openfest, qt, lima
:date: 2018-11-06 23:00
:authors: Merlijn Wajer


.. image:: /images/logo.png
    :width: 250
    :height: 353


**TODO: article date**

It's been a while since our `fifth update
<{filename}/maemo-leste-september-2018.rst>`_
and there's quite some stuff to talk about!

TODO:

* qt5 progress
* Status page updates
* aarch64/arm64 ready (ish?) - raspi3 images
* openfest video/talk uploaded
* icd2 improvements, clockd improvements, other improvements by spinal84
* lima, apitrace, lima :)
* lima mesa jenkins build
* package manager progress
* leste-devel ?
* beowulf / buster
* pine64 kit/anakin
* fosdem stand: not happening

https://github.com/maemo-leste/clockd/pull/4


.. image:: /images/n900-qt5.png
  :height: 324px
  :width: 576px


.. image:: /images/raspi-ham.png
  :height: 324px
  :width: 576px

.. image:: /images/Anakin_kit_2.jpg
  :width: 300px
  :height: 400px

https://gitlab.freedesktop.org/lima/mesa/issues/70
https://github.com/apitrace/apitrace/issues/599


http://wiki.pine64.org/index.php/Project_Anakin

https://www.youtube.com/watch?v=WT1hwtEPt7o
https://maedevu.maemo.org/media/openfest-2018-maemo-leste.pdf


calendar support: https://github.com/maemo-leste/bugtracker/issues/203


lima https://github.com/maemo-leste/bugtracker/issues/181

leste-devel repo


Open issues
-----------

https://github.com/maemo-leste/bugtracker/issues

* For virtual keyboard to work, you have to reboot once after booting the
  fresh/new image. Then the virtual keyboard can be enabled from the settings
  `Text Input` applet.

* Several devices still lack 3D acceleration support, making the user experience
  particularly painful.


Possibly interesting things to start with / pick up
---------------------------------------------------

* calendar support https://github.com/maemo-leste/bugtracker/issues/203
* package manager https://github.com/maemo-leste/bugtracker/issues/202
  + extras? https://github.com/maemo-leste/bugtracker/issues/194
*

Community
---------



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
