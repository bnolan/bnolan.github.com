---
layout: post
title: Diaspora-X speedups
---

I'm back from a week on the Australian beaches (I recommend surf lessons at Coolum and the breaks down at Burleigh heads) and at a wicked little festival (Blah blah blah is a highly recommended party), so it's time to fix up a few issues that were raised while I was away.

About two weeks ago I wrote [Diaspora x²](https://github.com/bnolan/diaspora-x2), a port of the Diaspora UI to pure Javascript. My original Diaspora-xmpp port used rails and xmpp4r to federate by XMPP. It was a good idea, but I'm much more at home using javascript that rails, and there was a lot of work required to get the xmpp connector working reliably at high loads.

That's why I got strophe.js, which is a javascript library for doing xmpp over the http transport, [bosh](http://xmpp.org/extensions/xep-0206.html). The result was diaspora-x2, which is now online at diaspora-x.com.

All well and good - but the first release was REALLY slow. Todays fixups:

## Queue rendering calls

My views watch the posts collection for add and remove events. So an xmpp message comes in, it gets added to the posts collection, and then the view re-renders. The problem is, the way bosh batches messages together means that I often iterate over a 100+ messages, and add them one by one to the collection. This then triggers a 100+ `render()` calls, each of which constructs a big string, the string is parsed, then the elements are added to the dom, then they're all deleted and it starts again.

Super easy fix that it applicable to a lot of backbone apps:

    render: ->
      @el.html(@template())
      
Replace with:

    render: ->
      if @renderTimeout
        clearTimeout @renderTimeout
      
      @renderTimeout = setTimeout( =>
        @el.html(@template())
      , 50)

The only downside to this is that you have to make your view tests async.

## Better rendering

The bigger problem is that because the entire posts wall gets re-rendered everytime theres an update means that anything you were typing into an inline textbox will get annihilated. I'll be fixing this by progressively inserting and removing dom elements when the collection changes. Ordering will be done by having a `data-created-at` attribute on the elements, so you select the dom elements, then move down the list until you get to the correct element and insert.

## Embed.ly

This will let me re-enable embed.ly, so that we can have cool inline media, like soundcloud tracks, youtube videos or flickr photos.

## Media upload

I want to enable [drag and drop](http://html5doctor.com/native-drag-and-drop/) media sharing, where the user selects which service they want to host the media. By default we could support imgur, then the user drag/drops images up and they get uploaded to imgur and then post the text link.