Maemo Leste - 2024 update
#########################

:Category: news
:tags: chimaera, mediaplayer, rtcom, calls, n900, qt5, tablet, mz617, razr, xt912, xt910
:authors: Merlijn Wajer
:date: 2024-08-15 23:30

It's been a good while since our last update, but not for the lack of changes -
indeed, we've been busy bees. Some of the highlights:

* Big communication (Telepathy) upgrade;
* Graphics rendering artifacts fixed on all mapphones;
* Much improved phone calls on several devices;
* Integration of Gnome Tracker and the Open Media Player;
* Support for more devices;
* Improvements to our user guide and documentation;
* Significant changes to our browser (Jib);

(Also check out our `previous update <{filename}/maemo-leste-chimaera-5-year-anniversary.rst>`_ in case you missed it).


Hardware & Drivers
==================

We have moved to a new Linux LTS release - 6.6.x and after fixing various
regressions (no call audio at all, cpu frequency issues and other instabilities)
are now in an even better spot when it comes to hardware support
through the new features brought by this Linux release - in particular for call
audio.

Graphics
--------

We have had minor rendering bugs on the mapphone phones (Droid 4, Droid Bionic,
Droid Razr, etc) which were mostly prevalent in font rendering. This problem has
been fixed in `leste-config version 1.103
<https://github.com/maemo-leste/leste-config/commit/9acc40b173ba4ede851f83f127e6e5c50306573b>`_!

Additionally, we have improved the 16-bit mode of xf86-video-omap so that the xv
video scaling works properly. This is helpful because the Nokia N900 uses 16 bit
Xorg. We've also improved the `compositing <https://github.com/maemo-leste/xf86-video-omap/commit/4e5aead5403f4c9e594fc9c1e3b9ac5afae182ad>`_ as well as `two <https://github.com/maemo-leste/xf86-video-omap/commit/92eb692c2d1f8b743b7b56c88616f0f2e41b822d>`_ `other <https://github.com/maemo-leste/xf86-video-omap/commit/ace9cda2a22a4b032ff82cc6761485945fffd55c>`_ stability fixes.

hildon-desktop (the Maemo window manager) also has a 30% speed improvements in
the application launcher by `calculating the saturation in the shader just once
<https://github.com/maemo-leste/hildon-desktop/commit/51b5a4b0cbe046bfc7cd5d4b028676344ad92bb8>`_.

Connectivity
------------

The cellular data code has improved in particular in the provisioning (`commit 920429ad <https://github.com/maemo-leste/libicd-network-ofono/commit/920429ada67a8ffe7a5384169a8a9ab3c28fa5a8>`_ and `commit ffa7b91c <https://github.com/maemo-leste/libicd-network-ofono/commit/ffa7b91ce39fd9e35fbf8db715ff>`_) and
`handling a missing gateway
<https://github.com/maemo-leste/libicd-network-ofono/pull/1>`_ (fixing `issue
#555 <https://github.com/maemo-leste/bugtracker/issues/555>`_ and fixing `issue
#585 <https://github.com/maemo-leste/bugtracker/issues/585>`_) and `moving the
stack to use iproute 2 <https://github.com/maemo-leste/libicd-network-ipv4/pull/7>`_.

The libicd-network-wpasupplicant now properly updates the wireless signal
strength with `libicd-network-wpasupplicant pull request #2 <https://github.com/maemo-leste/libicd-network-wpasupplicant/pull/2>`_.

TODO: * wpa supplicant hostapd werkt weer met backports (alleen met kernel 6.1...)

Audio and Call Audio
--------------------

The call audio has improved a bunch both for all the mapphones and the Nokia
N900. We have also made some general audio improvements.

Regular audio would sometimes stop working after a phone call was made using the
device, this has now been resolved by `reducing the shared memory of each
pulseaudio connection
<https://github.com/maemo-leste/leste-config/commit/1febfa7d6f7373150afad5785103734f99439ab4>`_.

On the mapphone devices the call audio has become a lot more stable by fixing
some of the hacks we've had in the kernel previously using the new
``audio-graph-card2`` in the kernel which allows defining audio routes in a way
that we couldn't before. (The Droid 4 and other devices rely on cpcap to manage
the audio routes and requires not active ALSA connection, and we could not
express that before.). For more details check the following commits:
`commit efca4073 <https://github.com/maemo-leste/droid4-linux/commit/efca4073912c3051e495f3afe40225f74a0c2dc0>`_,
`commit 21f8cb5a <https://github.com/maemo-leste/droid4-linux/commit/21f8cb5ab78ece3abbfeeeb4ffcea028e9dc9dbe>`_,
`commit 80b50f94 <https://github.com/maemo-leste/droid4-linux/commit/80b50f94a11a016d9d33a8280640de4297717602>`_,
`commit 4246f219 <https://github.com/maemo-leste/droid4-linux/commit/4246f219e152042d83fb008103904ebd827ec0cb>`_,
`commit 8a0687ee <https://github.com/maemo-leste/droid4-linux/commit/8a0687ee846b311d9aca2f0065d3a34750c0b3e2>`_.

