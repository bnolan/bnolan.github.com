---
layout: post
title: Diaspora*x
---

I life Facebook, and at the moment I think it does a great job of managing privacy on the Facebook site. My only concern is that of censorship. If the US government asks Facebook to censor something, Facebook has to acquiesce to their request.

I don't believe this is a problem in the short term (if the wikileaks facebook page goes offline no one is going to die), but I do think the idea of having a distributed social network - where there is no central point of control or central point of failure - is a cool idea.

So I was excited to learn about Diaspora. It's clearly something people are interested in, their fundraising was 20x oversubscribed. So when they did a public release, I was keen to check out the code and try it out.

The current alpha release of Diaspora is interesting, but it clearly has a ways to go before it's ready for day-to-day use. The biggest problem I found with it is that it doesn't support XMPP for communication between different seeds. XMPP is also known as Jabber, and it's the protocol that gtalk and ichat use to communicate. Even facebook uses [xmpp](http://developers.facebook.com/blog/post/110) in places to allow you to interact with facebook chat.

# Adding XMPP support to Diaspora

So I grabbed a few bits out of the Diaspora trunk and built a [little app](http://github.com/bnolan/diaspora-x) to demonstrate how a basic distributed social network could work. You can try out my result of a few days coding here:

## &raquo; [diaspora-x.com](http://diaspora-x.com/)

I'm not sure how much more work I'm going to do on this project, I've proven the idea works to myself, and I'd like Diaspora proper to start work on XMPP support for the main project.

However - if you want me to add a feature to the diaspora-x website, put your requests into the [github issue tracker](https://github.com/bnolan/diaspora-x/issues) and I'll see what I can do.

There are installation instructions [here](https://github.com/bnolan/diaspora-x/blob/master/doc/install.md) if you want to try running Diaspora\*x yourself. 