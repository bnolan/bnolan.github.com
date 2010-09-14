---
layout: post
title: Twitterplaces Next Generation
---

Ever since I [discovered](http://bennolan.com/2010/09/13/a-world-of-tweets.html) that you can index all of the worlds geotagged tweets with Twitter, I've been working on the next generation of twitterplaces. It's a challenge. The app has to work on datasets the size of Wellington (around 110 tweets per day) to New York (around 15k tweets per day) and provide an intimate experience for every user.

One of the biggest problems with displaying lots of data on a map is that you end up with massive clouds of google markers all over the map. These look okay when there's less than 5 markers, but above that, clicking on many markers is a bad user experience, it's hard to get an aggregate view of what's going on.

<img src="/images/twng.png" />
<cite>Viewing wellington tweets grouped by contour density maps</cite>
  
I've already posted about using R to create contour maps of tweet density. I've now taken that code and changed it from a manual job, into something automated. It's not production ready yet - but the idea is:

1. Contour generator (R script) runs hourly on top 1000 cities
1. R queries postgres for tweets in the last hour
1. Generate the density matrix, and generate contour lines
1. Convert contours into [WKT](http://postgis.refractions.net/docs/ch04.html#RefObject) polygons and save to the database

When you display a city page - you export the contour polygons into a json array (indexed by hour) and then give the user some UI for changing what time window they are looking at.

# Realtime contour generation

I'm not in a hurry to try and do this in realtime, but it has been at the back of my mind. My bookmarks tagged [contour](http://www.delicious.com/benn/contour) have my notes on the basic algorithm. Any query that filters keyword, user\_id, generate contour maps of an individual suburb, do language analysis, sentiment analysis, etc - would generate data suitable for converting into contour maps.

If I wanted to be able to generate this data in realtime, there are two ways I can see of doing it.

1. Farm the raw tweet data off to the browser and generate the contour lines in Javascript
2. An optimized C++ app that uses sse / simd to generate the contour lines in a fraction of the time of R

Or - I could charge customers monthly, fire up another ec2 instance and keep using the existing queries in R.