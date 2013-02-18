---
layout: post
title: ZoomIn Fixed Tree Implementation
category: zoomin
---

I've been working on [ZoomIn](http://www.zoomin.co.nz/) a lot in the past few weeks. I need to start writing more newsletters about what I'm doing. But anyway, there's a technical aspect of ZoomIn that I want to highlight, since it's really great.

Back in 2006, when [John](http://www.projectx.co.nz/), [Nick](http://www.indigorenderer.com/) and I were working on the first version of ZoomIn, we were discussing ways of storing the ZoomIn url hierarchy in the database. So for example, we had nodes like:

 * /wellington/
 * /wellington/newtown/
 * /wellington/newtown/coromandel-street/
 
And in the database, we wanted to store that newtown was a child of wellington, and coromandel street a child of newtown. The easiest way to do that would have been just randomly inserting nodes into the database and building a tree structure where each node has a parent_id. The only downside to this, is that I wanted a really efficient way of finding all the nodes, comments, or photos, under a node in the tree.

eg - we wanted to be able to do a single query (without any crazy joins) that would return all comments on any streets, places or street addresses under `/wellington/newtown/`.

We went away for a while, and bounced over a bunch of ideas, then eventually stumbled on the inet6 datatype that is native to postgresql. So after a bit of research, we worked out that we could use an inet6 as a primary key and foreign key, rails worked well with it, and indexes operated fine as well. So what we ended up doing was something like this:

 * /wellington/ => 1::
 * /wellington/newtown/ => 1::1::
 * /wellington/newtown/coromandel-street/ => 1::1::1::
 * /wellington/newtown/hanson-street/ => 1::1::2::
 * /wellington/newtown/hanson-street/43/ => 1::1::2::1::
 * /wellington/berhampore/ => 1::2::

And we wrote two helper methods on each Place (a node in the tree), `left` and `right`.

 * wellington.left => 1::1::
 * wellington.right => 1::FFFF::
 
So - if for example, you want to find all the comments under Newtown (to show the new [forum page](http://www.zoomin.co.nz/nz/wellington/newtown/forum/)), you do a query like this:

    ['select * from comments where place_id between ? and ?', newtown.left, newtown.right]

In the end, we actually used a variable sized structure (so we don't use a whole subnet per node, but instead a specific bit-depth), but the basic idea is as above.

I'm not sure what kind of data structure this is (I think maybe it's a fixed tree?), but it's worked excellently for over 7 years on ZoomIn. Combined with the GIST 2-dimensional index that PostGIS supplies, we've been able to do most all the queries you want on a geo-social site without relying on denormalizing the data or super expensive mega-joins or subselects.