On the Nokia N900 side, call audio has also been greatly improved thanks to work
by ``arno11``, with `support for headsets
<https://github.com/maemo-leste/leste-config/pull/48>`_, `8000Mhz audio
<https://github.com/maemo-leste/libcmtspeechdata/pull/6>`_, `better resampling
<https://github.com/maemo-leste/leste-config/pull/39>`_ and `setting the proper
group for the cmt_speech node
<https://github.com/maemo-leste/leste-config/pull/41>`_. In addition, further
N900 call quality audio improvements were made to libcmtspeechdata in
`libcmtspeechdata PR #1 <https://github.com/maemo-leste/libcmtspeechdata/pull/1>`_,
`libcmtspeechdata PR #4 <https://github.com/maemo-leste/libcmtspeechdata/pull/4>`_
and `libcmtspeechdata PR #5 <https://github.com/maemo-leste/libcmtspeechdata/pull/5>`_.


Miscellaneous updates
---------------------

After moving to Linux 6.6, the cpu frequency options disappeared, we traced it
down to a regression which we have reported upstream and temporarily worked
around by making the `cpufreq device tree platform device built in
<https://github.com/maemo-leste/droid4-linux/commit/20d360a9da5a5450117ca9bcae436352c1e81bd6>`_
(as opposed to a kernel module).


We have also updated our battery applet to trim to list of `blacklisted drivers
<https://github.com/maemo-leste/status-area-applet-battery/pull/7/>`_, since
this is no longer necessary.


Devices
=======


Nokia N900
----------


* https://github.com/maemo-leste/leste-config/pull/45
  blacklist unneeded power supplies

* https://github.com/maemo-leste/leste-config/pull/37
  (earpiece too loud n900)

* https://github.com/maemo-leste/leste-config/pull/38
  (faster transitions)

* https://github.com/maemo-leste/leste-config/pull/44
  16bpp by default

* n900 perf improvements
  https://github.com/maemo-leste/bugtracker/issues/737

* n900 IR (droid4-linux commits, pierogi)

* https://github.com/maemo-leste/libcmtspeechdata/pull/2

* https://github.com/maemo-leste/gps-nokia-n900/pull/1
  and https://github.com/maemo-leste/gps-nokia-n900/pull/2


* n900 swap for 6.6 https://github.com/maemo-leste/leste-config/commit/2c0ccb6ba62b8d397052862721a4f54e5b1b3e78


* https://gitlab.freedesktop.org/hadess/iio-sensor-proxy/-/merge_requests/384
* https://github.com/maemo-leste/droid4-linux/pull/11
  detect face down for n900 (kernel and iio sensor proxy)

* https://github.com/maemo-leste/bugtracker/issues/167#issuecomment-2213497891
  n900 battery never reaches fully full state (fixed now)

* https://github.com/maemo-leste/droid4-linux/pull/6#event-10733941151
  n900 frequencies


* https://github.com/maemo-leste/bugtracker/issues/134#issuecomment-1868381250
  https://gitlab.freedesktop.org/hadess/iio-sensor-proxy/-/merge_requests/375
  n900 proximity

Mapphones
---------


* https://github.com/maemo-leste-upstream-forks/ofono/pull/4

* https://github.com/maemo-leste-upstream-forks/ofono/pull/2
  fix droid4 clir options being swapped


New devices
-----------

* xt912/xt910 images

* mz616 / mz617 woo (also mz609?)

* atrix2 wip

* smaller / tiny images for mz617

* hildon-meta-core vs hildon-meta



Telepathy & Communications
==========================

The biggest update this time around is to our Telepathy-based communication
stack with the addition of various features and protocols. We currently support
the following protocol to varying degrees: XMPP, Matrix, SIP, IRC, Telegram,
Facebook, Slack and Discord. Most of these protocols also have a corresponding
accounts plugin to configure them.

.. image:: /images/ham-accounts.png
  :height: 324px
  :width: 576px

telepathy-haze (pidgin/libpurple)
---------------------------------

The telepathy-haze connection manager can load Pidgin/libpurple plugins, which
allows us to use Pidgin plugins from Maemo Leste's contacts and conversations
applications. This thus allows us to use libpurple plugins for which no 'native'
telepathy connection managers exist.

