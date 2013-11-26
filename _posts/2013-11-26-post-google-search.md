---
layout: post
title: "Post Google Search"
---
 
I've been thinking a bit lately about search in the post-web world. It looks more and more likely that mobile apps will become as popular as the web was. The web is never going to go away, but you're going to spend more than half your time looking at content in a mobile app. So is there a market for a search engine that only shows results that link to apps on your phone?

# Googles deep linking

Google has been working on adding app deep linking to their search results, so if you search for a recipe, and you have a recipe app on your phone, it displays a button next to that recipe, that launches the native app on your phone. It works by registering a web intent in your android manifest, and adding a `link` tag to your html, so that when google crawls your site, it knows how to open that content in your native app.

This is a pretty good solution, and only just launched, so it'll be interesting to see how it grows. There are a few problems with it, but they're all solvable. For example, it doesn't prompt you to install an app if you find content that you don't have the app for. It also displays both web and native content, you can't tell it to only show links that you have the app installed for. All pretty easily solvable. It doesn't do one thing though, and that's personalised indexing.

# Greplin

Greplin was a startup that came out of ycombinator. It's an interesting story, the founder started with ycombinator, worked on his idea for 2 months, realised it was useless, then came up with a new concept two weeks before demo day, nailed the prototype and raised a bunch of funding based on his 2-week-old prototype. What Greplin did, was you signed into Greplin, then authorised a bunch of APIs (gmail, linkedin, facebook, etc), and Greplin would crawl all the content on those sites and add it to a personalised search engine just for you. It's a great idea, you can search all your own content online, from one spot. Sadly, it doesn't seem like this was a killer idea, because Greplin morphed into cue (a sort of google now product), that was eventually bought by Apple, and shut down. So I'm guessing they never got the huge amounts of traction to become a valid product on their own.

# Merging the ideas

I wonder if there's room for an android app that you install, it gets a list of all your installed apps (using (getInstalledPackages)[http://stackoverflow.com/questions/7374704/getpackagemanager-getinstalledpackages-packagemanager-get-activities-return]), and then uploads that list of apps to a central server. Users can then vote up the apps they'd like to see indexed by your search engine. You then write an integration or point a crawler at the mobile website of the app, and work out how to deep link the content back to intents in said app. Users could also use oauth to authenticate themselves, and you could generate a personal index of their content, with a nice little android widget for searching for that content. A quick glance at my phone shows the following apps that I'd probably search across if it was possible:

 * Baconreader (reddit)
 * Facebook
 * Evernote
 * Gmail
 * Goodreads
 * Foursquare
 * Instagram
 * Gmail
 * Keep
 * Maps (probably impossible to index)
 * People (impossible to index?)
 * Pirate bay browser
 * Ratebeer
 * Spotify
 * Trade me
 * Tumblr
 * Twitter
 * Untappd
 * Vine
 * Yelp
 * Youtube
 
Admittedly some of those sites (youtube, foursquare, twitter, yelp) would be supremely difficult to crawl and index, but it's an interesting idea yeah?