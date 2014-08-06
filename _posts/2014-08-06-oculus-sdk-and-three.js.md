---
layout: post
title: "Oculus SDK and Three.js"
---
 
At work today, I did a demo of some of the VR stuff I've been hacking on. It was pretty cool, everyone was way more interested in the 3D / VR stuff than they were in my other projects, which made me think that I need to get my shit together and release some of this stuff.

# Timewarp and three.js 

One of the things that's been on my mind, is that even if I build a cool multiuser 3d demo, I still have to make it work with the oculus rift somehow before I can post it on the [oculus forums](https://developer.oculusvr.com/forums). I've already done a prototype using [vr.js](https://github.com/benvanik/vr.js/) which uses the NPAPI (deprecated but still works) to talk to the rift SDK and expose positional info to javascript. It works well, but it's pretty laggy (compared to the tuscany demo which uses unity). I've been wondering if there's anyway to use timewarp (where the scene is rendered to a depth buffer, then the oculus is polled to get the most recent location and the buffer is warped to match your new head location, reducing latency) with three.js. The only way I can think of at the moment would be to somehow hack up a chromium build that passed the webGL output to the SDK for final warping and sending to the rift.

# Node-webkit

A cool dude called loktar created a demo of using [node-webkit with vr.js](https://developer.oculusvr.com/forums/viewtopic.php?f=39&t=4727) to create a packaged file that you can download and try out virtual reality in javascript. It's a cool idea, but I couldn't get it to work in windows 8.

# WebVR

And this other dude [Brandon Jones](http://blog.tojicode.com/2014/07/bringing-vr-to-chrome.html) has been working on adding webVR support to chrome. He's already got chrome builds that support the webVR standard. Firefox is also working on webVR. In Brandons post he notices that the latency of using webVR in chrome is 64ms (4 frames) from head movement to updating the display, whereas the Tuscany demo on the same box has a 48ms latency. There's no discussion of getting timewarping to work in the browser, but there will be work about speeding up the rendering pipeline

# Conclusion

The conclusion is that there is cool work being done on making the browser a viable platform for doing stuff with virtual reality headsets, and I need to get my act together and opensource and deploy some of the code I've got kicking around.