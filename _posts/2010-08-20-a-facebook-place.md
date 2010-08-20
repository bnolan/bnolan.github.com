---
layout: post
title: Analyzing a places page
---

Since Facebook places isn't available outside of the US yet - I've only had two options for exploring the places api.

Firstly - my good friend [loliver](http://twitter.com/clarketus/) moved to Palo Alto two months ago to work for [Wildfire](http://www.wildfireapp.com/), so I've been following his [checkins](http://www.facebook.com/pages/Wildfire-HQ/119484554770490).

<img src="/images/facebookplace-page.png" />
<cite>Wildfire HQ Places page</cite>

I love the design, it's nice and simple, has a strong social component (with the facebook wall), had a piece of content in the middle of the page (the map), some stats on the left to get an idea of the popularity of this place - and then a list of people who have checked in there which gives some 'explorability' to the places pages.

They don't have 'nearby' or 'similair' places, but that might just be because it's new and not enough of my friends have checked into multiple places.

## Proxies and geolocation hacks

The other way I've been trying out the facebook is by proxying my requests through my US servers (which doesn't seem necessary now that they've deployed the places functionality worldwide). The only downside is that when your browser tries to geolocate you, Facebook works out you're not in the US and gives up.

The next trick for Monday will be to make a greasemonkey script that emulates the W3C geolocation API and let's you check [friends](http://twitter.com/nzkoz/) into [Kentucky strip clubs](http://www.tuscl.net/s.php?SID=27).