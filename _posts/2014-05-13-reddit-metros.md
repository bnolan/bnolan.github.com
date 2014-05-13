---
layout: post
title: "Reddit metros"
---
 
I think I've posted about this before, but having had a bit more experience building mobile apps, I think there's a great opportunity to take the list of [local reddits](http://www.reddit.com/r/LocationReddits/wiki/index) and build a customised app with a messageboard for each city. Basically replicate the post link, upvote/downvote, start conversations functionality that reddit provides on a city basis and make a customised app for your city that does this.

# App per metro

I use the term metro here to discuss a city, or a metro area. I'm not enough of an expert in app store marketing to say whether making an app per metro is a good idea. On the plus side, when people install the app, you can automatically connect to other people that have a location in common with them. You also don't have to use the geolocation API to find out where they live. People might also feel more connected to the app since it's an app for *my* city. On the negative side, the process required in maintaining a seperate app for hundreds of cities would be massive, and Apple might even reject you from the app store for creating so many spammy apps.

# Cordova vs mobile web

I think you want to do this as a cordova / phonegap app, or maybe even a proper hybrid app, so that you can do push notification when someone replies to your topic. I think a mobile web site isn't sticky enough to compell people to use it, you kind of want to take up space on someones homescreen. You'd probably also want to be able to use Android intents (and the iPhone equivalent) to redirect people to maps links, to open place reviews in yelp, etc.

# Integrated w/ 4sq, yelp

When people ask a question in the app like: "What places do good gluten free pancakes", it'd be nice for people to be able to post a reply as a 'place', 'link' or 'text'. If they write a place name, you should search yelp and foursquare so that people can view the mentioned place on a map. Maybe even have a map view of a topic, showing all mentioned places on a map, so that you could have one super topic which was "great grafitti spots".

# Voting / moderation

I think something that works really well in Reddit, is that you have pro-active moderators in metro areas. I think you'd need to build moderation tools, because community upvoting / downvoting wouldn't be enough. You'd also want to attract some moderators and encourage them to post topics when the app for the metro was first released.

# One day project?

I like this project, it feels simple enough that you could knock up a prototype in one day, and then market it in your own city and see if you could make something fun. No scaling issues, relatively simple UI, no fancy background processes.