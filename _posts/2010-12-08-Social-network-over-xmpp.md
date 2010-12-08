---
layout: post
title: Social network over XMPP
---

I thought I'd do a post showing how a social network over XMPP works. This isn't any invention of mine, I'll just point to the relevant specs and give my understanding of how it can work. I'm not an XMPP [expert](http://www.buddycloud.com/) though, so take this with a pinch of salt.

# User IDS

Users are identified by their jabber id, which looks like an email address - eg: `bnolan@gmail.com` or `ben@diaspora-x.com`. Users have to be associated with a jabber server, but they can use any client they want. For example I could use diaspora-x.com to access my bnolan@gmail.com jabber account.

_nb:_ Diaspora-x won't support gmail as a jabber server until gtalk supports  [oauth](http://www.google.com/support/forum/p/Talk/thread?tid=2c8f523795126684&hl=en), since otherwise a diaspora-x seed would have to store google account passwords.

# Pubsub

XMPP supports publish/subscribe via [XEP-0060](http://xmpp.org/extensions/xep-0060.html). This means that you can send a message to your xmpp server, with no to address specified. Everyone on your roster who is subscribing for those kind of events will get your message. If someone on your roster is offline, their xmpp server will store your message until they come back online.

# Personal eventing protocol

[XEP-0163](http://xmpp.org/extensions/xep-0163.html) describes how any jabber user can act as a virtual pubsub service, and send their own status / events. 

    <iq from='juliet@capulet.lit/balcony' type='set' id='pub1'>
      <pubsub xmlns='http://jabber.org/protocol/pubsub'>
        <publish node='http://jabber.org/protocol/tune'>
          <item>
            <tune xmlns='http://jabber.org/protocol/tune'>
              <artist>Gerald Finzi</artist>
              <length>255</length>
              <source>Music for "Love's Labors Lost" (Suite for small orchestra)</source>
              <title>Introduction (Allegro vigoroso)</title>
              <track>1</track>
            </tune>
          </item>
        </publish>
      </pubsub>
    </iq>

<cite>Sending a song update using the tunes extension</cite>
<br />

This pubsub activity is commonly used by [user tunes](http://xmpp.org/extensions/xep-0118.html) so you can see what your friends are listening to. If you've ever seen someone updating their adium status with song names from itunes, they might've been using XEP-0118.

Another use of publish / subscribe is microblogging - described in [XEP-0277](http://xmpp.org/extensions/xep-0277.html). 

# Microblogging

Microblogging over xmpp create a node `urn:xmpp:microblog:0` on each user, and then provides a protocol for sending atom messages over xmpp. This protocol has been expanded upon by the [Vodafone research group](http://http://onesocialweb.org/) as [Activity Streams over XMPP](http://onesocialweb.org/spec/1.0/osw-activities.html) which lets you publish, update and delete posts. It also gives a [vocabulary of verbs](http://activitystrea.ms/schema/1.0/activity-schema-01.html) that you can use to describe your activity, so you can like, bookmark or group posts.

A client doesn't have to implement all the verbs. Diaspora\*x only implements the like and post protocols (replies to posts are posts as well), but as you fill out the functionality, you have a predefined vocabulary so that clients can work together.

# Alternate clients

I have a few goals for diaspora\*x, if I keep working on it.

1. Get federation working reliably with other servers, currently the xmpp connector is incomplete, although it shouldn't take long to get going. I'd also like to test the federation against another social network, maybe buddycloud, or onesocialweb.
1. Create a desktop client using strophe.js, that connects to the jabber server directly (via BOSH) and shows how a client can be implemented in the simplest possible way.

A part of my job I think, is to demistify social networking over xmpp, as it's quite a simple idea and easy to implement on the current specs.

I also have to read up on ostatus and work out if and how diaspora\*x should work with ostatus. If it makes sense to add ostatus support, that would mean anyone on the status.net network would be friendable via a disapora\*x seed.