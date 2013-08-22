---
layout: post
title: "Social Network over WebRTC"
---
 
This idea popped into my head while playing with the [peer.js](http://peerjs.com/) demos, and as a partial response to all the GCSB / PRISM bullshit. You could build a pretty sweet little social network just using webRTC, without a central server.

I'm thinking of a facebook-wall style network, where each user has a wall, and you can befriend anyone else. You would first start by letting clients use a twitter-style handle as their node id, and adding authentication to the peer server, so that you can prove you own a particular handle. Note that nothing would be stored by the central server except a username and password (and whatever data webRTC needs you to hold to broker sessions), everything else would be stored in localStorage on a client.

# Making a friend

To make a friend, you would add them by their handle, and the broker server would tell you the IP address and port number (via STUN) of the client you want to connect to. That client then accepts you, and sends you any updates to their wall, and your client can post any updates to that persons wall.

# JSON

Peer.js supports data channels, so you can send json over the webRTC connection. So you do all your user interface in Backbone.js, and serialize it to JSON to store in localStorage, or to send over webRTC>

# Only while online

The biggest problem with this setup of course, is that it only works when everyone is online at once. So, for example, it'll work when everyone is at work during the day, or if you and a friend are both online in the evening. You can even post to your own wall when friends are offline, and if you wanted to, when a friend connects to your webRTC instance, they could poll you to say 'send through all the updates to your wall since timestamp x. It's a bit like instant messenger, you have to leave the app open in a browser window somewhere.

# No encryption required

It's kind of cool, because it doesn't require any easy-to-fuck-up cryptography to provide a relatively private social network, since all the content is stored on peoples PCs and not in a cloud server. It also means you can scale the network to zillions of people relatively easily, all your server has to provide is STUN and authentication, all the content (including images and any other media you want to share) is stored in the browser and sent directly from peer-to-peer. The biggest problem I had with knocking up a distributed social network like Diaspora-X or working on Buddycloud, was that you had to build this fuck-off big federation component that was hard for people to install, and really hard to do properly. With a peer-to-peer solution, there are a bunch of downsides, but a massive upside in that scaling is free.