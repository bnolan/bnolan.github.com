---
layout: post
title: Xapian to TSearch2
category: zoomin
---

When we first wrote ZoomIn, back in the day, the built in search that came with Postgres (TSearch) was implemented as a bunch of stored procedures, and generally sucked. So we used a high performance C++ reverse index search library called [Xapian](http://xapian.org/). Why did we need full text search in ZoomIn? Well, the plan is that people would tag places with keywords, and then you could generate a searchable column on each place, that contained all the tags, the address and any other information we had about the place, so a search like:

*beer bar wellington*

Would surface [Hashigo Zake](http://zoomin.co.nz/map/nz/wellington/te+aro/taranaki+street/25/-hashigo+zake/) and [Bebemos](http://zoomin.co.nz/map/nz/wellington/newtown/riddiford+street/88/-bebemos/), just using the magic of full text search.

Note that we didn't use FTS for our address parser, instead we used a bayesian search tool that I wrote from scratch in a bit of gut-driven intuition, and then Nick rewrote after doing the maths to work out exactly how it should work.

Our Xapian integration was pretty cool, we wrote a module for Postgres that exposed Xapian query results as a temporary postgres table (that we could then join with our Places table). But when I took over ZoomIn last year and moved everything onto new infrastructure, I wanted to reduce the number of moving parts, and one of the easiest ways to do that was to remove Xapian. Luckily, [Full Text Search](http://www.postgresql.org/docs/8.3/static/textsearch.html) in postgres has come a long way, and the new (built in) text searching functionality is fast enough on the data set I use. So now I just have an `after_save` hook that rebuilds the `tsvector` column, which updates the index and makes sure we can always search quickly and freshly on any of the 100,000+ places in the ZoomIn dataset.