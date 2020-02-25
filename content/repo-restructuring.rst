Maemo Leste - Repositories and community packages
#################################################

:Category: news
:tags: extras, community, apt, repositories
:date: 2020-02-25 19:20
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
in a correct manner. Last, but not least, it allows us to easily support more
than one ``dist``, so we will eventually be able to support both Devuan and
Debian at the same time.

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

As for the images containing these changes, we are working on finalizing them
and they'll be ready for our next blog update.


Community packages
------------------

We're close to finalizing our community infrastructure, and we'd love to invite
you to maintain community packages for Maemo Leste. Like Fremantle, we call them
Extras, and they reside in a separate `organization
<https://github.com/maemo-leste-extras/>`_.

If you would like to maintain a community package, have a look at the bugtracker
in Maemo Leste Extras and follow the `README
<https://github.com/maemo-leste-extras/bugtracker>`_.  We invite everyone to try
out the procedure and provide feedback!

See you there :)
