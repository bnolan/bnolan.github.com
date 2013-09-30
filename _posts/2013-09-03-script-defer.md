---
layout: post
title: "Script defer"
category: zoomin
---
 
So as part of my push to increase the traffic to Zoomin 4-fold (which is a crazy ambitious plan, but everyones gotta have a goal right?), I decided to try and make the site load as fast as possible. [John Clegg](http://twitter.com/johnclegg/), the former owner of ZoomIn, was always a fiend for making sites load fast, and a big proponent of using yslow, so ZoomIn was already pretty speedy, but after playing with it yesterday, I was sure I could make it faster.

# Google maps

The biggest slowdown on the site, as far as I could tell, was loading the google maps api and the massive javascript that powers ZoomIn. The google maps javascript is mostly-cached and minified, but the browser still takes time sending an `if-changed-since` request to make sure it has the newest version. There is no way around this slowness, and if the google maps api is in the `head` of your document, you've got another 100ms or so that you can't code around.

# Move it to the bottom!

So I grabbed all the external APIs I was using, and stuck them at the bottom of the body tag, leaving only the stylesheet (which is aggresively cached by apache) in the `head` section. However, ZoomIn has a lot of inline javascript that instantiates the different map styles and visualizations, and these all expected the Javascript to be included in the head. Easy fix, just wrap those in a block that gets run after everything else.

    function Ready(callback){
      Ready.callbacks.push(callback);
    }

    Ready.callbacks = [];
    
Then your code looks like this:

    Ready(function(){
      new GoogleMapsInstance(some params);
    });
    
And at the bottom of the page, after all the javascript has been loaded, I've got this:

    while(func = Ready.callbacks.shift()){
      func(jQuery);
    }
    
# It's like script defer

It would've been nice just to use the `script defer` attribute to make all the javascript run once the DOM has become interactive, but reading the [caniuse page](http://caniuse.com/script-defer), it says defer is only "partially supported", and I really didn't feel like debugging IE heisenbugs, so I rolled my own solution.

# How does it feel now?

Snappy as hell.