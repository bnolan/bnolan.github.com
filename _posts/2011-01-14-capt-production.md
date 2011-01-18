---
layout: post
title: Capt in production
---

I've added some features to [capt](http://github.com/bnolan/capt), it's still very rough and needs a lot more work, but it's coming together. Added recently:

# Build command

Run `capt build iphone` to create a build in `builds/iphone` that will compile all coffeescript, concatenate and minify all scripts, compile all the less into css and run the yui compressor over it, then create an index.html from your index.jst, with only two files as an include.

# Added support for targets in the config.yml

I have this on my config.yml:

    iphone:
      lib/phonegap.js
      platforms/iphone.coffee
      
These are included only when developing against the iphone, and are all merged into one file for production. I do the same for nokia (which requires json.js and some special code to deal with the nokia webruntime).

# More test support

I've improved the testing templates, but I still need to get a command line test environment running - basically type `capt test` and have it run the whole test suite using node.js and jsdom.

# Future of capt

I doubt the first decent release of capt will be prior to April, since I'm heading away on a campervan holiday of new zealand for 2 months, but keep an eye out then, and feel free to fork and send pull requests in the meantime.