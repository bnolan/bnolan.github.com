---
layout: post
title: Coffeescript supersedes Rails
---

This is a bit of a [contentious post](https://github.com/rails/rails/compare/9333ca7...23aa7da) (that commit is comedy gold) but I think people talking about rails using coffeescript as the new default client-side language are missing the point that coffeescript doesn't complement rails, it supersedes it.

I come from a biased position, since I'm known for front end development, but I've been doing rails since version 0.6, and most of my contract gigs have a ruby on rails component. Rails is a great tool for building middleware, and when it was invented it was a perfect solution.

# 2006

Common technology was MySQL and PHP. Front end development was pretty low-impact, mostly you generated html on the server and sent it to the client, sometimes you sent html fragment back and forth for some ajax-interactivity.

Into this environment, rails was amazing. It was a great framework for building apps, gave you conventions on how to structure your app, forms and data models. And then rails came out with the ajax helpers and people went crazy for it. Over time rails added excellent json support and people started using it to create pure json api sites (like twitter does these days), but fastforward to 2011...

# 2011

We now have pure json databases (couchdb, mongodb), localStorage and thousands of public APIs. And any truly modern app will probably be written in pure javascript (and rendering their static html by a node.js instance for disabled browsers). Into this environment, Rails makes less sense. If you're building a facebook add-in, you can probably do it entirely using FBJS. If you're using the foursquare api you can do that in the client, same with twitter. If you need to do an app that stores tonnes of data - get a free couchdb instance from couchone. If you need "web scale" - you can use amazon simple db.

Rails doesn't need to feature in any of this. And although rails will live on forever (like php does), and it'll probably adapt to it's new role as an authentication and permissions layer between the client and the database, I would be surprised if a better solution doesn't come along. It could be a more mature CouchDB authentication / permissioning framework, or Postgres might release a json interface and people go back to writing stored procedures to authenticate / secure requests.

# Middleware is becoming less important

I'm sure its just a cyclical thing, we go back and forth between thin client to thick client architectures, but it seems to me that rails might be on the downswing, to be replaced by some hot new tech that takes less work to create pure javascript apps.

Note that I'm not saying node.js is going to replace rails. I think there's less need for middleware these days.