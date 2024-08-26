Maemo Leste - 2024 Telepathy
############################

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

The cellular data code has improved in particular in the provisioning (`commit 920429ad <https://github.com/maemo-leste/libicd-network-ofono/commit/920429ada67a8ffe7a5384169a8a9ab3c28fa5a8>`_ and `commit ffa7b91c <https://github.com/maemo-leste/libicd-network-ofono/commit/ffa7b91ce39fd9e35fbf8db715ff>`_ which fix `issue
#555 <https://github.com/maemo-leste/bugtracker/issues/555>`_ and `issue
#585 <https://github.com/maemo-leste/bugtracker/issues/585>`_),
`handling a missing gateway
<https://github.com/maemo-leste/libicd-network-ofono/pull/1>`_ and `moving the
stack to use iproute 2 <https://github.com/maemo-leste/libicd-network-ipv4/pull/7>`_.

``libicd-network-wpasupplicant`` now properly updates the wireless signal
strength with `libicd-network-wpasupplicant pull request #2 <https://github.com/maemo-leste/libicd-network-wpasupplicant/pull/2>`_.

We have also packaged the latest wpa_supplicant version, which would allow using
hostapd for mobile hotspots, but unfortunately this doesn't work currently with
Linux 6.6, only with Linux 6.1.

Audio and Call Audio
--------------------

The call audio has improved a bunch both for all the mapphones and the Nokia
N900. We have also made some general audio improvements.

Pulseaudio was switched from running as a system daemon to a user daemon ... (TO COMPLETE)

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

On the Nokia N900 side, voice calls were finally integrated, and call audio has
also been incrementally improved thanks to work by ``arno11``, with `support for headsets
<https://github.com/maemo-leste/leste-config/pull/48>`_, `support for the earpiece
<https://github.com/maemo-leste/leste-config/commit/11f11dac690ee752900f144ecff809a8991d14c3>`_,
which is connected on a completely separate part of the N900's codec, `8000Hz audio
<https://github.com/maemo-leste/libcmtspeechdata/pull/6>`_, `better resampling
<https://github.com/maemo-leste/leste-config/pull/39>`_ and `setting the proper
group for the cmt_speech node
<https://github.com/maemo-leste/leste-config/pull/41>`_. In addition, further
N900 call quality audio improvements were made to libcmtspeechdata in
`libcmtspeechdata PR #1 <https://github.com/maemo-leste/libcmtspeechdata/pull/1>`_,
`libcmtspeechdata PR #2 <https://github.com/maemo-leste/libcmtspeechdata/pull/2>`_,
`libcmtspeechdata PR #4 <https://github.com/maemo-leste/libcmtspeechdata/pull/4>`_
and `libcmtspeechdata PR #5 <https://github.com/maemo-leste/libcmtspeechdata/pull/5>`_.


Miscellaneous updates
---------------------

After moving to Linux 6.6, the cpu frequency options disappeared, we traced it
down to a regression which we have reported upstream and temporarily worked
around by making the `cpufreq device tree platform device built in
<https://github.com/maemo-leste/droid4-linux/commit/20d360a9da5a5450117ca9bcae436352c1e81bd6>`_
(as opposed to a kernel module).


Maemo Fremantle supported the feature where you could silence audible
notifications such as incoming calls, or alarms, by turning the device face-down.
This feature is now supported in Maemo Leste as well, through
https://github.com/maemo-leste/mce/pull/61, https://github.com/maemo-leste/mce/pull/62,
and https://github.com/maemo-leste-upstream-forks/iio-sensor-proxy/pull/2. The
face-down reporting feature has also been submitted to upstream ``iio-sensor-proxy``
and could be used for other Linux mobile distros in future.


Devices
=======


Nokia N900
----------

We have been working hard on improving the performance on the Nokia N900 and
``sicelo`` and ``arno11`` in particular have contributed many fixes.

The N900 now runs in `16bit Xorg mode
<https://github.com/maemo-leste/leste-config/pull/44>`_ to improve the
performance of the X server. `Turbo mode and overclock frequencies
<https://github.com/maemo-leste/droid4-linux/pull/6>`_ have been
added as well, allowing for a much more smooth experience. We're still trying to
find the best scheduler, as the default ondemand scheduler doesn't perform
particularly well when it comes to having a responsive device.


