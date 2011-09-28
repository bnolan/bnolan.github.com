---
layout: post
title: Javascript Mobile Apps
---

I've worked on three javascript mobile apps now, one used internally by Lonely Planet, one on the [appstore](http://itunes.apple.com/nz/app/rankers-app/id454894632?mt=8), and another an unreleased site I built myself. I've been wanting to write up my notes on development for a while, so since it's a sunny day and the house is tidy, I'll put up some notes. First up...

# Reasoning

First up, why even use Javascript + XHTML to build your mobile apps? The obvious answer is to get cross-platform support out the box, a well written app will deploy on phonegap to android and iOS with no extra work. Another answer, which is easily dismissed, is the benefits of having a single tool that you can use across more than just your mobile app.

Any business logic you encode in Javascript you can re-use for your desktop client and can be tested on the command line using node.js and [jsdom](https://github.com/tmpvar/jsdom). Where possible, one language is better than two in my book.

Finally, by using javascript, you are free from the tyranny of app-stores. I've had apps initially rejected by the appstore, and although they were easily resubmitted and are now selling well, if you're doing anything "fringe", that may run afoul of the appstore, having the option to deploy your app over the web as an html5 app is a nice fallback.