Until recently telepathy-haze lacked support for channels/rooms, which means
only 1:1 messages worked.  ``freemangordon`` has added support in
`telepathy-haze MR #4
<https://gitlab.freedesktop.org/telepathy/telepathy-haze/-/merge_requests/4/>`_.
The work has not yet been merged, but we have deployed it to Maemo Leste in
`maemo-leste-upstream-forks/telepathy-haze
<https://github.com/maemo-leste-upstream-forks/telepathy-haze>`_, and we
are in contact with the Telepathy maintainers to see if we can get the work
merged.

slack
~~~~~

We have basic integration for Slack now. You can log in with your Slack account,
chat through direct message as well as channels, your contacts on Slack will
show up in the Contacts application (including photos), you can start a message
session with them from there as well. History fetching does not work (yet).

We have created a `UI to set up your Slack account
<https://github.com/maemo-leste-extras/rtcom-accounts-plugin-slack>`_ and we
have packaged the `libpurple Slack plugin
<https://github.com/maemo-leste-upstream-forks/slack-libpurple>`_. We also added
`support for buddy icons
<https://github.com/maemo-leste-upstream-forks/slack-libpurple/commit/49e4fc3abd66b97fe889565f204e465cb478a495>`_.

TODO: screenshots

facebook
~~~~~~~~

https://github.com/maemo-leste-extras/purple-facebook
https://github.com/maemo-leste-extras/rtcom-accounts-plugin-facebook

* purple-facebook plugin for maemo/tp and conversations
  https://github.com/maemo-leste/rtcom-accounts-ui/commit/9284bfa96b65b0a74283fc645d9e38969cd3213d
  https://github.com/maemo-leste-extras/purple-facebook
  https://github.com/maemo-leste-extras/rtcom-accounts-plugin-facebook

TODO: screenshots

telegram
~~~~~~~~

https://github.com/maemo-leste-upstream-forks/tdlib-purple
https://github.com/maemo-leste-extras/rtcom-accounts-plugin-telegram
setup not easy yet

* telegram plugin, build tdlib met -O1
  ook al rtcom-accounts-plugin-telegram, maar bepaalde dingen missen nog

TODO: screenshots

discord
~~~~~~~

https://github.com/maemo-leste-upstream-forks/purple-discord
https://github.com/maemo-leste-extras/rtcom-accounts-plugin-discord
ip based auth annoying

TODO: screenshots

telepathy-tank (Matrix)
-----------------------

https://github.com/maemo-leste-upstream-forks/telepathy-tank/tree/maemo/chimaera-devel

* matrix plugin

  rtcom-accounts-ui 0511c57cbac98d7d19b7dfe27549e834dfeefea3
  3f1f29fc95b113020c1e33fe3babdb462b753597
  b21b04e351a88a8e743b623b52f180bf4b343342

  PLUS

  https://github.com/maemo-leste-extras/rtcom-accounts-plugin-matrix/


telepathy-rakia
---------------

rtcom ui

* https://github.com/maemo-leste/bugtracker/issues/657 (ui for voip)
  https://github.com/maemo-leste/rtcom-accounts-plugins/commit/c545748d0b8862c6e1fb3a536418a0acced7f85f


conversations
-------------

* tp-ring fork, tp ring always_dispatch bit...

* sphone tp module merged https://github.com/maemo-leste/sphone/pull/4#event-11576916217

* conversations memory usage fixes
  conversations set chat state
* conversations: multi window, notifications, ...

* https://github.com/maemo-leste/conversations/issues/10#issuecomment-1793677214
* https://github.com/maemo-leste/conversations/issues/3#issuecomment-1793430593
* https://github.com/maemo-leste/conversations/issues/8#event-10862367065
* https://github.com/maemo-leste/conversations/pull/14#event-10772868467

* conversations notifications, lock screen notifications, etc

* conversations telepathy chat state



sphone
------

* https://github.com/maemo-leste/sphone/pull/8
  various vcm fixes for sphone

* https://github.com/maemo-leste/sphone/pull/6#event-10594544989
  add vcard field

* https://github.com/maemo-leste/sphone/pull/5#event-10583909747
  add landscape option


Media
=====

* https://github.com/maemo-leste-extras/openmediaplayer/blob/master/debian/changelog
* maemo-leste-upstream-forks/tracker-miners for upstream fix
* gnome tracker fts corruption fix
  https://github.com/maemo-leste-upstream-forks/tracker-miners
  https://github.com/maemo-leste-upstream-forks/tracker/commit/db6e3b5fe439cafc288d313e55697d6128212067
  https://github.com/maemo-leste-upstream-forks/tracker/commit/88bb88a2e5a45cdf0cb5346e04f389922b42d022

  https://github.com/maemo-leste/mafw-tracker-source/commit/523c6aa767fa3f6268ba9a2fad9ea177abd13220

Contacts
========