We've also been toying with `tweaking the default hildon transitions file
<https://github.com/maemo-leste/leste-config/pull/50>`_ which
controls what the window manager transitions look like, which effects are used
and so on. In particular we're trying to see what the best settings will be for
a responsive device. In the process we've also been further improving the
performance of hildon-desktop.

``sicelo`` has added support for Nokia N900's ofono to fetch `extra details about
the operator
<https://github.com/maemo-leste-upstream-forks/ofono/pull/4>`_, such as the
name. He has also fixed the issue where the N900 battery icon never hit the
`fully charged state
<https://github.com/maemo-leste/bugtracker/issues/167>`_, which affects both the
status icon as well as the LED behaviour. This is now fixed in mce and the
kernel in `droid4-linux PR #9
<https://github.com/maemo-leste/droid4-linux/pull/9/commits>`_ that are now also
in mainline linux.

``sicelo`` has also fixed a potential crash in `gps-nokia-n900 PR #1
<https://github.com/maemo-leste/gps-nokia-n900/pull/1>`_ and also ensured that
the GPS date is correct since the epoch rollover in 2019 in `gps-nokia-n900 PR
#2 <https://github.com/maemo-leste/gps-nokia-n900/pull/2>`_.

Furthermore, ``sicelo`` has also added support for the `N900 'switch-type'
promity sensor in iio-sensor-proxy
<https://gitlab.freedesktop.org/hadess/iio-sensor-proxy/-/merge_requests/375>`_.
To top it off, he has also corrected the accelerometer orientation to correctly
report face up and face down in see `droid-linux PR #4
<https://github.com/maemo-leste/droid4-linux/pull/11>`_.

``arno11`` and ``freemangordon`` have also been working on infra red support,
have been ensuring that the Linux kernel wide is working and reportedly have
the `pierogi GUI <https://github.com/maemo-leste-extras/pierogi>`_ working on
the N900. The necessary patches will have landed in Linux 6.8, so when we move
to the next Linux LTS kernel we will have working infra red.

We've also fixed ensured that the microphone works for regular (non-call) audio
in `leste-config PR #51 <https://github.com/maemo-leste/leste-config/pull/51>`_
and ensured that the earpiece in calls isn't too loud in `leste-config PR #37
<https://github.com/maemo-leste/leste-config/pull/37>`_.

.. * n900 swap for 6.6 https://github.com/maemo-leste/leste-config/commit/2c0ccb6ba62b8d397052862721a4f54e5b1b3e78


.. Pinephone
.. ---------


Mapphones
---------

Most of the improvments to the mapphones have been in the form of making the
audio calls work better and fixing the graphical glitches as well as by adding
new mapphone devices. One other change however is fixing the 'hidden caller id'
feature being inverted (so when one would request to be hidden it wouldn't be,
and vice versa) - this was solved in `maemo-leste-upstream-forks/ofono PR #12
<https://github.com/maemo-leste-upstream-forks/ofono/pull/2>`_.


New devices
-----------

We have added image for a lot of new devices, the Motorola *RAZR XT910 and XT912*,
the Motorola *Atrix 2* and the XYBoard *MZ609/MZ617* **tablet**.

RAZR XT910 / XT912
------------------

* xt912/xt910 images

Atrix 2
-------

* atrix2 dts/config/images


xyboard tablets
---------------

* mz616 / mz617 woo (also mz609?)
* smaller / tiny images for mz617
* hildon-meta-core vs hildon-meta
* mention wiki pages


Purism
------

* Purism Librem5 wip ... (TODO: include picture of first run)

TODO sicelo photos

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

``freemangordon`` has been working on getting a plugin working for facebook, it
uses `purple-facebook <https://github.com/maemo-leste-extras/purple-facebook>`_
through `telepathy-haze (pidgin/libpurple)`_
and there is a `UI to configure the FB account <https://github.com/maemo-leste-extras/rtcom-accounts-plugin-facebook>`_.

Getting this to work required some additional work on `rtcom-accounts-ui
<https://github.com/maemo-leste/rtcom-accounts-ui/commit/9284bfa96b65b0a74283fc645d9e38969cd3213d>`_,
but things otherwise reportedly have been working well.

TODO: screenshots

telegram
~~~~~~~~

