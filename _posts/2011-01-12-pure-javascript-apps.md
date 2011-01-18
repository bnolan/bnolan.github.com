---
layout: post
title: 2011 - the year of pure javascript apps
---

Pure javascript apps, or apps that use javascript for all the presentation have been coming to prominence for years.

* Google maps 2007
* Phonegap 2008
* Facebook 2009
* Twitter 2010

It's an obvious prediction, but 2011 will probably have a lot more javascript apps being released. From mobile - where phonegap is so important to smaller companies that can't afford to redevelop an app natively in Java and Objective C - through to 'desktop' web apps like the twitter client.

Some of the key technologies that I peg for uptake this year:

# CoffeeScript

I'm a big fan of this. It's easy to learn (if you're open minded and don't try to be too clever), and makes javascript immeasurably more pleasurable to write. It's basically a whitespace aware javascript compiler, so it does away with all the curly brackets, replaces `function` with `->` and has very nice built in prototype-based class support.

# CouchDB

This one I'm not so sure about. Couch is really amazing for creating pure javascript apps, since you don't require a middleware, you can put business logic into the database layer (rules are written in javascript) and they talk JSON to your javascript app. The downsides with couch are that it is a bit of a mindfuck to get used to, coming from a relational background. Also, the couchapps / authentication / client-facing parts of couch are relatively new and I think there needs to be a lot of work on documentation and frameworks to make client-facing couch apps easier. So, couch for indie developers making pure javascript apps - watch out for this.

# Backbone.js

There are a dozen or so javascript MVC frameworks. I imagine they'll all take off (javascriptmvc, backbone, ext..), but the one I really like is backbone. It's pure javascript, plays nicely with Zepto (a tiny implementation of jquery for webkit-mobile) and works well with coffeescript. It's very event based, so some parts are really great (like redraweing the UI when an item in a collection changes), but it'll be interesting to see how it progresses over the year, hopefully some great tutorials come out of it and it'll become a dominant force in javascript development.

# Phonegap

I know that mobile apps written in phonegap are seldom as good as native apps, and a well written native app will always be better than an html+css app, but phonegap is just going to get better and better this year. If you look through the [phonegap plugins](https://github.com/purplecabbage/phonegap-plugins) for each platform, there are some great bits, like the email connector and child browsers.

# Node.js

To finish off, node.js. Node is a bit of a mixed bad. It's awesome because everything is async, it compiles easily, is very fast and seems to be reliable. On the downside, the API changes like a bitch, constantly. Any code you wrote for node 6 weeks ago, probably won't work anymore. I appreciate that it's a pre 1.0 project, and they're trying to work out how to do everything in the best possible way, but if development really needs to stabilise around some core areas soon (like socket programming).