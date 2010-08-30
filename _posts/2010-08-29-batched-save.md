---
layout: post
title: Batched save ruby module
---

In my work on [twitterplaces](http://twitterplaces.com/) - I've been commonly importing several thousand tweets at once from the streaming API. As I re-write my import process, I have to re-run this import job, so I've been trying to get it as fast as possible. Currently what I do is:

* Use memcache
* Use [batched\_save](http://gist.github.com/555750)

Batched save is my module I created to let you `include BatchedSave` in a model, and then when you save a new record - it'll batch up 100 records and use COPY to insert them. It is for postgresql only, and obviously only works in situations like mine where the data isn't self-referential, but it's mega fast.