``Wizzup`` got Telegram working using `telepathy-haze (pidgin/libpurple)`_,
although the `setup instructions are currently yet somewhat involved
<https://github.com/maemo-leste/bugtracker/issues/716>`_.
The `tdlib-purple <https://github.com/maemo-leste-upstream-forks/tdlib-purple>`_
is being used and there is a UI to manage the account called
`rtcom-accounts-plugin-telegram <https://github.com/maemo-leste-extras/rtcom-accounts-plugin-telegram>`_.

However, after the account has been setup, the integration works quite well and
will fetch new messages for the device upon connecting and has working address
book integration.

TODO: screenshots

discord
~~~~~~~

``Wizzup`` also got the `purple-discord
<https://github.com/maemo-leste-upstream-forks/purple-discord>`_ plugin working
for Discord, and there is a UI to configure it called
`rtcom-accounts-plugin-discord
<https://github.com/maemo-leste-extras/rtcom-accounts-plugin-discord>`_. Basic
chats seem to work, but Discord's additional IP-based protections make using it
still a little difficult: one needs to log into the web version of discord on
the same IP, and then logging in will work.

TODO: screenshots

telepathy-tank (Matrix)
-----------------------

We have improved upon the `telepathy-tank
<https://github.com/maemo-leste-upstream-forks/telepathy-tank>`_ Matrix
connection manager, which uses `libQuotient
<https://github.com/quotient-im/libQuotient>`_.

We have added the following:

* Support for creating, joining and leaving rooms
* Detecting the room name and detecting if other devices leave the room
* Support for end to end encrypted chats (previously messages would just not be
  received at all)


We are working on getting the code tidied up and the changes upstreamed. The
Matrix contacts do not show up in the address book just yet - we're investigating
why this would be the case, it might be a problem in our address book rather
than in the Telepathy connection manager implementation.

We have also created a `UI to configure a Matrix account
<https://github.com/maemo-leste-extras/rtcom-accounts-plugin-matrix/>`_, for
which we had to make some changes to rtcom-accounts-ui `to not treat the @ sign
<https://github.com/maemo-leste/rtcom-accounts-ui/commit/0511c57cbac98d7d19b7dfe27549e834dfeefea3>`_
as username/host separation and `separate out the server name showing
<https://github.com/maemo-leste/rtcom-accounts-ui/commit/3f1f29fc95b113020c1e33fe3babdb462b753597>`_.

https://github.com/maemo-leste-upstream-forks/telepathy-tank/tree/maemo/chimaera-devel

TODO screenshots


telepathy-rakia
---------------

Adding SIP accounts in Maemo is now possible using the provided account setup
dialog `added to the base rtcom-accounts-plugins
<https://github.com/maemo-leste/rtcom-accounts-plugins/commit/c545748d0b8862c6e1fb3a536418a0acced7f85f>`_. which solves `issue #657 <https://github.com/maemo-leste/bugtracker/issues/657>`_.

Using such an account it is now possible to send SIP messages when supported and
one can also receive and make SIP phone calls with working audio.

TODO screenshots

telepathy-ring
--------------

telepathy-ring, the ofono (regular calls) connection manager has been added to
our list of upstream forks to ensure that the right mission-control plugin gets
installed, which in turns makes sure that the telepathy-ring account is online
even when there is no internet (since cellular calls work fine without
internet). This setting is controlled by the 'always_dispatch' bit in Telepathy,
and it took us quite a while to figure out how this was supposed to work.

Conversations
-------------

Conversations has seen significant improvements since our last news update,
amongst other things:

* support for sending and receiving SMSes now that the `sphone voicecall manager
  module was merged <https://github.com/maemo-leste/sphone/pull/4>`_;
* multi window support;
* working (persistent) notifications, including on the lock screen;
* support for 'chat state' which will help connection managers determine when a
  message has been seen;
* support for group chats including auto-joining channels;
* drastically lowered memory usage;
* `full text search in all your messages
  <https://github.com/maemo-leste/conversations/issues/8>`_;
* initial address book integration;
* refactory of the telepathy client side code;
* the ability to clear and delete chats;
* the ability to `export chats <https://github.com/maemo-leste/conversations/issues/3>`_;

