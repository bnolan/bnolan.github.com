---
layout: post
title: Jquery Mobile or not
---

I've been working on [weheartplaces](http://weheartplaces.com/) again, trying to get it into the appstores and out the door. I used capt to build the bundled and compressed javascript, and using jquery mobile, the closure compiled code was 161k.

I removed jquery and jquery mobile and replaced it with zepto.js. It took about an hour or so to recode a minimal CSS theme that replaces all the jquery mobile functionality (with the exception of fixed position viewports) and the resulting closure compiled code was 41k.

The huge difference was in application startup time, and in less crashes on the actual device. On the simulator, the javascript compiles instantly, but on my 2g iphone (same as a 3g iphone processor), the app starts in 4 seconds, instead of the previous 8. It's also smoother page to page and the user interactivity is quicker.

jQuery mobile is fantastic and I may end up going back to it - but for now I'm going to do my mobile development using jquery.js (zepto doesn't work on Nokia), backbone.js and a custom stylesheet. I'll put up some screenshots of the new weheartplaces mobile app shortly.