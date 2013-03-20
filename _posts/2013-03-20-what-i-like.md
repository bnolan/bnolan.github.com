---
layout: post
title: What I like about Android dev
category: placepinner
---

I've been doing about two weeks of android development now, on and off. It's been interesting. The things I like:

## Eclipses autocompletion and code highlighting

The code intellisense that eclipse provides is really great. I like how it compiles on the fly and shows unused and uninitialized variables, and the autocompleter works really well (coming from a ruby world, it's a pretty nice feature of a strongly typed language).

## Sensible exceptions

When you try and do some network activity on the main thread, android throws an exception. You can disable this, but you really shouldn't, since all it's doing is forcing you to make a responsive app.

## AsyncTask

This is a really nice little class that starts up a new thread, runs some code in the thread, then rejoins your main thread and runs some other code in the main thread. That means that you can easily do some network activity (or anything else slow), and easily put the result back into your main UI code. Obviously you shouldn't try and manipulate your UI from two threads at once, so the `onPostExecute` code that runs in the main thread is cool.

## Nice animations and performance

Coming from a phonegap background, it's nice all the little built-in animations that come with android (for example moving between activities), and the performance of list views and page rendering is much quicker than anything you could hope to do with phonegap.

Things I don't like...

## Eclipse

It's still an ugly troll. And it's one monolithic window, you can't break it up and spread it around multiple monitors.

## The Android emulator is slow

I've been told to use the intel-based (atom) emulator, using the Intel VT-X extensions, I haven't got around to trying that yet (I do most of my testing live on my phone), but the default ARM-based emulator is slow as a dog.

## Having to support 2.3

If you look at the [android versions dashboard](http://developer.android.com/about/dashboards/index.html), you'll see that you have to support Android 2.3 (API version 9) to get more than 50% compatibility with Android devices. 2.3 is okay, and most of the good features you want are backported by Google so that you can use them. I'm still learning what is and isn't available, but at the moment I'm just using list views, text views and layout components and don't need to do anything fancy.

## Theming

I'm not sure how theming works at the moment, for example [@ristaris](http://www.twitter.com/ristari) 2.3 device has a very different theme to my 4.0 holo themed device. I'm not sure how I'm meant to make UI that looks native on both devices, or whether to make my own style toolbars that don't really look the part on Android, I guess I'll find out.

## Potential revenue

From reading different Android forums (and my own experience with the Rankers app), it seems like there's very little revenue to made from advertising networks, or even selling pro versions of apps on Android. The iOS store is a lot more lucrative. Sadly, there's already a really good app that does trip planning / place bookmarking for iOS (it's called [dcovery](http://dcovery.com/)), and I really want to make an Android app, since I'm an Android fan myself. I'm just not sure how I'm going to make a return on all the work that I've put into placepinner so far. Maybe sell the app, maybe only allow 100 bookmarks for free users, then encourage people to upgrade to pro. Something anyway.

It's been an interesting time, I've also done a bunch of work on the web-site part of Plcaepinner (it's still not ready for people to see, but it's getting there). The three things I need to finish before I can promote placepinner are 1. Chrome extension (for bookmarking places), 2. Website (marketing site basically), 3. Android app. Then I can start to show people what I've been working on for the last few months.