The main missing feature right now is the ability to start a **new** chat
directly from conversations: `composing a new message
<https://github.com/maemo-leste/conversations/issues/10>`_. Currently one has to
go through the address book and start sending a message from there. We are aware
that this is a severe limitation (especially for SMSes) and will address this shortly.


TODO: screenshot of lock screen with notitifications
TODO: screenshot of search


sphone
------

The biggest addition to sphone has been the addition of the `voicecall-manager
plugin <https://github.com/maemo-leste/sphone/pull/8>`_ which makes sphone
support audio calls using the Telepathy framework (orchestated by by `Sailfish
OS voicecall daemon
<https://github.com/maemo-leste-upstream-forks/voicecall/>`_). The reason that
this addition is huge is because this allows us to switch SMS and calls over the
Telepathy (which means that `Conversations`_ can now handle SMses) and also
because it allows us to make SIP and XMPP audio calls using the Telepathy framework.

``uvos`` has contributed various core sphone changes to support the
voicecall-manager and has most recently worked on enabling DTMF support within
sphone. ``freemangordon`` has made sure that the ``vcard-field`` `gets stored in
the events database
<https://github.com/maemo-leste/sphone/pull/6#event-10594544989>`_.

The option to make `phone calls in landscape mode
<https://github.com/maemo-leste/sphone/pull/5>`_ has also been added to accomodate
the Nokia N900, which currently doesn't support portrait mode screen rotation.

Media
=====

In our previous post we introduced the Maemo Open Media Player. This updates
brings a lot of improvements to the media player, in particular when it comes to
performance and stability. However, the single biggest change is that open media
player will now actually find and play music stores on your device (instead of
just internet radio streams), this was achieved by a significant to port
``mafw-tracker-source`` to newer frameworks.

`mafw-tracker-source <https://github.com/maemo-leste/mafw-tracker-source>`_ is
the component that then uses gnome-tracker to deliver the files as input to the
open media player and has also received many changes (`too many to list here
<https://github.com/maemo-leste/mafw-tracker-source/commits/master/>`_), but the
most important improvements are improve tracker ordering and better performance.

TODO: screenshot of openmediaplayer with music

In particular, the gnome-tracker which is used to index your files (and identify
them as songs) recieved a lot of stability fixes and speed improvements. In some
cases, fixes were never backported. The most common occurance was that tracker
wouldn't ever actually complete and start up indexing things all over again.

In particular, `these
<https://github.com/maemo-leste-upstream-forks/tracker-miners/commit/0ac3ba4e88b38d2d006286a34cf6c72da9311409>`_ `three <https://github.com/maemo-leste-upstream-forks/tracker/commit/db6e3b5fe439cafc288d313e55697d6128212067>`_ `commits <https://github.com/maemo-leste-upstream-forks/tracker/commit/88bb88a2e5a45cdf0cb5346e04f389922b42d022>`_ were all essential to the stability.

``uvos`` has fixed the 'car view' screen (this was broken previously) and
has `decreased the power usage
<https://github.com/maemo-leste-extras/openmediaplayer/commit/009194ced182ede5b732c0feecf4230b8c0c99a5>`_
by ensuring the the UI will not update when the screen is off (previously, the
UI would only stop updating if the screen was locked - but the screen can be off
and not locked).

Contacts
========

The Contacts (address book) program has received a lot of bugfixes, including a
fix for the issue where many online contacts would show as `"No Name"
<https://github.com/maemo-leste/osso-abook/commit/37f15bdaeabda4bad43eda042df471cc7c45c14a>`_. 
The `action time
<https://github.com/maemo-leste/osso-abook/commit/121f50e2e13096344f8983c1b74622d9fac8fceb>`_
of specific actions (like starting a message or a call) has also been fixed and
`protocol-based identification also received a fix
<https://github.com/maemo-leste/osso-abook/commit/b9f699fbd4ecb446b0a53d8e6b966432ef771938>`_.

The address book will now also properly show the ability to perform an audio or
video call to a XMPP contact if they are online and added as a contact - this
required a `fix to eds-backend-telepathy
<https://github.com/maemo-leste/eds-backend-telepathy/commit/78e47143060efe736ea0414ccebe6e73a188aa00>`_
as well as `a fix to the address book
<https://github.com/maemo-leste/osso-abook/commit/4a3c44606f194ee5e00df45b53ea9a748b34bf9f>`_.

