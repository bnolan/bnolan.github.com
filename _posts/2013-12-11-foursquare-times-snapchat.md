---
layout: post
title: "Foursquare times snapchat"
---
 
Sorry, this is a bit of a puff piece, but it's been interesting seeing the large social networks (Facebook) being stripped down into their component parts and have their lunch eaten by small task-focussed mobile apps (like Snapchat).

Me personally, I'm really interested in location-based apps, and I wonder if there's a market to take the foursquare mechanic and re-make it a way that's more interesting for teens. I'd include the ability to tag other people, so you could say "Ben and Sam are at Sams house", and your friends would see the update and could comment on it. You could gamify it by saying "Ben and Sam have hung out every week for x weeks". I'm not sure if it's a positive mechanic or a negative mechanic, ie, would people use it to re-enforce their social bonds, or would they use it to bully other kids "Haha Mary, everyone else is at Dorothys except you".

# Security

I'd want to be quite particular with developing an app like this, since you're holding lots of relatively sensitive data (the locations and hangouts of young people), you don't want to move fast and break things in a way that leaked lots of data.

# Foursquare

This isn't a natural market for foursquare to get into. Foursquare does have private venues, but they're not a focus of the app. It's more about public venues and recommending them to you. The way young people hang out, they don't tend to use foursquare venues as much (maybe public facilities like sports grounds and swimming pools, but not so much cafes and bars), and I guess they spend a lot more time at friends places. Foursquare doesn't have and can't gather this data, so it's not really going after them.

# Ephemerality

The ephemerality of snapchat is a great feature of it, it means that you have to constantly use the app to get content. It's also fun to think of how you can build an app with similair functionality, because you [a] have less app that you have to build (no profile pages, no history pages, just current content) [b] have to work with the constraint that people will be constantly adding new content.

I guess the foursquare feed already is pretty ephemeral, you could just show who has been active in the app in the last 24 hours. A good way to gather lots of data might be to run background location gathering, so that if your location has changed in the last hour, poll again in 10 minutes. If the location is still the same, you're probably at a new location, prompt the user whether they want to share this with their friends, or even do it automatically. Maybe have an 'off mode' for when you don't want to share your location. If this is a location you've been at before, allow friendly names (eg you're at 22 Bottomly Road - "Sams house").

# Blank state

I'm not sure what the 'blank state' of this app would look like, and how you'd get people to start using it. I'm not sure about the tagline 'share your location with your friends!' - I don't think that's what would drive use of the app, maybe it would, I don't know. Maybe something more around 'play a game about location with your friends'. Something. And add friends by everyone in your phone book. Maybe allow SMS invites to your friends if you want to expressly share your location with them.

You could call it snapsquare. Hahaha. ;)

ps - A quick search found [Glympse](http://www.forbes.com/sites/kashmirhill/2013/06/26/glympse-is-snapchat-for-location-sharing/), but that's not really what I was thinking about.