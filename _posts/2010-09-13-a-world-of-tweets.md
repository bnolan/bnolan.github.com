---
layout: post
title: A world of tweets
---

The Twitter streaming API now lets you recieve all geotagged tweets, not just geotagged tweets in specified areas. This means that with a command like:

    curl -d "locations=-180,-90,180,90" http://stream.twitter.com/1/statuses/filter.json -uuser:pass
    
You can recieve all the geotagged tweets twitter has. I updated my crawler to run against this complete dataset, fixed a few lingering bugs, and then let my crawler run for a few hours:

<img src="/images/ooo.png">
<cite>o's indicate exact location, .'s indicate neighbourhood</cite>

I then exported my tweets, and plotted x vs y in R:

<img src="/images/worldtweets.png">
<cite>plot(tweets$x, tweets$y); world(add=TRUE)</cite>
  
You can clearly see a world map forming, with a great concentration of geotagged tweets in north america, europe, japan and indonesia, as well as the outlines of Australia and New Zealand.

What if we cluster the points using `kmeans`?

<img src="/images/kmeans.png">
<cite>Clustered into 5 groups using kmeans squared</cite>

We get 5 clusters, western us, eastern us, europe, asia and south america. Looks like Texas is an eastern state then. It's kind of scary that Africa is so sparse that it gets gobbled up by Europe, South America and Asia.

I'm keen to see what a histogram of seconds from midnight (what I call epoch) and longitude will look like - but i'll have to wait til I have 24 hours of data. It looks like I'll end up with about 2 million tweets per 24 hour period, which should make a good dataset.
