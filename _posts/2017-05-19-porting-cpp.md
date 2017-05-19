---
layout: post
title: "Porting CPP"
---
 
So ever since I [shut down](//scenevr.com) SceneVR, I've been free to work on a variety of different ideas. One of the things that was always floating around in the back of my head, was writing something like [Janusvr](//janusvr.com), except designed to run on mobile VR instead of desktop.

That's why I started work on Fontus, by c++ renderer. It's written in c++ so that it's:

* Fast
* Extensible (can use any crossplatform c / c++ libraries)
* Native (so it can be listed in the oculus / steam / play store)

And although making c++ compile on multiple platforms is a huge pain in the ass (I started on mac, porting to windows wasn't too hard, but porting to android with the NDK has been a real struggle), I'm enjoying the environment once I have things up and running.