Furthermore, when initiating a call from the address book, the program will now
use the right `Telepathy request
<https://github.com/maemo-leste/osso-abook/commit/56f3e48b44475c09620703cbd8170c952877d2fa>`_
so that sphone and the voicecall manager program will actually act on the
request to start a phone call.

``uvos`` also tried to extend the usability of the address book to try to use
hildon-mime to figure out what program to use if there are no telepathy accounts
available - see `osso-abook PR #2
<https://github.com/maemo-leste/osso-abook/pull/2>`_ and `libhildonmime PR #5
<https://github.com/maemo-leste/libhildonmime/pull/5>`_.

.. * 18:09 < freemangordon> Wizzup: https://github.com/maemo-leste/osso-abook/commit/8189df5237c5ac89ca05e44d3e20ad856b7a2f24

Documentation
=============

Cornel-Florentin has continually been working on the Maemo Leste user guide and
has added sections on the settings (which is really big chapter!) and contacts
(contains a lot of Telepathy work) application as well as on email, application
manager and most recently the navigation section.

We have now also packaged the `maemo-user-guide
<https://github.com/maemo-leste/maemo-user-guide>`_ and if you click the "User
Guide" icon, the user guide will now open on the device in a browser - and no
internet connection is required to read it.

We are also hosting an `online version of the userguide
<https://maedevu.maemo.org/docs/userguide/html/>`_, but it might lag
behind a little on the most recent version.

TODO: screenshot on jib
TODO: screenshot on nokia n900

Browser
=======

``dsc`` has been putting a lot work into making a decent default browser for
Maemo Leste (except for on the Nokia N900, where we default to Dillo). Jib now
also sports:

* support for portrait mode;
* `support for ad blocking
  <https://github.com/maemo-leste-extras/jib/issues/7>`_ (lists based on uBlockOrigin)
* support for file:/// support;

TODO: screenshot

Gtk / Qt
========

The Maemo Qt module now `supports submenus
<https://github.com/maemo-leste/qt-platform-maemo/commit/c9c5591b60c9ef858aeb6162db87e51818c71592>`_
in the top level menu navigation, which means that instead of having all actions
of menus and submenus thrown into a single pile, one can now navigate submenus
of complex applications quite naturally. Menu bars are also automatically hidden
in Maemo which further improves the default experience of non-native Maemo
applications.

The 'downward arrow' menu indicator is now also `properly rendered
<https://github.com/maemo-leste/qt-platform-maemo/pull/2>`_ in Qt programs,
which solves `issue #466 <https://github.com/maemo-leste/bugtracker/issues/466>`_.

We have also fixed the stacked window handling in `commit 80cd89f <https://github.com/maemo-leste/qt-platform-maemo/commit/80cd89f24828f8c44935b5c6c4587b978ca4689c>`_ and `commit 4ea6b1526 <https://github.com/maemo-leste/qt-platform-maemo/commit/4ea6b1526909141557b7489fbf935cc3c3572488>`_.
in our Qt plugin.

``freemangordon`` has also fixed some of the visual glitches in our qt theme,
which solves `issue #693
<https://github.com/maemo-leste/bugtracker/issues/693>`_.

Hildon
======

For a while, it was not possible to edit the order of applications in launcher
menu of hildon-desktop - this has been broken ever since the addition of the
Debian submenu. This has now been addressed in `hildon-desktop PR #23
<https://github.com/maemo-leste/hildon-desktop/pull/23>`_.

hildon-desktop now also supports multiple shortcuts for a single action which
solves `issue #528 <https://github.com/maemo-leste/bugtracker/issues/528>`_.

The hildon-status-menu now allows for multiple icons per status menu plugin,
implemented in `hildon-status-menu PR #4
<https://github.com/maemo-leste/hildon-status-menu/pull/4>`_. This allows us to
render multiple icons for example for when a device has multiple sim cards or
has multiple batteries.

`libhildonmime PR #5 <https://github.com/maemo-leste/libhildonmime/pull/5>`_
extends libhildonmime to properly fallback to xdg-open.

The terminal application now also has a setting to disable changing the font
when the volume keys are pressed, see `osso-xterm PR #4
<https://github.com/maemo-leste/osso-xterm/pull/4>`_.

