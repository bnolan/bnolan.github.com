---
layout: post
title: Dream Hardware
category: zoomin
---

I've been thinking of upgrading [ZoomIn](http://www.zoomin.co.nz/) to some dedicated hardware. I currently use a 4gb ram VM hosted by rimuhosting in Auckland. They're a pretty good crowd and the performance has been ok, but IO is especially slow, so anything which hits disk is slow. I've fixed this by caching expensive things (for example the json used in the new search sidebar) in memcached, and adding indexes wherever `explain analyze` showed a sequential scan, but it's annoying to have to do so much performance work in production, when performance is perfectly acceptable in my development version (running on a SSD and 4gb of RAM). And so I've been thinking about moving to some dedicated hardware - maybe something like this:

 * [Poweredge R410](http://www.dell.com/nz/business/p/poweredge-r410/fs) $1499
 * [16gb RAM](http://www.ascent.co.nz/productspecification.aspx?ItemID=401840) $501
 * [120gb SSD](http://www.ascent.co.nz/productspecification.aspx?ItemID=404257) $176

And then the monthly costs, hosting with [xtreme](http://www.xtreme.net.nz/services/colo.php), who have a Wellington based data center - which is important since the majority of ZoomIns visitors are from New Zealand, and things like the autocompleter require ultra low latency.

 * 1U Rackspace $199 
 * Extra 20gb intl. traffic $99

Which comes in to at least $300 per month, after the capital costs of buying the server. I'm not going to rush into this, but if I get the advertising revenue up a bit on ZoomIn, it might be worth upgrading to some more chunky hardware.