---
layout: post
title: "Mapping a city reddit"
---
 
I started working on this last night but didn't get it to the point of making a prototype or screenshots, maybe tonight. Anyway, as part of my investigation into different models of geo-based messaging, I was wondering what it would look like if you mapped all posts on the [Wellington subreddit](http://reddit.com/r/wellington).

So I started by manually geotagging the first 50 posts in the reddit. I ended up with only about 20 geotaggable places. I think you could automate this if you made a rule on the reddit that whenever people mention places, they put stars around the place name. eg "I think \*midnight espresso\* is a great place for coffee". Then I could write a relatively simple scraper that crawled the reddit for new posts, then looked up that place name on foursquare.

Anyway, after manually crawling those 50 posts, I discovered that people don't actually mention specific places very often on the wellington subreddit. And then after looking at the sydney reddit, I saw a similair thing, only about 30% of posts have specific places mentioned in their comments.

This kind of blows my idea out of the water, I was thinking of creating something like the Facebook 'tag people in this post' functionality, a javascript extension that meant that you could reply to a post and type @something whenever you wanted to refer to a place, and it would autocomplete the place name using the google places API.

Quora has some city-based discussion nodes now. They don't seem to have integrated with foursquare or the google places api, so that when you reply to a question and mention a place, there's no link to the places. Anyway, I'll keep experimenting and hopefully strike that combination of comments, maps and locations that is fun and easy to use and you could grow a community around.

I'll update my blog when I've got the map of `/r/wellington` working.