* voicecall voicecall.client and osso-addressbook change for StreamedMedia
  channel type instead of Call1 channel type


* "No name" bug for some contacts
  https://github.com/maemo-leste/osso-abook/commit/37f15bdaeabda4bad43eda042df471cc7c45c14a
  https://github.com/maemo-leste/osso-abook/commit/b9f699fbd4ecb446b0a53d8e6b966432ef771938
  https://github.com/maemo-leste/osso-abook/commit/121f50e2e13096344f8983c1b74622d9fac8fceb

* 18:09 < freemangordon> Wizzup: https://github.com/maemo-leste/osso-abook/commit/8189df5237c5ac89ca05e44d3e20ad856b7a2f24

* https://github.com/maemo-leste/osso-abook/pull/2

Documentation
=============

* user guide werkt nu (yay)
* maemo-user-guide package https://github.com/maemo-leste/maemo-user-guide
  also update hildon-desktop user-guide.desktop file
* https://maedevu.maemo.org/docs/userguide/html/


Browser
=======


* jib default browser (en op n900?)
* jib file:/// support
* jib portrait mode

* qt-platform-maemo: support submenus
  also icons

* https://github.com/maemo-leste-extras/jib/issues/7#issuecomment-2225177154
  jib adblock

* n900 default browser = dillo

Gtk / Qt
========

* qt-platform-maemo: support submenus
  also icons

* https://github.com/maemo-leste/qt-platform-maemo/commit/80cd89f24828f8c44935b5c6c4587b978ca4689c
* https://github.com/maemo-leste/qt-platform-maemo/commit/4ea6b1526909141557b7489fbf935cc3c3572488

* https://github.com/maemo-leste/qt-platform-maemo/pull/2

* https://github.com/maemo-leste/bugtracker/issues/693 (qt theme colours)

* https://github.com/maemo-leste/bugtracker/issues/466
  qt menu arrow

Hildon
======

* https://github.com/maemo-leste/hildon-desktop/pull/23
  resture menu and submenu editing in hildon-desktop program list

* https://github.com/maemo-leste/hildon-status-menu/pull/4
  allow wider icons for status area so that we can display multiple icons

* https://github.com/maemo-leste/libhildonmime/pull/5
  add actions for xdg-open

* https://github.com/maemo-leste/bugtracker/issues/528#event-10800457332
  add multiple shortcuts per function/action

* https://github.com/maemo-leste/osso-xterm/pull/4#event-10538895255
  setting to disabe volume resizing

* dsme systemd reboot updates (logind, niet systemd?)

Synchronisation
===============

* https://github.com/maemo-leste/syncevolution/commit/14bf3f262d39748ced70a6460bd1bd25053a40a4
* https://github.com/maemo-leste/syncevolution/commit/5911df262b473946077b0355bcf660153089b828
  https://gitlab.freedesktop.org/SyncEvolution/syncevolution


Translations
============

* weblate translation changes (everything, like 50+ repos)
  https://github.com/maemo-leste-extras/maemo-translate-data

  https://github.com/maemo-leste-extras/maemo-translate-data/commit/ff97e527568e4167e28299e9ea501bc74deb729d
  https://github.com/maemo-leste-extras/maemo-translate-data/commit/399d55d72e6cbc05ab3023eec2354ece214638f8


Extra packages
==============

OTP
---

* https://github.com/maemo-leste-extras/maeotp/pull/7

works for github, gitlab, etc, etc

Maemo Translations
------------------

* TODO: new maemo translate data packs, based on firefox-translate models



* https://github.com/maemo-leste-extras/bugtracker/issues/38
  songrec

* https://github.com/maemo-leste-extras/bugtracker/issues/39
  hextool

* https://github.com/maemo-leste-extras/bugtracker/issues/40
  comics daily package

* https://github.com/maemo-leste/bugtracker/issues/331
  drnoksnes works!

SORTME
======

* TODO: mention onion service

* interview (maybe leave out)
  https://ngi.eu/ngi-interviews/interview-with-merlijn-wajer-maemo-leste-ngi-assure-beneficiary/



Interested?
===========

If you have questions, are interested in specifics or helping out, or wish to
have a specific package ported, please see our bugtracker.

**We have several Nokia N900, Motorola Droid 3, Droid 4, Bionic and RAZR units
available for interested developers**, so if you are interested in helping out
but have trouble acquiring a device, let us know.

.. .. image:: /images/massdroid.jpg
..   :height: 375px
..   :width: 666px


Please also join our `mailing list
<https://mailinglists.dyne.org/cgi-bin/mailman/listinfo/maemo-leste>`_ to stay
up to date, ask questions and/or help out. Another great way to get in touch is
to join the `IRC channel <https://leste.maemo.org/IRC_channel>`_.

If you like our work and want to see it continue, join our effort!

