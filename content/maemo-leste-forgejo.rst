Maemo Leste - Forgejo migration
###############################

:Category: news
:tags: forgejo, github
:authors: Merlijn Wajer
:date: 2024-08-27 00:00

With the next release of Maemo Leste imminent, we have some additional
information to share: we have moved all of our repositories from Github to
Forgejo, self hosted on https://git.maemo.org. Our website
(https://maemo-leste.github.io) will remain hosted on Github for now.

This article will discuss the changes and the motivations that lead to this
migration.


==========================
Github, values and Forgejo
==========================

Maemo Leste as a project initially used Github for our code hosting. We chose
to host our code there because we believed that the 'network effect' of Github
would lower the barriers for contributions from outsiders.

Since then, years have passed and we're not sure if this 'network effect' really
is that visible and important to us. Github is not open source, not
self-hostable and owned by big corporations - none of these points align with
our values. Additionally, making backups of our project on Github is a bit of a
pain.

We don't know if we can rely on Github in the long term, so we have always
kept backups of our project, but Github doesn't make this very easy.

We've also been trying to switch from our `Jenkins instance
<https://phoenix.maemo.org>`_ to something more modern - and Github actions
aren't something we want to trust to build our software, for the same reason
that we don't host most of our content on the cloud.

So we set out to find an alternative and we ended up choosing Forgejo.

Forgejo
=======

Forgejo offers just about everything that we want: it is open source and self
hosted with minimal resource requirements. Their values and goals align with
ours more so `than the alternatives <https://forgejo.org/compare/>`_.

Forgejo also has a great migration path with support for importing repositories
from Github (including issues, milestones, open and closed pull requests) as
well as an API that makes it easy to automate the tasks.

Furthermore, we are planning to try out `Forgejo Actions
<https://forgejo.org/docs/latest/user/actions/>`_ as an alternative method to
build our packages and additionally offer continous integration services to our
developers.

Status
======

Our instance is live at https://git.maemo.org

We've currently migrated all our repositories from Github to Forgejo - and our
Forgejo is set up to push an changes to Forgejo back to Github for the
forseeable future.

All our packages now pull in sources from our Forgejo rather than from Github.

Account creation and login is facilitated by Oauth2 - allowing previous Github
users to easily migrate. Accounts free from Github can also be requested, but
public registration is disabled to limit the potential for abuse.

Forgejo is also configured with full text code search and we're actively
`contributing to Forgejo <https://codeberg.org/forgejo/forgejo/pulls/8106>`_ to further enhance this functionality.

Weblate integration is still lacking, as we have not figured out how to use the
hosted weblate instance to communicate directly with our Forgejo instance. We
are working on addressing this. In the meantime we will not pull in new
translations.

Happy hacking!
