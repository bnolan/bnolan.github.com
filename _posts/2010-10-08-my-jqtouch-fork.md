---
layout: post
title: My jqtouch fork
---

Sorry for not blogging this week. I've been in a client office and furiously working on getting a sprint out. On Monday I had my product development day, so I started work on [weheartplaces](http://weheartplaces.com/). The first iteration of WHP is due out by the end of October, and I plan to have it working on Iphone, Nokia and Android. To do this I'm using [jqtouch](http://blog.jqtouch.com/) which hasn't seen a lot of work in the past year.

I forked jqtouch onto my [github](http://github.com/bnolan/) and have been pushing a few changes. They aren't all ready for the primetime yet - but the main design changes I'll be making:

 * URL routing scheme, so you can have controllers and actions to handle requests
 * Use pushState to have proper urls (instead of #location urls)
 * Specced and tested using [Jasmine](http://github.com/pivotal/jasmine)
 * Better form support

I also have some ideas about how I can make an analog to jqtouch that will work with the Web Runtime that Nokia supports for development on their phones. I'm doing my jQTouch modifications in pure javascript, but the Weheartplaces application is written using Coffeescript.