---
layout: post
title: "Dispersion, a webRTC social network"
---
 
So after discovering [peer.js](http://peerjs.com/) and daydreaming about a peer to peer social network that looked like Facebook but worked like instant messaging, I had a bit of a hack at it, and it's super early stages, but I'm calling it [dispersion](http://github.com/bnolan/dispersion/) at the moment, since dispersion is listed as a synonym of Diaspora. ;)

<img src="/images/dispersion.png" />
<cite>Screenshot of the prototype</cite>

It's probably not worth your time checking out the repo yet, it's still so alpha and buggy that it won't work for you in all likelihood. It's developed using [capt](https://npmjs.org/package/capt), my javascript buildtool (which I really need to work on, but that's a diffferent post), in coffeescript and backbone.js.

# LocalStorage

Your posts and your friends posts are all serialized to localStorage as json, so that the app can fire up instantly when you load it. I saw the [SJCL](http://crypto.stanford.edu/sjcl/), which would be a nice way to keep an encrypted copy of your localStorage up on the internet somewhere, so you could log into the social network from multiple locations.

# Devise

I was thinking of hacking up peer.js to have authenticated sessions, but after looking over the code and the issues on the peer.js github page, I think I'm misunderstanding what peer is for. So it looks like instead, I'll create a simple app on heroku that uses devise for authentication, and provides a CORS service that lets you search for users by their full names, instead of just adding them by their handle. The heroku service would keep track of whatever your current peer.js identifier is, and tell your friends where to find you.

# Prototype

Anyway, this is all just a super rough prototype at the moment, I'll do a proper post when I've had some more time to work on it, which might be a while, since I'm pretty busy with the [day job](http://www.powershop.com/) and ZoomIn. One thing I would like to add would be some sweet jasmine and cucumber tests, since peer to peer stuff is pretty complicated and it's a pain in the arse to test manually.