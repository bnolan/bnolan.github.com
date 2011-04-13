---
layout: post
title: Localstorage for speed
---

The Buddycloud web client is [available on github](https://github.com/buddycloud/channel-webclient). I started with the Diaspora-x codebase, and have been backporting in features from the codebase that was started by [Stefan Maka](http://astro.soup.io/) (another Buddycloud contributor).

<img src="/images/channelinfo.png" />
<cite>Channel metadata display</cite>

# Using localStorage to accelerate load time

When you fire up [diaspora-x](http://diaspora-x.com/), it takes about 15 seconds to finish loading the #home page. Obviously this isn't going to play in a world where page loads should take [less than 1000ms](http://www.useit.com/alertbox/response-times.html). Ideally I'd like the page to load in about 100ms. Assuming we can get everything cached locally, that gives a pretty generous time for the browser to cache and run the javascript payload.

The first part of the optimization was to prevent unnecessary requests to the XMPP server. Once you've requested all a users posts, there's no need to re-request the same posts. We can use [Result Set Management](http://xmpp.org/extensions/xep-0059.html) to only ask for posts newer than the last post we recieved, and then we can use [backbone-localStorage](https://github.com/jeromegn/Backbone.localStorage) to save the posts in localStorage in the current browser.

    class ChannelCollection extends Backbone.Collection
      model: Channel
  
      initialize: ->
        @localStorage = new Store("ChannelCollection")
        
And then before we start the app...

    Channels = new ChannelCollection
    Channels.fetch()

There are further issues to solve, like clearing the localStorage when the user logs out. Note that you can't reset the entire localStorage object, so you have to do it per key.

    delete localStorage[Channels.localStorage.name]
