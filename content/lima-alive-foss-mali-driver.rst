Maemo Leste - Lima works!
#########################

:Category: news
:tags: arm64, aarch64, pine64, allwinner, mali, lima, mesa
:date: 2018-12-07 23:50
:authors: Merlijn Wajer

This update is relatively small - but it does contain something huge: Lima now
renders hildon-desktop!

Mali GPUs and the Lima Driver
-----------------------------

As we documented in our November 2018 update
`November 2018 update <{filename}/maemo-leste-november-2018.rst>`_, we were
making progress trying to get the Lima driver to run on some Allwinner devices.

This is important, as a lot of ARM devices have a Mali GPU. Not all of them have
a Mali-400 or Mali-450, but a big chunk of them does - especially the Allwinner
single board computers and tablets. However, ARM does not provide a free (as in
freedom) driver for their GPUs. Back in 2014, `Luc Verhaegen presented his (and
others) work on freeing the Mali <https://www.youtube.com/watch?v=7z6xjIRXcp4>`_
- a talk that I also personally attended and got me excited about the
possibility of using a free driver on my Allwinner devices. Some time later,
he `documented why he had stopped working on the driver
<https://libv.livejournal.com/27461.html>`_ - but eventually others (in
particular Qiang Yu) have picked up the work, `and the current code can be found
here <https://gitlab.freedesktop.org/lima>`_ - the kernel side of this work has
also been `submitted for review
<https://lists.freedesktop.org/archives/dri-devel/2018-May/177314.html>`_ to the
Linux kernel.

Excited (once again) at the prospect of having a FOSS Mali driver, we set up
`(semi) automatic builds <https://phoenix.maemo.org/job/mesa-binaries/>`_ and
added it to the `lima component of our Maemo Leste Devuan/Debian repository
<https://maedevu.maemo.org/leste/pool/lima/m/mesa/>`_ of
lima-mesa, the mesa code that supports lima. In our latest update, we stated
that, unfortunately, `lima cannot render hildon-desktop yet
<https://gitlab.freedesktop.org/lima/mesa/issues/70>`_ (and that `we ran into
(and fixed) an apitrace issue
<https://github.com/apitrace/apitrace/issues/599>`_), but this is no longer
true, with the last few commits to `lima/mesa`, it is possible to run
hildon-desktop (albeit some render artifacts remain), and we have made a video
showing it in action on our `A33 "TurboX Twister" tablet
<https://leste.maemo.org/A33-TurboX-Twister>`_:

.. raw:: html

    <iframe width="560" height="315" src="https://www.youtube.com/embed/ihCVsaEMNzY"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
    picture-in-picture" allowfullscreen></iframe>


(`Kernel tree can be found here.
<https://github.com/maemo-leste/lime2-linux/tree/lime2-and-twister-4.19-rc4-20181207>`_)

This is also great news for the Pine64 project, who are developing a `Pine64
phone and Pine64 tablet <https://wiki.pine64.org/index.php/Project_Anakin>`_
(and have been so kind to send us a "Project Anakit" development kit as well) -
because now their phone will have a free software driver!

To be clear, the experience is not entirely smooth, and we've had the driver
crash on us a few times - but it's FOSS, so anyone can attempt to fix it (as
people are doing already). Onwards!



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
