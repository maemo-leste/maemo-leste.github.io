:URL:
:save_as: index.html

============
Debian based
============

Maemo Leste is based on Devuan Beowulf (Debian Buster) and all
supported devices ship with recent mainline Linux kernels.

The project is almost usable as a daily driver for your device. We are
currently in the development phase and we are actively searching for
developers. For some devices, we have development images available
- such as the `Nokia N900 <https://leste.maemo.org/Nokia_N900>`_,
`Motorola Droid 4 <https://leste.maemo.org/Motorola_Droid_4>`_, and
the `PinePhone <https://leste.maemo.org/PinePhone>`_. There is also
a 64bit `virtual machine <https://leste.maemo.org/Virtual_Machine>`_
you can use to try out Maemo Leste. 

For an impression, see some of our
`screenshots <{filename}/pages/screenshots.rst>`_.

======
 Goals
======

.. raw:: html

    <div class="row mt-4 mb-4">
        <div class="col-md-6">
            <div class="panel-homepage p-4">
                <h2 class="panel-header" style="font-size: 1.6rem;">Device freedom</h2>
                <span>
                We provide a truly open-source alternative for mobile devices. This includes reverse engineering closed-source drivers, ensuring that users have full control over their devices.
                </span>
            </div>
        </div>

        <div class="col-md-6">
            <div class="panel-homepage p-4">
                <h2 class="panel-header" style="font-size: 1.6rem;">Compatibility</h2>
                <span>
                Maintaining compatibility with software developed for previous Maemo platforms, particularly Maemo 5 (Fremantle), is a priority for Maemo Leste.
                </span>
            </div>
        </div>
    </div>

    <div class="row mt-4 mb-4">
        <div class="col-md-6">
            <div class="panel-homepage p-4">
                <h2 class="panel-header" style="font-size: 1.6rem;">Modernization</h2>
                <span>
                We modernize the Maemo ecosystem by updating its underlying software stack while retaining the original Maemo user experience.
                </span>
            </div>
        </div>

        <div class="col-md-6">
            <div class="panel-homepage p-4">
                <h2 class="panel-header" style="font-size: 1.6rem;">Hardware support</h2>
                <span>
                Expanding hardware support is a major goal, allowing Leste to run on various mobile devices and single-board computers.
                </span>
            </div>
        </div>
    </div>

============
Installation
============

For a general usage introduction, it is useful to check out
https://leste.maemo.org/Getting_Started

So far we have set up repositories for our packages, which support
`amd64`, `armhf`, and `arm64` architectures. We have FOSS replacements
for all included and previously closed Maemo packages (and we have
no closed packages in use), further building on the Maemo community
efforts to replace all closed bits with open source software.

Installation guides are provided per device. For open
tasks and issues, please see our Github bugtracker:
`maemo-leste/bugtracker/issues <https://github.com/maemo-leste/bugtracker/issues>`_

Software status is documented here: https://leste.maemo.org/Status .
A proper overview of the current (Maemo) software state will be
provided soon.

=================
Supported devices
=================

You can find wiki pages of our supported devices on
https://leste.maemo.org/Category:Device

==========
Contribute
==========

Our community gathers on IRC and the mailing list where we collaborate on development. Come and say hi! We have several Nokia N900, Motorola Droid 3, Droid 4, Bionic and RAZR units available for developers, so if you are interested in helping out but have trouble acquiring a device, let us know.

.. raw:: html

    <div class="row pb-1 mt-4 mb-4">
        <div class="col-md-9">

              <a class="btn btn-article btn-sm btn-primary" href="https://libera.chat/" role="button">
                <img style="margin-right: 4px;" width="32px" height="32px" src="/images/irc.png"> #maemo-leste
              </a>

              <a class="btn btn-article btn-sm btn-primary" href="https://x.com/maemoleste" role="button">
                <img style="margin-right: 4px;" width="32px" height="32px" src="/images/X_logo_2023_original.svg"> @maemoleste
              </a>

              <a class="btn btn-article btn-sm btn-primary" href="https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste" role="button">
                <img style="margin-right: 4px;" width="32px" height="32px" src="/images/mail.svg"> mailing list
              </a>

        </div>
    </div>

=====
Talks
=====

On various open source software conferences, we also did talks about
Maemo Leste, and they're listed on https://leste.maemo.org/Talks

====
News
====

After our `initial blog post
<{filename}/maemo-leste-standing-on-shoulders-of-giants.rst>`_,
we have posted (almost) monthly updates of our efforts and
progress. Reverse-chronological, they are:

* `Migration from Github to Forgejo <{filename}/maemo-leste-forgejo.rst>`_
* `2024 Telepathy update <{filename}/maemo-leste-telepathy-2024-august.rst>`_
* `Five year anniversary: Chimaera release <{filename}/maemo-leste-chimaera-5-year-anniversary.rst>`_
* `New Year update 2023 <{filename}/maemo-leste-update-january-2023.rst>`_
* `November 2021 - April 2022 <{filename}/maemo-leste-update-april-2022.rst>`_
* `January - October 2021 <{filename}/maemo-leste-update-october-2021.rst>`_
* `IRC channel migration <{filename}/irc-migration.rst>`_
* `Funding from NGI EU <{filename}/ngi-funding-april-2021.rst>`_
* `July - December 2020 <{filename}/maemo-leste-update-december-2020.rst>`_
* `April + May + June 2020 <{filename}/maemo-leste-update-april-may-june-2020.rst>`_
* `February + March 2020 <{filename}/maemo-leste-update-february-march-2020.rst>`_
* `Repositories and community packages <{filename}/repo-restructuring.rst>`_
* `January 2020 <{filename}/maemo-leste-update-january-2020.rst>`_
* `End of 2019 update <{filename}/maemo-leste-update-october-2019.rst>`_
* `March - August 2019 <{filename}/maemo-leste-update-march-2019.rst>`_
* `January + February 2019 <{filename}/maemo-leste-update-january-2019.rst>`_
* `December 2018 <{filename}/maemo-leste-december-2018.rst>`_
* `Lima is alive! <{filename}/lima-alive-foss-mali-driver.rst>`_
* `November 2018 <{filename}/maemo-leste-november-2018.rst>`_
* `September + October 2018 <{filename}/maemo-leste-september-2018.rst>`_
* `July + August 2018 <{filename}/maemo-leste-july-2018-update.rst>`_
* `May + June 2018 <{filename}/maemo-leste-may-2018-update.rst>`_
* `April 2018 <{filename}/maemo-leste-april-2018-update.rst>`_
* `March 2018 <{filename}/maemo-leste-march-2018-update.rst>`_

.. raw:: html

    <br>
    If you like our work and want to see it continue, join us!
    <br>
    <br>

❤️
