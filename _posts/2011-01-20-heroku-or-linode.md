---
layout: post
title: Heroku or Linode
---

The biggest problem I have with keeping my projects going is paying for and maintaining my servers. When you're consulting, $60/mo for a dedicated server isn't a big deal, but when it's seeing no real traffic growth and you have to be responsible for backups, updates and admin - I find that after 3-4 months I usually mothball a project and have one less thing to administer.

Thus Twitterplaces, which was running on a dual-core 4gb box so it could index all the geo-tweets in the world. I left it run for about 6 months before taking it down. I'm planning on releasing weheartplaces to the appstore before I head off on holiday - so I need to set up a production environment for it. My options as far as I can tell are:

## [Heroku](http://heroku.com/)

_Pros:_ Managed rails hosting, don't have to do any admin, everything is backed up. 
_Cons:_ Expensive (minimum of $50/month), no postgis.

## [Linode](http://linode.com/)

_Pros:_ Affordable ($20/month), can install whatever I like (Postgis / R / FastCGI scripts).
_Cons:_ Have to sysadmin and back it up myself.

I'm leaning towards linode at the moment since I already have one running diaspora-x.com, but I'd like some feedback on this. I know that at some level I should put my app on Heroku - but maybe I can have it running on my 512mb linode for a few months while I see if there is any uptake in weheartplaces at all?