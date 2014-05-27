---
layout: post
title: "Herenow retrospective"
---
 
I've been teaching myself mobile development for the past 6 months, and last week, I decided to put aside my full time project and instead try and build and release something quickly, to get experience with the whole app store submission process, and also to write an app with all the knowledge I'd gained over the previous 6 months (my previous project looks like a total nightmare).

What I came up with was [herenow](http://herenow.nolanconsul.com/).

It's a simple message board app that lets you send push notifications to anyone that's near you, or to leave a message for the next person to visit where you are. I built it for iOS and Android, with a ruby on rails backend.

A few things I discovered:

# I should've probably used heroku

I deployed the app on my own linode box, since in all likelihood it'll only be my friends and I using the app. It took several hours of mucking around to get my linode up and hosting the rails app. The only real positive is that I can leave the app running for months and months without paying $100 a month for a heroku worker + postgres database.

# iOS is easier to make pretty

I wrote the app for iOS first, and (this might be contentious but) I found the iOS dev tools better for writing a good looking app. Once I'd designed the app, I found it easy to copy the design over to Android, but out the gate, I've found my android apps are uglier.

# GCM is way easier than APN

The APN setup sucks, fucking around with certificates and shit, it's totally bogus.

# Intellij is great

Once I worked out how to sync my gradle build scripts with the intellij studio (hint, click the refresh button on the gradle pane), I found intellij great. I didn't really have any problems at all adding a bunch of dependencies and coding against them.

# Just getting released is exhausting

So I mocked up the iphone app in an evening, then spent the weekend getting the backend service running and APN working, then monday I wrote the android app and today I polished everything up a bit (it's all pretty hinky tbh). It's exhausting just getting to here. I can't imagine how difficult it must be for single developers who are trying to build and release and market apps. You're pretty much knackered by the time you get to release something, and that's the point that you have to have heaps of energy to fix bugs, maintain servers and do marketing.