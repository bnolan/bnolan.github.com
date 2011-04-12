---
layout: post
title: Distributed Social Networking
---

Normally when a client rings up and wants you to build a replacement for Facebook, you smile politely and say that you're full up for the next 18 months.

But, [Simon](http://www.facebook.com/simon.tennant) from [Buddycloud](http://buddycloud.com/) has asked me really nicely to build the front end for his distributed social network, so I said I'd give him 5 weeks and see what we can pull off.

# Buddycloud

The buddycloud protocol is an extension for XMPP, the system that gtalk uses. Buddycloud takes the existing XMPP extensions (publish / subscribe, rosters, federation) and builds a social network around them. Buddycloud is an opensource protocol, Simon and others are trying to get the protocol in front of the xmpp standards committee.

There are three implementations of buddycloud-compliant servers at the moment, one for ejabberd, one for prosody, and a new one that uses node.js and plugs into any standards-compliant jabber server.

# Web front end

Back in December, I created [Diaspora-x](http://diaspora-x.com/), which was a first cut at building a social network on top of XMPP. It is a pure HTML5 app, just javascript, html and css - the backend service is provided by the XMPP servers (running [ejabberd](http://www.ejabberd.im/) and [prosody](http://prosody.im/) at [beta.buddycloud.com](https://beta.buddycloud.com/http-bind/).

This was an interesting experiment, and showed it is possible to build a responsive social network that gets all it's data from an xmpp network. 

# Twitter, Facebook and Buddycloud

It's interesting to note that [new twitter](http://engineering.twitter.com/2010/09/tech-behind-new-twittercom.html) uses the exact same engineering as Diaspora-x, in that when you visit the website, you're actually loading a large javascript application. The tweets and profile data that you see is transferred afterwards by an XMLHttprequest.

The existing Diaspora-x client (which is the basis for the new Buddycloud web client) does the same thing, it's a Javascript app, powered by Backbone, jQuery and Underscore.js - which instead of loading tweets from api.twitter.com, it subscribes to an XMPP channel over BOSH (XMPP over http protocol), and messages from your contacts are pushed down to the browser.

The current Facebook UI does a similair thing, it loads a small amount of static html when you load the page, then most of the rest of the page is constructed from Javascript running in the browser. (Facebook is a bit different because it uses their [Primer](http://www.facebook.com/note.php?note_id=307069903919) tool that downloads html, instead of doing the templating in the browser - but similar concept).

# Building the Buddycloud Web Client

The Buddycloud web client will be an Opensource project, so you'll be able to watch my progress at github once the repository is up. I'll try and blog regularly here, so watch for progress...