---
layout: post
title: "Physics simulation of Wellington"
---
 
So I did a bit of work on [Tuesday](http://tuesdayapp.com) today, but also did a good afternoons work on my virtual tourist game. [Here is the latest](/experiments/wellington/). 

It takes ages to load (about 40 seconds) because the code that combines the streets is horrendously slow (23 seconds). I think I can optimize it, I suspect I'm just using jsclipper incorrectly (feedback sought and appreciated!). Once the page has finished loading, you can walk around the streets of Wellington. I'm not sure why the speed of the little red arrow is so slow, box2d seems to ignore the strength of the impulse (I guess it's normalized at some stage?). Anyway. The goal is to combine this physics model with the [walking demo](/experiments/walk/) to make a cool webgl powered walking simulator of a city, where you can visit locations to get points, or collect "memories".

If you're trying to make the code work on your own, note that I had to have up `createBucket` to always set `bucket.interactive = true` - since that didn't seem to work correctly in the current master branch on mapbox-gl-js. This is taking way longer than I expected - I hope this is a cool game mechanic walking around the city. :)