DSME, the device state management entity has gained support for using `elogind
to restart or shutdown the device
<https://github.com/maemo-leste/dsme/commit/c6aa4ef1cb4d9ea8334ed23b6bebb975a523c0bf>`_
so that the action is coordinated more effectively to the rest of the system.

Synchronisation
===============

Since the migration to Chimaera, synchronising contacts and address books was
seemingly broken. Embarassingly, it turned out that yours truly forgot to
`enable building
<https://github.com/maemo-leste/syncevolution/commit/14bf3f262d39748ced70a6460bd1bd25053a40a4>`_
the Maemo backend of syncevolution with the migration, and once the backend was
flipped on and `a few compilation errors were fixed
<https://github.com/maemo-leste/syncevolution/commit/149b3db06d02dd3a020b745039df4e4b8b5548b6>`_
synchronisation once again started working.

If you haven't set up synchronisation, check out the `Sync
<https://leste.maemo.org/Sync>`_ page on the wiki.

Translations and localisation
=============================

Since Maemo Leste has been on weblate to crowdsource translations of the
operation system many users had actually contributed translations. However,
manual labour was still involved in getting the new translations built and
deployed, and with the help of some automation this has now been done for the
50+ translation reposities that all saw contributions.

Some of our own core applications do not yet support localisation (like
`Conversations`_, but we aim to add that soon).


Extra packages
==============

Maemo (Offline) Translate
-------------------------

Maemo Translate now supports additional languages with this
`maemo-translate-data commit
<https://github.com/maemo-leste-extras/maemo-translate-data/commit/ff97e527568e4167e28299e9ea501bc74deb729d>`_ - importing the latest models from `firefox-translation-models <https://github.com/mozilla/firefox-translations-models>`_.

We also created a script to `automatically make a new release
<https://github.com/maemo-leste-extras/maemo-translate-data/commit/399d55d72e6cbc05ab3023eec2354ece214638f8>`_ based on
firefox-translation-models should we want to do a new release.

This adds offline translation support for the following languages:

* Danish
* Greek
* Finnish
* Croatian
* Hungarian
* Indonesian
* Lithuanian
* Latvian
* Romanian
* Slovak
* Slovenian
* Serbian
* Turkish
* Vietnamese

Each of these languages can be installed separately. One can also use the
meta package to install all of the languages.

OTP
---

The Maemo "OTP" program (perhaps to be renamed Maemo Authenticator in the
future) now `supports the more common base32 and hex encoded keys
<https://github.com/maemo-leste-extras/maeotp/pull/7>`_. This allows
one to use the OTP program for 2 factory authentication with most services:
Github, Gitlab, and Pypi for example.


DrNokSnes
---------

DrNokSnes, the SNES emulator is now working and packaged - thanks to ``arno11``.
This has been a very long time coming (over four years) - see `issue #331
<https://github.com/maemo-leste/bugtracker/issues/331>`_ for some history.

TODO screenshot

.. * https://github.com/maemo-leste-extras/bugtracker/issues/38
..   songrec
.. 
.. * https://github.com/maemo-leste-extras/bugtracker/issues/39
..   hextool
.. 
.. * https://github.com/maemo-leste-extras/bugtracker/issues/40
..   comics daily package


NGI Assure: NLnet Funding
=========================

The NGI Assure that we applied to is finishing at the end of August, and we have
achieve most of our funding goals (but not all).  The NGI also invited us to a written interview, which can be `read here on ngi.eu
<https://ngi.eu/ngi-interviews/interview-with-merlijn-wajer-maemo-leste-ngi-assure-beneficiary/>`_.

We're very thankful to NGI and NLNet for the opportunity.


Apology for the delayed update
==============================

Finally, we would like to apologise for the lack of news updates. For those who
don't follow the day-to-day activities of the project it might have seen like
the project development has halted, but this couldn't be further from the truth.

The main reason for the lack of news updates is that writing these posts takes a
lot time and it is not a task that is easily handed off as it requires extensive
understanding of all the different components of Maemo and keeping track of all
the changes that go in. On top of that, the other thing that typically delays
these news posts is a desire for the updates to be substantial ("Let's just add
a few more features and *then* we'll make a new post"), which in turn kept
pushing the news post forward.


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

