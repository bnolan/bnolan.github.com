---
layout: post
title: "With - Quantified Self App"
---
 
So I'm getting closer to releasing With. I was reading [DHHs post](https://signalvnoise.com/posts/3743-hybrid-sweet-spot-native-navigation-web-content) about hybrid apps, where you use native navigation and display content using webviews, and since it was slow going trying to write a purely native version of With, I decided to go hybrid.

This made the app way simpler. Instead of a signup form, encounters list and friends list, it's now just a segmented control to change tabs and a webview. I quickly hacked it up for iOS and got most of the app working, and then refactored the Android app. The app is way simpler now. It's kind of annoying working on a new mobile app, I'm so new at mobile development, that I spend the whole time learning. At least, in a positive way, once I've finished making With, I should be much quicker at building future mobile apps.

# Hosting

I'm hosting With on Heroku, and the way the encounters detection works is super un-optimized, so I'll probably only release With in New Zealand for starters, since even having a 1000 users will probably require that I rewrite the encounter detection code. I'm trying not to think about scaling the app, since the most likely outcome with any app is that no one will use it, rather than tens of thousands of users. But yeah, if I do get more than just my immediate friends using the app, I'll need to refactor the hosting. I'll probably just move everything to node.js, ec2 and rds (since you can use [postgis on RDS](http://blog.safe.com/2013/12/postgis-on-aws-rds/)).

# iOS and Android

I've been trying to keep my function signatures the same across iOS and Android, so I can `[self showEncounters]` or just `showEncounters()`. It is interesting how much easier iOS seems than Android, because it feels more like javascript, where most tasks are async, and you just get a callback when the task is complete.

# Hashed phonebook

With hashes and uploads the phone numbers in your phonebook to the server, so that the server can look for your friends using the app. I'm a little uncomfortable about this, since generating a rainbow table for 12 digit phone numbers is trivial on a modern GPU. It's not too bad, because I'm not uploading the names in your phonebook, so if an attacker does get access to the database, they'll just know who you call, not what their names are. I think the best security I can do here is to get rid of the hashed phone numbers off the server after x days, instead of holding onto them forever. I guess I can also hash together the phone number of user a and user b together, which will make generating a lookup table slightly (but not much) harder.

# Encounters.involving(self)

When I initially pitched With, I thought I would show you all of your friends encounters, so that if Sam and Dave are hanging out together on a tuesday after work, I can send them a text and ask what they're up to. But as I've developed the app further, I've realised that your newsfeed is actually very personal (for example it shows when you arrive and leave from work), so I think for the first release, I'll only show encounters that you personally were involved in.

# Addresses

I've decided that I'll show the street that an encounter took place on. So it won't say that you were at Hashigo Zake, it'll say you were on Taranaki Street. I might even add the nearest street intersection, since that'll place you pretty well. I don't think automatic picking of locations using the foursquare venues api will be accurate enough, and it's better to give a vague address than an incorrect venue name.

# Grinding out the release

I'm pretty sure once I've finished all my learning and experimenting, I'll get to the point where I could rewrite the entire app in a few days, but it's been an interesting learning experience. Now it's just a case of grinding out the app until I can release on the app stores to my friends and colleagues in New Zealand.