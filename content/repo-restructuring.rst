Maemo Leste - Repositories, images, and community packages
##########################################################

:Category: news
:tags: extras, community, apt, repositories
:date: 2020-02-24 00:26
:authors: Ivan Jelincic

In-between our technical updates, we have another short update on our repository
organization.

After the proposition and discussion we've had on our IRC channel and our
`bugtracker <https://github.com/maemo-leste/bugtracker/issues/320>`_, we've
reorganized our repositories into a nicer and cleaner structure.

In short, we now have a single pool containing all the packages and their
different versions, for all the different dists that we support. This is mainly
a nice way to keep a simpler repository structure, but also helpful when
building ``devel`` packages, so their versions can be automatically incremented
in a correct manner.

Due to this, the repository entries in ``/etc/apt/sources.list`` require a small
change - instead of the ``deb`` entries we've had:

::

    deb http://maedevu.maemo.org/leste leste main
    deb http://maedevu.maemo.org/leste-extras leste-extras main

We now have

::

    deb http://maedevu.maemo.org/leste ascii main
    deb http://maedevu.maemo.org/extras ascii main


With this, there is less ambiguity and it is easier for both users and
developers to figure out which Devuan version Leste is currently based on, and
will also allow easier upgrading when Maemo Leste rebases to a newer Devuan
version.

So, to switch your existing Maemo Leste installations, just use the latter two
links in ``/etc/apt/sources.list``. Simple!


New images
----------

We have built new images that incorporate this change, and they can be
downloaded from the usual link: https://maedevu.maemo.org/images/. The images
are dated 23th and 24th of February 2020 (``20200223/20200224``).

Along with the usual suspects (N900, Droid4, Raspberry Pi, and the Virtual
Machine), we have also built our images for the PinePhone and the PineTab!
There will be more information on how they are performing, along with
instructions, in our upcoming technical update blog post, so stay tuned :)


Community packages
------------------

We're close to finalizing our community infrastructure, and we'd love to invite
you to maintain community packages for Maemo Leste. Like Fremantle, we call them
Extras, and they reside in a separate `organization
<https://github.com/maemo-leste-extras/>`_. If you would like to maintain a
community package, have a look at the bugtracker in Maemo Leste Extras and
follow the `README <https://github.com/maemo-leste-extras/bugtracker>`_.
We look forward to seeing you there!
