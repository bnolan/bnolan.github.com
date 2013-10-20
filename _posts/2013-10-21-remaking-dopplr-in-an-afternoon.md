---
layout: post
title: "Radar: Remaking Dopplr in an afternoon"
---
 
So, I read last week that [Dopplr](http://dopplr.com/), the social travel darling, was being shut down by Nokia at the end of the month. This isn't too surprising, since there has been no development on Dopplr since it was acquired by Nokia in 2009. But it is a bit of a shame, since Dopplr was a cool app, and was a great way to keep track of your trips and get lots of interesting stats and maps. So, I decided to remake Dopplr, and let people migrate their data off Dopplr and onto my new service, _[RADAR](http://getradar.in)_.

# Data model

I made a few decisions early on. Firstly, I was going to require twitter authentication, and use the twitter friends relationship to define friendships on Radar, I didn't want to maintain my own `friends` model. I also decided that I wouldn't import tips from Dopplr, since tips is done exceedingly well by Foursquare, and there's no need to reinvent the wheel. So, on Sunday afternoon, I started knocking up a rails + postgres + google maps site to replicate the trips functionality of Dopplr.

Each trip costs of a trip model, with multiple legs. Each leg is a different city, and a trip start and returns in your start city. I use the google places autocompleter to get the location of leg of the trip, and use rgeo to calculate the length of your trip.

# Using a postgres array for friends

When a user signs in using twitter oauth, I get their `twitter_id`, and a list of `friend_ids`. I store the friend_ids in a [postgres array](http://www.postgresql.org/docs/9.1/static/arrays.html) of bigints, which means that I can do a query like this to find out everyone on Radar who you follow, and who also follows you. I call these friends.

    def friends
      User.where("uid in (#{friend_ids.join(',')}) and #{uid} = ANY(friend_ids)")
    end

This is a super easy way to keep track of who you are friends with, without building any UI or relationships myself. I have a cronjob that refreshes your friend_ids every once in a while, so if you follow someone on Twitter, it adds them to your friends list.

# Modern geospatial tools

When Dopplr was created in 2007, there was a dearth of good geospatial tools. For example, Matt and co had to import the geonames database so that hey could suggest City names when you entered a new trip. Luckily, there's now tools like the google [places autocompleter](https://developers.google.com/places/documentation/autocomplete), so you can just rely on Google to suggest place names and return a latitude and longitude. I then store the latitude and longitude in a postgis `geometry` column. This means I can use [rgeo](https://github.com/dazuma/rgeo) to calculate the distance of trips using it's built in haversine formula.

<img src="/images/radar-autocomplete.png" />

# Dopplr data import

Handily, Dopplr is offering a data export option, which lets you download a .zip containing some json of your trips. I used the ruby `zip` gem to open up your .zip file and import your existing trips. So far about 20 users have imported over 300 trips into Radar, which means we have a decent amount of data to start working on a raumzeitgeist for Radar.

# What next?

Well, I've emailed a few news sites to see if they're interested in covering a Dopplr remake, and I posted the site to /r/entrepreneur on reddit. I've also tweeted at everyone who expressed sadness about Dopplr shutting down, and asked @mattb if he'd be interested in tweeting to his followers about Radar. I haven't had a heap of luck yet, but we'll see how the next week or two goes.

If enough people sign up to make it worthwhile, I'd love to keep building out Radar, there's a bunch of great Dopplr features that I haven't replicated yet, but it really depends whether or not there's still the demand love for Dopplr out there in the community, or has everyone moved on - and Foursquare / TripIt / Kayak provide enough of the functionality that a Dopplr remake is a bit of a dead end.

It'll be interesting to see what happens.